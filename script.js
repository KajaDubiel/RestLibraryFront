
$(document).ready(function() {
	console.log( "ready!" );
	const apiRoot = 'http://localhost:8080/restLibrary/';
	var availableBooks = {};
  var booksAmount = 0;
  
  var booksTable = $('.books');
  // var bookIdTd = $('.bookIdTd');
  // var bookTitleTd = $('.bookTitleTd');
  // var bookAuthorTd = $('.bookAuthorTd');
  // var bookIsbnTd = $('.bookIsbnTd');
  // var bookCopiesTd = $('bookCopiesTd');

  var buttonsBook = "<div class=\"buttons\"><button class=\"btn btn-secondary btn-sm dropdown-toggle button-add-copy\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Add copy </button><div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\"><div class=\"form-group\"><label for=\"exampleDropdownFormEmail2\">Inventory number</label><input type=\"text\" class=\"form-control\" id=\"exampleDropdownFormEmail2\" placeholder=\"Inventory number\"></div></div><button class=\"btn btn-secondary btn-sm dropdown-toggle select-reader\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Select reader</button><div class=\"dropdown-menu\" aria-labelledby\"dropdownMenuButton\"><a class=\"dropdown-item\" href=\"#\">Jan Nowak</a><a class=\"dropdown-item\" href=\"#\">Adam Kowalski</a><a class=\"dropdown-item\" href=\"#\">Monika Malinowska</a></div><button class=\"btn btn-secondary btn-sm\">Delete book</button></div>";

	getAllBooks();

	function getAllBooks(){
		const requestUrl = apiRoot + 'getBooks';
    

		$.ajax({
      	url: requestUrl,
      	method: 'GET',
      	contentType: "application/json",
      	success: function(books){
          
          console.log(books);
          booksAmount = books.length;
          console.log(booksAmount);
          
          generateBookTable(books);
        }
    });

		console.log(availableBooks);
	}

  function generateBookTable(receivedBooks){
    
    var $addButton = $('.button-add-copy').clone(true).children(); //??

    $.each(receivedBooks, function(){
      var result = "";
      result += "<tr><td>" + receivedBooks[0].id + "</td>";
          result += "<td>" + receivedBooks[0].title + "</td>";
          result += "<td>" + receivedBooks[0].author + "</td>";
          result += "<td>" + receivedBooks[0].releaseYear + "</td>";
          result += "<td>" + receivedBooks[0].isbn + "</td>";
          result += "<td>" + receivedBooks[0].copies.length + "</td>";
          result += "<td>" + buttonsBook;
                   + 
          "</td></tr>"; 
          $(".books").append(result);
      // bookIdTd.append(receivedBooks[0].id);
      // bookTitleTd.append(receivedBooks[0].title);
      // bookAuthorTd.append(receivedBooks[0].author);
      // bookIsbnTd.append(receivedBooks[0].isbn);
      // bookCopiesTd.append(receivedBooks[0].copies.length);
      // booksTable.append("<tr>" + bookIsbnTd + bookTitleTd + bookAuthorTd + bookIsbnTd + bookCopiesTd + buttonsBook +"</tr>");

       // receivedBooks.forEach(book => {
       //  console.log(book.title);
       // }) zapętla się tyle razy ile jest książek
        });
  }

  function generateBook(){

      $("#create-book").on("click", function(){
        var bookAuthor = $("#author").val();
        var bookTitle = $("#title").val();
        var bookYear = $("#year").val();
        var bookIsbn = $("#isbn").val();
        alert(bookAuthor + " " + bookTitle + " " + bookYear + " " + bookIsbn);

         $.ajax({
          url: apiRoot + "createBook",
          method: 'POST',
          data: {
            title: bookTitle,
            author: bookAuthor,
            releaseYear: bookYear,
            isbn: bookIsbn 
        }});
      });
     
  }
  generateBook();

});

//tyle wierszy w tabelce ile mamy danych (pustych) generujemy (link)
//zwykły stream z danymi z serwera
//utworzenie książki
//utworzenie readera
//przyciski na koniec przy książce 


