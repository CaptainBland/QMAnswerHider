// ==UserScript==
//
//Displayable Name of your script 
// @name           QMPlus answer remover
//
// brief description
// @description    Removes answers from QMPlus MCQs
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://indevelopment.biz
//
// @author         Jaron Shulver
//
// @license        Use it, abuse it, whatever. Just don't sue me for it.
//
//(optional) may be used by browsers to display an about link
//Version Number
// @version        1.0
//
// Urls process this user script on
// @include        http://*qmplus*/quiz/review*
// @include 	   https://*qmplus*/quiz/review*


//
// ==/UserScript==


function enableAnswers() {
	var corrects = byClassName("correct");
	var spfeedback = byClassName("specificfeedback");
	var icon = byClassName("questioncorrectnessicon");
	var inputs = document.getElementsByTagName("input");
	var feedback = document.getElementsByClassName("feedback");

	for(i = 0; i<inputs.length; i++)
	{
		inputs[i].style.display="inline";
	}
	
	for(i = 0; i < spfeedback.length; i++) {
		spfeedback[i].style.display="block";
	}
	
	for(i = 0; i < icon.length; i++) {
		icon[i].style.display="inline";
	}
	
	for(i = 0; i < feedback.length; i++) {
		feedback[i].style.display="block";
	}
}

function byClassName(cn) {
	return document.getElementsByClassName(cn);
}



function disableAnswers() {
	//and here's what I could have won:
	//$(".correct").css("background color", "#ffffff");
	//$(".specificfeedback").css("display", "none");
	//$("input").css("display", "none");
	//$("questioncorrectnessicon").css("display", "none");
	
	//but noooo
	var corrects = byClassName("correct");
	var spfeedback = byClassName("specificfeedback");
	var icon = byClassName("questioncorrectnessicon");
	var inputs = document.getElementsByTagName("input");
	var feedback = document.getElementsByClassName("feedback");
	for(i = 0; i<inputs.length; i++)
	{
		inputs[i].style.display="none";
	}
	
	for(i = 0; i < spfeedback.length; i++) {
		spfeedback[i].style.display="none";
	}
	
	for(i = 0; i < corrects.length; i++) {
		corrects[i].style.background = "#ffffff";
	}
	
	for(i = 0; i < icon.length; i++) {
		icon[i].style.display="none";
	}
	
	for(i = 0; i < feedback.length; i++) {
		feedback[i].style.display="none";
	}
	
}

function injectScript(fstring)
{
	var inject = document.createElement("script");
	inject.setAttribute("type", "text/javascript");
	inject.appendChild(document.createTextNode(fstring));
	return inject;
}

function init() {
	//inject the functions for use from the page
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(injectScript(byClassName.toString()));
	head.appendChild(injectScript(disableAnswers.toString()));
	head.appendChild(injectScript(enableAnswers.toString()));
	
	//stick in some buttons
	var qtext = byClassName("qtext")[0];
	qtext.innerHTML += "<button onclick='disableAnswers()'>Hide answers</button>";
	qtext.innerHTML += "<button onclick='enableAnswers()'>Show answers</button>";

	
}

init();
disableAnswers();