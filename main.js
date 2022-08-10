/*
Disable endTierDropdown when startTier is selected.
*/
const tier = [];
var totalXP;
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

