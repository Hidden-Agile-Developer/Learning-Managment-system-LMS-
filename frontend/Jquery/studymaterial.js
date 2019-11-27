$(document).ready(function(){
    view_study();
    delete_study();
    add_study();
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
                 alert("Image upload failed!");
             }
             });
             });


function add_study(){
    $("#add_studymaterial").click(function(){
    alert("CLICKED");
    email=$("#email").val();
    faculty=$("#subject").val();
    semister=$("#semister").val();
  
    data={
    "faculty":faculty,
    "semister":semister,
    "email":email,
    "assignment":userImage
    }

    $.ajax({
    url:'http://localhost:96/addStudyMaterial/',
    type:'post',
    dataType:'json',
    data:data,
    success:function(res, textStatus, xhr){
    alert('file uploaded !!');     
    location.href="teacherStudyMaterial.html";        
    },
    error:function(xhr, textStatus, errorThrown){
    alert('Error! to upload');
    }
    })

    });

}
    

function view_study(){
    $.ajax({  
    type: 'get',
    dataType : 'JSON',
    url: 'http://localhost:96/viewStudyMaterial',
    success: function(data) {
    $.each(data,function(index){
    $("#table_study").append("<tr style'text-align:center'>"+
    "<td class='col-xs-3'>" +"<a href='http://localhost:96/files/"+data[index].assignment+"' download >"+data[index].assignment+"</a></td>"+
    "<td class='col-xs-3'>" + data[index].faculty +"</td>"+
    "<td class='col-xs-3'>" + data[index].semister +"</td>"+
    "<td class='col-xs-3'>"+ "<Button class='btn btn-primary btn-sm delete' study_id='"+data[index]._id+"'>"+
    "Delete</Button></td></tr>");
    })
                            
    $.each(data,function(index){
    $("#table_study_student").append("<tr style'text-align:center'>"+
    "<td class='col-xs-4'>" +"<a href='http://localhost:96/files/"+data[index].assignment+"' download >"+data[index].assignment+"</a></td>"+
    "<td class='col-xs-4'>" + data[index].faculty +"</td>"+
    "<td class='col-xs-4'>" + data[index].semister +"</td></tr>");
    })//                        
},
    error: function() {
    alert("Sorry, you are not logged in.");
    }
    });
    }



    
 function delete_study(){
      $("#table_study").on('click','.delete',function(){
      console.log(study_id);
      id=$(this).attr('study_id');
      $.ajax({
      type: 'DELETE',
      url: 'http://localhost:96/deleteStudy/'+id,
            
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