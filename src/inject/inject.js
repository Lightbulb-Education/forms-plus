$(document).ready(function () {

    if (window.location.href.includes("https://docs.google.com/forms/d/e/")) {
        //create function to set max and min data attributes
        function addMaxTextDataAttributes() {
            var qs = FB_PUBLIC_LOAD_DATA_[1][1]

            for (var key of Object.keys(qs)) {
                try {
                    var ele = document.querySelector("[data-item-id='" + qs[key][0] + "']")

                    //verify validation is maximum character count
                    //TODO add behavior for minimum character count
                    if (qs[key][4][0][4][0][1] == 202) {
                        ele.setAttribute("data-text-max", qs[key][4][0][4][0][2][0])
                    } else if (qs[key][4][0][4][0][1] == 203) {
                        ele.setAttribute("data-text-min", qs[key][4][0][4][0][2][0])
                    }

                } catch (e) {
                }
            }
        }

        var script = document.createElement('script');
        script.appendChild(document.createTextNode('(' + addMaxTextDataAttributes + ')();'));
        (document.body || document.head || document.documentElement).appendChild(script);

        //--------------------------------------------------------------------------------------------
        //helper functions

        //random hidden option value
        function randomString() {
            return Math.random().toString(36).substring(15);
        }

        //configuration for radio button clone
        function setupRadioClone(clone) {
            clone.attr("aria-hidden", "true")
            clone.find(".appsMaterialWizToggleRadiogroupEl")
                .attr("label", "Hidden Option")
                .attr("data-value", randomString())
            clone.find(".appsMaterialWizToggleRadiogroupEl").removeClass("isChecked")
            clone.hide()
        }

        //check if a question is required
        function isRequired(element) {
            var parent = $(element).closest(".freebirdFormviewerViewItemsItemItem")
            var required = parent.find(".freebirdFormviewerViewItemsItemRequiredAsterisk").length != 0
            return required

        }

        function isDarkMode() {
            return (
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            );
        }

        //dark theme init
        $(".freebirdFormviewerViewFormContentWrapper").append(`
            <a class="google-improvements-float">
                <div class="google-improvements-moon-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24"
                    viewBox="-6 -6 12 12">
                    <defs>
                        <mask id="a">
                            <rect width="10" height="10" x="-5" y="-5" fill="#ffffff"/>
                            <circle cx="3" r="5"/>
                        </mask>
                    </defs>
                    <circle r="5" fill="currentColor" mask="url(#a)" transform="rotate(-23)"/>
                    </svg>
                </div>
            </a>`)

        if(isDarkMode()){
            $("html").addClass("google-improvements-dark-theme")
        }
        $(".google-improvements-float").click(function () {
            $("html").toggleClass("google-improvements-dark-theme")
        })

        //--------------------------------------------------------------------------------------------
        //config for different items

        //radio button select config
        $(".freebirdFormviewerViewItemsRadioChoicesContainer").each(function () {
            //clone last option to create hidden element
            var clone = $(this).children().last().clone().appendTo(this)
            setupRadioClone(clone)

            //add a eliminate button to each option
            $(this).find(".freebirdFormviewerViewItemsRadioOptionContainer").each(function () {
                $(this).append("<a class='google-improvements-x-button'></a>")
            })

        })

        //configuration for checkboxes
        $(".freebirdFormviewerViewItemsCheckboxOptionContainer").each(function () {
            //add a eliminate button to each option
            $(this).find(".freebirdFormviewerViewItemsCheckboxChoice").each(function () {
                $(this).append("<a class='google-improvements-x-button'></a>")
            })

        })

        //scale item config
        $(".freebirdFormviewerViewItemsRadiogroupRadioGroup").each(function () {
            var lastElement = $(this).find("label.freebirdMaterialScalecontentColumn").last()
            var clone = lastElement.clone().appendTo(lastElement.parent())
            setupRadioClone(clone)
        })

        //radio grid config
        $(".freebirdFormviewerViewItemsGridContainer").each(function () {
            $(this).find("span.appsMaterialWizToggleRadiogroupGroupContent").each(function () {
                var lastElement = $(this).children(".freebirdFormviewerViewItemsGridCell").last()
                var clone = lastElement.clone().appendTo(this)
                setupRadioClone(clone)
            })
        })

        //--------------------------------------------------------------------------------------------
        //radio click handlers

        //radio select item
        $(".freebirdFormviewerViewItemsRadioChoicesContainer .freebirdThemedRadio").click(function () {
            var allOptions = $(this).closest(".freebirdFormviewerViewItemsRadioChoicesContainer").children()

            if (!isRequired(this)) {
                //if radio is already checked...
                if ($(this).children().hasClass("isChecked")) {
                    //...select the hidden option instead
                    allOptions.last().children("label").click()
                }
            }
        })

        //radio grid item
        $(".freebirdFormviewerViewItemsGridContainer .freebirdThemedRadio").click(function () {
            var allOptions = $(this).closest(".appsMaterialWizToggleRadiogroupGroupContent").children(".freebirdFormviewerViewItemsGridCell")

            if (!isRequired(this)) {
                //if radio is already checked...
                if ($(this).children().hasClass("isChecked")) {
                    //...select the hidden option instead
                    allOptions.last().find(".appsMaterialWizToggleRadiogroupEl").click()
                }
            }
        })

        //scale item
        $(".freebirdFormviewerViewItemsRadiogroupRadioGroup .freebirdThemedRadio").click(function () {
            var allOptions = $(this).closest(".freebirdMaterialScalecontentContainer").children("label")

            if (!isRequired(this)) {
                //if radio is already checked...
                if ($(this).children().hasClass("isChecked")) {
                    //...select the hidden option instead
                    allOptions.last().click()
                }
            }
        })
        //--------------------------------------------------------------------------------------------
        //x-button

        //eliminate option on x-button click
        $(".google-improvements-x-button").click(eliminateOption)

        function eliminateOption() {
            var parent = $(this).parent()

            //if already eliminated, undo
            //else eliminate
            if (parent.attr("data-disabled") == "true") {
                //enable clicks to button
                parent.children("label").removeClass("google-improvements-no-click")

                parent.removeClass("google-improvements-disabled-option")
                parent.attr("data-disabled", "false")

            } else {
                //disable clicks to button
                parent.children("label").addClass("google-improvements-no-click")

                parent.addClass("google-improvements-disabled-option")
                parent.attr("data-disabled", "true")
            }

        }

        //--------------------------------------------------------------------------------------------
        // text counters

        //add text counters
        $(".freebirdFormviewerViewItemsTextTextItem").find(".freebirdFormviewerViewItemsTextLongText, .freebirdFormviewerViewItemsTextShortText").after(
            `<div class="google-improvements-text-counter-container">             
                <div class="google-improvements-text-counter">0</div>
            </div>`
        )

        //on text change update counters
        $(".quantumWizTextinputPapertextareaInput, .quantumWizTextinputPaperinputInput").on("change keyup paste keydown load oninput", function () {
            var parent = $(this).closest(".freebirdFormviewerViewItemsTextTextItem")
            var maxChars = parent.attr('data-text-max');
            var minChars = parent.attr('data-text-min');
            var currentVal = $(this).val()

            var counter = parent.find(".google-improvements-text-counter")

            //if max chars display current/total
            if (maxChars) {
                counter.text($(this).val().length + " / " + maxChars)
                    .css("color", maxChars < $(this).val().length ? "#d93025" : "")
                //if min chars display current-min
            } else if (minChars) {
                counter.text($(this).val().length - minChars)
                    .css("color", ($(this).val().length) - minChars < 0 ? "#d93025" : "")
                //else just show plain character count
            } else {
                counter.text(currentVal.length)
            }

        })

        //Force text counters to update on load
        var elems = document.querySelectorAll(".quantumWizTextinputPapertextareaInput, .quantumWizTextinputPaperinputInput")
        var event = new Event('change');  // (*)
        for (var i = 0; i < elems.length; i++) {
            elems[i].dispatchEvent(event);
        }

    }
});
