$(document).ready(function () {
    update_teacher_profile();
    update_teacher();

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
url: 'http://localhost:96/ViewTeacher',
success: function(data) {
$.each(data,function(index){
$("#table_teacher").append("<tr style'text-align:center'>"+
"<td class='col-xs-3'>" + data[index].first_name+' '+data[index].last_name+"</td>"+
"<td class='col-xs-2'>" + data[index].email +"</td>"+
"<td class='col-xs-2'>" + data[index].contact + "</td>"+
"<td class='col-xs-2'>" +"<img src='http://localhost:96/images/"+data[index].profile_image+"' "+ "class='img-rounded' style=width:50px;height:50px;>" + "</td>"+
"<td class='col-xs-1'>"+ "<a href='adminteacherprofile.html?id="+data[index]._id+"' class='btn btn-primary btn-sm'>"+
"<i class='fa fa-edit'></a></td>"+
"<td class='col-xs-1'>"+ "<Button class='btn btn-primary btn-sm delete' teacher_id='"+data[index]._id+"'>"+
"<i class='fa fa-trash'></Button></td>"+
"<td class='col-xs-1'>"+ "<a href='job.html?email="+data[index].email+"' class='btn btn-primary btn-sm'>"+
"<i class='fa fa-list'></i></a></td></tr>");
}) //                        
},
error: function() {
alert("Sorry, you are not logged in.");
}
});

function update_teacher_profile(){
  $("#update_teacher_profile").click(function(){
  var id2=$("#teacher_id").val();
  console.log(id2);
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
  "password":password
  }
  
  $.ajax({
  url:'http://localhost:96/updateTeacher/' + id2,
  type:'PUT',
  dataType:'json',
  data:data,
  success:function(res, textStatus, xhr){
  location.href=("teachprofile.html");
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
  url:'http://localhost:96/updateTeacher/' + id1,
  type:'PUT',
  dataType:'json',
  data:data,
  success:function(res, textStatus, xhr){
  alert('Profile image updated!!');    
  location.href="teacherprofile.html"; 
  console.log(res);          
  }
             
       });
       });
       


}

function update_teacher(){
 var urlParams = new URLSearchParams(window.location.search);
 var id = urlParams.get("id");
 console.log(id);


 $.getJSON("http://localhost:96/viewTeacher/" + id, function (result) {
  console.log(result._id);
  $("#first_name").val(result.first_name);
  $("#last_name").val(result.last_name);
  $("#gender").val(result.gender);
  $("#email").val(result.email);
  $("#contact").val(result.contact);
  $("#ram").append( "<img src='http://localhost:96/images/"+result.profile_image+"' "+ "class='rounded' style=width:150px;height:150px;>" )        
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
   url:'http://localhost:96/updateTeacher/' + id,
   type:'PUT',
   dataType:'json',
   data:data,
   success:function(res, textStatus, xhr){
   alert('Teacher updated!!');
   location.href="adminteacherprofile.html";     
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
   url:'http://localhost:96/updateTeacher/' + id,
   type:'PUT',
   dataType:'json',
   data:data,
   success:function(res, textStatus, xhr){
   alert('Profile image updated!!');    
   location.href="teacheradmin.html"; 
   console.log(res);          
 },
    error:function(xhr, textStatus, errorThrown){
    alert('Error! to update Student');
    }
             
 });
 });
 }

function delete_teacher(){

}
});