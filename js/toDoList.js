/* Bugi i niedokończone funkcje zostawione do dyskusji.

 Sortowanie i wyszukiwanie działa tylko na tablicach wewnątrz programu
 nie są wyświetlane (sortowanie niszczy strukturę notatek)

 console logi zostawione by łatwiej byłoby się przyjzeć zmianą jakie zachodzą.

 W ostatecznym programie były by oczywiście wyrzucone takie rzeczy :)
*/

const addButton = document.querySelector('.addButton');
const mainInput = document.querySelector('.mainInput');
const ul = document.querySelector('ul');
const sortAlphButton = document.querySelector('.sortAlphButton');
const sortIcon = document.getElementById('sortIcon');
const header = document.querySelector('.header');
const listName = document.querySelector('.listName');
const searchBar = document.querySelector('.searchBar');
const searchForm = document.querySelector('.searchForm');
const searchButton = document.querySelector('.searchButton');


// Array for storing notes
let notes = [];


/*      Function that adds note;
        it also contains all other functions
        that are stored in created <li>               */

addNote = (e) => {
    e.preventDefault();

    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const form = document.createElement('form');
    const textarea = document.createElement('textarea');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const iconEdit = document.createElement('i');
    const iconTrash = document.createElement('i');

    /*      Adding elements to ul        */

    // Prevent adding empty task
    if (mainInput.value == '') {

        alert('Empty note. Add a task.');
    } else {

        ul.appendChild(li);

        // Timeout trick for working animation
        setTimeout(() => {
            li.style.opacity = '1';
        }, 5);

        li.appendChild(checkbox);
        checkbox.type = 'checkbox';

        li.appendChild(form);

        form.appendChild(textarea);

        notes.push(mainInput.value);
        console.log(`Notes: ${notes}`);

        // Resize function for textarea - not resizing back :(
        function autoResize(e) {
            e.preventDefault();
            this.style.height = this.scrollHeight + 'px';
        };
        textarea.addEventListener('input', autoResize, false);

        function preventEnter(e) {
            // Enter press
            if (e.keyCode == 13) {
                e.preventDefault();
            }
        };
        textarea.addEventListener('keydown', preventEnter);


        for (let i = 0; i < textarea.length; i++) {
            textarea[i].setAttribute("style", "height:" + (textarea[i].scrollHeight) + "px;overflow-y:hidden;");
            textarea[i].addEventListener("input", OnInput, false);
        };

        function OnInput() {
            this.style.height = 0;
            this.style.height = (this.scrollHeight) + "px";
        };

        // Getting the index of an array element
        textarea.value = notes[notes.length - 1];
        textarea.readOnly = true;


        // Adding Edit Button
        li.appendChild(editButton);
        editButton.className = 'editButton';
        editButton.title = 'Edit note'
        editButton.appendChild(iconEdit);
        iconEdit.className = 'fa-solid fa-pen';


        // Adding Delete Button
        li.appendChild(deleteButton);
        deleteButton.className = 'deleteButton';
        deleteButton.title = 'Delete note'
        deleteButton.appendChild(iconTrash);
        iconTrash.className = 'fa-solid fa-trash-can';

        //Clearing the input after adding to list
        mainInput.value = '';
    };

    /*      End of adding note function     */


    /*     Adding Edit function to Edit Button     */

    //Variable for changing button function
    let switchEdit = true;

    //Variable holding the array index for function
    let index;

    editNote = () => {
        if (switchEdit) {

            //Getting the index of array that we want to operate on
            index = notes.indexOf(textarea.value);
            console.log(`index tej notatki to ${index}`);

            textarea.readOnly = false;
            textarea.focus();

            //Changing the function of the button
            switchEdit = !switchEdit;
        } else {

            // Change the array's element at given index if it isn't -1
            if (index !== -1) {
                notes[index] = textarea.value;
            };
            textarea.readOnly = true;
            switchEdit = !switchEdit;
            console.log(notes);
            console.log(index);
        };
    };
    editButton.addEventListener('click', editNote);


    /*      Adding delete function to Delete Button     */

    deleteNote = () => {

        // Getting the index to operate on
        let index = notes.indexOf(textarea.value);

        // Deleting the item at given index
        notes.splice(index, 1);
        console.log(notes);

        // Sliding animation
        li.style.transform = 'translateX(100vw)';

        // Removing the item after transition time
        setTimeout(() => {
            li.remove();
        }, "450");
    };

    deleteButton.addEventListener('click', deleteNote);


    /*      Adding Sort Button function      */
    /*      WORKS ONLY ON ARRAY - BUGGED       */


    let ascendSort = false;


    sortNotes = () => {
        let build = "";
        let sortedNotes;

        ascendSort = !ascendSort;

        if (ascendSort) {

            sortedNotes = notes.sort();
            console.log(sortedNotes);
            sortIcon.classList = 'fa-solid fa-arrow-down-a-z fa-xl';

        } else {
            sortedNotes = notes.sort().reverse();
            console.log(sortedNotes);
            sortIcon.classList = 'fa-solid fa-arrow-up-a-z fa-xl';
        }

        sortedNotes.forEach((item) => {

            build = li;
            let i = 0;
            editButton.prepend(checkbox)
            // li.appendChild(checkbox);
            checkbox.type = 'checkbox';

            li.appendChild(form);

            form.appendChild(textarea);
            textarea.value = sortedNotes[item];
        });
        ul.appendChild(build);
    }
    sortAlphButton.addEventListener('click', sortNotes);
}

nameList = (e) => {
    e.preventDefault();
}


/*      Add Searchbar Function      */
/*      WORKS ONLY ON ARRAY - NO DISPLAY       */

function search(e) {
    e.preventDefault();
    console.log(e.target.value.toLowerCase());

    let temp = '';
    const result = notes.filter(item => item.toLowerCase().includes(e.target.value.toLowerCase()));

    console.log(result);
    if (result.length > 0) {

    }

}

searchForm.addEventListener('input', search);
header.addEventListener('submit', nameList);
addButton.addEventListener('click', addNote);