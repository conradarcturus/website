/*
 * Alexander Conrad Nied's Homepage
 * Navigation Javascript Routines
 * Designed 2014-01-20
 *
 * Largely based off of Dan Grossman's website design at:
 * https://courses.cs.washington.edu/courses/cse373/13au/grossmanHomepage.js
 */

// global state
var navbar;
var body;
var currentSection;  // or "all" which is not actually a div
var allSections;   // set on-load for performance/convenience

// build and initialize the navbar
function installNavigation() {
    // precompute allSections
    navbar = getById("navbar");
    body = getById("body");
    allSections = getElementsByClassName(body, "section");
    currentSection = "all";
}

// invoked by onclick handlers in the navbar
function updateSection(section) {
    // If the section is empty, just make it be "all"
    if (section == "")
		section = "all";
    else // Otherwise, remove the hash in the section name
		section = section.replace('#','');

	// Hide old sections
    var toHide = currentSection == "all" ? allSections : getElementsByClassName(body, currentSection);
    for (var i = 0; i < toHide.length; ++i) {
        toHide[i].style.display = "none";
        console.log("hiding" + i);
        //toHide[i].innerHTML = "Hiding" + toString(i)  + "<br />";
    }

    // Unglow navigation elements
    var toHide = getElementsByClassName(navbar, currentSection);
    for (var i = 0; i < toHide.length; ++i) {
        // toHide[i].style.color = "#FFFFFF";
        // toHide[i].style.textShadow = "none";
        toHide[i].style.fontWeight = "normal";
    }

    // Load the new section
    currentSection = section;
    var toShow = currentSection == "all" ? allSections : getElementsByClassName(body, currentSection);
        console.log(toShow);
    for (var i = 0; i < toShow.length; ++i) {
        toShow[i].style.display = "block";
        // toShow[i].style.backgroundColor = "#AFAFAF";
        //toShow[i].innerHTML = "Showing" + toString(i) + "<br />";
    }

    // Glow navigation elements
    if(currentSection != "all") {
	    var toShow = getElementsByClassName(navbar, currentSection);
	    for (var i = 0; i < toShow.length; ++i) {
	        // toShow[i].style.color = "#AFAFFF";
            // Horizontal Length, Vertical Length, Radius, Shadow Colour
            // toShow[i].style.textShadow = "0px 0px 5px #0000FF";
            toShow[i].style.fontWeight = "bold";
        }
	}


    // toShow = getElementsByClassName(body, "Neurolingustics");
    // for (var i = 0; i < toShow.length; ++i) {
    //     var colord = toShow[i].style.backgroundColor;
    //     colord[0] = 0;
    //     toShow[i].innerHTML = colord;
    // }
    // toShow = getElementsByClassName(body, "Research");
    // for (var i = 0; i < toShow.length; ++i) {
    //     var colord = toShow[i].style.backgroundColor;
    //     //colord[3] = 'F';
    //     //toShow[i].style.backgroundColor = colord;
    // }
    // toShow = getElementsByClassName(body, "Publications");
    // for (var i = 0; i < toShow.length; ++i) {
    //     var colord = toShow[i].style.backgroundColor;
    //     //colord[5] = 'F';
    //     //toShow[i].style.backgroundColor = colord;
    // }
}

// really general utility routines
function classRegExp(c) {
    return new RegExp('\\b' + c + '\\b');
}
function getElementsByClassName(node, classname) {
    // TO DO: test both sides of if
    if (node.getElementsByClassName)
        return node.getElementsByClassName(classname);
    else {
        var retnode = [];
        var myclass = classRegExp(classname);
        var elem = node.getElementsByTagName('*');
        for (var i = 0; i < elem.length; i++) {
            var classes = elem[i].className;
            if (myclass.test(classes)) retnode.push(elem[i]);
        }
        return retnode;
    }
}
function getById(id) {
    return document.getElementById(id);
}
function addClass(node, c) {
    node.className += " " + c;
}
function removeClass(node, c) {
    node.className = node.className.replace(classRegExp(c),'');
}


// function open(focus) {

// 	var content_list = ["Biography", "Research"];
// 	var research_list = ["UserInterfaces", "DataVis", "MachineLearningAI", "Neurolingustics"];

	// // Sort out which elements are being focused on and whiched unfocused (blurred)
	// var all_divs     = getElementsByClassName("content");
	// var focused_divs = getElementsByClassName(focus, "content");
	// var blurred_divs = $(all_divs).not(focused_divs).get();

	// // Focus on proper elements
	// for (var i = 0; i < focused_divs.length; i++) {
	// 	focused_divs[i].style.color = "#00ff00";
	// 	//focused_divs[i].style.display = "";
	// }

	// // Blur the rest
	// for (var i = 0; i < blurred_divs.length; i++) {
	// 	focused_divs[i].style.color = "#ff0000";
	// 	//blurred_divs[i].style.display = "none";
	// }
// }