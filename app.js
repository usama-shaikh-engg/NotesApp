console.log('Notes app')
showNotes();
// if user add a note, add to a localStorage 

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function(e) {

    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    let myobj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesobj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesobj);
    showNotes();
})

//// function to show element from location 

function showNotes() {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function(element, index) {
        html += `<div class="notecard my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text"> ${element.text}</p>
            <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div> `;
    });

    let notesElem = document.getElementById('notes')
    if (notesobj.length != 0) {
        notesElem.innerHTML = html;
    } else {
        notesElem.innerHTML = `Nothing to show use "Add an Note " Section to add `;
    }

}

/// function to delete note 


function deleteNote(index) {
    // console.log('i am deleting', index);

    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index, 1)
        // confirm('Sure you want to delete')
    localStorage.setItem("notes", JSON.stringify(notesobj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function() {

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired', inputVal);
    let notecards = document.getElementsByClassName('notecard');
    Array.from(notecards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
        // console.log(cardTxt)




    })



})