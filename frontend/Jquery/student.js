$(document).ready(function(){

update_student();
delete_student();
var student_id;
////////////////////////////
let user_image = '';
$("#profile_image").on('change', function () {
     let formData = new FormData();
     let files = $("#profile_image").get(0).files;
     if (files.length > 0) {
         formData.append("profile_image", files[0]);
     }
     $.ajax({
         type: 'POST',
         url: 'http://localhost:94/uploadUserImages/',
         contentType: false,
         cache: false,
         processData: false,
         data: formData,
         success: function (data) {
             userImage = data.filename;
             
             alert(userImage);
         },
         error: function () {
             alert("Image upload failed!");
         }
       });
      });


//////////////////////////////



    $.ajax({
         
        type: 'get',
        dataType : 'JSON',
        url: 'http://localhost:94/viewStudent',
        success: function(data) {
                    $.each(data,function(index){
                      $("#table_student").append("<tr style'text-align:center'>"+
                        "<td class='col-xs-2'>" + data[index].first_name+' '+data[index].last_name+"</td>"+
                        "<td class='col-xs-2'>" + data[index].email +"</td>"+
                        "<td class='col-xs-2'>" + data[index].contact + "</td>"+
                        "<td class='col-xs-2'>" + data[index].subject + "</td>"+
                        "<td class='col-xs-1'>" + data[index].semister + "</td>"+
                        "<td class='col-xs-1'>" + data[index].section + "</td>"+
                        "<td class='col-xs-1'>"+ "<a href='profile.html?id="+data[index]._id+"' class='btn btn-primary btn-sm'>"+
                        "Edit</a></td>"+
                        "<td class='col-xs-1'>"+ "<Button class='btn btn-primary btn-sm delete' student_id='"+data[index]._id+"'>"+
                          "Delete</Button></td></tr>");
                       
                    }) //  
                  
        },
        error: function() {
          alert("Sorry, you are not logged in.");
        }
      });


function update_student(){
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");
    console.log(id);


   $.getJSON("http://localhost:94/viewStudent/" + id, function (result) {
       console.log(result.profile_image);
       console.log(result._id);
       $("#first_name").val(result.first_name);
       $("#last_name").val(result.last_name);
       $("#gender").val(result.gender);
       $("#subject").val(result.subject);
       $("#semister").val(result.semister);
       $("#section").val(result.section);
       $("#email").val(result.email);
       $("#contact").val(result.contact);
       $("#password").val(result.password);
       $("#ram").append( "<img src='http://localhost:94/images/"+result.profile_image+"' "+ "class='rounded-circle' style=width:150px;height:150px;>" )
     
        
    });

    

       $("#update_student").click(function(){
       first_name=$("#first_name").val();
       last_name=$("#last_name").val();
       gender=$("#gender").val();
       subject=$("#subject").val();
       semister=$("#semister").val();
       section=$("#section").val();
       email=$("#email").val();
       contact=$("#contact").val();
       password=$("#password").val();
          
       data={
      "first_name":first_name,
      "last_name":last_name,
      "gender":gender,
      "subject":subject,
      "semister":semister,
      "section":section,
      "email":email,
      "contact":contact,
      "password":password,
    }

      $.ajax({
      url:'http://localhost:94/updateStudent/' + id,
      type:'PUT',
      dataType:'json',
      data:data,
      success:function(res, textStatus, xhr){
      alert('Student updated!!');     
      console.log(res);          
       },
      error:function(xhr, textStatus, errorThrown){
      alert('Error! to update Student');
       }
            
      });
      });
/////////////image---update////////////////////
       $("#update_image").click(function(){
        data={
       "profile_image":userImage,
      }
      
       $.ajax({
       url:'http://localhost:94/updateStudent/' + id,
       type:'PUT',
       dataType:'json',
       data:data,
       success:function(res, textStatus, xhr){
       alert('Profile image updated!!');    
       location.href="adminStudent.html"; 
       console.log(res);          
        },
       error:function(xhr, textStatus, errorThrown){
       alert('Error! to update Student');
        }
             
       });
       });
      }


      function update_student(){
    
           $("#update_student_profile").click(function(){
             var id2=$("#student_id").val();
           first_name=$("#first_name").val();
           last_name=$("#last_name").val();
           gender=$("#gender").val();
           subject=$("#subject").val();
           semister=$("#semister").val();
           section=$("#section").val();
           email=$("#email").val();
           contact=$("#contact").val();
           password=$("#password").val();
              
           data={
          "first_name":first_name,
          "last_name":last_name,
          "gender":gender,
          "subject":subject,
          "semister":semister,
          "section":section,
          "email":email,
          "contact":contact,
          "password":password,
        }
    
          $.ajax({
          url:'http://localhost:94/updateStudent/' + id2,
          type:'PUT',
          dataType:'json',
          data:data,
          success:function(res, textStatus, xhr){
            location.href=("studProfile.html");
          alert('Student updated!!');     
          console.log(res);          
           },
          error:function(xhr, textStatus, errorThrown){
          alert('Error! to update Student');
           }
                
          });
          });
    /////////////image---update////////////////////
           $("#update_image_student").click(function(){
            var id1=$("#student_id").val();
            data={
           "profile_image":userImage,
          }
          
           $.ajax({
           url:'http://localhost:94/updateStudent/' + id1,
           type:'PUT',
           dataType:'json',
           data:data,
           success:function(res, textStatus, xhr){
           alert('Profile image updated!!');    
           location.href="studProfile.html"; 
           console.log(res);          
            },
           error:function(xhr, textStatus, errorThrown){
           alert('Error! to update Student');
            }
                 
           });
           });
          }
         
   
      function delete_student(){
        $("#table_student").on('click','.delete',function(){
            console.log(student_id);
          id=$(this).attr('student_id');
                           $.ajax({
                type: 'DELETE',
                url: 'http://localhost:94/deleteStudent/'+id,
              
                success: function(data) {
                    location.href="adminStudent.html";
                  alert("Deleted Successfully");                           
                },
                error: function() {
                  alert("Sorry, you are not logged in.");
                }
              });
            });
        
      }



})