$(document).ready(function () {

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

    //random hidden option value
    function randomString(){
        return Math.random().toString(36).substring(15);
    }

    if (window.location.href.includes("https://docs.google.com/forms/d/e/")) {
        //configuration for radio buttons

        $(".freebirdFormviewerViewItemsRadioChoicesContainer").each(function () {
            //clone last option to create hidden element
            var clone = $(this).children().last().clone().appendTo(this)
            clone.attr("aria-hidden", "true")
            clone.find(".appsMaterialWizToggleRadiogroupEl")
                .attr("label", "Hidden Option")
                .attr("data-value",randomString())
            clone.find(".appsMaterialWizToggleRadiogroupEl").removeClass("isChecked")
            clone.hide()

            //add a eliminate button to each option
            $(this).find(".freebirdFormviewerViewItemsRadioOptionContainer").each(function () {
                $(this).append("<a class='x-button'></a>")
            })

        })

        $(".freebirdFormviewerViewItemsRadiogroupRadioGroup").each(function(){
            var lastElement = $(this).find("label.freebirdMaterialScalecontentColumn").last()
            var clone = lastElement.clone().appendTo(lastElement.parent())
            clone.attr("aria-hidden", true)
            clone.find(".appsMaterialWizToggleRadiogroupEl")
                .attr("label", "Hidden Option")
                .attr("data-value", randomString())
            clone.find(".appsMaterialWizToggleRadiogroupEl").removeClass("isChecked")
            clone.hide()
        })

        $(".freebirdFormviewerViewItemsGridContainer").each(function(){
            $(this).find("span.appsMaterialWizToggleRadiogroupGroupContent").each(function(){
                var lastElement = $(this).children(".freebirdFormviewerViewItemsGridCell").last()
                console.log(lastElement)
                var clone = lastElement.clone().appendTo(this)
                clone.attr("aria-hidden", true)
                clone.find(".appsMaterialWizToggleRadiogroupEl")
                    .attr("label", "Hidden Option")
                    .attr("data-value", randomString())
                clone.find(".appsMaterialWizToggleRadiogroupEl").removeClass("isChecked")
                clone.hide()
            })
        })

        //configuration for checkboxes
        $(".freebirdFormviewerViewItemsCheckboxOptionContainer").each(function () {
            //add a eliminate button to each option
            $(this).find(".freebirdFormviewerViewItemsCheckboxChoice").each(function () {
                $(this).append("<a class='x-button'></a>")
            })

        })


        $(".freebirdFormviewerViewItemsRadioChoicesContainer .freebirdThemedRadio").click(function () {
            var allOptions = $(this).closest(".freebirdFormviewerViewItemsRadioChoicesContainer").children()
            var parent = $(this).closest(".freebirdFormviewerViewItemsItemItem")
            var required = parent.find(".freebirdFormviewerViewItemsItemRequiredAsterisk").length != 0

            if (!required) {
                //if radio is already checked...
                if ($(this).children().hasClass("isChecked")) {
                    //...select the hidden option instead
                    allOptions.last().children("label").click()
                }
            }
        })

        $(".freebirdFormviewerViewItemsGridContainer .freebirdThemedRadio").click(function () {
            var allOptions = $(this).closest(".appsMaterialWizToggleRadiogroupGroupContent").children(".freebirdFormviewerViewItemsGridCell")
            var parent = $(this).closest(".freebirdFormviewerViewItemsItemItem")
            var required = parent.find(".freebirdFormviewerViewItemsItemRequiredAsterisk").length != 0

            if (!required) {
                //if radio is already checked...
                if ($(this).children().hasClass("isChecked")) {
                    //...select the hidden option instead
                    allOptions.last().find(".appsMaterialWizToggleRadiogroupEl").click()
                }
            }
        })


        $(".freebirdFormviewerViewItemsRadiogroupRadioGroup .freebirdThemedRadio").click(function () {
            var allOptions = $(this).closest(".freebirdMaterialScalecontentContainer").children("label")
            var parent = $(this).closest(".freebirdFormviewerViewItemsItemItem")
            var required = parent.find(".freebirdFormviewerViewItemsItemRequiredAsterisk").length != 0

            if (!required) {
                //if radio is already checked...
                if ($(this).children().hasClass("isChecked")) {
                    //...select the hidden option instead
                    allOptions.last().click()
                }
            }
        })


        //eliminate option on x-button click
        $(".x-button").click(eliminateOption)

        function eliminateOption() {
            var parent = $(this).parent()

            //if already eliminated, undo
            //else eliminate
            if (parent.attr("data-disabled") == "true") {
                //enable clicks to button
                parent.children("label").removeClass("no-click")

                parent.removeClass("disabled-option")
                parent.attr("data-disabled", "false")

            } else {
                //disable clicks to button
                parent.children("label").addClass("no-click")

                parent.addClass("disabled-option")
                parent.attr("data-disabled", "true")
            }

        }

        //Add text counters
        $(".freebirdFormviewerViewItemsTextTextItem").find(".freebirdFormviewerViewItemsTextLongText, .freebirdFormviewerViewItemsTextShortText").after(
            `<div class="text-counter-container">             
                <div class="text-counter">0</div>
            </div>`
        )

        //on text change update counters
        $(".quantumWizTextinputPapertextareaInput, .quantumWizTextinputPaperinputInput").on("change keyup paste keydown load oninput", function () {
            var parent = $(this).closest(".freebirdFormviewerViewItemsTextTextItem")
            var maxChars = parent.attr('data-text-max');
            var minChars = parent.attr('data-text-min');
            var currentVal = $(this).val()

            //if max chars display current/total
            if (maxChars) {
                parent.find(".text-counter")
                    .text($(this).val().length + " / " + maxChars)
                    .css("color", maxChars < $(this).val().length ? "#d93025" : "")
                //if min chars display current-min
            } else if (minChars) {
                parent.find(".text-counter")
                    .text($(this).val().length - minChars)
                    .css("color", ($(this).val().length) - minChars < 0 ? "#d93025" : "")
                //else just show plain character count
            } else {
                parent.find(".text-counter")
                    .text(currentVal.length)
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
