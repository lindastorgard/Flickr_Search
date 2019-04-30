$(document).ready(function () {

    //Print images with tags auroraborealis as defaul
    printDefault();

    function printDefault() {
        // Prints recent images from flickerAPI
        var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?tags=auroraborealis&format=json&jsoncallback=?";

        $.getJSON(flickerAPI, {

        }, function (data) {

            console.log(data);

            var i = 0;
            $.each(data.items, function (key, value) {

                $("#images").addClass("galleryContainer flex");
                $("<img>").attr("src", value.media.m).attr("alt", value.title).attr('id', i).addClass("imageSetting").appendTo("#images");
                i++;

                $("#dialog").dialog({

                    width: "250",
                    autoOpen: false,
                    show: {
                        effect: "fade",
                        duration: 250
                    },
                    hide: {
                        effect: "fade",
                        duration: 250
                    }
                });
            });

            $("#images").on("click", function (e) {
                var pictureId = e.target.id;
                $("#dialog .dialogText").remove();
                $("#dialog img").remove();

                $("<div>").text(data.items[pictureId].title).addClass("dialogText").appendTo("#dialog");
                $("<img>").attr("src", data.items[pictureId].media.m).addClass("dialogImage").appendTo("#dialog");
                $("#dialog").dialog("open");
            });

        })
    }


    //Listens for keypress enter in input field - run delete and print functions
    $("#myInput").on("keypress", function (e) {
        if (e.which == 13) {
            removeImages();
            printImagesWithInput();
        }
    });


    //Listens for button click on Get images - run delete and print functions
    $("#buttonGetImage").on("click", function () {
        removeImages();
        printImagesWithInput();
    });


    //Deletes images
    function removeImages() {
        $("#images img").remove();
    }


    //Print images with input
    function printImagesWithInput() {

        var inputText = $.trim($("#myInput").val());
        var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?";

        $.getJSON(flickerAPI, {

            tags: inputText

        }, function (data) {

            console.log(inputText);
            console.log(data);

            if (data.items == 0) {
                alert("There are no pictures matching" + inputText + ". Try again.");
            }


            //Alert if user forgets to enter search word
            if (inputText == "") {
                alert("Oops! Enter a search word");
            } else {

                var i = 0;
                $.each(data.items, function (key, value) {

                    $("<img>").attr("src", value.media.m).attr("alt", value.title).attr('id', i).appendTo("#images");
                    i++;

                    //check if images has class flex - remove and add classes accordingly
                    if ($("#images").hasClass("flex")) {
                        $("#images").removeClass("galleryContainerFloat").addClass("galleryContainer");
                        $("img").removeClass("imageSettingFloat").addClass("imageSetting");
                    } else {
                        $("#images").removeClass("galleryContainer").addClass("galleryContainerFloat");
                        $("img").removeClass("imageSetting").addClass("imageSettingFloat");
                    }


                    $("#dialog").dialog({

                        width: "250",
                        autoOpen: false,
                        show: {
                            effect: "fade",
                            duration: 250
                        },
                        hide: {
                            effect: "fade",
                            duration: 250
                        }
                    });
                });

                $("#images").on("click", function (e) {
                    var pictureId = e.target.id;

                    $("#dialog .dialogText").remove();
                    $("#dialog img").remove();

                    $("<div>").text(data.items[pictureId].title).addClass("dialogText").appendTo("#dialog");
                    $("<img>").attr("src", data.items[pictureId].media.m).addClass("dialogImage").appendTo("#dialog");
                    $("#dialog").dialog("open");
                });
            }
        })
    }


    //Listen to Change view button - change text and toggle classes
    $("#buttonChangeView").on("click", function () {

        //Change button text
        $(this).text(function (i, text) {
            return text === "Float gallery" ? "Flex gallery" : "Float gallery";
        })

        //Toggle between flex and float classes
        $("#images").toggleClass("galleryContainerFloat galleryContainer").toggleClass("float flex");
        $("img").toggleClass("imageSettingFloat imageSetting");
    });

});