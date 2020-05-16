$(document).ready(function () {
    if (window.location.href.includes("https://docs.google.com/forms/d/e/")) {
        //configuration for radio buttons

        //random hidden option value
        var r = Math.random().toString(36).substring(15);

        $(".freebirdFormviewerViewItemsRadioChoicesContainer").each(function () {
            //clone last option to create hidden element
            var clone = $(this).children().last().clone().appendTo(this)
            clone.attr("aria-hidden", "true")
            clone.find(".appsMaterialWizToggleRadiogroupEl")
                .attr("label", "Hidden Option")
                .attr("data-value", r)
            clone.hide()

            //add a eliminate button to each option
            $(this).find(".freebirdFormviewerViewItemsRadioOptionContainer").each(function () {
                $(this).append("<a class='x-button'></a>")
            })

        })

        //configuration for checkboxes
        $(".freebirdFormviewerViewItemsCheckboxOptionContainer").each(function () {
            //add a eliminate button to each option
            $(this).find(".freebirdFormviewerViewItemsCheckboxChoice").each(function () {
                $(this).append("<a class='x-button'></a>")
            })

        })


        $(".freebirdThemedRadio").click(function () {
            var allOptions = $(this).closest(".freebirdFormviewerViewItemsRadioChoicesContainer").children()

            //if radio is already checked...
            if ($(this).children().hasClass("isChecked")) {
                //...select the hidden option instead
                allOptions.last().children("label").click()
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

        $(".freebirdFormviewerViewItemsTextTextItem .freebirdFormviewerViewItemsTextLongText").after(
            `<div class="mdc-text-field-helper-line" style="
                margin-left: 16px;
                margin-right: 16px;
                position: relative;
            ">
                    
                <div class="mdc-text-field-character-counter" style="
                    position: absolute;
                    right: 0px;
                    /* font-family: Roboto, sans-serif; */
                    -moz-osx-font-smoothing: grayscale;
                    /* -webkit-font-smoothing: antialiased; */
                    font-size: .75rem;
                    line-height: 1.25rem;
                    /* font-weight: 400; */
                    letter-spacing: .0333333333em;
                    /* text-decoration: inherit; */
                    /* text-transform: inherit; */
                    display: inline-block;
                    /* margin-top: 0; */
                    line-height: normal;
                    margin-left: auto;
                    margin-right: 0;
                    padding-left: 16px;
                    padding-right: 0;
                    white-space: nowrap;
                ">13 / 20</div>
            </div>`
        )
    }
});

