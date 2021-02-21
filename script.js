// const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
// const book2 = new Book('The Chapening', 'Chappy Smalls', 300, false);
// console.log(book1.info());
// console.log(book2.info());

console.log("hello");
let myLibrary = [];
//the constructor

function Book(title, author, pages, pagesLeft) {
  this.title = title;
  this.author = author;

  this.pages = pages;
  this.pagesLeft = pagesLeft;
  this.info = function () {
    return (
      `${title},<br>` +
      `By ${author}<br>` +
      `Pages read: ${pages}` +
      `<br>Pages left: ${pagesLeft}`
    );
  };
}

const addBookBtn = document.querySelector("[new-book]");
addBookBtn.addEventListener("click", (button) => {
  openForm();
});
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

const form = document.querySelector(".form-container");
form.addEventListener("submit", (e) => {
  console.log("clicked"), addBookToLibrary(e), closeForm();
});

function addBookToLibrary(e) {
  e.preventDefault();
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let pagesLeft = document.querySelector("#pagesLeft").value;
  let newBook = new Book(title, author, pages, pagesLeft);

  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#pagesLeft").value = "";
  if (
    myLibrary.some((Book) => Book.title === newBook.title) &&
    myLibrary.some((Book) => Book.author === newBook.author)
  ) {
    alert("This already exists in your library");
    return false;
  }

  myLibrary.push(newBook);

  writeToDisplay();
}

const book1 = new Book("The Shining", "Stephen King", 300, 200);
const book2 = new Book("Grapes Of Wrath", "John Steinback", 400, 5000);
myLibrary.push(book1);
myLibrary.push(book2);

var container = document.getElementById("container");

function writeToDisplay() {
  for (let i = 0; i < myLibrary.length; i++) {
    var displayCard = document.getElementById("book-card-" + i);
    console.log("display card: " + displayCard);
    if (!displayCard) {
      const displayCard = document.createElement("div");
      displayCard.classList.add("book-card");
      displayCard.id = "book-card-" + i;
      displayCard.innerHTML = myLibrary[i].info();
      

      const displayCardButton = document.createElement("button");
      displayCardButton.classList.add("book-card-button");
     
      displayCardButton.innerHTML = "DELETE";

      container.appendChild(displayCard);

      displayCard.appendChild(displayCardButton);
    }

    
  }

  
}
writeToDisplay();

