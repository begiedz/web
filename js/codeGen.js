/* Pobranie elementów z HTML  */
const generator = document.querySelector('.generator');
const reset = document.querySelector('.reset');
const chars = 'ABCDEFGHIJKLMNOPQERSTUWXYZ0123456789';
// const span = document.querySelector('span');

const lengthInput = document.querySelector('.lengthInput');
const quantityInput = document.querySelector('.quantityInput');

const lengthButton = document.querySelector('.lengthButton');
const quantityButton = document.querySelector('.quantityButton');


/* zmienne odpowiedzialna ze ilość kodów i długość kodu*/
let codeQuantity = 100;
let codeLength = 10;



/* stworzenie tablicy która będzie przechowywać kody */
const codes = [];


/* stworzenie zmiennej divs która stanie się nodelistą potrzebną do usunięcia elementów z documentu. Będzie gormadzić divy z kodami stworzone na stronie */
let divs;

/* zmienna boolean która zablokuje nam możliwość generacji kolejnych kodów, potrzebna do ifa.
Naprawia do problem z dodaniem kodu np. jak klikniemy przycisk 2x - po tym przycisk reset czyści nam tylko jedną część kodów, ale czyści całą tablicę, przez co wyświetla już nie istniejące kody. Ta zmienna boolean zapobiega dodaniu kolejnych kodów niż te dodane w zmiennej codeQuantity */
let generate = true;




enterQuantity = (e) => {
    e.preventDefault()
    codeQuantity = quantityInput.value
    console.log('enterQuantity');
    // quantityInput.value = '';
};


enterLength = (e) => {
    e.preventDefault()
    codeLength = lengthInput.value
    console.log('enterLength');
    // lengthInput.value = '';
};


generator.textContent = `${generator.textContent} - ${codeQuantity}x`;

/* 
Funkcja codesGenerator która:
1.Stworzy nam kod
2.Stworzy go określoną w zmiennej globalnej ilość razy np.1000
3.Doda dane do strony
*/


/* #2 funkcja która dodaje kody podaną ilość razy w zmiennej globalnej codeQuantity */
function codesGenerator() {

    if (generate) {
        for (let i = 0; i < codeQuantity; i++) {

            let randomChars = '';
            let codeContent = '';

            /* #1 funkcja która tworzy nam kod o długości znaków podanej w zmiennej codeLenght */
            for (let j = 0; j < codeLength; j++) {

                randomChars = chars.charAt(Math.random() * chars.length);
                codeContent = codeContent + randomChars;
            };

            /* #3 dodanie danych do strony */
            const divElement = document.createElement('div');

            /* co każde okrążenie pętli kody będą się dodawać do tablicy */
            codes.push(codeContent)

            /* textContent każdego diva będzie się równać z indexem w tablicy */
            divElement.textContent = codes[i];

            /* dodanie diva z kodem do dokumentu */
            document.body.appendChild(divElement);
        };

        /* wyświetlenie kodów z tablicy codes w konsoli */
        console.log(codes);

        /* zablokowanie generowania większej ilości kodów */
        generate = false
    };
};



/* funkcja która będzie czyścić nam tablicę oraz kody na stronie */
function resetCodes() {

    /* stworzenie nodelisty ze wszyskimi divami na stronie*/
    divs = document.querySelectorAll('div');
    // console.log(divs);

    /* Pętla for która usunie wszystkie divy na stronie, biorąc wielkość ze zmiennej globalnej codeQuantity*/
    for (let i = 0; i < codeQuantity; i++) {
        divs[i].remove()
    };

    /* Zerowanie tablicy codes */
    codes.length = 0;
    console.log(codes);

    generate = true
};




/* 
Nasłuchiwanie na przycisk
*/
generator.addEventListener('click', codesGenerator);
reset.addEventListener('click', resetCodes);

lengthButton.addEventListener('click', enterLength);
quantityButton.addEventListener('click', enterQuantity);