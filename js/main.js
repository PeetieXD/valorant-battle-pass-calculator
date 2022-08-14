/*
Disable endTierDropdown when startTier is selected.
*/
const tier = [];
var totalXP;

var tutorialPagenumber = 1;
const tutorialImageSRC = [
	"images/VBPCStep1.png",
	"images/VBPCStep2.png",
	"images/VBPCStep3.png"
];
const tutorialText = [
	"1: Enter the Battle Pass Tier that you are currently at.",
	"2: Enter the amount of XP of the Tier that you are currently at.",
	"3: Enter the tier goal that you want to reach for this season.",
	"4: Displays the amount of XP that is required for you to reach your goal.",
	"1: Checkbox, turn it on if you will be doing any dailies for said days.",
	"2: Enter the amount of days that you will be doing dailies for.",
	"3: Checkbox, turn it on if you own the Battle Pass.",
	"4: Confirm the settings above and the menu on the right side of the screen will update.",
	"1: This indicates how much XP you will have left, after substracting the dailies.",
	"2: This indicates how many games are required per gamemode. Extra info per gamemode is beneath itself.",
	"The top right seemed a little empty, here are some good videos. 8)",
	"Some extra information; checkbox off is white and red, checkbox on is blue and white."
];

window.onload = function(){
	for(i = 1; i <= 55; i++){
		if(i <= 50){
			tier[i] = 500 + (i*750);
			//console.log("Tier " + i + ": " + tier[i] + "XP.");
		}else{
			tier[i] = 36500;
			//console.log("Epilogue " + (i - 50) + ": " + tier[i] + "XP.");
		}
	}

	for(i = 1; i <= 55; i++){
		var tierOption = document.createElement("option");
		if(i <= 50){
			tierOption.text = "Tier " + i;
		}else{
			tierOption.text = "Epilogue " + (i - 50);
		}
		document.getElementById("startTierDropdown").appendChild(tierOption);
	}
	
	for(i = 1; i <= 55; i++){
		var tierOption = document.createElement("option");
		if(i <= 50){
			tierOption.text = "Tier " + i;
		}else{
			tierOption.text = "Epilogue " + (i - 50);
		}
		document.getElementById("endTierDropdown").appendChild(tierOption);
	}
	
	for(i = 1; i <= 69; i++){
		var dayOption = document.createElement("option");
		dayOption.text = i + " days.";
		document.getElementById("daysDropdown").appendChild(dayOption);
	}
	
	
	document.getElementById("tutorialVideo1").style.display = "none";
	document.getElementById("tutorialVideo2").style.display = "none";
	//document.getElementById("endTierDropdown").selectedIndex = 1;
	//document.getElementById("endTierDropdown")[0].disabled = true;
}

function changeSelected(changedElement){
	if(changedElement.id == "startTierDropdown"){
		document.getElementById("endTierDropdown").selectedIndex = changedElement.selectedIndex;
		for(i = 0; i <= 54; i++){
			document.getElementById("endTierDropdown")[i].disabled = false;
		}
		for(i = 0; i < changedElement.selectedIndex; i++){
			document.getElementById("endTierDropdown")[i].disabled = true;
		}
	}
	//console.log(changedElement);
}

function checkForNumbers(x){
	x.value = x.value.replace(/\D/g, '');
	//console.log(x.value);
}

function calculateRequired(){
	totalXP = 0;
	
	var startTier = document.getElementById("startTierDropdown").value;
	if(startTier.includes("Tier")){
		startTier = startTier.replace("Tier", "");
		startTier = startTier.trim();
		console.log("Start Tier: " + startTier);
	}else if(startTier.includes("Epilogue")){
		startTier = startTier.replace("Epilogue", "");
		startTier = startTier.trim();
		startTier = Number(startTier) + 50;
		console.log("Start Tier: " + startTier);
	}
	
	var endTier = document.getElementById("endTierDropdown").value;
	if(endTier.includes("Tier")){
		endTier = endTier.replace("Tier", "");
		endTier = endTier.trim();
		console.log("End Tier: " + endTier);
	}else if(endTier.includes("Epilogue")){
		endTier = endTier.replace("Epilogue", "");
		endTier = endTier.trim();
		endTier = Number(endTier) + 50;
		console.log("End Tier: " + endTier);
	}
	
	for(i = startTier; i <= endTier; i++){
		totalXP += tier[i];
		//console.log("Tier " + i + ". XP: " + tier[i]);
	}
	var finalResult = (totalXP - document.getElementById("currentXP").value);
	document.getElementById("resultBox").innerHTML = "Requires: " + finalResult + " XP.";
}

