/* This code is checking if there is any data stored in the browser's local storage with the key
"problems". If there is, it retrieves the data and parses it into a JavaScript object, which is then
assigned to the variable `data`. If there is no data stored in the local storage, `data` is
initialized as an empty array. */
let data = [];

if (localStorage.getItem("problems")) {
    data = JSON.parse(localStorage.getItem("problems"));
}

/* This code block is checking if there is any data stored in the `data` array. If there is data, it
creates a card for each item in the array and displays it on the DOM. It also adds a delete button
to each card, which allows the user to remove the corresponding item from the `data` array and the
local storage. If there is no data in the `data` array, it displays a message "No Data Found" on the
DOM. */
if (data.length > 0) {
    //  Create Cards and Show to the Dom
    /* This code block is creating a card for each item in the `data` array and displaying it on the
    DOM. It uses a for loop to iterate through each item in the array and creates a new `div`
    element with the class `problem-card`. Inside this `div`, it creates another `div` element with
    the class `cards` and adds the category, problem, and solution information from the
    corresponding item in the `data` array as `h5` and `h4` elements. It also adds a delete button
    to each card with a `data-index` attribute that corresponds to the index of the item in the
    `data` array. Finally, it appends the newly created card to the `historyCardsContainer` element
    on the DOM. */
    for (let i = 0; i < data.length; i++) {
        let card = document.createElement("div");
        card.classList.add("problem-card");
        card.innerHTML = `
        <div class="cards"> 
            <h5>Category: ${data[i].operation}</h5>
            <h5>Problem: ${data[i].expression}</h5>
            <h4>Solution: ${data[i].result}</h4>
            <button class="deleteBtn delete-btn" data-index="${i}">Delete</button>
        </div>
    `;
        document.getElementById('historyCardsContainer').appendChild(card);
    }

    /* This code block is selecting all the elements with the class name "deleteBtn" using the
    `document.getElementsByClassName()` method and assigning them to the `deleteButtons` variable.
    It then iterates through each element in the `deleteButtons` array using a for loop and adds a
    click event listener to each element. When the user clicks on a delete button, the event
    listener function is triggered. This function retrieves the `data-index` attribute value of the
    clicked button using the `getAttribute()` method and assigns it to the `index` variable. It then
    removes the corresponding item from the `data` array using the `splice()` method and updates the
    local storage with the updated `data` array using the `localStorage.setItem()` method. Finally,
    it removes the parent node of the clicked button from the DOM using the `remove()` method. This
    code block allows the user to delete a specific item from the `data` array and the local storage
    by clicking on the delete button associated with that item. */
    let deleteButtons = document.getElementsByClassName("deleteBtn");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            data.splice(index, 1);
            localStorage.setItem("problems", JSON.stringify(data));
            this.parentNode.remove();
        });
    }
}
/* This code block is executed when there is no data stored in the `data` array. It creates a new `h1`
element with the innerHTML "No Data Found" and appends it to the `historyCardsContainer` element on
the DOM. This message is displayed to the user to indicate that there are no items in the `data`
array to display. */
else {
    let h1 = document.createElement("h1");
    h1.innerHTML = `<h1> No Data Found </h1>`;
    document.getElementById('historyCardsContainer').appendChild(h1);
}

