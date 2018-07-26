$(document).ready(function() {


    $('#fullpage').fullpage({
        anchors: ['#01', '#02', '#03'],
        navigation: true,
        licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
        afterLoad: function (origin, destination, direction) {

            fadeInEffect(1);
            fadeInEffect(2);
            fadeInEffect(3);

            function fadeInEffect(page) {
                if (destination.index == (page - 1)) {
                    $('#page-' + page + ' .content h5').animate({
                        opacity: 1
                    }, 700)

                    $('#page-' + page + ' .content p').animate({
                        opacity: 1
                    }, 1300)

                    $('#page-' + page + ' .content .more').animate({
                        opacity: 1
                    }, 1900)
                }
            }

        }
    });
});