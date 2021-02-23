let myLibrary = [];
//the constructor
function Book(title, author, pages, pagesLeft, id, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.pagesLeft = pagesLeft;
  this.id = id;
  this.read = read;
  this.info = function () {
    if (this.read == true) return "Finished reading";
    else return "Still in progress";
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
   addBookToLibrary(e), closeForm();
});

function addBookToLibrary(e) {
  e.preventDefault();
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let pagesLeft = document.querySelector("#pagesLeft").value;
  let read = document.querySelector("#read").checked;

  let id = myLibrary.length;
  let newBook = new Book(title, author, pages, pagesLeft, id, read);

  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#pagesLeft").value = "";

  if (
    myLibrary.some((Book) => Book.title === newBook.title) &&
    myLibrary.some((Book) => Book.author === newBook.author)
  ) {
    alert("This already exists in your library");
    document.querySelector("#read").checked = false;
    return false;
  }

  myLibrary.push(newBook);
  document.querySelector("#read").checked = false;
  writeToDisplay();
}
//test values
// const book1 = new Book("The Shining", "Stephen King", 300, 200,0, false);
// const book2 = new Book("Grapes Of Wrath", "John Steinback", 400, 5000,1, false);
// const book3 = new Book("Born for Liberty", "chap Steinback", 400, 5000,2, true);
// myLibrary.push(book1);
// myLibrary.push(book2);
// myLibrary.push(book3);
var container = document.getElementById("container");

function writeToDisplay() {
  for (let i = 0; i < myLibrary.length; i++) {
    var displayCard = document.getElementById("book-card-" + i);
    if (!displayCard) {
      const displayCard = document.createElement("div");
      displayCard.classList.add("book-card");
      displayCard.id = "book-card-" + i;
      displayCard.dataset.indexNumber = i;

      const displayCardTitle = document.createElement("div");
      displayCardTitle.classList.add("display-title");
      displayCardTitle.id = "title-card-" + i;
      displayCardTitle.innerHTML = myLibrary[i].title;
      displayCardTitle.dataset.indexNumber = i;

      const displayCardAuthor = document.createElement("div");
      displayCardAuthor.classList.add("display-author");
      displayCardAuthor.id = "author-card-" + i;
      displayCardAuthor.innerHTML = myLibrary[i].author;

      const displayCardPages = document.createElement("div");
      displayCardPages.classList.add("display-pages");
      displayCardPages.id = "pages-card-" + i;
      displayCardPages.innerHTML = "Pages: " + myLibrary[i].pages;

      const displayCardPagesLeft = document.createElement("div");
      displayCardPagesLeft.classList.add("display-pages-left");
      displayCardPagesLeft.id = "pages-left-card-" + i;
      displayCardPagesLeft.innerHTML = "Pages left: " + myLibrary[i].pagesLeft;

      const displayCardInfo = document.createElement("div");
      displayCardInfo.classList.add("display-info");
      displayCardInfo.id = "info-card-" + i;
      displayCardInfo.innerHTML = myLibrary[i].info();
      displayCardInfo.dataset.indexNumber = i;

      const displayCardButton = document.createElement("button");
      displayCardButton.classList.add("delete-button");
      displayCardButton.id = "delete-card-" + i;
      displayCardButton.innerHTML = "DELETE";
      displayCardButton.dataset.indexNumber = i;

      const displayCardReadButton = document.createElement("button");
      displayCardReadButton.classList.add("read-button");
      displayCardReadButton.id = "read-card-" + i;
      displayCardReadButton.innerHTML = "READ";
      displayCardReadButton.dataset.indexNumber = i;
      if (myLibrary[i].read == true) {
        displayCardReadButton.style.backgroundColor = "#4caf50";
      } else {
        displayCardReadButton.style.backgroundColor = "red";
      }
      container.appendChild(displayCard);
      displayCard.appendChild(displayCardTitle);
      displayCard.appendChild(displayCardAuthor);
      displayCard.appendChild(displayCardPages);
      displayCard.appendChild(displayCardPagesLeft);
      displayCard.appendChild(displayCardInfo);

      displayCard.appendChild(displayCardReadButton);
      displayCard.appendChild(displayCardButton);
    }
  }

  for (let i = 0; i < myLibrary.length; i++) {
    document.getElementById("delete-card-" + i).onclick = function (e) {
      deleteBook(e);
    };
  }
  for (let i = 0; i < myLibrary.length; i++) {
    document.getElementById("read-card-" + i).onclick = function (e) {
      Book.prototype.changeReadStatus(e);
    };
  }
}
Book.prototype.changeReadStatus = function (e) {
  let thisID = e.target.parentNode.dataset.indexNumber;

  displayCardInfo = document.getElementById("info-card-" + thisID);

  if (myLibrary[thisID].read == true) {
    myLibrary[thisID].read = false;
    document.getElementById("read-card-" + thisID).style.backgroundColor =
      "red";
  } else {
    myLibrary[thisID].read = true;
    document.getElementById("read-card-" + thisID).style.backgroundColor =
      "#4caf50";
  }
  document.getElementById("info-card-" + thisID).innerHTML = myLibrary[
    thisID
  ].info();
};

function deleteBook(e) {
  let thisID = e.target.parentNode.dataset.indexNumber;
  // let bookTitle = e.target.parentNode.dataset.title;
  myLibrary = myLibrary.filter((Book) => Book.id != thisID);

  var deleteThis = document.getElementById(e.target.parentNode.id);
  deleteThis.remove();

  var displayCard = document.getElementById("book-card-" + thisID);

  if (!displayCard) {
    myLibrary.pop();
  }
}
