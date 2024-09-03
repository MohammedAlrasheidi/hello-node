document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const generateBtn = document.getElementById('generateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const outputList = document.getElementById('outputList');
    const outputFormatSelect = document.getElementById('outputFormat');

    generateBtn.addEventListener('click', function() {
        generatePhonetic();
    });

    clearBtn.addEventListener('click', function() {
        clearOutput();
    });

    inputText.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            generatePhonetic();
        }
    });

    function generatePhonetic() {
        const text = inputText.value.toUpperCase();
        const outputFormat = outputFormatSelect.value;

        let phonetic;
        if (outputFormat === 'nato') {
            phonetic = generateNato(text);
        }

        displayPhonetic(phonetic);
    }

    function generateNato(text) {
        const natoAlphabet = {
            'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
            'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett',
            'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Ohh Wow',
            'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
            'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee',
            'Z': 'Zulu'
        };
        
        const phoneticArray = [];
        for (let char of text) {
            if (natoAlphabet[char]) {
                phoneticArray.push(natoAlphabet[char]);
            } else {
                phoneticArray.push(char);
            }
        }
        return phoneticArray;
    }

    function displayPhonetic(phonetic) {
        outputList.innerHTML = '';
        phonetic.forEach(function(item) {
            const li = document.createElement('li');
            li.textContent = item;
            outputList.appendChild(li);
        });
    }

    function clearOutput() {
        inputText.value = '';
        outputList.innerHTML = '';
    }
});
