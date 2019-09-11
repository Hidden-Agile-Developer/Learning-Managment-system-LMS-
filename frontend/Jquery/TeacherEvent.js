$(document).ready(function(){

    var tok = localStorage.getItem('token');
    // alert(tok)
              
            
          /// dashboard creation
               $.ajax({
            type: 'get',
            url: 'http://localhost:94/viewData',
            beforeSend: function(xhr) {
              if (tok) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
              }
            },
            success: function(data) {
              $("#adminuser").append(data.first_name);
              $("#userImage").append( "<img src='http://localhost:94/images/"+data.profile_image+"' "+ "class='img-circle' style=width:30px;height:30px; position:relative; margin-top:5px;>");
              $("#ram").append( "<img src='http://localhost:94/images/"+data.profile_image+"' "+ "class='img-circle' style=width:150px;height:150px; position:relative; margin-top:5px;>");
              $("#dataemail").append(data.email);
              $("#first_name").val(data.first_name);
              $("#last_name").val(data.last_name);
              $("#gender").val(data.gender);
              $("#email").val(data.email);
              $("#contact").val(data.contact);
              $("#password").val(data.password);
              $("#teacher_id").val(data._id);
              console.log(data);      
                                          
            },
            error: function() {
              alert("Sorry, you are not logged in.");
            }
          });
        

    $.ajax({
             
        type: 'get',
        dataType : 'JSON',
        url: 'http://localhost:94/viewEvent',
        success: function(data) {
                    $.each(data,function(index){
                      $("#event_table").append("<tr style'text-align:center'>"+
                        "<td class='col-xs-6'>" + data[index].event_name+"</td>"+
                        "<td class='col-xs-3'>" + data[index].event_date +"</td>"+
                        "<td class='col-xs-3'>" + data[index].uploaded_date +"</td></tr>");
                       
                    }) //  
                  
        },
        error: function() {
          alert("Sorry, you are not logged in.");
        }
      });
    
    });