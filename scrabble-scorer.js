// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let userWord = '';

   //////////
   // Do while loop validates the user's input
   // Checks for numbers, symbols and an empty string

   do {
      userWord = input.question("Enter a word to score: ").trim();
   } while (containsNumbersOrSymbols(userWord) || !userWord.length);
   
   return userWord;
};

function containsNumbersOrSymbols(word) {
   let charCode = null;
   word = word.toLowerCase();

   /////////
   // For loop converts each character to its ASCII decimal value
   // Checks to see whether the value is outside the range of a - z or the space character
   for (let i = 0; i < word.length; i++) {
      charCode = word.charCodeAt(i);

      if ((charCode < 97 || charCode > 122) && charCode !== 32) {
         return true;
      }
   }

   return false;
};

let newPointStructure = transform(oldPointStructure);

/////////
// Bonus Part 2
// addes a space character key/value pair into the newPointStructure
newPointStructure[' '] = 0;

let simpleScorer = function(word) {
   return word.length;
};

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let vowelScore = 0;
   let vowelArr = ['A', 'E', 'I', 'O', 'U'];

   /////////
   // Loops through the user's word to see if any of the characters are included in the vowel array
   for (let i = 0; i < word.length; i++) {
      if (vowelArr.includes(word[i])) {
         vowelScore += 3;
      } else {
         vowelScore += 1;
      }
   }

   return vowelScore;
};

let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let scrabbleScore = 0;

   for (let i = 0; i < word.length; i++) {
      scrabbleScore += newPointStructure[word[i]];
   }

   return scrabbleScore;
};

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?\n")

   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses scrabble point system");

   let selectedScorer = null;

   do {
      selectedScorer = input.question("Enter 0, 1, or 2: ");
      //console.log(selectedScorer);
   } while ((selectedScorer < 0 || selectedScorer > 2) || !selectedScorer.length);
   
   return scoringAlgorithms[selectedScorer];
};

function transform(pointStructureToTransform) {
   let transformedStructure = {};

   let tempLetter = '';

   /////////
   // Loops through each key/value pair in the oldPointStructure
   // Inner loop loops through each letter in the value
   //    Stores current letter in a temp variable
   //    Creates new key/value pair in the transformedStructure object
   for (pointValue in oldPointStructure) {
      for (let i = 0; i < oldPointStructure[pointValue].length; i++) {
         tempLetter = oldPointStructure[pointValue][i].toLowerCase();
         transformedStructure[tempLetter] = Number(pointValue);
      }
   }

   return transformedStructure;
};

function runProgram() {
   let wordToScore = initialPrompt(); 
   let userSelectedScorer = scorerPrompt();
   let score = userSelectedScorer.scorerFunction(wordToScore);

   console.log(`Score for '${wordToScore}': ${score}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
