$(document).ready(function () {
   
  update_student_profile();

  let user_image = '';
  $("#profile_image").on('change', function () {
       let formData = new FormData();
       let files = $("#profile_image").get(0).files;
       if (files.length > 0) {
           formData.append("profile_image", files[0]);
       }
       $.ajax({
        type: 'POST',
        url: 'http://localhost:96/uploadUserImages/',
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


$.ajax({

        type: 'get',
        dataType : 'JSON',
        url: 'http://localhost:96/ViewStudent',
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
                        "<i class='fa fa-edit'></a></td>"+
                        "<td class='col-xs-1'>"+ "<Button class='btn btn-primary btn-sm delete' student_id='"+data[index]._id+"'>"+
                        "<i class='fa fa-trash'></Button></td></tr>");
                       
                    }); 
                  
        },
        error: function() {
          alert("Sorry, you are not logged in.");
        }
      });

function update_student_profile(){
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
 url:'http://localhost:96/updateStudent/' + id2,
 type:'PUT',
 dataType:'json',
 data:data,
 success:function(res, textStatus, xhr){
   location.href=("studentprofile.html");
 alert('Student updated!!');     
 console.log(res);          
  },
 error:function(xhr, textStatus, errorThrown){
 alert('Error! to update Student');
  }
       
 });
 });

  $("#update_image_student").click(function(){
   var id1=$("#student_id").val();
   data={
  "profile_image":userImage,
 }
 
  $.ajax({
  url:'http://localhost:96/updateStudent/' + id1,
  type:'PUT',
  dataType:'json',
  data:data,
  success:function(res, textStatus, xhr){
  alert('Profile image updated!!');    
  location.href="studentprofile.html"; 
  console.log(res);          
   },
  error:function(xhr, textStatus, errorThrown){
  alert('Error! to update Student');
   }
        
  });
  });

}      

});