$(document).ready(function(){    
  view_event();
     var tok = localStorage.getItem('token');                        
          /// dashboard creation
               $.ajax({
            type: 'get',
            url: 'http://localhost:96/viewDataStudent/',
            beforeSend: function(xhr) {
                if (tok) {
                  xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                }
              },
            success: function(data) {
              $("#userName").append(data.first_name);
              $("#userImage").append( "<img src='http://localhost:96/images/"+data.profile_image+"' "+ "class='img-circle' style=width:55px;height:55px; position:relative; margin-top:5px; padding-top:25px;>");
              $("#dataemail").append(data.email);
              $("#first_name").val(data.first_name);
              $("#last_name").val(data.last_name);
              $("#gender").val(data.gender);
              $("#email").val(data.email);
              $("#contact").val(data.contact);
              $("#password").val(data.password);
              $("#teacher_id").val(data._id);
              $("#semister").val(data.semister);
              $("#subject").val(data.subject);
              $("#section").val(data.section);
              $("#student_id").val(data._id);
              console.log(data);      
                                          
            },
            error: function() {
              alert("Sorry, you are not logged in.");
            }
          });

function view_event(){
          $.ajax({
            type: 'get',
            url: 'http://localhost:96/showEventDetails',
            success: function(data) {
            $.each(data,function(index){         
                          
              $("#studentEvents").append("<tr style='text-align:center'>"+
              "<td class='col-xs-6'>" + data[index].eventName+ "</td>"+
              "<td class='col-xs-3'>" +new Date(data[index].happeningDate).toISOString().split('T')[0]+ "</td>"+
              "<td class='col-xs-3'>" + new Date(data[index].uploadedDate).toISOString().split('T')[0]+ "</td></tr>");
              })
               },
              error: function() {
              alert("Sorry, you are not logged in.");
              }
              });




            }
        });