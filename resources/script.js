
$(document).ready(function() {
	console.log( "ready!" );
	//const apiRoot = 'http://localhost:8080/restLibrary/';
  const apiRoot = 'https://sheltered-scrubland-57989.herokuapp.com/restLibrary/';
  var availableBooks = {};
  var booksAmount = 0;
  var readersAmount = 0;
  var availableReaders = {};
  
  var booksTable = $('.books');

  var buttonsBook = '<div class=\"buttons\"> <button type="button" class="btn btn-secondary btn-sm add-copy" data-toggle="modal" data-target="#add-copy">Add copy</button><!-- Modal --><div class="modal fade" id="add-copy" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Add copy</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><form><div class="form-group"><label for="insert-inventory-num" class="col-form-label">Inventory number:</label><input type="text" class="form-control" id="insert-inventory-num"></div></form></div><div class="modal-footer"><button type="button" class="btn btn-secondary close-add-copy" data-dismiss="modal">Close</button><button type="button" class="btn btn-secondary save-add-copy">Save changes</button></div></div></div></div><div class=\"dropdown\"><button class=\"btn btn-secondary btn-sm dropdown-toggle select-reader\" type=\"button\" id=\"dropdownMenuButtonReader\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Select reader</button><div class=\"dropdown-menu readers-list\" aria-labelledby=\"dropdownMenuButtonReader\">No readers</div></div><button class=\"btn btn-secondary btn-sm delete-book-button\">Delete book</button></div>';


  var buttonsReader = '<div class="buttons"><button type="button" class="btn btn-secondary btn-sm edit-reader" data-toggle="modal" data-target="#exampleModal">Edit</button><div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="edit-reader">Edit reader</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><form><div class="form-group"><label for="reader-first-name-update" class="col-form-label">First name</label><input type="text" class="form-control" id="reader-first-name-update"></div><div class="form-group"><label for="reader-last-name-update" class="col-form-label">Last name</label><input type="text" class="form-control" id="reader-last-name-update"></input></div><div class="form-group"><label for="birth-date-update" class="col-3 col-form-label">Birth date</label><input class="form-control" type="date" placeholder="Birth date" id="birth-date-update"></div><div class="form-group"><label for="reader-email-update" class="col-form-label">Email</label><input type="email" class="form-control" id="reader-email-update"></input></div></form></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary save-changes">Save</button></div></div></div></div><!--RETURN COPY OF BOOK--><div class = "dropdown"><button class="btn btn-secondary btn-sm dropdown-toggle return-copy" type="button" id="return-copy" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Return copy</button><div class="dropdown-menu copies-list" aria-labelledby="return-copy"><a class="dropdown-item borrowed-copy" href="#">No copies</a></div></div><button class="btn btn-secondary btn-sm delete-reader-button">Delete reader</button></div>';

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
       },
       error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.responseJSON.message); 
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
   var borrowsAmount = receivedReaders[i].borrows.length;
   var countActiveBorrows = 0;
   for(j=0; j<borrowsAmount; j++){
    if(receivedReaders[i].borrows[j].untilDate!==null){
      countActiveBorrows++;
      console.log(receivedReaders[i].borrows[j].untilDate + " countActiveBorrows:" + countActiveBorrows);
    }
  }

  result += "<td class = \"readerBorrows\">" + countActiveBorrows + "</td>";

   //result += "<td class = \"readerBorrows\">" + receivedReaders[i].borrows.length + "</td>";
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
             location.reload();
           }
         }
       });
      });
  
}
generateReaderRequest();

