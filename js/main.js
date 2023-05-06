const burger = document.querySelector('.burger')
const buttonsContainer = document.querySelector(".buttonsContainer")
const burgerIcon = document.querySelector(".fa-solid.fa-bars")

// mobile nav button function
burger.addEventListener('click', () => {

    buttonsContainer.classList.toggle('active')
    burgerIcon.classList.toggle('fa-bars')
    burgerIcon.classList.toggle('fa-xmark')
})


// Text interval function
let txtIndex = 0

const languages = document.querySelectorAll('.interval')
console.log(languages);

setTimeout(() => {

    setInterval(changeTextTime, 2000)

    function changeTextTime() {



        switch (txtIndex) {
            case 0:
                languages[4].classList.remove('show')
                languages[0].classList.add('show')
                break;
            case 1:
                languages[0].classList.remove('show')
                languages[1].classList.add('show')
                break;
            case 2:
                languages[1].classList.remove('show')
                languages[2].classList.add('show')
                break;

            case 3:
                languages[2].classList.remove('show')
                languages[3].classList.add('show')
                break;

            case 4:
                languages[3].classList.remove('show')
                languages[4].classList.add('show')
                break;
            default:
                languages[0].classList.add('show')
                break
        }
        // console.log(languages[txtIndex].textContent);
        if (txtIndex < 4) {
            txtIndex++
        } else {
            txtIndex = 0
        }

    }
}, 2000);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('unhidden');
        } /* else {
            entry.target.classList.remove('unhidden')
        } */
    });
});

const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((el) => observer.observe(el));