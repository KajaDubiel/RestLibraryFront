
$(document).ready(function() {
	console.log( "ready!" );
	//const apiRoot = 'http://localhost:8080/restLibrary/';
  const apiRoot = 'https://sheltered-scrubland-57989.herokuapp.com/restLibrary/';
	var availableBooks = {};
  var booksAmount = 0;
  var readersAmount = 0;
  var availableReaders = {};
  
  var booksTable = $('.books');

  var buttonsBook = "<div class=\"buttons\"><button class=\"btn btn-secondary btn-sm dropdown-toggle button-add-copy\" type=\"button\" id=\"dropdownMenuButtonCopy\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Add copy </button><div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButtonCopy\"><div class=\"form-group\"><label for=\"inventoryNumber\">Inventory number</label><input type=\"text\" class=\"form-control\" id=\"inventoryNumber\" placeholder=\"Inventory number\"></div></div><div class=\"dropdown\"><button class=\"btn btn-secondary btn-sm dropdown-toggle select-reader\" type=\"button\" id=\"dropdownMenuButtonReader\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Select reader</button><div class=\"dropdown-menu\" aria-labelledby\"dropdownMenuButtonSelectReader\"><a class=\"dropdown-item\" href=\"#\">Jan Nowak</a><a class=\"dropdown-item\" href=\"#\">Adam Kowalski</a><a class=\"dropdown-item\" href=\"#\">Monika Malinowska</a></div></div><button class=\"btn btn-secondary btn-sm delete-book-button\">Delete book</button></div>";

  var buttonsReader = "<div class=\"buttons\"><button class=\"btn btn-secondary btn-sm dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Edit</button><div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\"><div class=\"form-group\"><label for=\"exampleDropdownFormEmail2\">First Name</label><input type=\"text\" class=\"form-control\" id=\"exampleDropdownFormEmail2\" placeholder=\"First name\"></div><div class=\"form-group\"><label for=\"exampleDropdownFormEmail2\">Last Name</label><input type=\"text\" class=\"form-control\" id=\"exampleDropdownFormEmail2\" placeholder=\"Last name\"></div><div class=\"form-group\"><label for=\"exampleDropdownFormEmail2\">Birth date</label><input type=\"text\" class=\"form-control\" id=\"exampleDropdownFormEmail2\" placeholder=\"Birth date\"></div><div class=\"button btn-secondary btn-sm\">Submit</div></div><!--RETURN COPY OF BOOK--><div class=\"dropdown\"><button class=\"btn btn-secondary btn-sm dropdown-toggle\" type=\"button\" id=\"return-copy\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Return copy</button><div class=\"dropdown-menu\" aria-labelledby=\"return-copy\"><a class=\"dropdown-item\" href=\"#\">353475</a></div></div><button class=\"btn btn-secondary btn-sm delete-reader-button\">Delete reader</button></div>";

	getAllBooks();
  getAllReaders();

	function getAllBooks(){
		const requestUrl = apiRoot + 'getBooks';

		$.ajax({
      	url: requestUrl,
      	method: 'GET',
      	contentType: "application/json",
      	success: function(books){
          
          console.log(books);
          booksAmount = books.length;
          console.log("Books amount: " + booksAmount);
          
          generateBookTable(books);
        }
    });

		console.log(availableBooks);
	}

  function generateBookTable(receivedBooks){

    for(var i = 0; i<receivedBooks.length; i++){
       var result = "";
          result += "<tr><td class =\"bookIdTd\">" + receivedBooks[i].id + "</td>";
          result += "<td class = \"bookTitleTd\">" + receivedBooks[i].title + "</td>";
          result += "<td class = \"bookAuthorTd\">" + receivedBooks[i].author + "</td>";
          result += "<td class = \"bookYearTd\">" + receivedBooks[i].releaseYear + "</td>";
          result += "<td class = \"bookIsbnTd\">" + receivedBooks[i].isbn + "</td>";
          result += "<td class = \"bookCopiesTd\">" + receivedBooks[i].copies.length + "</td>";
          result += "<td>" + buttonsBook + "</td></tr>";
          $(".books").append(result);
           
    }
  }

  function generateBookRequest(){

      $("#create-book").on("click", function(){
        var bookAuthor = $("#author").val();
        var bookTitle = $("#title").val();
        var bookYear = $("#year").val();
        var bookIsbn = $("#isbn").val();
        // alert("New Book: Author: " + bookAuthor + ", title: " + bookTitle + ", release Year: " + bookYear + ", ISBN: " + bookIsbn + " has been succesfully created");

         $.ajax({
          url: apiRoot + "createBook",
          method: 'POST',
          contentType: "application/json; charset=utf-8",
          dataType: 'json',
          data: JSON.stringify({
          title: bookTitle,
          author: bookAuthor,
          releaseYear: bookYear,
          isbn: bookIsbn 
          }),
          complete: function(data) {
          if(data.status === 200) {
            location.reload();
          }
         }
      });
      });
  }
  generateBookRequest();

  function deleteBookRequest(){
   $(document).on("click", '.delete-book-button', function(){
      const requestUrl = apiRoot + 'deleteBook';
      var selectedBookId = $(this).closest("tr").find('.bookIdTd').html();//SUCCESS!!!!
      console.log("Selected book: " + selectedBookId);

      $.ajax({
      url: requestUrl + "?" + $.param({bookId: selectedBookId}),
      type: 'delete',
      method: 'DELETE',
      success: function() {
         correct: $(this).closest("tr").remove();
         location.reload();
      }
    });
   });
  }
  deleteBookRequest();


//READERS
  function getAllReaders(){
      const requestUrl = apiRoot + 'getReaders';

      $.ajax({
        url: requestUrl,
        method: 'GET',
        contentType: "application/json",
        success: function(readers){
          
          console.log(readers);
          readersAmount = readers.length;
          console.log("Readers amount: " + readersAmount);
          
          generateReadersTable(readers);
        }
    });
  }

  function generateReadersTable(receivedReaders){
     for(var i = 0; i<receivedReaders.length; i++){
       var result = "";
          result += "<tr><td class =\"readerId\">" + receivedReaders[i].id + "</td>";
          result += "<td class = \"readerFirstName\">" + receivedReaders[i].firstName + "</td>";
          result += "<td class = \"readerLastName\">" + receivedReaders[i].lastName + "</td>";
          result += "<td class = \"readerEmail\">" + receivedReaders[i].readerEmail + "</td>";
          result += "<td class = \"readerBirthDate\">" + receivedReaders[i].birthDate + "</td>";
          result += "<td class = \"readerBorrows\">" + receivedReaders[i].borrows.length + "</td>";
          result += "<td>" + buttonsReader + "</td></tr>";
          $(".readers").append(result);
           
    }
  }

  function generateReaderRequest(){
  $("#create-reader").on("click", function(){
        var readerFirstName = $("#first-name").val();
        var readerLastName = $("#last-name").val();
        var readerBirthDate = $("#birth-date").val();
        var readerEmail = $("#user-email").val();

        //date

      var date = $("#birth-date").val();
      console.log(date);

        //alert(readerFirstName + " " + readerLastName + " "  + readerEmail + " " + date);


        $.ajax({
          url: apiRoot + "createReader",
          method: 'POST',
          contentType: "application/json; charset=utf-8",
          dataType: 'json',
          data: JSON.stringify({
          firstName: readerFirstName,
          lastName: readerLastName,
          birthDate: readerBirthDate,
          readerEmail: readerEmail
          }),
          complete: function(data) {
          if(data.status === 200) {
           location.reload();//some troubles

          }
         }
      });
      });
  
  }
  generateReaderRequest();

  function deleteReaderRequest(){
   $(document).on("click", '.delete-reader-button', function(){
      const requestUrl = apiRoot + 'deleteReader';
      var selectedReaderId = $(this).closest("tr").find('.readerId').html();//SUCCESS!!!!
      console.log("Selected book: " + selectedReaderId);

      $.ajax({
      url: requestUrl + "?" + $.param({readerId: selectedReaderId}),
      type: 'delete',
      method: 'DELETE',
      success: function() {
        correct: $(this).closest("tr").remove();
        location.reload();
      }
    });
   });
  }
  deleteReaderRequest();


});

//tyle wierszy w tabelce ile mamy danych (pustych) generujemy (link)
//zwykły stream z danymi z serwera
//utworzenie książki
//utworzenie readera
//przyciski na koniec przy książce 