function calculateXP(){
	totalXP = 0;
	
	var startTier = document.getElementById("startTierDropdown").value;
	if(startTier.includes("Tier")){
		startTier = startTier.replace("Tier", "");
		startTier = startTier.trim();
		console.log("Start Tier: " + startTier);
	}else if(startTier.includes("Epilogue")){
		startTier = startTier.replace("Epilogue", "");
		startTier = startTier.trim();
		startTier = Number(startTier) + 50;
		console.log("Start Tier: " + startTier);
	}
	
	var endTier = document.getElementById("endTierDropdown").value;
	if(endTier.includes("Tier")){
		endTier = endTier.replace("Tier", "");
		endTier = endTier.trim();
		console.log("End Tier: " + endTier);
	}else if(endTier.includes("Epilogue")){
		endTier = endTier.replace("Epilogue", "");
		endTier = endTier.trim();
		endTier = Number(endTier) + 50;
		console.log("End Tier: " + endTier);
	}
	
	for(i = startTier; i <= endTier; i++){
		totalXP += tier[i];
		//console.log("Tier " + i + ". XP: " + tier[i]);
	}
	var finalResult = (totalXP - document.getElementById("currentXP").value);
	document.getElementById("resultBox").innerHTML = "Requires: " + finalResult + " XP.";
	//console.log(finalResult + " XP Required.");
	//console.log(Math.ceil(finalResult / 1000) + " Spike Rush games required, at least.");
	var bpMultiplier = 1;
	if(document.getElementById("bpCheckbox").checked){
		bpMultiplier = 1.03;
	}else{
		bpMultiplier = 1;
	}
	
	var dailyXP = 0;
	if(document.getElementById("dailyQuests").checked){
		dailyXP = 4000;
	}else{
		dailyXP = 0;
	}
	
	document.getElementById("remainingXP").innerHTML = "Remaining XP after dailies: " + String(finalResult - (dailyXP * (document.getElementById("daysDropdown").selectedIndex + 1)));
	console.log(finalResult - (dailyXP * (document.getElementById("daysDropdown").selectedIndex + 1)));
	
	document.getElementById("gamesRequiredSpike").innerHTML = Math.ceil((finalResult - (dailyXP * (document.getElementById("daysDropdown").selectedIndex + 1))) / (1000 * bpMultiplier)) + " Spike Rush games required, at least.";
	document.getElementById("gamesRequiredRepli").innerHTML = Math.ceil((finalResult - (dailyXP * (document.getElementById("daysDropdown").selectedIndex + 1))) / (1900 * bpMultiplier)) + " Replication games required, at least.";
	document.getElementById("gamesRequiredEsca").innerHTML = Math.ceil((finalResult - (dailyXP * (document.getElementById("daysDropdown").selectedIndex + 1))) / (1000 * bpMultiplier)) + " Escalation games required, at least.";
}

function openTutorial(){
	document.getElementById("tutorialImage").src = tutorialImageSRC[0];
	document.getElementById("tutorialVideo1").pause();
	document.getElementById("tutorialVideo1").style.display = "none";
	document.getElementById("tutorialVideo2").src = "https://www.youtube.com/embed/sYJPOiManf0";
	document.getElementById("tutorialVideo2").style.display = "none";
	document.getElementById("tutorialText1").innerHTML = "1: Enter the Battle Pass Tier that you are currently at.";
	document.getElementById("tutorialText2").innerHTML = "2: Enter the amount of XP of the Tier that you are currently at.";
	document.getElementById("tutorialText3").innerHTML = "3: Enter the tier goal that you want to reach for this season.";
	document.getElementById("tutorialText4").innerHTML = "4: Displays the amount of XP that is required for you to reach your goal.";
	
	document.getElementById("closeTutorialBox").style.display = "";
	document.getElementById("tutorialBox").style.display = "";
	tutorialPagenumber = 1;
}

function tutorialNavigate(direction){
	if(direction == "left" && tutorialPagenumber > 1){
		if(tutorialPagenumber == 2){
			document.getElementById("tutorialImage").src = tutorialImageSRC[0];
			document.getElementById("tutorialVideo1").pause();
			document.getElementById("tutorialVideo1").style.display = "none";
			document.getElementById("tutorialText1").innerHTML = tutorialText[0];
			document.getElementById("tutorialText2").innerHTML = tutorialText[1];
			document.getElementById("tutorialText3").innerHTML = tutorialText[2];
			document.getElementById("tutorialText4").innerHTML = tutorialText[3];
			tutorialPagenumber = 1;
		}
		if(tutorialPagenumber == 3){
			document.getElementById("tutorialVideo2").src = "https://www.youtube.com/embed/sYJPOiManf0";
			document.getElementById("tutorialVideo2").style.display = "none";
			document.getElementById("tutorialVideo1").style.display = "";
			document.getElementById("tutorialImage").src = tutorialImageSRC[1];
			document.getElementById("tutorialText1").innerHTML = tutorialText[4];
			document.getElementById("tutorialText2").innerHTML = tutorialText[5];
			document.getElementById("tutorialText3").innerHTML = tutorialText[6];
			document.getElementById("tutorialText4").innerHTML = tutorialText[7];
			tutorialPagenumber = 2;
		}
	}
	
	// Make sure to write these down in the opposite order so 1 click 
	// doesn't cause it to go to the end.
	if(direction == "right" && tutorialPagenumber < 3){
		if(tutorialPagenumber == 2){
			document.getElementById("tutorialImage").src = tutorialImageSRC[2];
			document.getElementById("tutorialVideo1").pause();
			document.getElementById("tutorialVideo1").style.display = "none";
			document.getElementById("tutorialVideo2").style.display = "";
			document.getElementById("tutorialText1").innerHTML = tutorialText[8];
			document.getElementById("tutorialText2").innerHTML = tutorialText[9];
			document.getElementById("tutorialText3").innerHTML = tutorialText[10];
			document.getElementById("tutorialText4").innerHTML = tutorialText[11];
			tutorialPagenumber = 3;
		}
		if(tutorialPagenumber == 1){
			document.getElementById("tutorialImage").src = tutorialImageSRC[1];
			document.getElementById("tutorialVideo1").style.display = "";
			document.getElementById("tutorialText1").innerHTML = tutorialText[4];
			document.getElementById("tutorialText2").innerHTML = tutorialText[5];
			document.getElementById("tutorialText3").innerHTML = tutorialText[6];
			document.getElementById("tutorialText4").innerHTML = tutorialText[7];
			tutorialPagenumber = 2;
		}
	}
}

function closeTutorial(){
	document.getElementById("tutorialVideo1").pause();
	document.getElementById("tutorialVideo2").src = "https://www.youtube.com/embed/sYJPOiManf0";
	document.getElementById("closeTutorialBox").style.display = "none";
	document.getElementById("tutorialBox").style.display = "none";
}
