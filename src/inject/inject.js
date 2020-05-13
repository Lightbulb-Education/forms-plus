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
                    $(".freebirdFormviewerViewItemsRadioChoicesContainer").each(function () {

                        $(this).find(".freebirdFormviewerViewItemsRadioOptionContainer").each(function () {

                            $(this).append("<button class='x-button'>✖</button>").addClass("relative-position")

                        })

                    })

                    $(".x-button").click(disableOption)

                    function disableOption() {
                        var parent = $(this).closest(".freebirdFormviewerViewItemsRadioOptionContainer")

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