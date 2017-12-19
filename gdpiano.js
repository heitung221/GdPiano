	
$(document).ready(function(){
	
	var currentVersion = "1.12";
	
	//Generate the texts
	var textsPart1 = "<p> Welcome to GdPiano, a simple and fun music instrument played with relative pitch.<br></p><p id=\"tutorial\">Instruction: Press A to play Do, press S to play Re, press D to play Mi, and etc. Press Shift + A to play the key between Do and Re, press Shift + S to play the key between Re and Mi, and etc. You can always play middle C by pressing LCtrl.</p><p id=\"tutorial2\">Use Piano-like Layout Mode to enjoy playing chords!</p>";

	
	var textsPart2 = "<span id=\"textOfSelectKey\">Select Key:</span>&nbsp;<select id=\"selectKey\"><option id = \"Key0\" value = 0>C Major / A Minor</option><option id = \"Key1\" value = 1>C# Major / A# Minor</option><option id = \"Key2\" value = 2>D Major / B Minor</option><option id = \"Key3\" value = 3>D# Major / C Minor</option><option id = \"Key4\" value = 4>E Major / C# Minor</option><option id = \"Key5\" value = 5>F Major / D Minor</option><option id = \"Key6\" value = 6>F# Major / D# Minor</option><option id = \"Key7\" value = 7>G Major / E Minor</option><option id = \"Key8\" value = 8>G# Major / F Minor</option><option id = \"Key9\" value = 9>A Major / F# Minor</option><option id = \"Key10\" value = 10>A# Major / G Minor</option><option id = \"Key11\" value = 11>B Major / G# Minor</option></select>&emsp;<span id=\"selecyKeyLayout\">Select Keyboard Layout:</span>&nbsp;<select id=\"selectTone\"><option id = \"Tone1\" value = 1>Middle Tone Range</option><option id = \"Tone2\" value = 2>High Tone Range</option><option id = \"Tone3\" value = 3>Low Tone Range</option><option id = \"PLM\" value = 4>Piano-like Layout</option></select><br><br><button class = \"button-outline\" id=\"showKeyButton\">Show Keys Layout</button><br><button class=\"button-low\" id = \"kb0\" value = 0>Do</button><button class=\"button-lowi\" id = \"kb1\" value = 1>Di</button><button class=\"button-low\" id = \"kb2\" value = 2>Re</button><button class=\"button-lowi\" id = \"kb3\" value = 3>Ri</button><button class=\"button-low\" id = \"kb4\" value = 4>Mi</button><button class=\"button-low\" id = \"kb5\" value = 5>Fa</button><button class=\"button-lowi\" id = \"kb6\" value = 6>Fi</button><button class=\"button-low\" id = \"kb7\" value = 7>So</button><button class=\"button-lowi\" id = \"kb8\" value = 8>Si</button><button class=\"button-low\" id = \"kb9\" value = 9>La</button><button class=\"button-lowi\" id = \"kb10\" value = 10>Li</button><button class=\"button-low\"  id = \"kb11\" value = 11>Ti</button><br><button class=\"button-mid\" id = \"kb12\" value = 12>Do</button><button class=\"button-midi\" id = \"kb13\" value = 13>Di</button><button class=\"button-mid\" id = \"kb14\" value = 14>Re</button><button class=\"button-midi\" id = \"kb15\" value = 15>Ri</button><button class=\"button-mid\" id = \"kb16\" value = 16>Mi</button><button class=\"button-mid\" id = \"kb17\" value = 17>Fa</button><button class=\"button-midi\" id = \"kb18\" value = 18>Fi</button><button class=\"button-mid\" id = \"kb19\" value = 19>So</button><button class=\"button-midi\" id = \"kb20\" value = 20>Si</button><button class=\"button-mid\" id = \"kb21\" value = 21>La</button><button class=\"button-midi\" id = \"kb22\" value = 22>Li</button><button class=\"button-mid\" id = \"kb23\" value = 23>Ti</button><br><button class=\"button-high\" id = \"kb24\" value = 24>Do</button><button class=\"button-highi\" id = \"kb25\" value = 25>Di</button><button class=\"button-high\" id = \"kb26\" value = 26>Re</button><button class=\"button-highi\" id = \"kb27\" value = 27>Ri</button><button class=\"button-high\" id = \"kb28\" value = 28>Mi</button><button class=\"button-high\" id = \"kb29\" value = 29>Fa</button><button class=\"button-highi\" id = \"kb30\" value = 30>Fi</button><button class=\"button-high\" id = \"kb31\" value = 31>So</button><button class=\"button-highi\" id = \"kb32\" value = 32>Si</button><button class=\"button-high\" id = \"kb33\" value = 33>La</button><button class=\"button-highi\" id = \"kb34\" value = 34>Li</button><button class=\"button-high\" id = \"kb35\" value = 35>Ti</button><br><br><br>"
	
	var textsPart3 = "<p id=\"note\">Note: The chord names and symbols are used in popular music, which may be different in classical music. <p><br><br><br><br><br><span id = \"easterEgg\">Easter egg:</span>&nbsp;<select id=\"selectMode\"><option value = \"NormalMode\">Normal Mode</option><option value = \"JyutKukMode\">粵曲模式</option></select><br><span id=\"version\">GdPiano ver. "
	textsPart3 += currentVersion;
	textsPart3 += "</span>";
	
	$("#contentPart1").html(textsPart1);
	$("#contentPart2").html(textsPart2);
	$("#contentPart3").html(textsPart3);
	//End of Generate the texts
	
	
	

	var isKeyLayoutShown = false;
	var keyEnabledArray = Array(222).fill(true);

	
	
	var solFaName = ["Do","Di","Re","Ri","Mi","Fa","Fi","Sol","Si","La","Li","Ti","Do","Di","Re","Ri","Mi","Fa","Fi","Sol","Si","La","Li","Ti","Do","Di","Re","Ri","Mi","Fa","Fi","Sol","Si","La","Li","Ti"];
	
	var keyPiano = ["a","w","s","e","d","f","t","g","y","h","u","j","k","o","l","p",";","\'"];
	
	var chord = chords; //read from chord.jsonp ref:https://stackoverflow.com/questions/6711002
	
	var whichInstrument = instruments;
	
	$(document).keydown(keyPush);
	$("#selectKey").change(keyPush);
	$("#selectTone").change(keyPush);	
	$("#selectTone").change(showLayout);
	$("#selectMode").change(keyPush);
	
	
	document.onkeydown = keyPush;
	
	document.onkeyup = function(evt){
		// enable the specific key on keyup
		keyEnabledArray[evt.keyCode] = true;
		}; 
	
	//Initial Play Once
	for (var i = 0; i < sources.length; i++){
		var initialPlay = new Audio(sources[i]);
		initialPlay.volume = 0;
		initialPlay.play();
	}
	
	//Instrument Selection
		
	var selectInstrumentFragment = "Select Instrument: <select id = \"changeInstrumentSelection\">";
	for (var i = 0; i < whichInstrument.length; i++){
		selectInstrumentFragment += "<option value = \"" + whichInstrument[i].value + "\">" + whichInstrument[i].name + "</option>";
	}
	selectInstrumentFragment += "</select>&nbsp;<button class = \"button-outline\" id = \"changeInstrumentButton\">Go</button><br>";
	$("#changeInstrument").html(selectInstrumentFragment);
	
	//Change Instrument Button Setting
	$("#changeInstrumentButton").click(function(){
	
		var selectWhichInstrument = $("#changeInstrumentSelection").val();
		console.log(selectWhichInstrument);
		location.href = selectWhichInstrument + ".html";
	});
	
	
	//Key Buttons Things
	$("#showKeyButton").click(showLayout);
	
	function showLayout(evt) {
		var selectTone = $("#selectTone").val();
		var Layout = Number(selectTone);
		if (evt.type == "click") {
			if (isKeyLayoutShown == false) {
			isKeyLayoutShown = true;
			}
			else {
			isKeyLayoutShown = false;
			}
		}
		console.log(Layout);
		
			if (isKeyLayoutShown == true) {
				if (Layout == 1 || Layout == 2 || Layout == 3){
					$("#kb0").text("q");
					$("#kb1").text("Q");
					$("#kb2").text("w");
					$("#kb3").text("W");
					$("#kb4").text("e");
					$("#kb5").text("r");
					$("#kb6").text("R");
					$("#kb7").text("t");
					$("#kb8").text("T");
					$("#kb9").text("y");
					$("#kb10").text("Y");
					$("#kb11").text("u");
					$("#kb12").text("a");
					$("#kb13").text("A");
					$("#kb14").text("s");
					$("#kb15").text("S");
					$("#kb16").text("d");
					$("#kb17").text("f");
					$("#kb18").text("F");
					$("#kb19").text("g");
					$("#kb20").text("G");
					$("#kb21").text("h");
					$("#kb22").text("H");
					$("#kb23").text("j");
					$("#kb24").text("z");
					$("#kb25").text("Z");
					$("#kb26").text("x");
					$("#kb27").text("X");
					$("#kb28").text("c");
					$("#kb29").text("v");
					$("#kb30").text("V");
					$("#kb31").text("b");
					$("#kb32").text("B");
					$("#kb33").text("n");
					$("#kb34").text("N");
					$("#kb35").text("m");
				}
				if (Layout == 4){
					$("#kb0").text("Do");
					$("#kb1").text("Di");
					$("#kb2").text("Re");
					$("#kb3").text("Ri");
					$("#kb4").text("Mi");
					$("#kb5").text("Fa");
					$("#kb6").text("Fi");
					$("#kb7").text("So");
					$("#kb8").text("Si");
					$("#kb9").text("La");
					$("#kb10").text("Li");
					$("#kb11").text("Ti");
					$("#kb12").text("a");
					$("#kb13").text("w");
					$("#kb14").text("s");
					$("#kb15").text("e");
					$("#kb16").text("d");
					$("#kb17").text("f");
					$("#kb18").text("t");
					$("#kb19").text("g");
					$("#kb20").text("y");
					$("#kb21").text("h");
					$("#kb22").text("u");
					$("#kb23").text("j");
					$("#kb24").text("k");
					$("#kb25").text("o");
					$("#kb26").text("l");
					$("#kb27").text("p");
					$("#kb28").text(";");
					$("#kb29").text("'");
					$("#kb30").text("Fi");
					$("#kb31").text("So");
					$("#kb32").text("Si");
					$("#kb33").text("La");
					$("#kb34").text("Li");
					$("#kb35").text("Ti");
				}
				$("#showKeyButton").text("Hide Keys Layout");
			}
			else {
				$("#kb0").text("Do");
				$("#kb1").text("Di");
				$("#kb2").text("Re");
				$("#kb3").text("Ri");
				$("#kb4").text("Mi");
				$("#kb5").text("Fa");
				$("#kb6").text("Fi");
				$("#kb7").text("So");
				$("#kb8").text("Si");
				$("#kb9").text("La");
				$("#kb10").text("Li");
				$("#kb11").text("Ti");
				$("#kb12").text("Do");
				$("#kb13").text("Di");
				$("#kb14").text("Re");
				$("#kb15").text("Ri");
				$("#kb16").text("Mi");
				$("#kb17").text("Fa");
				$("#kb18").text("Fi");
				$("#kb19").text("So");
				$("#kb20").text("Si");
				$("#kb21").text("La");
				$("#kb22").text("Li");
				$("#kb23").text("Ti");
				$("#kb24").text("Do");
				$("#kb25").text("Di");
				$("#kb26").text("Re");
				$("#kb27").text("Ri");
				$("#kb28").text("Mi");
				$("#kb29").text("Fa");
				$("#kb30").text("Fi");
				$("#kb31").text("So");
				$("#kb32").text("Si");
				$("#kb33").text("La");
				$("#kb34").text("Li");
				$("#kb35").text("Ti");
				$("#showKeyButton").text("Show Keys Layout");
			}	
	}
	
	//Chord Button
	$("#chordButton").click(function(){
		
		var showChordTutorial = document.getElementById("chordTutorial");
		if (showChordTutorial.style.display === "block") {
			showChordTutorial.style.display = "none";
			$("#chordButton").text("Show Chords Table");
			
			} 
		else {
		showChordTutorial.style.display = "block";
		$("#chordButton").text("Hide Chords Table");
		}
	});
	
	//Initial Chord Tutorial
	var chordContent = document.getElementById("chordTutorial");
	var chordContentFragments;
	
	chordContentFragments = "<table><thead><tr><th>Chord</th><th>Notation</th><th>Pitchs</th><th>Piano-like Layout</th><th>Root Position</th><th>First Inversion</th><th>Second Inversion</th><th>Third Inversion</th></tr></thead><tbody>";
	for (var i = 0; i < chord.length; i++){
			chordContentFragments += "<tr><td>" + chord[i].name + "</td><td>" + chord[i].notation + "</td>";
			chordContentFragments += "<td>";
				for (var j = 0; j < chord[i].pitchNo.length - 1; j++){
					chordContentFragments += solFaName[chord[i].pitchNo[j]] + ", ";	
					}
				chordContentFragments += solFaName[chord[i].pitchNo[chord[i].pitchNo.length - 1]];
				chordContentFragments += "</td><td>";
				
				var isKeyNA = false;
				for (var j = 0; j < chord[i].pitchNo.length; j++){
					if (keyPiano[chord[i].pitchNo[j]] == undefined) {
						isKeyNA = true;
						}
				}
				
				if (isKeyNA == false){
					for (var j = 0; j < chord[i].pitchNo.length - 1; j++){
						chordContentFragments += keyPiano[chord[i].pitchNo[j]] + " + ";
						}
					chordContentFragments += keyPiano[chord[i].pitchNo[chord[i].pitchNo.length - 1]];
				}
				else {
					chordContentFragments += "N/A";
				}
			
			chordContentFragments += "</td>";
			//chordContentFragments += "<td><button class = \"playChord\" value = " + i + ">Play</button></td>";
			
			for (j = 0; j < 4; j++){
				if (chord[i].pitchNo[j] != undefined) {
					var chordId = i + j * 1000 + 1000;
					chordContentFragments += "<td><button class = \"playChord\" value = " + chordId + ">Play</button></td>";
					}
				else {
					chordContentFragments += "<td>N/A</td>";
					}
				}
			
			chordContentFragments += "</tr>";
			}
		chordContentFragments += "</tbody></table>";
		chordContent.innerHTML = chordContentFragments;
	//End of Initial Chord Tutorial
	
	$(".playChord").click(keyPush);
	
	$(".button-low").click(keyPush);
	$(".button-lowi").click(keyPush);
	$(".button-mid").click(keyPush);
	$(".button-midi").click(keyPush);
	$(".button-high").click(keyPush);
	$(".button-highi").click(keyPush);
	
	function keyPush(evt){
	
		var selectkey = $("#selectKey").val();
		var key = Number(selectkey);
		var selectTone = $("#selectTone").val();
		var Layout = Number(selectTone);
		var selectmode = $("#selectMode").val();
		$(this).blur();
		//Description
		if (Layout == 1 || Layout == 2 || Layout == 3){
			$("#tutorial").text("Instruction: Press A to play Do, press S to play Re, press D to play Mi, and etc. Press Shift + A to play the key between Do and Re, press Shift + S to play the key between Re and Mi, and etc. You can always play middle C by pressing LCtrl.");
			}
		else if (Layout == 4){
			$("#tutorial").text("Instruction: A is Do, S is Re, D is Mi, F is Fa, G is So, and etc. W is the key between Do and Re (Di), E is the key between Re and Mi (Ri), and etc.");
			}
		else if (Layout == 5){
			$("#tutorial").text("Instruction: A is La, S is Ti, D is Do, F is Re, G is Mi, and etc. W is the key between La and Ti (Li), R is the key between Do and Re (Di), T is the key between Re and Mi (Ri) , and etc.");
			}
			
		//Mode related changes	
		if (selectmode == "NormalMode"){
			$("#textOfSelectKey").text("Select Key:");
			$("#Key0").text("C Major / A Minor");
			$("#Key5").text("F Major / D Minor");
			$("#Key7").text("G Major / E Minor");
			$("#Key8").text("G# Major / F Minor");
			$("#Key10").text("A# Major / G Minor");	
		}
		if (selectmode == "JyutKukMode"){
			$("#textOfSelectKey").text("調式：");
			$("#Key0").text("正線 / 合尺線");
			$("#Key5").text("尺五線");
			$("#Key7").text("反線 / 上六線");
			$("#Key8").text("乙反線");
			$("#Key10").text("士工線");
		}
		
		//Assign key and tone
		if (Layout == 1 || Layout == 4 || Layout == 5 || Layout == 11){
					Dol = key + 13 - 1;
				}
			
		if (Layout == 2 || Layout == 12){
					Dol = key + 25 - 1;
				}
			
		if (Layout == 3 || Layout == 13){
					Dol = key + 1 - 1;
				}
		
		
				function play(inputNumber){
					var au = Dol + inputNumber;
					var sound = new Audio(sources[au]); //may need to change
					sound.play();
					if (selectmode == "NormalMode"){
						var solFaName = ["Do","Di","Re","Ri","Mi","Fa","Fi","Sol","Si","La","Li","Ti","Do","Di","Re","Ri","Mi","Fa","Fi","Sol","Si","La","Li","Ti","Do","Di","Re","Ri","Mi","Fa","Fi","Sol","Si","La","Li","Ti"];
						var playedAbsKey = ["C","C♯ / D♭","D","D♯ / E♭","E","F","F♯ / G♭","G","G♯ / A♭","A","A♯ / B♭","B","C","C♯ / D♭","D","D♯ / E♭","E","F","F♯ / G♭","G","G♯ / A♭","A","A♯ / B♭","B","C","C♯ / D♭","D","D♯ / E♭","E","F","F♯ / G♭","G","G♯ / A♭","A","A♯ / B♭","B","C","C♯ / D♭","D","D♯ / E♭","E","F","F♯ / G♭","G","G♯ / A♭","A","A♯ / B♭","B","C","C♯ / D♭","D","D♯ / E♭","E","F","F♯ / G♭","G","G♯ / A♭","A","A♯ / B♭","B","C"];
						}
					else if (selectmode == "JyutKukMode"){
						var solFaName = ["仩 saang3","Di","伬 ce1","Ri","仜 gung1","仮 faan1","Fi","合 ho4","Si","士 si6","Li","乙 ji6","上 saang3","Di","尺 ce1","Ri","工 gung1","反 faan1","Fi","六 liu1","Si","五 wu1","Li","彳乙 ji6","生 saang3","Di","彳尺 ce1","Ri","彳工 gung1","彳反 faan1","Fi","彳六 liu1","Si","彳五 wu1","Li","Ti"];
						var playedAbsKey = ["黃鐘","大呂","太簇","夾鐘","姑冼","仲呂","蕤賓","林鐘","夷則","南呂","無射","應鐘","黃鐘","大呂","太簇","夾鐘","姑冼","仲呂","蕤賓","林鐘","夷則","南呂","無射","應鐘","黃鐘","大呂","太簇","夾鐘","姑冼","仲呂","蕤賓","林鐘","夷則","南呂","無射","應鐘","黃鐘","大呂","太簇","夾鐘","姑冼","仲呂","蕤賓","林鐘","夷則","南呂","無射","應鐘","黃鐘","大呂","太簇","夾鐘","姑冼","仲呂","蕤賓","林鐘","夷則","南呂","無射","應鐘","黃鐘"];
						}
					if (evt.type != "click" || evt.type == "click" && chordToPlay < 36){
					$("#playedAbsoluteKey").html("<br>" + playedAbsKey[au]);
					$("#playedWhatKey").html(solFaName[inputNumber] + "<br>"+ "<br>");
						}
				}
			
			//start of pressing key
			// disable the key until key release
			//ref: https://stackoverflow.com/questions/6087959/
		if (keyEnabledArray[evt.keyCode]) {
			keyEnabledArray[evt.keyCode] = false;
			
			

			
			if (Layout == 1 || Layout == 2 || Layout == 3){
				if (evt.shiftKey == false){
					if (evt.keyCode == 81)	play(0);
					if (evt.keyCode == 87)	play(2);
					if (evt.keyCode == 69)	play(4);
					if (evt.keyCode == 82)	play(5);
					if (evt.keyCode == 84)	play(7);
					if (evt.keyCode == 89)	play(9);
					if (evt.keyCode == 85)	play(11);
					if (evt.keyCode == 65)	play(12);
					if (evt.keyCode == 83)	play(14);
					if (evt.keyCode == 68)	play(16);
					if (evt.keyCode == 70)	play(17);
					if (evt.keyCode == 71)	play(19);
					if (evt.keyCode == 72)	play(21);
					if (evt.keyCode == 74)	play(23);
					if (evt.keyCode == 90)	play(24);
					if (evt.keyCode == 88)	play(26);
					if (evt.keyCode == 67)	play(28);
					if (evt.keyCode == 86)	play(29);
					if (evt.keyCode == 66)	play(31);
					if (evt.keyCode == 78)	play(33);
					if (evt.keyCode == 77)	play(35);
					if (evt.keyCode == 17)	{
						var sound = new Audio("notes/C4.mp3");
						sound.play();
						}
					}
				else {
					if (evt.keyCode == 81)	play(1);
					if (evt.keyCode == 87)	play(3);
					if (evt.keyCode == 82)	play(6);
					if (evt.keyCode == 84)	play(8);
					if (evt.keyCode == 89)	play(10);
					if (evt.keyCode == 65)	play(13);
					if (evt.keyCode == 83)	play(15);
					if (evt.keyCode == 70)	play(18);
					if (evt.keyCode == 71)	play(20);
					if (evt.keyCode == 72)	play(22);
					if (evt.keyCode == 90)	play(25);
					if (evt.keyCode == 88)	play(27);
					if (evt.keyCode == 86)	play(30);
					if (evt.keyCode == 66)	play(32);
					if (evt.keyCode == 78)	play(34);
					if (evt.keyCode == 77)	play(36);
					}
					
				}
				
			else if (Layout == 4){
					if (evt.keyCode == 65)	play(12);
					if (evt.keyCode == 87)	play(13);
					if (evt.keyCode == 83)	play(14);
					if (evt.keyCode == 69)	play(15);
					if (evt.keyCode == 68)	play(16);
					if (evt.keyCode == 70)	play(17);
					if (evt.keyCode == 84)	play(18);
					if (evt.keyCode == 71)	play(19);
					if (evt.keyCode == 89)	play(20);
					if (evt.keyCode == 72)	play(21);
					if (evt.keyCode == 85)	play(22);
					if (evt.keyCode == 74)	play(23);
					if (evt.keyCode == 75)	play(24);
					if (evt.keyCode == 79)	play(25);
					if (evt.keyCode == 76)	play(26);
					if (evt.keyCode == 80)	play(27);
					if (evt.keyCode == 186)	play(28);
					if (evt.keyCode == 222)	play(29);
				}
			else if (Layout == 5){
					if (evt.keyCode == 65)	play(9);
					if (evt.keyCode == 87)	play(10);
					if (evt.keyCode == 83)	play(11);
					if (evt.keyCode == 68)	play(12);
					if (evt.keyCode == 82)	play(13);
					if (evt.keyCode == 70)	play(14);
					if (evt.keyCode == 84)	play(15);
					if (evt.keyCode == 71)	play(16);
					if (evt.keyCode == 72)	play(17);
					if (evt.keyCode == 85)	play(18);
					if (evt.keyCode == 74)	play(19);
					if (evt.keyCode == 73)	play(20);
					if (evt.keyCode == 75)	play(21);
					if (evt.keyCode == 79)	play(22);
					if (evt.keyCode == 76)	play(23);
					if (evt.keyCode == 186)	play(24);
					if (evt.keyCode == 219)	play(25);
					if (evt.keyCode == 222)	play(26);
				}
			}
			
		//end of pressing key
		
		
		//Play Sound by pressing button
		
		var chordToPlay = $(this).val();
		
		if (evt.type == "click"){
			
			noteToPlay = Number(chordToPlay);
			console.log(chordToPlay);
			
			//Play single note
			if (chordToPlay < 36){
				play(noteToPlay);
			}
			
			//Play The Chords
			if (chordToPlay > 999 && chordToPlay < 2000){
				var realChord = chordToPlay - 1000;
				for (var k = 0; k < chord[realChord].pitchNo.length; k++){
					play(chord[realChord].pitchNo[k] + 12);
					}
				}
			if (chordToPlay > 1999 && chordToPlay < 3000){
				var realChord = chordToPlay - 2000;
				play(chord[realChord].pitchNo[0] + 24);
				for (var k = 1; k < chord[realChord].pitchNo.length; k++){
					play(chord[realChord].pitchNo[k] + 12);
					}
				
				}
			if (chordToPlay > 2999 && chordToPlay < 4000){
				var realChord = chordToPlay - 3000;
				for (var k = 0; k < 2; k++){
					play(chord[realChord].pitchNo[k] + 24);
					}
				for (var k = 2; k < chord[realChord].pitchNo.length; k++){
					play(chord[realChord].pitchNo[k] + 12);
					}
				}
			if (chordToPlay > 3999 && chordToPlay < 5000){
				var realChord = chordToPlay - 4000;
				for (var k = 0; k < 3; k++){
					play(chord[realChord].pitchNo[k] + 24);
					}
				for (var k = 3; k < chord[realChord].pitchNo.length; k++){
					play(chord[realChord].pitchNo[k] + 12);
					}
				}
			}
		//End of Play Chord by pressing button
		};
	
	});