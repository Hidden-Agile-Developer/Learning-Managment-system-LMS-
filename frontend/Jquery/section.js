$(document).ready(function () {
    delete_section();
    add_section();
     var student_id;
     var job_id;
     var id;
 
     $.ajax({
 
         type: 'get',
         dataType: 'JSON',
         url: 'http://localhost:96/ViewSection',
         success: function (data) {
             $.each(data, function (index) {
 
                 $("#table_section").append("<tr style'text-align:center'>" +
                     "<td class='col-xs-4'>" + data[index].subject + "</td>" +
                     "<td class='col-xs-4'>" + data[index].semister + "</td>" +
                     "<td class='col-xs-2'>" + data[index].section + "</td>" +
                     "<td class='col-xs-2'>" + "<Button class='btn btn-primary btn-sm remove' section_id='" + data[index]._id + "'>" +
                     "Delete</Button></td>tr>");
 
 
             }) //     
         },
         error: function () {
             alert("Sorry, you are not logged in.");
         }
     });
 
 
 
    //  function update_teacher() {
    //      var urlParams = new URLSearchParams(window.location.search);
    //      var id = urlParams.get("id");
    //      console.log(id);
 
 
    //      $.getJSON("http://localhost:94/viewTeacher/" + id, function (result) {
    //          console.log(result._id);
    //          $("#first_name").val(result.first_name);
    //          $("#last_name").val(result.last_name);
    //          $("#gender").val(result.gender);
    //          $("#email").val(result.email);
    //          $("#contact").val(result.contact);
 
    //      });
 
    //      $("#update_teacher").click(function () {
    //          first_name = $("#first_name").val();
    //          last_name = $("#last_name").val();
    //          gender = $("#gender").val();
    //          email = $("#email").val();
    //          contact = $("#contact").val();
 
    //          data = {
    //              "first_name": first_name,
    //              "last_name": last_name,
    //              "gender": gender,
    //              "email": email,
    //              "contact": contact,
    //          }
 
    //          $.ajax({
    //              url: 'http://localhost:94/updateTeacher/' + id,
    //              type: 'PUT',
    //              dataType: 'json',
    //              data: data,
    //              success: function (res, textStatus, xhr) {
    //                  alert('Teacher updated!!');
    //                  console.log(res);
    //              },
    //              error: function (xhr, textStatus, errorThrown) {
    //                  alert('Error! to update Teacher');
    //              }
 
    //          });
    //      });
    //  }
 
 
 

 
     ////
     function add_section() {
         $("#add_section").click(function () {
             subject = $("#subject").val();
             semister = $("#semister").val();
             section1 = $("#section").val();
 
             if (section1 == '') {
                $('#section').attr('placeholder', 'Please enter Section');
                $('#section').css({ 'border': '2px solid red','border-style':'double' });
                $('#section').focus();
              }else{
             data = {
                 "subject": subject,
                 "semister": semister,
                 "section": section1
             }
 
             $.ajax({
                 url: 'http://localhost:96/AddSection/',
                 type: 'post',
                 dataType: 'JSON',
                 data: data,
                 success: function (res, textStatus, xhr) {
                     location.href = ("classadmin.html");
                     alert('Section Added !!');
 
                     console.log(res);
                 },
                 error: function (xhr, textStatus, errorThrown) {
                     alert('Error! to Add Section');
                 }
 
             })
            }
         });
     }
 
 
     function delete_section() {
         $("#table_section").on('click', '.remove', function () {
             console.log(job_id);
             id = $(this).attr('section_id');
             $.ajax({
                 type: 'DELETE',
                 url: 'http://localhost:96/DeleteSeciton/' + id,
 
                 success: function (data) {
                     location.href = "classadmin.html";
                     alert("Deleted Successfully");
                 },
                 error: function () {
                     alert("Sorry, you are not logged in.");
                 }
             });
         });
 
     }

    });
     ////////////
 
//  function myFunction() {
//      var input, filter, table, tr, td, i, txtValue;
//      input = document.getElementById("section_search");
//      filter = input.value.toUpperCase();
//      table = document.getElementById("table_section");
//      tr = table.getElementsByTagName("tr");
//      for (i = 0; i < tr.length; i++) {
//          td = tr[i].getElementsByTagName("td")[0];
//          if (td) {
//              txtValue = td.textContent || td.innerText;
//              if (txtValue.toUpperCase().indexOf(filter) > -1) {
//                  tr[i].style.display = "";
//              } else {
//                  tr[i].style.display = "none";
//              }
//          }
//      }
 
//  }
 
 
 
 
 