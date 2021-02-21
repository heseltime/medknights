$('form.box').ready(function(){
	
	//anagram logic
	function allanagrams(string){

	 if(string.length === 0) return [''];
	   var result = {};
	   string.split('').forEach(function(letter,i){
	         var remainingLetters = string.slice(0,i) + string.slice(i+1);
	
	          allanagrams(remainingLetters).forEach(
	              function(anagram){
	          result[letter+anagram] = true;
	});
	});
	       return Object.keys(result);
	       
	}
	
			
	$.get("/static/js/quiz_wf_words_mb_a10a1.txt", function(data) { //FEED FEED FEED
		
		var str = data.split('\n');
		//alert(str);
	
		for (i = 0; i < str.length; i++) {
			$('form.box > ul > li').append('<h2>' + str[i] + '</h2>');
		}
		
		$('#xml_gen').click( function() {
			var doc = document.implementation.createDocument(null,"anagrams",null);
			
			for (i = 0; i < str.length; i++) {
				var problemElement = doc.createElement("problem");
				
				var wordElement = doc.createElement("word");
				var word = doc.createTextNode(str[i]);
				
				wordElement.appendChild(word);
				problemElement.appendChild(wordElement);
				
				var randomAnagramIndecesUsed = [];
				
				for (j = 0; j < 5; j++) { //create 5 discrete anagrams
					var anagramElement = doc.createElement("anagram");
					var anagrams = allanagrams(str[i]);		
					
					var randomAnagramIndex = Math.floor((Math.random() * anagrams.length));
					
					while (randomAnagramIndecesUsed.includes(randomAnagramIndex)) {
						var randomAnagramIndex = Math.floor((Math.random() * anagrams.length));
					}
					
					var randomAnagram = anagrams[randomAnagramIndex];
					randomAnagramIndecesUsed.push(randomAnagramIndex);
					
					var anagram = doc.createTextNode(randomAnagram);
					anagramElement.appendChild(anagram);
					problemElement.appendChild(anagramElement);
				}
				
				
				doc.documentElement.appendChild(problemElement);
			}
			
			//var xml_string = (new XMLSerializer()).serializeToString(doc);
			
			var docHTML = doc.documentElement.outerHTML;
			
			$('form.box > ul').text(docHTML);
		});
		
		
	}, 'text');
	
	
	
});
