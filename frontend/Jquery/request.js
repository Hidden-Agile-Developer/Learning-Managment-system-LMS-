$(document).ready(function(){
    $("#error_mail").hide();

    
    $("#email").keyup(function(){
        email=$("#email").val();
        $.getJSON("http://localhost:94/userRequest/" + email, function (result1) {
            if(result1.length>=1){
                console.log("user already exists");
          $("#error_mail").show();
          $("error_mail").innerHtml('**email already exists');
        }
        else{
            console.log("You can register");
        }

    });
    
});

    $("#registeration_form").click(function(){
        first_name=$("#first_name").val();
        last_name=$("#last_name").val();
        gender=$("#gender").val();
        subject=$("#user_type").val();
        email=$("#email").val();
        contact=$("#contact").val();
        password=$("#password").val();
        
    $.getJSON("http://localhost:94/userRequest/" + email, function (result1) {
       
    if(result1.length>=1){
  $("#error_mail").show();
  $("error_mail").innerHtml('**email already exists');
}
    else{
        data={
            "first_name":first_name,
            "last_name":last_name,
            "gender":gender,
            "user_type":subject,
            "email":email,
            "contact":contact,
            "password":password,            
        }
        $.ajax({
            url:'http://localhost:94/userRequest/',
            type:'post',
            dataType:'json',
            data:data,
            success:function(res, textStatus, xhr){
                alert('user registered !!');     
                console.log(res);          
            },
            error:function(xhr, textStatus, errorThrown){
                alert('Error! to register');
            }
        })


      


    }
        });
       
    }); 
      $.ajax({
       
        type: 'get',
        dataType : 'JSON',
        url: 'http://localhost:94/showuserrequest',
        success: function(data) {
                    $.each(data,function(index){
                         
                      $("#user_request_table").append("<tr style'text-align:center'>"+
                        "<td class='col-xs-3'>" + data[index].first_name+' '+data[index].last_name+"</td>"+
                        "<td class='col-xs-3'>" + data[index].email +"</td>"+
                        "<td class='col-xs-2'>" + data[index].contact + "</td>"+
                        "<td class='col-xs-1'>" + data[index].gender + "</td>"+
                        "<td class='col-xs-2'>" +data[index].user_type +"</td>"+
                        "<td class='col-xs-1'>"+ "<a href='Viewrequest.html?id="+data[index]._id+"' class='btn btn-primary btn-sm'>"+
                        "View</a></td></tr>");
                       
                    }) //  
                  
        },
        error: function() {
        
        }
      });





      
     
    
       
})