$(document).ready(function(){

    update_teacher();
    delete_teacher();
    delete_job();
    add_job();
    view_job();
    getTeacher();
    update_teacher_profile();
    var student_id;
    var job_id;

 

////////////////////////////////
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




////////////////////////////
        $.ajax({
             
            type: 'get',
            dataType : 'JSON',
            url: 'http://localhost:94/viewTeacher',
            success: function(data) {
                        $.each(data,function(index){
                          $("#table_teacher").append("<tr style'text-align:center'>"+
                            "<td class='col-xs-3'>" + data[index].first_name+' '+data[index].last_name+"</td>"+
                            "<td class='col-xs-2'>" + data[index].email +"</td>"+
                            "<td class='col-xs-2'>" + data[index].contact + "</td>"+
                            "<td class='col-xs-2'>" +"<img src='http://localhost:94/images/"+data[index].profile_image+"' "+ "class='img-rounded' style=width:50px;height:50px;>" + "</td>"+
                            "<td class='col-xs-1'>"+ "<a href='teacherProfile.html?id="+data[index]._id+"' class='btn btn-primary btn-sm'>"+
                            "Edit</a></td>"+
                            "<td class='col-xs-1'>"+ "<Button class='btn btn-primary btn-sm delete' teacher_id='"+data[index]._id+"'>"+
                              "Delete</Button></td>"+
                              "<td class='col-xs-1'>"+ "<a href='job.html?email="+data[index].email+"' class='btn btn-primary btn-sm'>"+
                            "Job</a></td></tr>");
                            }) //                        
},
            error: function() {
              alert("Sorry, you are not logged in.");
            }
          });

          function getTeacher(){
            var urlParams = new URLSearchParams(window.location.search);
            var email = urlParams.get("email");

            console.log(email);
            $.getJSON("http://localhost:94/viewTeach/" + email, function (result1) {
              $("#jemail").val(email);
          });


          }


          function view_job(){
            var urlParams = new URLSearchParams(window.location.search);
            var email = urlParams.get("email");
          $.getJSON("http://localhost:94/viewJob/" + email, function (result) {           
            $.each(result,function(index){        
              $("#table_job").append("<tr style'text-align:center'>"+
                "<td class='col-xs-2'>" + result[index].first_name+' '+result[index].last_name+"</td>"+
                "<td class='col-xs-3'>" + result[index].email +"</td>"+
                "<td class='col-xs-2'>" + result[index].faculty + "</td>"+
                "<td class='col-xs-2'>" + result[index].semister + "</td>"+
                "<td class='col-xs-1'>" + result[index].section + "</td>"+
                "<td class='col-xs-1'>"+ "<Button class='btn btn-primary btn-sm remove' job_id='"+result[index]._id+"'>"+
                "Delete</Button></td>tr>");

                $("#jfirst_name").val(result.first_name);
                $("#jlast_name").val(result.last_name);
                
                     
                  })
});

      }
        

       function update_teacher(){
        var urlParams = new URLSearchParams(window.location.search);
        var id = urlParams.get("id");
        console.log(id);
    
    
       $.getJSON("http://localhost:94/viewTeacher/" + id, function (result) {
           console.log(result._id);
           $("#first_name").val(result.first_name);
           $("#last_name").val(result.last_name);
           $("#gender").val(result.gender);
           $("#email").val(result.email);
           $("#contact").val(result.contact);
           $("#new_image").append( "<img src='http://localhost:94/images/"+result.profile_image+"' "+ "class='rounded' style=width:150px;height:150px;>" )        
        });
    

           $("#update_teacher").click(function(){
           first_name=$("#first_name").val();
           last_name=$("#last_name").val();
           gender=$("#gender").val();
           email=$("#email").val();
           contact=$("#contact").val();
       
              
           data={
          "first_name":first_name,
          "last_name":last_name,
          "gender":gender,
          "email":email,
          "contact":contact,
        }
    
          $.ajax({
          url:'http://localhost:94/updateTeacher/' + id,
          type:'PUT',
          dataType:'json',
          data:data,
          success:function(res, textStatus, xhr){
          alert('Teacher updated!!');     
          console.log(res);          
           },
          error:function(xhr, textStatus, errorThrown){
          alert('Error! to update Teacher');
           }
                
          });
          });
        

          $("#update_image").click(function(){
            data={
           "profile_image":userImage,
          }
          
           $.ajax({
           url:'http://localhost:94/updateTeacher/' + id,
           type:'PUT',
           dataType:'json',
           data:data,
           success:function(res, textStatus, xhr){
           alert('Profile image updated!!');    
           location.href="adminTeacher.html"; 
           console.log(res);          
            },
           error:function(xhr, textStatus, errorThrown){
           alert('Error! to update Student');
            }
                 
           });
           });
           
          }
    
//////////////////////////////////////////////

function update_teacher_profile(){
  
     $("#update_teacher_profile").click(function(){
      var id2=$("#teacher_id").val();
      console.log(id2);
     first_name=$("#first_name").val();
     last_name=$("#last_name").val();
     gender=$("#gender").val();
     email=$("#email").val();
     contact=$("#contact").val();
 
        
     data={
    "first_name":first_name,
    "last_name":last_name,
    "gender":gender,
    "email":email,
    "contact":contact,
  }

    $.ajax({
    url:'http://localhost:94/updateTeacher/' + id2,
    type:'PUT',
    dataType:'json',
    data:data,
    success:function(res, textStatus, xhr){
      location.href=("teachProfile.html");
    alert('Teacher updated!!');     
    console.log(res);          
     },
    error:function(xhr, textStatus, errorThrown){
    alert('Error! to update Teacher');
     }
          
    });
    });
  

    $("#update_image_teacher").click(function(){
      var id1=$("#teacher_id").val();
      data={
     "profile_image":userImage,
    }
    
     $.ajax({
     url:'http://localhost:94/updateTeacher/' + id1,
     type:'PUT',
     dataType:'json',
     data:data,
     success:function(res, textStatus, xhr){
     alert('Profile image updated!!');    
     location.href="teachProfile.html"; 
     console.log(res);          
      }
           
     });
     });
     
    }


       
          function delete_teacher(){
            $("#table_teacher").on('click','.delete',function(){
                console.log(student_id);
              id=$(this).attr('teacher_id');
                               $.ajax({
                    type: 'DELETE',
                    url: 'http://localhost:94/deleteTeacher/'+id,
                  
                    success: function(data) {
                        location.href="adminTeacher.html";
                      alert("Deleted Successfully");                           
                    },
                    error: function() {
                      alert("Sorry, you are not logged in.");
                    }
                  });
                });
            
          }

          function add_job(){
            $("#add_job").click(function(){
              first_name=$("#jfirst_name").val();
              last_name=$("#jlast_name").val();
              email=$("#jemail").val();
              faculty=$("#subject").val();
              semister=$("#semister").val();
              section=$("#section").val();
              
              data={
              "first_name":first_name,
              "last_name":last_name,
              "email":email,
              "faculty":faculty,
              "semister":semister,
              "section":section                    
              }
              
            $.ajax({
              url:'http://localhost:94/addJob/',
              type:'post',
              dataType:'JSON',
              data:data,
              success:function(res, textStatus, xhr){
              location.href=("adminTeacher.html");  
              alert('Job Added !!'); 
                               
              console.log(res);          
            },
      error:function(xhr, textStatus, errorThrown){
      alert('Error! to Add job');
      }
              
              
    })
     });         
            
        
          }

          function delete_job(){
            $("#table_job").on('click','.remove',function(){
                console.log(job_id);
              id=$(this).attr('job_id');
                               $.ajax({
                    type: 'DELETE',
                    url: 'http://localhost:94/deleteJob/'+id,
                  
                    success: function(data) {
                        location.href="adminTeacher.html";
                      alert("Deleted Successfully");                           
                    },
                    error: function() {
                      alert("Sorry, you are not logged in.");
                    }
                  });
                });
            
          }


    
    
    });


      
