$(document).ready(function(){
    view_study();
    update_study();
    delete_study();
    var study_id;

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


        $("#add_studymaterial").click(function(){
            alert("CLICKED");
      //  email=$("#email").val();
        faculty=$("#subject").val();
        semister=$("#semister").val();
      

             data={
            "faculty":faculty,
            "semister":semister,
            "email":'ss@gmail.com',
            "assignment":userImage
        }

        $.ajax({
            url:'http://localhost:94/addStudyMaterial/',
            type:'post',
            dataType:'json',
            data:data,
            success:function(res, textStatus, xhr){
                alert('file uploaded !!');     
                console.log(res);          
            },
            error:function(xhr, textStatus, errorThrown){
                alert('Error! to upload');
            }
        })

       });

function view_study(){
        $.ajax({  
            type: 'get',
            dataType : 'JSON',
            url: 'http://localhost:94/viewStudyMaterial',
            success: function(data) {
                        $.each(data,function(index){
                          $("#table_study").append("<tr style'text-align:center'>"+
                           "<td class='col-xs-3'>" +"<a href='http://localhost:94/files/"+data[index].assignment+"' download >"+data[index].assignment+"</a></td>"+
                            "<td class='col-xs-3'>" + data[index].faculty +"</td>"+
                            "<td class='col-xs-3'>" + data[index].semister +"</td>"+
                            "<td class='col-xs-1'>"+ "<a href='updateStudy.html?id="+data[index]._id+"' class='btn btn-primary btn-sm'>"+
                            "Edit</a></td>"+
                            "<td class='col-xs-1'>"+ "<Button class='btn btn-primary btn-sm delete' study_id='"+data[index]._id+"'>"+
                              "Delete</Button></td></tr>");
                            })
                            
                            $.each(data,function(index){
                              $("#table_study_student").append("<tr style'text-align:center'>"+
                               "<td class='col-xs-4'>" +"<a href='http://localhost:94/files/"+data[index].assignment+"' download >"+data[index].assignment+"</a></td>"+
                                "<td class='col-xs-4'>" + data[index].faculty +"</td>"+
                                "<td class='col-xs-4'>" + data[index].semister +"</td></tr>");
                                })//                        
},
            error: function() {
              alert("Sorry, you are not logged in.");
            }
          });
       }


function update_study(){
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");
    console.log(id);


   $.getJSON("http://localhost:94/viewStudyMaterial/" + id, function (result) {
       console.log(result._id);
       $("#subject").val(result.faculty);
       $("#semister").val(result.semister);
            
    });  

 $("#update_study").click(function(){
       faculty=$("#subject").val();
       semister=$("#semister").val();
          
       data={
      "faculty":faculty,
      "semister":semister
    }

 $.ajax({
      url:'http://localhost:94/updateStudy/' + id,
      type:'PUT',
      dataType:'json',
      data:data,
      success:function(res, textStatus, xhr){
          location.href=("teacherStudyMaterial.html");
      alert('Student updated!!');     
      console.log(res);          
       },
      error:function(xhr, textStatus, errorThrown){
      alert('Error! to update Student');
       }
            
      });
      });
    }
    
    
 function delete_study(){
        $("#table_study").on('click','.delete',function(){
            console.log(study_id);
          id=$(this).attr('study_id');
                           $.ajax({
                type: 'DELETE',
                url: 'http://localhost:94/deleteStudy/'+id,
              
                success: function(data) {
                    location.href="teacherStudyMaterial.html";
                  alert("Deleted Successfully");                           
                },
                error: function() {
                  alert("Sorry, you are not logged in.");
                }
              });
            });
    }

       
})