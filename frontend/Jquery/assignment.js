$(document).ready(function(){
    view_assignment();

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
            alert("CLICKED");
        assignment_date=$("#assignment_date").val();
        assignment_code=$("#assignment_code").val();
        comment=$("#comment").val();
        email=$("#email").val();

             data={
            "assignment_date":assignment_date,
            "assignment_code":assignment_code,
            "comment":comment,
            "email":email,
            "assignment":userImage
        }

        $.ajax({
            url:'http://localhost:94/addAssignment/',
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

function view_assignment(){
 //   var urlParams = new URLSearchParams(window.location.search);
 //   var email = urlParams.get("email");
        $.ajax({  
            type: 'get',
            dataType : 'JSON',
            url: 'http://localhost:94/viewAssignment',
            success: function(data) {
                        $.each(data,function(index){
                          $("#table_assignment").append("<tr style'text-align:center'>"+
                           "<td class='col-xs-3'>" +"<a href='http://localhost:94/files/"+data[index].assignment+"' download >"+data[index].assignment+"</a></td>"+
                            "<td class='col-xs-3'>" + data[index].assignment_code +"</td>"+
                            "<td class='col-xs-3'>" + data[index].comment +"</td>"+
                            "<td class='col-xs-3'>" + data[index].assignment_date + "</td></tr>");
                            }) //                        
},
            error: function() {
              alert("Sorry, you are not logged in.");
            }
          });
       }

       
})