function deleteReaderRequest(){
 $(document).on("click", '.delete-reader-button', function(){
  const requestUrl = apiRoot + 'deleteReader';
  var selectedReaderId = $(this).closest("tr").find('.readerId').html();
  console.log("Selected book: " + selectedReaderId);

  $.ajax({
    url: requestUrl + "?" + $.param({readerId: selectedReaderId}),
    type: 'delete',
    method: 'DELETE',
    success: function() {
      correct: $(this).closest("tr").remove();
      location.reload();
    },error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.responseJSON.message);
    }
  });
});
}
deleteReaderRequest();

  //COPY
  function createCopyRequest(){
    const requestUrl = apiRoot + "createCopy";
    var selectedBookId=0;
    $(document).on("click", ".add-copy", function(){
      console.log(requestUrl);
      console.log("clicked");
      selectedBookId = $(this).closest("tr").find(".bookIdTd").html();
      console.log(selectedBookId);
    });

    $(document).on("click", ".close-add-copy", function(){
      $("#insert-inventory-num").val("");
    });

    $(document).on("click", ".save-add-copy", function(){
      var inventoryNumber = "";
      console.log("save click");
      inventoryNumber = $("#insert-inventory-num").val();
      console.log(inventoryNumber);

      $.ajax({
        url: requestUrl + "?" + $.param({bookId: selectedBookId}),
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({
          inventoryNumber: inventoryNumber
        }),
        complete: function(data) {
          if(data.status === 200) {
            location.reload();
          }
        }
      });
    });
    
  }
  createCopyRequest();

  function listReadersInDropdownRequest(){//moze to powinna być jedna funkcja? :)
    const requestUrl = apiRoot + 'getReaders';

    $.ajax({
      url: requestUrl,
      method: 'GET',
      contentType: "application/json",
      success: function(readers){
        console.log(readers);
        readersAmount = readers.length;
        console.log("Readers amount: " + readersAmount);
        listReadersInDropdown(readers);
      }
    });
  }

  function listReadersInDropdown(receivedReaders){
    $(document).on("click", ".select-reader", function(){
      var result = "";
      for(i = 0; i<receivedReaders.length; i++){
        result += "<a class=\"dropdown-item reader-item\">" + "<span class=\"selected-reader-id\">" + receivedReaders[i].id + " " + "</span>" + receivedReaders[i].firstName + " " + receivedReaders[i].lastName +"</a>";
        console.log("adding " + receivedReaders[i].id + " "  + receivedReaders[i].firstName + " " + receivedReaders[i].lastName);
        $(".readers-list").html(result);
      }
    });
  }

  listReadersInDropdownRequest();

  function updateReaderRequest(){
    const requestUrl = apiRoot + "updateReader";
    $(document).on("click", ".edit-reader", function(){
      var readerToUpdateId =  $(this).closest("tr").find('.readerId').html();
      console.log("Reader with id: " + readerToUpdateId + " was clicked");

      $(".save-changes").on("click", function(){

        console.log("save clicked");
        var updatedFirstName = $("#reader-first-name-update").val();
        var updatedLastName = $("#reader-last-name-update").val();
        var updatedBirthDate = $("#birth-date-update").val();
        var updatedEmail = $("#reader-email-update").val();
        console.log(updatedFirstName);
        console.log(updatedLastName);
        console.log(updatedBirthDate);
        console.log(updatedEmail);

        $.ajax({
          url: requestUrl,
          method: "PUT",
          processData: false,
          contentType: "application/json; charset=utf-8",
          dataType: 'json',
          data: JSON.stringify({
            id: readerToUpdateId,
            firstName: updatedFirstName,
            lastName: updatedLastName,
            birthDate: updatedBirthDate,
            readerEmail: updatedEmail
          }),
          complete: function(data) {
            console.log(readerToUpdateId, updatedBirthDate);
            location.reload();
          }
        });

      });
    });
  }

  updateReaderRequest();


//SELECT READER BUTTON
function createBorrowRequest(){
  requestUrl = apiRoot + "createBorrow";
  var selectedBookId="";

  $(document).on("click", ".select-reader", function(){
    console.log("im am going to create borrow");
    selectedBookId = $(this).closest("tr").find('.bookIdTd').html();
    console.log("book id: " + selectedBookId);
  });

  $(document).on("click", ".reader-item", function(){
    var selectedReaderId = $(".selected-reader-id", this).text();
    console.log("reader: " + selectedReaderId + " book: " + selectedBookId);

//add some condition when 0 copies
  $.ajax({
    url: requestUrl + "?" + $.param({bookId: selectedBookId}) + "&" + $.param({readerId: selectedReaderId}),
    type: 'POST',
    success: function(data) {
      console.log('OK');
      location.reload();
    },
   error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.responseJSON.message);
    }
  });
  });
}
createBorrowRequest();

function listBorrowedCopiesInDropdownRequest(){

  const requestUrl = apiRoot + 'getBorrowedCopies';
  $(".readers").on("click", ".return-copy", function(){
//$(document).on("click", ".readers", ".return-copy", function(){
    console.log("return clicked");
    var readerId = $(this).closest("tr").find(".readerId").html();

    $.ajax({
      url: requestUrl + "?" + $.param({readerId: readerId}),
      method: 'GET',
      contentType: "application/json",
      success: function(copies){
        console.log(copies);
        var copiesAmount = copies.length;
        console.log("Borrowed copies amount: " + copiesAmount);

        listBorrowedCopiesInDropdown(copies);
      }
    });
  });
}

listBorrowedCopiesInDropdownRequest();

function listBorrowedCopiesInDropdown(copies){
  var result = "";
  for(i = 0; i<copies.length; i++){
    console.log("Listing copy with id: " + copies[i].inventoryNumber + "and inventoryNumber = " + copies[i].inventoryNumber);
    result += "<a class=\"dropdown-item borrowed-copy\" href=\"#\">" + copies[i].inventoryNumber + "</a>"
    //$(".copies-list").html(result);
    $(".copies-list").html("");
    $(".copies-list").append(result);

  } 
}

function returnBorrowedCopyRequest(){
  var selectedReaderId = "";
  const requestUrl = apiRoot + 'returnBorrow?';
  $(".readers").on("click", ".return-copy", function(){
    console.log("im am going to return borrow");
    selectedReaderId = $(this).closest("tr").find('.readerId').html();
    console.log(selectedReaderId);
  });

  $(".readers").on("click", ".borrowed-copy", function(){
    var selectedCopyInventoryNumber = $(this).text();
    console.log(selectedCopyInventoryNumber);

    $.ajax({
      url: requestUrl + $.param({readerId: selectedReaderId}) + "&" + $.param({inventoryNumber: selectedCopyInventoryNumber}),
      method: "PUT",
      success: function(data){
        console.log("OK!!!!");
        location.reload();
      },
      error: function(){
        console.log("readerId: " + selectedReaderId + " copy inv num: " + selectedCopyInventoryNumber);
        console.log("There are no copies to return");
      }

    })
  });

}
returnBorrowedCopyRequest()

});

