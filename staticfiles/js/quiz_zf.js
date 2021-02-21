$('form.box').ready(function(){
	
	var total_qs;
	
	//initial creation of ul for words
	function next_qs(q) {
		for (i = 0; i < q; i++) {
			$('form.box > ul > li:first').clone().appendTo($('form.box > ul'));
		}
		
		total_qs = q + 1;
		
	}
	
	next_qs(9);
	
	//xml > words
	//$.ajax({
	//	type: "GET",
	//	url: "http://127.0.0.1:8000/static/js/quiz_zf_algorithms.json",
	//	dataType: "text",
	//	success: populator
	//});
			
	//get 10 systems, starter no set --> solution, false results, algo
	var SYSTEMS_TOTAL = 2;//work from book and add compl.
	var DIFFICULTY = 50;
	var E_PROBABILITY = .15;
	
	var systems = [];
	var starter_set = [];
	
	var selector;
	
	var ran_no;
	var ran_no_2;
	var ran_no_3;
	var ran_no_used = [];
	
	for (i = 0; i < total_qs; i++) {
		
		selector = Math.floor(Math.random() * SYSTEMS_TOTAL);
		
		//while (systems.includes(selector)) {
		//	selector = Math.floor((Math.random() * SYSTEMS_TOTAL));
		//}
		
		systems.push(selector); //selector ==> hard-select for testing --------------------------------------------!

		
		ran_no = Math.floor((Math.random() * DIFFICULTY));
		
		while (ran_no_used.includes(ran_no)) {
			ran_no = Math.floor((Math.random() * DIFFICULTY));
		}
		
		ran_no_used.push(ran_no);
		
		
		ran_no_2 = Math.floor((Math.random() * DIFFICULTY));
		
		while (ran_no_used.includes(ran_no_2)) {
			ran_no_2 = Math.floor((Math.random() * DIFFICULTY));
		}
		
		ran_no_used.push(ran_no_2);
		
		ran_no_3 = Math.floor((Math.random() * DIFFICULTY));
		
		while (ran_no_used.includes(ran_no_3)) {
			ran_no_3 = Math.floor((Math.random() * DIFFICULTY));
		}
		
		ran_no_used.push(ran_no_3);
		
		starter_set[i] = [ran_no, ran_no_2, ran_no_3];
		
	}
	
	//alert(systems + ' with starters ' + starter_set);	
	function populator(algorithm_objs) {
		
		//li element >> obj.algo etc
		for (i = 0; i < algorithm_objs.length; i++) {
			
			//gesucht			
			$('form.box > ul > li:nth-child(' + (i + 1) + ') > h2').text(algorithm_objs[i].x + '    ' + algorithm_objs[i].x2 + '    ' + algorithm_objs[i].x3 + '    ' + algorithm_objs[i].x4 + '    ' + algorithm_objs[i].x5 + '    ' + algorithm_objs[i].x6 + '    ...    ...');
			
			//sol
			$('form.box > ul > li:nth-child(' + (i + 1) + ') > p.analysis').text(algorithm_objs[i].algorithm);
			
			//options
			var random_placement = Math.floor(Math.random() * 4); //random placement 0 thru 3	
			//var possible_placements = [];
			var ran_false_1 = false;
			var ran_false_2 = false;
			var close_false = false;
			
			for (j = 0; j < 4; j++) { //cycle thry li options == 5
				
				if (j == random_placement) {
					$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > label > b').text(algorithm_objs[i].x7 + ' / ' + algorithm_objs[i].x8); //correct one
					
					if (!algorithm_objs[i].e) {
						$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > input').val(1); //set val
					} else {
						$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + 5 + ') > input').val(1); //set e
					}
					
					
					//possible_placements.push(j);
				} else {
					
					if (!ran_false_1 && !ran_false_2 && !close_false) { //no others set
						$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > label > b').text(algorithm_objs[i].x7_ran + ' / ' + algorithm_objs[i].x8_ran);
						
						ran_false_1 = true;
					} else if (!ran_false_2 && !close_false) { //try get close false near corr.
						$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > label > b').text(algorithm_objs[i].x7_close + ' / ' + algorithm_objs[i].x8_close);
						
						close_false = true;
					} else { //last option
						$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > label > b').text(algorithm_objs[i].x7_ran2 + ' / ' + algorithm_objs[i].x8_ran2);
						
						ran_false_2 = true;
					}
						
					
					//possible_placements.push(j);
					
				}
				
			}
			
		}
		
		
	}
	
	//selector --> populator
	var algorithm_objs = [];
	
	for (i = 0; i < total_qs; i++) {
		
		console.log(systems[i]);
		
		switch (systems[i]) {
			case 0:
				//"1er sprung" --> add complexity by varying increments, && alternating +/i bzw. incrementing increment *2 or sth
				var INCR = Math.ceil(Math.random() * 4) + 1;
				
				var algorithm_obj = {"algorithm": "*" + INCR + " +" + INCR};
				
				//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
				var e_conting = false;
				algorithm_obj['e'] = false;
				
				if (Math.random() < E_PROBABILITY) {
					e_conting = true;
					algorithm_obj['e'] = true;
				}
				
				
				
				//initial
				algorithm_obj['x'] = starter_set[i][0];
				algorithm_obj['x2'] = algorithm_obj.x * INCR;
				algorithm_obj['x3'] = algorithm_obj.x2 + INCR;
				algorithm_obj['x4'] = algorithm_obj.x3 * INCR;
				algorithm_obj['x5'] = algorithm_obj.x4 + INCR;
				algorithm_obj['x6'] = algorithm_obj.x5 * INCR;
				
				//correct
				algorithm_obj['x7'] = algorithm_obj.x6 + INCR;
				algorithm_obj['x8'] = algorithm_obj.x7 * INCR;
				
				
				if (e_conting) {
					algorithm_obj['x7'] = algorithm_obj.x6 + Math.ceil(INCR / 2);
					algorithm_obj['x8'] = algorithm_obj.x7 * Math.ceil(INCR / 2);
				}
				
				
				//false
				algorithm_obj['x7_close'] = algorithm_obj.x6 + 2 * INCR;
				algorithm_obj['x8_close'] = algorithm_obj.x7 * (INCR + 2);
				
				algorithm_obj['x7_ran'] = algorithm_obj.x6 * 6;
				algorithm_obj['x8_ran'] = algorithm_obj.x7_ran + 6;
				
				algorithm_obj['x7_ran2'] = algorithm_obj.x6 * 8;
				algorithm_obj['x8_ran2'] = algorithm_obj.x7_ran2 + 8;
				
				break;
				
			case 1:
				//"1er sprung" --> 2 increments
				var INCR = Math.ceil(Math.random() * 4) + 1;
				var INCR2 = Math.ceil(Math.random() * 4) + 1; //can be same
				
				var INCRi = Math.ceil(Math.random() * 4) + 1;
				var INCR2i = Math.ceil(Math.random() * 4) + 1; //can be same
								
				var algorithm_obj = {"algorithm": "+" + INCR + " +" + INCR2 + " +(" + INCR + "+" + INCRi + ") +(" + INCR2 + "+" + INCR2i + ") +(" + INCR + "+2*" + INCRi + ") +(" + INCR2 + "+2*" + INCR2i + ") usw."};
				
				//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
				var e_conting = false;
				algorithm_obj['e'] = false;
				
				if (Math.random() < E_PROBABILITY) {
					e_conting = true;
					algorithm_obj['e'] = true;
				}
				
				
				
				//initial
				algorithm_obj['x'] = starter_set[i][0];
				algorithm_obj['x2'] = algorithm_obj.x + INCR;
				algorithm_obj['x3'] = algorithm_obj.x2 + INCR2;
				algorithm_obj['x4'] = algorithm_obj.x3 + (INCR + INCRi);
				algorithm_obj['x5'] = algorithm_obj.x4 + (INCR2 + INCR2i);
				algorithm_obj['x6'] = algorithm_obj.x5 + (INCR + 2 * INCRi);
				
				//correct
				algorithm_obj['x7'] = algorithm_obj.x6 + (INCR2 + 2 * INCR2i);
				algorithm_obj['x8'] = algorithm_obj.x7 + (INCR + 3 * INCRi);
				
				
				if (e_conting) {
					algorithm_obj['x7'] = algorithm_obj.x6 + (INCR2 + 3 * INCR2i);
					algorithm_obj['x8'] = algorithm_obj.x7 + (INCR + 4 * INCRi);
				}
				
				
				//false
				algorithm_obj['x7_close'] = algorithm_obj.x6 + (INCR2 + 2 * INCR2i);
				algorithm_obj['x8_close'] = algorithm_obj.x7 + (INCR2 + 3 * INCR2i);
				
				algorithm_obj['x7_ran'] = algorithm_obj.x6 + Math.ceil(INCR / 2);
				algorithm_obj['x8_ran'] = algorithm_obj.x7_ran + Math.ceil(INCR / 2);
				
				algorithm_obj['x7_ran2'] = algorithm_obj.x6 + 8;
				algorithm_obj['x8_ran2'] = algorithm_obj.x7_ran2 + 8;
				
				break;
				
			
			case 2:
				//"1er sprung" --> increment incremented geometrically (always x2)
				var INCR = Math.ceil(Math.random() * 6) + 6;
				var INCR2 = 2; //factor by which increment is initially incremented
								
				var algorithm_obj = {"algorithm": "+" + INCR + " +" + INCR + "+" + INCR2 + " +" + INCR + "+2*" + INCR2 + " +" + INCR + " +2*2*" + INCR2 + " usw."};
				
				//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
				var e_conting = false;
				algorithm_obj['e'] = false;
				
				if (Math.random() < E_PROBABILITY) {
					e_conting = true;
					algorithm_obj['e'] = true;
				}
				
				
				
				//initial
				algorithm_obj['x'] = starter_set[i][0];
				algorithm_obj['x2'] = algorithm_obj.x + INCR;
				algorithm_obj['x3'] = algorithm_obj.x2 + INCR + INCR2;
				algorithm_obj['x4'] = algorithm_obj.x3 + INCR + 2*INCR2;
				algorithm_obj['x5'] = algorithm_obj.x4 + INCR + 4*INCR2;
				algorithm_obj['x6'] = algorithm_obj.x5 + INCR + 6*INCR2;
				
				//correct
				algorithm_obj['x7'] = algorithm_obj.x6 + INCR + 8*INCR2;
				algorithm_obj['x8'] = algorithm_obj.x7 + INCR + 10*INCR2;
				
				
				if (e_conting) {
					algorithm_obj['x7'] = algorithm_obj.x6 + (INCR2 + 3 * INCR2);
					algorithm_obj['x8'] = algorithm_obj.x7 + (INCR + 4 * INCR);
				}
				
				
				//false
				algorithm_obj['x7_close'] = algorithm_obj.x6 + INCR + Math.floor(8.5*INCR2);
				algorithm_obj['x8_close'] = algorithm_obj.x7 + INCR + Math.floor(10.5*INCR2);
				
				algorithm_obj['x7_ran'] = algorithm_obj.x6 + Math.ceil(INCR *3);
				algorithm_obj['x8_ran'] = algorithm_obj.x7_ran + Math.ceil(INCR *6);
				
				algorithm_obj['x7_ran2'] = algorithm_obj.x6 + Math.ceil(2 * INCR *2);
				algorithm_obj['x8_ran2'] = algorithm_obj.x7_ran2 + Math.ceil(2 * INCR *6);
				
				break;
				
				
			case 3:
				//"1er sprung, 3 Rechenschritte" --> increment incremented geometrically (always x2)
				var INCR = Math.ceil(Math.random() * 6) * 2;
				var INCR2 = 4; //factor for alt incr.
				var INCR3 = 2; //divisor for alt alt incr.
				
				var variation = false;
				
				if (Math.random() > .5) {
					variation = true;
					
					var INCR = Math.ceil(Math.random() * 12) * 2;
					var INCR2 = 6;
					var INCR3 = 2;
				}
								
				var algorithm_obj = {"algorithm": "+" + INCR + " *" + INCR2 + "/" + INCR3 + " +" + INCR + " *" + INCR2 + " /" + INCR3 + " usw."};
				
				//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
				var e_conting = false;
				algorithm_obj['e'] = false;
				
				if (Math.random() < E_PROBABILITY) {
					e_conting = true;
					algorithm_obj['e'] = true;
				}
				
				
				
				//initial
				algorithm_obj['x'] = starter_set[i][0];
				algorithm_obj['x2'] = algorithm_obj.x + INCR;
				algorithm_obj['x3'] = algorithm_obj.x2 * INCR2;
				algorithm_obj['x4'] = algorithm_obj.x3 /INCR3;
				algorithm_obj['x5'] = algorithm_obj.x4 + INCR;
				algorithm_obj['x6'] = algorithm_obj.x5 *INCR2;
				
				//correct
				algorithm_obj['x7'] = algorithm_obj.x6 /INCR3;
				algorithm_obj['x8'] = algorithm_obj.x7 + INCR;
				
				
				if (e_conting) {
					algorithm_obj['x7'] = algorithm_obj.x6 + INCR3;
					algorithm_obj['x8'] = algorithm_obj.x7 /INCR;
				}
				
				
				//false
				algorithm_obj['x7_close'] = algorithm_obj.x6 /INCR2;
				algorithm_obj['x8_close'] = algorithm_obj.x7 + INCR3;
				
				algorithm_obj['x7_ran'] = algorithm_obj.x6 + INCR;
				algorithm_obj['x8_ran'] = algorithm_obj.x7_ran + INCR;
				
				algorithm_obj['x7_ran2'] = algorithm_obj.x6 + INCR;
				algorithm_obj['x8_ran2'] = algorithm_obj.x7_ran2 + INCR2;
				
				break;
				
				
			case 4: //HARD!
				//"1er sprung, 3 Rechenschritte" --> geometr.
				var INCR = Math.ceil(Math.random() * 6) * 2;
				var INCR2 = -4; //neg. incr.
				var INCR3 = 2; //factor for alt alt incr.
				
				var geo = 1; //incr INCR, neg incr INCR2, incr INCR 3 too
			
								
				var algorithm_obj = {"algorithm": "+" + INCR + " +" + INCR2 + "*" + INCR3 + " +(" + INCR + " +1) +(" + INCR2 + " - 1) *(" + INCR3 + " + 1) usw."};
				
				//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
				var e_conting = false;
				algorithm_obj['e'] = false;
				
				if (Math.random() < E_PROBABILITY) {
					e_conting = true;
					algorithm_obj['e'] = true;
				}
				
				
				
				//initial
				algorithm_obj['x'] = starter_set[i][0];
				algorithm_obj['x2'] = algorithm_obj.x + INCR;
				algorithm_obj['x3'] = algorithm_obj.x2 + INCR2;
				algorithm_obj['x4'] = algorithm_obj.x3 * INCR3;
				algorithm_obj['x5'] = algorithm_obj.x4 + (INCR + geo);
				algorithm_obj['x6'] = algorithm_obj.x5 + (INCR2 + geo);
				
				//correct
				algorithm_obj['x7'] = algorithm_obj.x6 * (INCR3 + geo);
				algorithm_obj['x8'] = algorithm_obj.x7 + (INCR + 2 * geo);
				
				
				if (e_conting) {
					algorithm_obj['x7'] = algorithm_obj.x6 + (INCR3 + geo);
					algorithm_obj['x8'] = algorithm_obj.x7 * (INCR + 2 * geo);
				}
				
				
				//false
				algorithm_obj['x7_close'] = algorithm_obj.x6 * (INCR2 + geo);
				algorithm_obj['x8_close'] = algorithm_obj.x7 + (INCR + geo);
				
				algorithm_obj['x7_ran'] = algorithm_obj.x6 + (INCR2 + geo);
				algorithm_obj['x8_ran'] = algorithm_obj.x7_ran + (INCR + 3 * geo);
				
				algorithm_obj['x7_ran2'] = algorithm_obj.x6 + INCR;
				algorithm_obj['x8_ran2'] = algorithm_obj.x7_ran2 * INCR;
				
				break;
			
			case 5: //HARDer!
				//"1er sprung, 3 Rechenschritte + mit X" --> geometr.
				var INCR = Math.ceil(Math.random() * 6) * 2;
				var INCR2 = -4; //neg. incr.
				var INCR3 = 2; //factor for alt alt incr.
				
				var geo = 2; //> 1
				//also switching ++* to *++ (compare 4)
								
				var algorithm_obj = {"algorithm": "*" + INCR + " +" + INCR2 + " +" + INCR3 + "*(" + INCR + " +" + geo + ") +(" + INCR2 + " +" + geo + ") +(" + INCR3 + " +" + geo + ") *(" + INCR + " +" + geo + " +" + geo + ") usw."};
				
				//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
				var e_conting = false;
				algorithm_obj['e'] = false;
				
				if (Math.random() < E_PROBABILITY) {
					e_conting = true;
					algorithm_obj['e'] = true;
				}
				
				
				
				//initial
				algorithm_obj['x'] = starter_set[i][0];
				algorithm_obj['x2'] = algorithm_obj.x * INCR;
				algorithm_obj['x3'] = algorithm_obj.x2 + INCR2;
				algorithm_obj['x4'] = algorithm_obj.x3 + INCR3;
				algorithm_obj['x5'] = algorithm_obj.x4 * (INCR + geo);
				algorithm_obj['x6'] = algorithm_obj.x5 + (INCR2 + geo);
				
				//correct
				algorithm_obj['x7'] = algorithm_obj.x6 + (INCR3 + geo);
				algorithm_obj['x8'] = algorithm_obj.x7 * (INCR + 2 * geo);
				
				
				if (e_conting) {
					algorithm_obj['x7'] = algorithm_obj.x6 * (INCR3 + geo);
					algorithm_obj['x8'] = algorithm_obj.x7 + (INCR + 2 * geo);
				}
				
				
				//false
				algorithm_obj['x7_close'] = algorithm_obj.x6 * (INCR2 + geo);
				algorithm_obj['x8_close'] = algorithm_obj.x7 + (INCR + geo);
				
				algorithm_obj['x7_ran'] = algorithm_obj.x6 + (INCR2 + geo);
				algorithm_obj['x8_ran'] = algorithm_obj.x7_ran + (INCR + 3 * geo);
				
				algorithm_obj['x7_ran2'] = algorithm_obj.x6 + INCR;
				algorithm_obj['x8_ran2'] = algorithm_obj.x7_ran2 * INCR;
				
				break;
				
			case 6: 
				//"fibonacci" --> INCR2 (more variance) to determine starter_set[i][0] //or: SIMPLE fib.
				var INCR = Math.ceil(Math.random() * 6) * 2;
				var INCR2 = Math.ceil(Math.random() * 12) * 2;
				
				//initial needed
				starter_set[i][0] = INCR2; //overwrite here for ease of use== need to know this var
				
				//var geo for false solutions offset
				var geo = Math.ceil(Math.random() * 4);
								
				var algorithm_obj = {"algorithm": "+" + INCR + " +" + (INCR2 + INCR) + " [=" + INCR2 + " + " + INCR + "] +" + (INCR2 + INCR2 + INCR) + " [=" + INCR2 + " + " + (INCR2 + INCR) + "] usw. [= Fibonacci-Reihe mit direkt Einsprung, d.h. Zahlen 2 und 3 steigen/fallen um den gleichen Betrag]"}; //so INCR2 = initial val
				
				//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
				var e_conting = false;
				algorithm_obj['e'] = false;
				
				if (Math.random() < E_PROBABILITY) {
					e_conting = true;
					algorithm_obj['e'] = true;
				}
				
				
				
				//initial
				algorithm_obj['x'] = starter_set[i][0]; //overwritten to INCR2
				algorithm_obj['x2'] = algorithm_obj.x + INCR2; 
				algorithm_obj['x3'] = algorithm_obj.x2 + algorithm_obj.x;
				algorithm_obj['x4'] = algorithm_obj.x3 + algorithm_obj.x2;
				algorithm_obj['x5'] = algorithm_obj.x4 + algorithm_obj.x3;
				algorithm_obj['x6'] = algorithm_obj.x5 + algorithm_obj.x4;
				
				//correct
				algorithm_obj['x7'] = algorithm_obj.x6 + algorithm_obj.x5;
				algorithm_obj['x8'] = algorithm_obj.x7 + algorithm_obj.x6;
				
				
				if (e_conting) {
					algorithm_obj['x7'] = algorithm_obj.x6 + algorithm_obj.x5;
					algorithm_obj['x8'] = algorithm_obj.x7 + algorithm_obj.x7; //2 * x7
				}
				
				
				//false
				algorithm_obj['x7_close'] = algorithm_obj.x6 + algorithm_obj.x5 + geo;
				algorithm_obj['x8_close'] = algorithm_obj.x7 + algorithm_obj.x6 + geo;
				
				algorithm_obj['x7_ran'] = algorithm_obj.x6 + geo;
				algorithm_obj['x8_ran'] = algorithm_obj.x7 * geo;
				
				algorithm_obj['x7_ran2'] = algorithm_obj.x6 + (2 * geo);
				algorithm_obj['x8_ran2'] = algorithm_obj.x7 * (2 * geo);
				
				break;
				
			/////////////////////////////////////////////////////////// better algo write out/def
				
			case 7: 
				//"fibonacci" --> random intiial set: HARDER
				var INCR = Math.ceil(Math.random() * 6) * 2;
				var INCR2 = Math.ceil(Math.random() * 12) * 2;
				
				
				//var geo for false solutions offset
				var geo = Math.ceil(Math.random() * 4);
				
				//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
				var e_conting = false;
				
				var algorithm_obj = {};
				
				algorithm_obj['e'] = false;
				
				if (Math.random() < E_PROBABILITY) {
					e_conting = true;
					algorithm_obj['e'] = true;
				}
				
				//initial
				algorithm_obj['x'] = starter_set[i][0]; 
				algorithm_obj['x2'] = starter_set[i][1]; 
				algorithm_obj['x3'] = algorithm_obj.x2 + algorithm_obj.x;
				algorithm_obj['x4'] = algorithm_obj.x3 + algorithm_obj.x2;
				algorithm_obj['x5'] = algorithm_obj.x4 + algorithm_obj.x3;
				algorithm_obj['x6'] = algorithm_obj.x5 + algorithm_obj.x4;
				
				//correct
				algorithm_obj['x7'] = algorithm_obj.x6 + algorithm_obj.x5;
				algorithm_obj['x8'] = algorithm_obj.x7 + algorithm_obj.x6;
				
				
				if (e_conting) {
					algorithm_obj['x7'] = algorithm_obj.x6 + algorithm_obj.x5;
					algorithm_obj['x8'] = algorithm_obj.x7 + algorithm_obj.x7; //2 * x7
				}
				
				
				//false
				algorithm_obj['x7_close'] = algorithm_obj.x6 + algorithm_obj.x5 + geo;
				algorithm_obj['x8_close'] = algorithm_obj.x7 + algorithm_obj.x6 + geo;
				
				algorithm_obj['x7_ran'] = algorithm_obj.x6 + geo;
				algorithm_obj['x8_ran'] = algorithm_obj.x7 * geo;
				
				algorithm_obj['x7_ran2'] = algorithm_obj.x6 + (2 * geo);
				algorithm_obj['x8_ran2'] = algorithm_obj.x7 * (2 * geo);
				
				//algo written out
				algorithm_obj['algorithm'] = algorithm_obj.x + "+" + algorithm_obj.x2 + "=" + algorithm_obj.x3 + " " + algorithm_obj.x2 + "+" + algorithm_obj.x3 + "=" + algorithm_obj.x4 + " usw. = Fibonacci-Reihe"; //so INCR2 = initial val
				
				break;	
				
			case 8: 
				//"fibonacci x3er-set" --> random intiial set: HARDER // no INCR use
				//var INCR = Math.ceil(Math.random() * 6) * 2;
				//var INCR2 = Math.ceil(Math.random() * 12) * 2;
				
				
				//var geo for false solutions offset
				var geo = Math.ceil(Math.random() * 4);
				
				//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
				var e_conting = false;
				
				var algorithm_obj = {};
				
				algorithm_obj['e'] = false;
				
				if (Math.random() < E_PROBABILITY) {
					e_conting = true;
					algorithm_obj['e'] = true;
				}
				
				//initial
				algorithm_obj['x'] = starter_set[i][0]; 
				algorithm_obj['x2'] = starter_set[i][1]; 
				algorithm_obj['x3'] = starter_set[i][2];
				algorithm_obj['x4'] = algorithm_obj.x + algorithm_obj.x2 + algorithm_obj.x3;
				algorithm_obj['x5'] = algorithm_obj.x2 + algorithm_obj.x3 + algorithm_obj.x4;
				algorithm_obj['x6'] = algorithm_obj.x3 + algorithm_obj.x4 + algorithm_obj.x5;
				
				//correct
				algorithm_obj['x7'] = algorithm_obj.x4 + algorithm_obj.x5 + algorithm_obj.x6;
				algorithm_obj['x8'] = algorithm_obj.x5 + algorithm_obj.x6 + algorithm_obj.x7;
				
				
				if (e_conting) {
					algorithm_obj['x7'] = algorithm_obj.x4 + algorithm_obj.x5 + algorithm_obj.x6 + algorithm_obj.x;
					algorithm_obj['x8'] = algorithm_obj.x5 + algorithm_obj.x6 + algorithm_obj.x7 + algorithm_obj.x;
				}
				
				
				//false
				algorithm_obj['x7_close'] = algorithm_obj.x4 + algorithm_obj.x5 + algorithm_obj.x6 + geo;
				algorithm_obj['x8_close'] = algorithm_obj.x4 + algorithm_obj.x5 + algorithm_obj.x6 + geo;
				
				algorithm_obj['x7_ran'] = algorithm_obj.x4 + algorithm_obj.x5 + algorithm_obj.x6 + geo;
				algorithm_obj['x8_ran'] = algorithm_obj.x4 + algorithm_obj.x5 + algorithm_obj.x6 * geo;
				
				algorithm_obj['x7_ran2'] = algorithm_obj.x4 + algorithm_obj.x5 + algorithm_obj.x6 + geo;
				algorithm_obj['x8_ran2'] = algorithm_obj.x4 + algorithm_obj.x5 + algorithm_obj.x6 + (2 * geo);
				
				//algo written out
				algorithm_obj['algorithm'] = algorithm_obj.x + "+" + algorithm_obj.x2 + "+" + algorithm_obj.x3 + "=" + algorithm_obj.x4 + " " + algorithm_obj.x2 + "+" + algorithm_obj.x3 + "+" + algorithm_obj.x4 + "=" + algorithm_obj.x5 + " usw. = 3er-Fibonacci-Reihe"; //so INCR2 = initial val
				
				break;	
			
			case 9: 
				//"fibonacci mit sprung" --> no INCR USE
				//var INCR = Math.ceil(Math.random() * 6) * 2;
				//var INCR2 = Math.ceil(Math.random() * 12) * 2;
				
				
				//var geo for false solutions offset
				var geo = Math.ceil(Math.random() * 3);
				
				//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
				var e_conting = false;
				
				var algorithm_obj = {};
				
				algorithm_obj['e'] = false;
				
				if (Math.random() < E_PROBABILITY) {
					e_conting = true;
					algorithm_obj['e'] = true;
				}
				
				//initial
				algorithm_obj['x'] = starter_set[i][0]; 
				algorithm_obj['x2'] = starter_set[i][1]; 
				algorithm_obj['x3'] = starter_set[i][2];
				algorithm_obj['x4'] = algorithm_obj.x + algorithm_obj.x3;
				algorithm_obj['x5'] = algorithm_obj.x2 + algorithm_obj.x4;
				algorithm_obj['x6'] = algorithm_obj.x3 + algorithm_obj.x5;
				
				//correct
				algorithm_obj['x7'] = algorithm_obj.x4 + algorithm_obj.x6;
				algorithm_obj['x8'] = algorithm_obj.x5 + algorithm_obj.x7;
				
				
				if (e_conting) {
					algorithm_obj['x7'] = algorithm_obj.x4 + algorithm_obj.x5 * (geo + 1); //def. variation
					algorithm_obj['x8'] = algorithm_obj.x5 + algorithm_obj.x6 * (geo + 1);
				}
				
				
				//false
				algorithm_obj['x7_close'] = algorithm_obj.x4 + algorithm_obj.x6 + (geo + 1);
				algorithm_obj['x8_close'] = algorithm_obj.x5 + algorithm_obj.x7 + (geo + 1);
				
				algorithm_obj['x7_ran'] = algorithm_obj.x4 + algorithm_obj.x5 + algorithm_obj.x6;
				algorithm_obj['x8_ran'] = algorithm_obj.x6 + algorithm_obj.x6 + algorithm_obj.x7;
				
				algorithm_obj['x7_ran2'] = algorithm_obj.x4 + algorithm_obj.x5 + algorithm_obj.x6 + geo;
				algorithm_obj['x8_ran2'] = algorithm_obj.x4 + algorithm_obj.x5 + algorithm_obj.x6 + (2 * geo);
				
				//algo written out
				algorithm_obj['algorithm'] = algorithm_obj.x + "+" + algorithm_obj.x3 + "=" + algorithm_obj.x4 + " " + algorithm_obj.x2 + "+" + algorithm_obj.x4 + "=" + algorithm_obj.x5 + " usw. = Fibonacci-Reihe mit Sprung"; //so INCR2 = initial val
				
				break;	
				
				
			case 10: 
				//"fibonacci im rechenschritt" --> fib for INCR 
				var INCR = Math.ceil(Math.random() * 6);
				var INCR2 = Math.ceil(Math.random() * 6) * 2;
				
				//to track fib
				var INCRtrack = [];
				var INCRnew; //added to INCRtrack
				
				
				//var geo for false solutions offset
				var geo = Math.ceil(Math.random() * 3);
				
				//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
				var e_conting = false;
				
				var algorithm_obj = {};
				
				algorithm_obj['e'] = false;
				
				if (Math.random() < E_PROBABILITY) {
					e_conting = true;
					algorithm_obj['e'] = true;
				}
				
				//initial
				algorithm_obj['x'] = starter_set[i][0]; 
				algorithm_obj['x2'] = algorithm_obj.x + INCR;
				
				INCRtrack.push(INCR);
				algorithm_obj['x3'] = algorithm_obj.x2 + INCR2;
				INCRtrack.push(INCR2);
				
				INCRnew = INCRtrack[INCRtrack.length - 1] + INCRtrack[INCRtrack.length - 2]; //aka INCR2 + INCR
				algorithm_obj['x4'] = algorithm_obj.x3 + INCRnew;
				INCRtrack.push(INCRnew); 
				
				INCRnew = INCRtrack[INCRtrack.length - 1] + INCRtrack[INCRtrack.length - 2]; //reseted
				algorithm_obj['x5'] = algorithm_obj.x4 + INCRnew;
				INCRtrack.push(INCRnew); 
				
				INCRnew = INCRtrack[INCRtrack.length - 1] + INCRtrack[INCRtrack.length - 2];
				algorithm_obj['x6'] = algorithm_obj.x5 + INCRnew;
				INCRtrack.push(INCRnew); 
				
				//correct
				INCRnew = INCRtrack[INCRtrack.length - 1] + INCRtrack[INCRtrack.length - 2];
				algorithm_obj['x7'] = algorithm_obj.x6 + INCRnew;
				
				if (e_conting) {
					algorithm_obj['x7'] = algorithm_obj.x6 + INCRnew + INCR;
				}
				
				INCRtrack.push(INCRnew); 
				
				INCRnew = INCRtrack[INCRtrack.length - 1] + INCRtrack[INCRtrack.length - 2];
				algorithm_obj['x8'] = algorithm_obj.x5 + algorithm_obj.x7;
				
				if (e_conting) {
					algorithm_obj['x8'] = algorithm_obj.x5 + algorithm_obj.x7 + INCR;
				}
				
				INCRtrack.push(INCRnew); 
				
				
				//false
				algorithm_obj['x7_close'] = algorithm_obj.x6 + geo;
				algorithm_obj['x8_close'] = algorithm_obj.x7 + geo;
				
				algorithm_obj['x7_ran'] = algorithm_obj.x6 + geo * INCR;
				algorithm_obj['x8_ran'] = algorithm_obj.x7 + geo * INCR2;
				
				algorithm_obj['x7_ran2'] = algorithm_obj.x6 + INCR;
				algorithm_obj['x8_ran2'] = algorithm_obj.x6 + INCR2;
				
				//algo written out
				algorithm_obj['algorithm'] = "Rechenschritt 1: " + INCR + ", Rechenschritt 2: " + INCR2 + " ab 3. Zahl=" + algorithm_obj.x3 + " Fibonacci-Reihe im Rechenschritt, also auf 4. Zahl: " + algorithm_obj.x3 + "+(" + INCR + "+" + INCR2 + ")=" + algorithm_obj.x4 + " und dann " + algorithm_obj.x4 + "+(" + INCR2 + "+" + parseFloat(INCR + INCR2) + "[=" + INCR + "+" + INCR2 + "])=" + algorithm_obj.x5 + " usw. = Fibonacci-Reihe im Rechenschritt!"; //so INCR2 = initial val
				
				break;
				
		}
		
		algorithm_objs.push(algorithm_obj);
	}
	
	populator(algorithm_objs);
	
	//result math
	var questions = []
	$('form.box > ul > li').each(function( i ) {
		questions.push(0);
	});
	
	var question = 0;
	var questions_left = questions.length;
		
	//fns
	function questionsLeft() {
		//var left = $(thisObj).parents('li').parents('li').nextAll('li').length;
		//var left = questions.length - question;
		
		//alert(questions_left);
		questions_left--;
		
		if (questions_left > 1) {
			$('#questionsLeft').html('Noch ' + questions_left  + ' Fragen nach dieser.');
		} else if (questions_left == 1) {
			$('#questionsLeft').html('Noch eine Frage nach dieser.');
		} else {
			$('#questionsLeft').html('Letzte Frage!');
		}
		
		
		
	}
	
	function feedback(thisObj, answer) { //answer display and 'next' button
		questions[question] = answer;
		question++;
					
		var correct = false;
		var analysis_text = $(thisObj).parents('li').parents('li').find('p.analysis').text();
		
		if (answer == '1') { //str to bool
			correct = true;
		}
		
		
		if (correct) { //correct! display >> button for next question or submit
			$('#analysis-note').addClass('invisible'); //keeps space abover form.box
			
			$('#analysis > p').addClass('labelo_blu');
			$('#analysis > p').text(analysis_text);
			
			$('#analysis').removeClass('invisible'); //work with this rather than show/hide for this <p>
			
			//$('#result').append($('#analysis > p')); //result feedback prep
			
			//$('#result').append('<h4 class="labelo_blu">' + analysis_text + '</h4>');
			
			$(thisObj).next().addClass('no-hover');
			
			$(thisObj).parent('li').addClass('labelo_blu');

			$(thisObj).next().next().html('Nächste Frage');
			$(thisObj).next().next().click( function() {
				
				$('#result').append($(thisObj).parents('li').parents('li').find('h2')).addClass('space-top');
				$('#result').append('<h4 class="labelo_blu">' + analysis_text + '</h4>');
				
				$('#analysis > p').removeClass('labelo_blu');
				$('#analysis').addClass('invisible');
				
				$(this).parents('li').parents('li').hide(0, function() {
					
					//$('#result').append('<h4 class="labelo_blu">' + analysis_text + '</h4>');
					
					if ($(this).next().length > 0) {
												
					   $(this).next().show();
					   					   
					   questionsLeft();
					   
					} else {
												
						//$('form.box').submit();
						
						js_submission();
						
					}
					
				});
			});
			
		} else { //wrong! display >> button for next question or submit
			$('#analysis-note').addClass('invisible');
			
			$('#analysis > p').addClass('labelo_red');
			$('#analysis > p').text(analysis_text);
			
			$('#analysis').removeClass('invisible'); //silent fail?
			
			//$('#result').append($('#analysis > p')); //result feedback prep
			//$('#result').append('<h4 class="labelo_red">' + analysis_text + '</h4>');
			
			$(thisObj).next().addClass('no-hover');
			
			$(thisObj).parent('li').addClass('labelo_red');
			
			$(thisObj).next().next().html('Nächste Frage');
			$(thisObj).next().next().click( function() {
				
				$('#result').append($(thisObj).parents('li').parents('li').find('h2')).addClass('space_top');
				$('#result').append('<h4 class="labelo_red">' + analysis_text + '</h4>');
				
				$('#analysis > p').removeClass('labelo_red');
				$('#analysis').addClass('invisible');

				$(this).parents('li').parents('li').hide(0, function() {
					
					//$('#result').append('<h4 class="labelo_red">' + analysis_text + '</h4>');
					
					if ($(this).next().length > 0) {
						
					   $(this).next().show();
					   
					   questionsLeft();
					   
					} else {
						
						//$('form.box').submit();
						//$('form.box').html('<h3><i class="fas fa-thumbs-up"></i><b> Done.</b></h3>');
						
						js_submission();
						
					}
					
				});
				
				
				
			});
			
		}
		
		//addendum: presentation items, once feedback given
		$(thisObj).parents('li').addClass('question_done'); 
		$('li.question_done > h4 > ol > li:not(.selected) > input').attr('disabled',true);
		
		//$('form.box > ul > li > h4 > ol > li:not(.selected) > label').addClass('no-hover');
		//$('form.box > ul > li > h4 > ol > li:not(.selected) > label').prev().attr('disabled',true);
		
		return answer;
	}
	
	function js_submission() {
		//math
		var win = false;
		
		var count_correct = 0;
		
		for (i = 0; i < questions.length; i++) {
			if (questions[i] == 1) {
				count_correct++;
			}
		}
		
		var percentage = ((count_correct / questions.length) * 100).toFixed(2);
		
		if (percentage >= 80) {
			win = true;
		}
		
		//display
		$('form.box > ul').hide();
		$('#questionsLeft').hide();
		
		$('#result').removeClass('no_display');
		
		$('#result > h5.labelo').html('<i class="fas fa-arrow-right"></i> ' + percentage + '% richtig</h5></div>');
		
		if (win) {
			$('#result > h1').html('MedAT Untertest Statistisch Geschafft!');
			$('#result div').removeClass('no_display');
			$('#result img').removeClass('invisible'); 
			//$('#result p').addClass('no_display'); //don't need this note if good
		} else {
			$('#result > h1').html('Für diesen MedAT Untertest brauchst du noch etwas Vorbereitung.');
			$('#result div ').addClass('no_display'); //box for fb share for card, which person is not getting
		}
		
	}
	
	
	//int. logic
	$('form.box > ul > li').each(function( i ) {
	  $(this).find('input').attr('name', 'q' + i);
	  	  
	  $(this).find('label').each(function( j ) {
		  $(this).attr('for', 'q' + i + 'a' + j);
		  
		  $(this).prev().attr('id', 'q' + i + 'a' + j);
	  });
	});
	
	
	//presentation
	$('form.box > ul > li').not(':first').hide();
	
	questionsLeft($('form.box > ul > li:first > h4 > ol > li > input')); //rel. to input, not li
	
	$('input[value="1"]').next().append('<i class="fas fa-arrow-left invisible"></i>'); //made visibel when question_done
	
	$('#result img').addClass('invisible'); //only shows if success
	
	//question functionality
	$('input').click(function() {
		var answer = $(this).val();
		
		
		if (!$(this).next().hasClass('selected') && $(this).parents('ol').find('li > label.selected').length == 0) { //nothing selected yet (cannot have prev. been selected)
			//1st selection
			$(this).next().addClass('selected');
			
			$(this).parent('li').append('<a class="button">Einreichen</a>');
			
			//button functionality
			$('form.box > ul > li > h4 > ol > li > a.button').click(function() {
				feedback($(this).prev().prev(), answer);
				//questionsLeft($(this).prev().prev());
				
				$('#analysis').removeClass('invisible');	
			});
			
			
		} else if (!$(this).next().hasClass('selected') && !$(this).next().hasClass('finished') && $(this).parents('ol').find('li > label.selected').length > 0 && $('#analysis').hasClass('invisible')) { //something else already selected, this one is not solected and has not been prev. selected //need to check no feedback yet too
			
			//clear other selection (will only be one)
			$(this).parents('ol').find('li > label.selected').addClass('finished');
			$(this).parents('ol').find('li > label.selected').addClass('no-hover');
			$(this).parents('ol').find('li > label.selected').prev().attr("disabled", true); //!
			
			$(this).parents('ol').find('li > label.selected').removeClass('selected');
			
			$(this).parents('ol').find('li > a.button').remove();
			
			//new selection
			$(this).next().addClass('selected');
			$(this).parent('li').append('<a class="button">Einreichen</a>');
			
			//button functionality
			$('form.box > ul > li > h4 > ol > li > a.button').click(function() {
				feedback($(this).prev().prev(), answer);
				//questionsLeft($(this).prev().prev());
				
				$('#analysis').removeClass('invisible');	
					
			});
		
		} else { //2nd click on label not prev. selected --> feedback
			
			if ($('#analysis').hasClass('invisible')) { //need to check no feedback yet too
				feedback($(this), answer);
				//questionsLeft($(this));
			}
			
	
		}	
		
				
	});
	
	
	
});
