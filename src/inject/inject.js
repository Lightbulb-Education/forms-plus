// import "../../js/jquery/jquery";

chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            // ----------------------------------------------------------
            // This part of the script triggers when page is done loading
            console.log("Hello. This message was ssfdent from scripts/inject.js");
            // ----------------------------------------------------------

            /* Adding the script tag to the head as suggested before */
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "https://code.jquery.com/jquery-2.2.1.min.js";

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            script.onreadystatechange = handler;
            script.onload = handler;

            // Fire the loading
            head.appendChild(script);

            function handler() {
                console.log('jquery added :)');
                $(document).ready(function () {
                    //radio
                    $(".freebirdFormviewerViewItemsRadioChoicesContainer").each(function () {
                        var clone = $(this).children().last().clone().appendTo(this)
                        clone.attr("aria-hidden", "true")
                        clone.find(".appsMaterialWizToggleRadiogroupEl")
                            .attr("label", "Hidden Option")
                            .attr("data-value", "sdfasdasdfasdf")
                        clone.hide()

                        console.log($(this).children().last())

                        $(this).find(".freebirdFormviewerViewItemsRadioOptionContainer").each(function () {

                            $(this).append("<button class='x-button'>✖</button>").addClass("relative-position")


                        })

                    })

                    //configuration for checkboxes
                    $(".freebirdFormviewerViewItemsCheckboxOptionContainer").each(function () {

                        $(this).find(".freebirdFormviewerViewItemsCheckboxChoice").each(function () {

                            $(this).append("<button class='x-button'>✖</button>").addClass("relative-position")

                        })

                    })


                    $(".freebirdThemedRadio").click(function(){
                        var parent = $(this).children(".appsMaterialWizToggleRadiogroupEl")

                        if($(this).children().hasClass("isChecked")) {

                            $(this).closest(".freebirdFormviewerViewItemsRadioChoicesContainer")
                                .children().last().children("label").click()

                        }
                    })

                    $(".x-button").click(disableOption)

                    function disableOption() {
                        //var parent = $(this).closest(".freebirdFormviewerViewItemsRadioOptionContainer")
                        var parent = $(this).parent()

                        if (parent.attr("data-disabled") == "true") {
                            parent.unbind('click');
                            parent.removeClass("disabled-option")
                            parent.attr("data-disabled", "false")
                        } else {
                            parent.bind('click', function () {
                                return false;
                            });

                            parent.addClass("disabled-option")
                            parent.attr("data-disabled", "true")
                        }


                    }
                });


            }

        }
    }, 10);
});