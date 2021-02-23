// const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
// const book2 = new Book('The Chapening', 'Chappy Smalls', 300, false);
// console.log(book1.info());
// console.log(book2.info());

console.log("hello");
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
    if(this.read === true) return(title +  " by " + author + ", " + pages + " pages read.")
    else return(title +  " by " + author + ", " + pagesLeft + " pages, not read yet.")
    // return (
    //   `${title}<br>` +
    //   `By ${author}<br>` +
    //   `Pages read: ${pages}` +
    //   `<br>Pages left: ${pagesLeft}`
    // );
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
  // let read = document.querySelector("#read").value;

  let id = myLibrary.length;
  let newBook = new Book(title, author, pages, pagesLeft, id);

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
  // console.log("newBook.id: " + newBook.id)

  myLibrary.push(newBook);

  writeToDisplay();
}

const book1 = new Book("The Shining", "Stephen King", 300, 200,0, false);
const book2 = new Book("Grapes Of Wrath", "John Steinback", 400, 5000,1, false);
const book3 = new Book("Born for Liberty", "chap Steinback", 400, 5000,2, true);
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
var container = document.getElementById("container");

function writeToDisplay() {
  for (let i = 0; i < myLibrary.length; i++) {
    var displayCard = document.getElementById("book-card-" + i);
    console.log("display card: " + displayCard);
    if (!displayCard) {
      const displayCard = document.createElement("div");
      displayCard.classList.add("book-card");
      displayCard.id = "book-card-" + i;
      displayCard.dataset.indexNumber = i ;
      // displayCard.innerHTML = myLibrary[i].title;
      
      const displayCardTitle = document.createElement("div");
      displayCardTitle.classList.add("display-title");
      displayCardTitle.id = "title-card-" + i;
      displayCardTitle.innerHTML = myLibrary[i].title;
      displayCardTitle.dataset.indexNumber = i ;


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
      displayCardInfo.dataset.indexNumber = i ;

      const displayCardButton = document.createElement("button");
      displayCardButton.classList.add("delete-button");
      displayCardButton.id = "delete-card-" + i;
      displayCardButton.innerHTML = "DELETE";
      displayCardButton.dataset.indexNumber = i ;

      const displayCardReadButton = document.createElement("button");
      displayCardReadButton.classList.add("read-button");
      displayCardReadButton.id = "read-card-" + i;
      displayCardReadButton.innerHTML = "READ";
      displayCardReadButton.dataset.indexNumber = i ;

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
  // const deleteBookBtn = document.getElementsByClassName("delete-button");

  for(let i = 0 ; i < myLibrary.length ; i++){
    document.getElementById("delete-card-"+i).onclick = function(e){
      deleteBook(e)
      // alert(e.target.parentNode.id);
    }
    
  }
  for(let i = 0 ; i < myLibrary.length ; i++){
    document.getElementById("read-card-"+i).onclick = function(e){
      console.log('clicled'),
      Book.prototype.changeReadStatus(e);
      // Add the showNameAndColor method to the Plant prototype property
   
  }
  
      // alert(e.target.parentNode.id);
    }
    
  }
Book.prototype.changeReadStatus =  function (e) {
  let thisID =  e.target.parentNode.dataset.indexNumber;
 console.log("thisID: " + thisID);
  displayCardInfo = document.getElementById("info-card-"+thisID);

  if(myLibrary[thisID].read==true){
    myLibrary[thisID].read = false ;
  } else {
    myLibrary[thisID].read = true;
  }
  document.getElementById("info-card-"+thisID).innerHTML =  myLibrary[thisID].info();

   }


writeToDisplay();

// var deleteBookBtn = document.getElementById('book-card-0');
// deleteBookBtn.addEventListener("click", (e) => {
//       deleteBook(e)
     
//     });

// You will need to associate your DOM elements with the actual book objects in some way. 
// One easy solution is giving them a data-attribute that corresponds to the index of the library array.
function deleteBook(e){
  
  let thisID =  e.target.parentNode.dataset.indexNumber;
  console.log("thisID: " + thisID);
  let bookTitle = e.target.parentNode.dataset.title;
  console.log("bookTitle: " + bookTitle);
  myLibrary = myLibrary.filter((Book) => Book.id != thisID);

 console.log(myLibrary)

 var deleteThis = document.getElementById(e.target.parentNode.id)
 deleteThis.remove()

 var displayCard = document.getElementById("book-card-" + thisID);

 if (!displayCard){
   myLibrary.pop();
 }
// var displayCard = document.getElementsByClassName('book-card');
  //  console.log("book: " + e.srcElement.id)
  //  console.log("book: " + e.srcElement.displayCard.id)

//   console.log(displayCard)
//   let thisID = e.srcElement.id.replace(/\D/g, "");
//   console.log(displayCard[thisID].innerHTML)
//   let bookTitle = displayCard[thisID].innerHTML;
// console.log(displayCard[thisID].innerHTML)
 
//   console.log("displayCard: " + displayCard)
//   console.log("dis" + displayCard[thisID])
//   console.log("thisID: " +thisID)
//   // var displayCard = document.getElementsByClassName('book-card');
//   //search for < index then parse
 
  
//   // bookTitle = displayCard[thisID].innerHTML.substring(0,10);

//   let strIndex = bookTitle.search('<');
//   bookTitle = displayCard[thisID].innerHTML.substring(0, strIndex);
//   console.log("strIndex: " + strIndex)
//  console.log(bookTitle)
// // console.log(JSON.stringify(e.target))
//   myLibrary = myLibrary.filter((Book) => Book.title != bookTitle);
//   console.log(myLibrary)
//   var deleteThis = document.getElementById(e.srcElement.id)
//   deleteThis.remove()
}