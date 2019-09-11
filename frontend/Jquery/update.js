/// admin approval
      $(document).ready(function(){
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
    
       



      var urlParams = new URLSearchParams(window.location.search);
      var id = urlParams.get("id");
      console.log(id);

      $.getJSON("http://localhost:94/showuserrequest/" + id, function (result) {
        console.log(result._id);
        $("#first_name").val(result.first_name);
        $("#last_name").val(result.last_name);
        $("#gender").val(result.gender);
        $("#user_type").val(result.user_type);
        $("#contact").val(result.contact);
        $("#email").val(result.email);
        $("#password").val(result.password);
        $("#user_id").val(result._id);
    
        });



        $("#delete_request").click(function(){
                $.ajax({
                type: 'DELETE',
                url: 'http://localhost:94/deleterequest/'+id,
              
                success: function(data) {
                    location.href="requestuser.html";
                  alert("Deleted Successfully");                           
                },
                error: function() {
                  alert("Sorry, you are not logged in.");
                }
              });
            });    

        

$("#student_approval_form").click(function(){

        var first_name=$("#first_name").val();
        var last_name=$("#last_name").val();
        var gender= $("#gender").val();
        var user_type=$("#user_type").val();
        var contact= $("#contact").val();
        var email=$("#email").val();      
        var password=$("#password").val();
        var subject=$("#subject").val();
        var semister=$("#semister").val();
        var section=$("#section").val();


    
            data={
            "first_name":first_name,
            "last_name":last_name,
            "gender":gender,
            "user_type":'student',
            "email":email,
            "contact":contact,
            "password":password,
            "subject":subject,
            "semister":semister,
            "section":section,
            "profile_image":userImage  

            }

          $.ajax({
            url:'http://localhost:94/registerstudent/',
            type:'post',
            dataType:'JSON',
            data:data,
            success:function(res, textStatus, xhr){
                alert('user registered !!');     
                console.log(res);          
            },
            error:function(xhr, textStatus, errorThrown){
                alert('Error! to register');
            }


        });
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:94/deleterequest/'+id,
          
            success: function(data) {
                location.href="requestuser.html";
                                       
            },
            error: function() {
             
            }
          });
    });
    

        $("#teacher_approval_form").click(function(){

            var first_name=$("#first_name").val();
            var last_name=$("#last_name").val();
            var gender= $("#gender").val();
            var teacher='teacher';
            var contact= $("#contact").val();
            var email=$("#email").val();
            var password=$("#password").val();
              
         
            data1={
                "first_name":first_name,
                "last_name":last_name,
                "gender":gender,
                "user_type":teacher,
                "email":email,
                "contact":contact,
                "password":password,
                "profile_image":userImage  
              }

        //  console.log(teacher);
              $.ajax({
                url:'http://localhost:94/registerteacher/',
                type:'post',
                dataType:'JSON',
                data:data1,
                success:function(res, textStatus, xhr){
                    alert('teacher registered !!');     
                    console.log(res);          
                },
                error:function(xhr, textStatus, errorThrown){
                    alert('Error! to register');
                }
        
            })

            $.ajax({
                type: 'DELETE',
                url: 'http://localhost:94/deleterequest/'+id,
                success: function(data) {
                    location.href="requestuser.html";
                                       
                },
                error: function() {
               
                }
              }); 

    
     
        

       });
   
       
    });
