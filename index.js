// Book class: represent a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// ui class: handle ui tasks
class UI {
  static displayBooks(){
    const books = store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td> <a href="#" class="btn btn-danger btn-sm delete">X</a> </td>
    `;

    list.appendChild(row);
  }
  static deleteBook(el){
    if(el.classList.contains("delete")){
      el.parentElement.parentElement.remove();
    }
  }
  static showAlert(message, className) {
    const div = document.createElement("div")
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    // vanish in 3secs
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }
  static clearFields() {
    document.querySelector("#title").value = " ";
    document.querySelector("#author").value = " ";
    document.querySelector("#isbn").value = " ";
  }
}
// store class:handle storage
class store{
  static getBooks(){
    let books;
    if(localStorage.getItem("books") === null) {
    books = [];
  }else{
    books = JSON.parse(localStorage.getItem("books"));
    }
  return books;
  }
  static addBook(book){
    const books = store.getBooks();

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn){
      const books = store.getBooks();

      books.forEach((book, index) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
      localStorage.setItem("books", JSON.stringify(books));
  }
}

// event:display book
document.addEventListener("DOMContentLoaded", UI.displayBooks);


// event:add a book
document.querySelector("#button").addEventListener("click", addNewBook);

function addNewBook(e) {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // validate input
  if(title === "" || author=== ""|| isbn===""){
    UI.showAlert("Please fill in all the fields", "danger")
  }else{
    // instatiate book
    const book = new Book(title, author, isbn);
    UI.addBookToList(book);

    // add book to store
    store.addBook(book);

    // success message
    UI.showAlert("Submitted", "success")
    // clear fields
    UI.clearFields();
  }

}
// event: remove a book
document.querySelector("#book-list").addEventListener("click", (e) => {
  // remove book from ui
  UI.deleteBook(e.target);

  // remove book from localStorage
  store.removeBook
  (e.target.parentElement.previousElementSibling.textContent);

  UI.showAlert("Book deleted", "success");
});
