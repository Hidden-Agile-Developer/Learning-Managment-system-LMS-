$(document).ready(function(){

  
    $('#login_admin').click(function () {  
        email = $("#admin_email").val();
        password = $("#admin_password").val();
        console.log(email);
        console.log(password);
        data = {
        "email" : email,
        "password" : password    
        }                                        
         $.ajax({  
             url: 'http://localhost:94/loginAdmin/',
             type: 'post',  
             dataType: 'json',  
             data:data,  
             success: function (res, textStatus, xhr) {   
               console.log(res)     
               if(res.email<1){
                 alert("Invalid username/password")
               }
               else{
                alert("Successfully Log In");
                location.href=("adminDashboard.html");
                //
                           localStorage.setItem('token', res.token);						 
                 }  
               },
           
             error: function (xhr, textStatus, errorThrown) {  
                 console.log('Error in Operation');  
             }  
         });

        });



   $('#login_teacher').click(function () {  
         email = $("#teacher_email").val();
         password = $("#teacher_password").val();
         
        //  alert(password);
        //  console.log(email);
        //  console.log(password);
         data = {
         "email" : email,
          "password" : password
         }                                        
        $.ajax({  
         url: 'http://localhost:94/loginTeacher/',
           type: 'post',  
           dataType: 'json',  
           data:data,  
           success: function (res, textStatus, xhr) {   
           
           
           
            location.href=("teacherDashboard.html");
            localStorage.setItem('token', res.token);
           
          
                // alert(res.token);
         					 
        },  
          error: function (xhr, textStatus, errorThrown) {  
         console.log('Error in Operation');  
                 }  
             });
    
   });


   $('#login_student').click(function () {  
    email = $("#student_email").val();
    password = $("#student_password").val();
    data = {
    "email" : email,
     "password" : password
    }                                        
   $.ajax({  
    url: 'http://localhost:94/loginStudent/',
      type: 'post',  
      dataType: 'json',  
      data:data,  
      success: function (res, textStatus, xhr) {   
      console.log(res)     
      location.href=("dashboard.html");
           // alert("Successfully Log In");
    localStorage.setItem('token', res.token);						 
   },  
     error: function (xhr, textStatus, errorThrown) {  
    console.log('Error in Operation');  
            }  
        });

});




});

