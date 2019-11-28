$(document).ready(function(){
    view_assignment();
    delete_stud_assignment();

    let user_image = '';
    $("#assignment").on('change', function () {
         let formData = new FormData();
         let files = $("#assignment").get(0).files;
         if (files.length > 0) {
             formData.append("assignment", files[0]);
         }
         $.ajax({
             type: 'POST',
             url: 'http://localhost:96/uploadAssignment/',
             contentType: false,
             cache: false,
             processData: false,
             data: formData,
             success: function (data) {
                 userImage = data.filename;
                 alert(userImage);
             },
             error: function () {
                 alert("File upload failed!");
             }
           });
          });

        $("#assignment_upload").click(function(){
<<<<<<< HEAD
            // alert("CLICKED");
=======
>>>>>>> 0948245a77bf5ad28c5e289e9fa7351a68844a17
        assignment_date=$("#assignment_date").val();
        assignment_code=$("#assignment_code").val();
        comment=$("#comment").val();
        email=$("#email").val();

        if (assignment_date == '') {
          $('#assignment_date').attr('placeholder', 'Please enter assignment date');
          $('#assignment_date').css({ 'border': '2px solid red','border-style':'double' });
          $('#assignment_date').focus();
        }else if(assignment_code==''){
          $('#assignment_code').attr('placeholder', 'Please enter assignment code');
          $('#assignment_code').css({ 'border': '2px solid red','border-style':'double' });
          $('#assignment_code').focus();
        }
        else{

             data={
            "assignment_date":assignment_date,
            "assignment_code":assignment_code,
            "comment":comment,
            "email":email,
            "assignment":userImage
        }

        $.ajax({
            url:'http://localhost:96/addAssignment/',
            type:'post',
            dataType:'json',
            data:data,
            success:function(res, textStatus, xhr){
                alert('file uploaded !!');
                location.href='studentassignment.html';     
                console.log(res);          
            },
            error:function(xhr, textStatus, errorThrown){
                alert('Error! to upload');
            }

        })
      }
       });

function view_assignment(){
        $.ajax({  
            type: 'get',
            dataType : 'JSON',
            url: 'http://localhost:96/viewAssignment',
            success: function(data) {
                        $.each(data,function(index){
                          $("#table_assignment_student").append("<tr style'text-align:center'>"+
                          "<td class='col-xs-3'>" +"<a href='http://localhost:96/files/"+data[index].assignment+"' download >"+data[index].assignment+"</a></td>"+
                            "<td class='col-xs-3'>" + data[index].assignment_code +"</td>"+
                            "<td class='col-xs-3'>" + data[index].comment +"</td>"+
                            "<td class='col-xs-3'>" + data[index].assignment_date + "</td></tr>");
                            }) //                        
},
            error: function() {
              alert("Sorry, you are not logged in.");
            }
          });

       
    $.ajax({  
        type: 'get',
        dataType : 'JSON',
        url: 'http://localhost:96/viewAssignment',
        success: function(data) {
            $.each(data,function(index){
            $("#table_assignment_teacher").append("<tr style'text-align:center'>"+
            "<td class='col-xs-3'>" +"<a href='http://localhost:96/files/"+data[index].assignment+"' download >"+data[index].assignment+"</a></td>"+
            "<td class='col-xs-2'>" + data[index].assignment_code +"</td>"+
            "<td class='col-xs-3'>" + data[index].comment +"</td>"+
            "<td class='col-xs-2'>" + data[index].assignment_date + "</td>"+
            "<td class='col-xs-2'>"+ "<Button class='btn btn-primary btn-sm delete' study_id='"+data[index]._id+"'>"+
                   "Delete</Button></td></tr>");
              })                         
},
            error: function() {
              alert("Sorry, you are not logged in.");
            }
          });         
       
      }
   
  function delete_stud_assignment(){
    $("#table_assignment_teacher").on('click','.delete',function(){
        id=$(this).attr('study_id');
        $.ajax({
        type: 'DELETE',
        url: 'http://localhost:96/deleteStudassign/'+id,
              
        success: function(data) {
        location.href="teacherStudentassign.html";
        alert("Deleted Successfully");                           
        },
        error: function() {
        alert("Sorry, you are not logged in.");
        }
        });
        });
  }     

       
})