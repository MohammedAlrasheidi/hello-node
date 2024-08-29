<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Phonetic Generator</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#generateBtn').click(function() {
                var text = $('#inputText').val();
                var heroPhonetic = generateHero(text);
                var fantasyPhonetic = generateFantasy(text);
                
                $('#output').html('<strong>Heroic:</strong> ' + heroPhonetic + '<br> <strong>Fantasy:</strong> ' + fantasyPhonetic);
            });

            // Clear button functionality
            $('#clearBtn').click(function() {
                $('#inputText').val('');
                $('#output').empty(); 
            });

            // Heroic alphabet
            function generateHero(text) {
                var heroAlph = {
                    'A': 'Apollo',
                    'B': 'Blade',
                    'C': 'Cyclone',
                    'D': 'Dynamo',
                    'E': 'Eagle',
                    'F': 'Falcon',
                    'G': 'Gladiator',
                    'H': 'Hawk',
                    'I': 'Inferno',
                    'J': 'Justice',
                    'K': 'Knight',
                    'L': 'Lionheart',
                    'M': 'Maverick',
                    'N': 'Nemesis',
                    'O': 'Oracle',
                    'P': 'Phoenix',
                    'Q': 'Quasar',
                    'R': 'Ranger',
                    'S': 'Shadow',
                    'T': 'Titan',
                    'U': 'Ultimo',
                    'V': 'Vortex',
                    'W': 'Warrior',
                    'X': 'Xenon',
                    'Y': 'Yukon',
                    'Z': 'Zephyr'
                };

                var upperText = text.toUpperCase();
                var phonetic = '';

                for (var i = 0; i < upperText.length; i++) {
                    var char = upperText[i];
                    if (heroAlph[char]) {
                        phonetic += heroAlph[char] + ' ';
                    } else {
                        phonetic += char + ' ';
                    }
                }

                return phonetic.trim();
            }

            // Fantasy alphabet
            function generateFantasy(text) {
                var fantasyAlph = {
                    'A': 'Ariel',
                    'B': 'Balthazar',
                    'C': 'Cassandra',
                    'D': 'Drake',
                    'E': 'Elara',
                    'F': 'Frost',
                    'G': 'Gondor',
                    'H': 'Hera',
                    'I': 'Isolde',
                    'J': 'Jareth',
                    'K': 'Kara',
                    'L': 'Lyria',
                    'M': 'Merlin',
                    'N': 'Nyx',
                    'O': 'Orion',
                    'P': 'Perseus',
                    'Q': 'Quinn',
                    'R': 'Raven',
                    'S': 'Selene',
                    'T': 'Thorne',
                    'U': 'Ulysses',
                    'V': 'Valkyrie',
                    'W': 'Wraith',
                    'X': 'Xander',
                    'Y': 'Yara',
                    'Z': 'Zeus'
                };

                var upperText = text.toUpperCase();
                var phonetic = '';

                for (var i = 0; i < upperText.length; i++) {
                    var char = upperText[i];
                    if (fantasyAlph[char]) {
                        phonetic += fantasyAlph[char] + ' ';
                    } else {
                        phonetic += char + ' ';
                    }
                }

                return phonetic.trim();
            }
        });
    </script>
</head>
<body>
    <h1>Phonetic Alphabet Generator</h1>
    <input type="text" id="inputText" placeholder="Enter text here">
    <button id="generateBtn">Generate Phonetics</button>
    <button id="clearBtn">Clear</button>
    <div id="output"></div>
</body>
</html>
