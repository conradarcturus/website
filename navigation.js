/*
 * Alexander Conrad Nied's Homepage
 * Navigation Javascript Routines
 * Designed 2014-01-20, redesigned 2014-11-01
 *
 * Forked off of Dan Grossman's website design at:
 * https://courses.cs.washington.edu/courses/cse373/13au/grossmanHomepage.js
 */

// global state
var navbar;
var body;
var projects;
var currentSection;  // or "all" which is not actually a div
var contents;
var curtain;
var reseachFocus;

// build and initialize the navbar
function installNavigation() {
    // precompute allSections
    navbar = getById("navbar");
    body = getById("body");
    projects = getById("projects");
    allSections = getElementsByClassName(body, "section");
    currentSection = "Main";

    contents = getElementsByClassName(body, "content");

    // Add functions to projects
    curtain = getById("curtain");
    // curtain.onClick(function() { updateSection(""); });
    curtain.onclick = function(event) {
        if(event.target.id == "curtain")
            toggleCurtain();
    };
    // descContainer = getById("descContainer");
    // descContainer.onclick = function() {};
    projectlinks = getElementsByClassName(body, "project");
    for(var iProject = 0; iProject < projectlinks.length; iProject++) {
        projectlinks[iProject].onclick = function() { toggleCurtain(); };
    }
    // projectlinks = getElementsByClassName(getById("potpourri"), "project");
    // for(var iProject = 0; iProject < projectlinks.length; iProject++) {
    //     projectlinks[iProject].onclick = function() { toggleCurtain(); };
    // }

    researchFocus = "Research"
}

function toggleCurtain() {
    if(hasClass(curtain, "on")) {
        removeClass(curtain, "on");
    } else {
        addClass(curtain, "on");
    }
}

// invoked by onclick handlers in the navbar
function updateSection(section) {
    // Find parameters
    // If the section is empty, just make it be "all"
    if (section == "")
        section = "Research";
    else if (section == "#AllResearch")
        section = "Research";
    else // Otherwise, remove the hash in the section name
		section = section.replace('#','');
    lastSection = currentSection;
    nextSection = section;
    currentSection = nextSection;
    isProject = nextSection.substring(nextSection.length - 4) == "Proj";
    isResearchType = nextSection.substring(nextSection.length - 8) == "Research";

    // Indicate the research focus
    if(isResearchType) {
        researchFocus = nextSection;

        researchNavBar = getById("research_navbar");
        researchLinks = getElementsByClassName(researchNavBar, "research_nav");
        for (var iLink = 0; iLink < researchLinks.length; iLink++) {
            researchLink = researchLinks[iLink];
            console.log(researchLink);
            if(hasClass(researchLink, researchFocus))
                researchLink.style.fontWeight = "bold";
            else
                researchLink.style.fontWeight = "normal";
        }

    	// Hide projects that aren't in the current research focus
        projectlinks = getElementsByClassName(projects, "project");
        for(var iProject = 0; iProject < projectlinks.length; iProject++) {
            project = projectlinks[iProject];
            if(hasClass(project, researchFocus))
                project.style.display = "inline-table";
            else
                project.style.display = "none";
        }
    }

    // Hide years that don't have a member of the current research focus
    years = getElementsByClassName(projects, "year");
    for(var iYear = 0; iYear < years.length; iYear++) {
        year = years[iYear];
        if(hasClass(year, researchFocus)) {
            year.style.display = "block";
            // year.style.height = 200px;
        } else {
            year.style.display = "none";
            // year.style.height = 0px;
        }
    }

    // Focus on a project description if indicated to do so
    if(isProject) {
        projectName = nextSection.substring(0, nextSection.length - 4);

        if(!hasClass(curtain, "on"))
            addClass(curtain, "on");

        // Find the description for the current class
        descriptions = getElementsByClassName(curtain, "description");
        for(var iDesc = 0; iDesc < descriptions.length; iDesc++) {
            if(hasClass(descriptions[iDesc], projectName))
                descriptions[iDesc].style.display = "block";
            else
                descriptions[iDesc].style.display = "none";
        }
    }
}

// really general utility routines
function classRegExp(c) {
    return new RegExp('\\b' + c + '\\b');
}
function hasClass(node, classname) {
    var retnode = [];
    var classtest = classRegExp(classname);
    return classtest.test(node.className);
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