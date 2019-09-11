$(document).ready(function(){
    add_admin();
    update_admin();


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

function add_admin(){

    $("#admin_add").click(function(){
  
      first_name=$("#first_name").val();
      last_name=$("#last_name").val();
      gender=$("#gender").val();
      email=$('#email').val();
      contact=$('#contact').val();
      password=$('#password').val();
     
     //user_image=document.getElementById('user_image');
    
           
       data={
           "first_name":first_name,
           "last_name":last_name,
           "gender":gender,
           "email":email,
           "contact":contact,
           "password":password,
           "user_type":'admin', 
           "profile_image":userImage                                    
       }

  


       $.ajax({
           url:'http://localhost:94/addAdmin/',
           type:'post',
           dataType:'json',
           data:data,
           success:function(res, textStatus, xhr){
               alert('Admin added!!');     
               console.log(res);          
           },
           error:function(xhr, textStatus, errorThrown){
               alert('Error! to add Admin');
           }
       });
    });

   }

   ////update event

   function update_admin(){
 
    $("#update_admin").click(function(){
        var id=$("#aid").val();
        alert("CLICKED");
        console.log(id);
        first_name=$("#first_name").val();
        last_name=$("#last_name").val();
        gender=$("#gender").val();
        email=$("#email").val();
        contact=$("#contact").val();
        password=$("#password").val();
           
        data={
       "first_name":first_name,
       "last_name":last_name,
       "gender":gender,
       "email":email,
       "contact":contact,
       "password":password,
     }
 
       $.ajax({
       url:'http://localhost:94/updateAdmin/' + id,
       type:'PUT',
       dataType:'json',
       data:data,
       success:function(res, textStatus, xhr){
       alert('Admin updated!!');     
       console.log(res);          
        },
       error:function(xhr, textStatus, errorThrown){
       alert('Error! to update Admin');
        }
             
       });
       });
 /////////////image---update////////////////////
        $("#update_image").click(function(){
            var id1=$("#aid").val();
         data={
        "profile_image":userImage,
       }
       
        $.ajax({
        url:'http://localhost:94/updateAdmin/' + id1,
        type:'PUT',
        dataType:'json',
        data:data,
        success:function(res, textStatus, xhr){
        alert('Profile image updated!!');    
        location.href="adminProfile.html"; 
        console.log(res);          
         },
        error:function(xhr, textStatus, errorThrown){
        alert('Error! to update Student');
         }   
        });
        });
      }
       });