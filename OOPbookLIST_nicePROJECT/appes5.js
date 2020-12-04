// Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
// this is empty function
function UI(){}

UI.prototype.addBooktoList = function(book){
  // console.log(book);
  // for book list at tbody
  const list = document.getElementById('book-list');
  // create tr Element
  const row = document.createElement('tr');
  
  // insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">Delete</a></td>
  `;
  list.appendChild(row)
  // console.log(row);
}
// Show alert prototype
UI.prototype.showAlert = function(message, className){
  //create div
  const div = document.createElement("div");
  // Add className
  div.className = `alert ${className}`;
  // Add textnode
  div.appendChild(document.createTextNode(message));
  // get parent
  const container = document.querySelector(".container");
  // get form
  const form = document.querySelector("#book-form");
  // insert alert
  container.insertBefore(div, form);
  // after 3 sec
  setTimeout(function(){
    document.querySelector(".alert").remove();
   },3000);
  }
// Delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
}
// Clear Fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value  = '';
}
// Event Listeners
document.getElementById('book-form').addEventListener('submit',function(e){
  //  Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value
  // console.log(isbn);

  // intatiating book, after initializing function, book becomes object 
  const book = new Book(title, author,isbn);

  //Instantiate UI
  const ui = new UI();
  // validation
  if(title == "" | author == "" | isbn == ""){
    // console.log('alert');
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
     // Add book to list is created as prototype at top
    ui.addBooktoList(book);
    
    // Show success
    ui.showAlert("Book Added Successfully", "success")
    
    // Clear fields 
    ui.clearFields();
  }

 

  // console.log(ui);
  e.preventDefault();
});
 
// Event listener for delete
// when dynamically added class to HTML , we have to use Event delegation
document.getElementById("book-list").addEventListener("click", function(e){
  // console.log('12223');
  const ui = new UI();
  ui.deleteBook(e.target);

  //Show alert
  ui.showAlert("Book removed!", "success")

  e.preventDefault();
})