// Letters
const letters = "abcdefghijklmnopqrstuvwxyz0123456789"

// Get Array From Letters
let letterArray = Array.from(letters);

// Select Letters Container
let lettercontainer = document.querySelector(".letters");

// Genrate Letters
letterArray.forEach(letter => {

    // Create Span
    let span = document.createElement("span");

    // Create Letter Text Node
    let theLetter = document.createTextNode(letter);

    // Append The Letter To Span
    span.appendChild(theLetter);

    // Add Class On Span
    span.className = 'letter-box'

    // Append Span To The Letters Container
    lettercontainer.appendChild(span);
    
});

// Object Of Words + Categories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Intersteller", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Bahrain", "Qater"],
}

// Get Random Prooerty 

let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Elrment
let lettersGuessContainer = document.querySelector(".letters-guess");

// convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValue);

// Create Span Depened On Word
lettersAndSpace.forEach(letter => {

    // Create Empty Span
    let emptySpan = document.createElement("span");

    // If Letter Is Space
    if (letter === ' ') {

        // Add Class To The Span
        emptySpan.className = 'with-space';
    }

    // Append Span To Letter Guess Container
    lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Span
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
    
    // Set The Chose Status
    let theStatus = false;

    if (e.target.className === 'letter-box') {

        e.target.classList.add("clicked");

        // Get Clicked letter
        let theClickedLetter = e.target.innerHTML;

        // The Chosen Word
        let theChosenWord = Array.from(randomValue.toLowerCase());

        theChosenWord.forEach((wordLetter, WordIndex) => {

            // If The Clicked Letter Equal To One Of The Chosen Word Letter
            if (theClickedLetter == wordLetter) {

                // Set Status To Correct
                theStatus = true;

                // Loop on All Guess Spans
                guessSpans.forEach((span, spanIndex) => {

                    if (WordIndex === spanIndex) {

                        span.innerHTML = theClickedLetter;

                    }
                });
            }
        });


        // If Lettter Is Wrong
        if (theStatus !== true) {

            // Increase The Wrong Attempts
            wrongAttempts++;

            // Add Class Wrong On The Draw Element
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            // Play Fail sound
            document.getElementById("success").play()

            if (wrongAttempts === 8) {

                endGame();

                lettercontainer.classList.add("finished");

            }

        } else {
            // Play Success Sound
            document.getElementById("fail").play()
        }

    }
});

// End Game Function
function endGame() {
    // Create Popup Div
    let div = document.createElement("div");

    // Create Text
    let divText = document.createTextNode(`Game Over, The Word is ${randomValue}`);

    // Append Text To Div
    div.appendChild(divText);

    // Add Class On Div
    div.className = 'popup';

    // Append To The Body
    document.body.appendChild(div);

    document.getElementById("end").play();
}