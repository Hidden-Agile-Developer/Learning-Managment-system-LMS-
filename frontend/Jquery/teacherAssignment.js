$(document).ready(function(){
    view_assignment();
    update_assign();
    delete_assign();

    let user_image = '';
    $("#assignment").on('change', function () {
         let formData = new FormData();
         let files = $("#assignment").get(0).files;
         if (files.length > 0) {
             formData.append("assignment", files[0]);
         }
         $.ajax({
             type: 'POST',
             url: 'http://localhost:94/uploadAssignment/',
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

        $("#assignment_upload").click(function(){
           
        assignment_date=$("#assignment_date").val();
        assignment_code=$("#assignment_code").val();
        comment=$("#comment").val();
        email=$("#email").val();
        faculty=$("#subject").val();
        semister=$("#semister").val();

             data={
            "assignment_date":assignment_date,
            "assignment_code":assignment_code,
            "comment":comment,
            "email":email,
            "faculty":faculty,
            "semister":semister,
            "assignment":userImage
        }

        $.ajax({
            url:'http://localhost:94/addTechAssignment/',
            type:'post',
            dataType:'json',
            data:data,
            success:function(res, textStatus, xhr){
                alert('file uploaded !!');    
                location.href="teacherAssignment.html"; 
                console.log(res);          
            },
            error:function(xhr, textStatus, errorThrown){
                alert('Error! to upload');
            }


        })

       });

function view_assignment(){
 //   var urlParams = new URLSearchParams(window.location.search);
 //   var email = urlParams.get("email");
        $.ajax({  
            type: 'get',
            dataType : 'JSON',
            url: 'http://localhost:94/viewAssignmentTeacher',
            success: function(data) {
                        $.each(data,function(index){
                          $("#table_assignment").append("<tr style'text-align:center'>"+
                           "<td class='col-xs-2'>" +"<a href='http://localhost:94/files/"+data[index].assignment+"' download >"+data[index].assignment+"</a></td>"+
                            "<td class='col-xs-1'>" + data[index].assignment_code +"</td>"+
                            "<td class='col-xs-3'>" + data[index].comment +"</td>"+
                            "<td class='col-xs-2'>" + data[index].assignment_date + "</td>"+
                            "<td class='col-xs-1'>" + data[index].faculty + "</td>"+
                            "<td class='col-xs-1'>" + data[index].semister + "</td>"+
                            "<td class='col-xs-1'>"+ "<a href='UpdateAssign.html?id="+data[index]._id+"' class='btn btn-primary btn-sm'>"+
                            "Edit</a></td>"+
                            "<td class='col-xs-1'>"+ "<Button class='btn btn-primary btn-sm delete' assign_id='"+data[index]._id+"'>"+
                            "Delete</Button></td></tr>");
                            }) //     
                            
                            $.each(data,function(index){
                              $("#table_assignment_student").append("<tr style'text-align:center'>"+
                               "<td class='col-xs-2'>" +"<a href='http://localhost:94/files/"+data[index].assignment+"' download >"+data[index].assignment+"</a></td>"+
                                "<td class='col-xs-1'>" + data[index].assignment_code +"</td>"+
                                "<td class='col-xs-3'>" + data[index].comment +"</td>"+
                                "<td class='col-xs-2'>" + data[index].assignment_date + "</td>"+
                                "<td class='col-xs-2'>" + data[index].faculty + "</td>"+
                                "<td class='col-xs-2'>" + data[index].semister + "</td>/tr>");
                                })       
},
            error: function() {
              alert("Sorry, you are not logged in.");
            }
          });
       }

       
       function update_assign(){
        var urlParams = new URLSearchParams(window.location.search);
        var id = urlParams.get("id");
        console.log(id);
    
    
       $.getJSON("http://localhost:94/viewAssignmentTeacher/" + id, function (result) {
           console.log(result._id);
           assignment_date=$("#assignment_date").val(result.assignment_date);
           assignment_code=$("#assignment_code").val(result.assignment_code);
           comment=$("#comment").val(result.comment);
           email=$("#email").val(result.email);
           faculty=$("#subject").val(result.faculty);
           semister=$("#semister").val(result.semister);
   
            
    
        });
    
           $("#update_assignment").click(function(){
         assignment_date=$("#assignment_date").val();
         assignment_code=$("#assignment_code").val();
         comment=$("#comment").val();
         email=$("#email").val();
         faculty=$("#subject").val();
         semister=$("#semister").val();
         
              
           data={
            "assignment_date":assignment_date,
            "assignment_code":assignment_code,
            "comment":comment,
            "email":'ss@gmail.com',
            "faculty":faculty,
            "semister":semister                      
               }

          $.ajax({
          url:'http://localhost:94/updateAssignment/' + id,
          type:'PUT',
          dataType:'json',
          data:data,
          success:function(res, textStatus, xhr){
            location.href="teacherAssignment.html";
          alert('Assignment updated!!');     
          console.log(res);          
           },
          error:function(xhr, textStatus, errorThrown){
          alert('Error! to update event');
           }
                
          });
          });
          }
       
    
          function delete_assign(){
            $("#table_assignment").on('click','.delete',function(){
                id=$(this).attr('assign_id');
                                 $.ajax({
                      type: 'DELETE',
                      url: 'http://localhost:94/deleteAssignment/'+id,
                    
                      success: function(data) {
                          location.href="teacherAssignment.html";
                        alert("Deleted Successfully");                           
                      },
                      error: function() {
                        alert("Sorry, you are not logged in.");
                      }
                    });
                  });
          }
          

       
})