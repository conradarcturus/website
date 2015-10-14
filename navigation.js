/*
 * Alexander Conrad Nied's Homepage
 * Navigation Javascript Routines
 * Designed 2014-01-20, redesigned 2014-11-01
 * Overhauled to JSQuery 2015-07-05
 */

// build and initialize some parts
$(document).ready(installNavigation);
$(window).load(normalizeIconHeights);

function installNavigation() {
    //$(".iconlist div.row div")
    //    .addClass("project")
    //    .addClass("col-xs-6")
    //    .addClass("col-sm-4")
    //    .addClass("col-md-3");

    $(".iconlist img")
        .addClass("img-responsive")
        .addClass("center-block");

    // Load Modals
    $('#modals').load('modals.html', function() {
        $('#modals div.modal-body a').attr("target", "_blank");
    });
}

function normalizeIconHeights() {
    equal_cols(".iconlist div.row div");
}

function equal_cols(el) {
    var h = 0;
    $(el).each(function(){
        $(this).css({'height':'auto'});
        if($(this).outerHeight() > h)
        {
            h = $(this).outerHeight();
        }
        $(this).css({'height':h});
    });
}

function setResearchFocus(focus) {
    // Set area to active
    $('#research_navbar li.active').removeClass("active");
    $('#research_navbar li.Res' + focus).addClass("active");

    // Grow/Shrink research areas In/Out of focus
    var turnOn = $('#projects .ResOff.Res' + focus);
    var turnOff = $('#projects .Res:not(.ResOff):not(.Res' + focus + ')');

    turnOn.animate({
        padding: "15px",
        opacity: 1.0,
        fontSize: "1em",
        width: "toggle"
    }, 2000);
    turnOff.animate({
        padding: "0px",
        opacity: 0.25,
        fontSize: "0em",
        width: "toggle"
    }, 2000);

    // Keep track of what was changed.
    turnOn.addClass('ResOn').removeClass('ResOff');
    turnOff.addClass('ResOff').removeClass('ResOn');
}
