$(document).ready(function () {
    //  $("#error_mail").hide();
 
     // $("#email").keyup(function () {
     //     email = $("#email").val();
     //     $.getJSON("http://localhost:96/userRequest/" + email, function (result1) {
     //         if (result1.length >= 1) {
     //             console.log("user already exists");
     //             $("#error_mail").show();
     //             $("error_mail").innerHtml('**email already exists');
     //         }
     //         else {
     //             console.log("You can register");
     //         }
     //     });
     // });
 
     $("#btn_user_register").click(function () {
         first_name = $("#first_name").val();
         last_name = $("#last_name").val();
         gender = $("input[type='radio']:checked").val();
         user_type = $("#user_type").val();
         email = $("#email").val();
         contact = $("#contact").val();
         password = $("#password").val();
 
         if (first_name == '') {
             $('#first_name').attr('placeholder', 'Please enter first name');
             $('#first_name').css({ 'border': '2px solid red','border-style':'double' });
             $('#first_name').focus();
           }
     else if (!first_name.match('^[A-Za-z. ]{3,30}')) {
       $('#first_name').attr('placeholder', 'Invalid Input character');
       $('#first_name').css({ 'border': '2px solid #ff1a1a' });
       $('#first_name').focus();
     }
     else if(last_name == ''){
         $('#last_name').attr('placeholder', 'Please enter last name');
         $('#last_name').css({ 'border': '2px solid red' });
         $('#last_name').focus();
     }
     else if (!last_name.match('^[A-Za-z]{3,30}')) {
         $('#last_name').attr('placeholder', 'Invalid Input character');
         $('#last_name').css({ 'border': '2px solid #ff1a1a' });
         $('#last_name').focus();
       }
       else if(email == ''){
         $('#email').attr('placeholder', 'Please enter your email address');
         $('#email').css({ 'border': '2px solid red' });
         $('#email').focus();
       }
       else if (!email.match('[A-Za-z_]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$')) {
         $('#email').attr('placeholder', 'Please Enter Valid Email');
         $('#email').css({ 'border': '2px solid #ff1a1a' });
         $('#email').focus();
       }
       else if(contact==''){
         $('#contact').attr('placeholder', 'Please enter your contact number');
         $('#contact').css({ 'border': '2px solid red' });
         $('#contact').focus();
       }
       else if (!contact.match('[98][0-9]{9}')) {
         $('#contact').attr('placeholder', 'Please use 10 digit numbers only');
         $('#contact').css({ 'border': '2px solid #ff1a1a' });
         $('#contact').focus();
       }
       else if(password ==''){
         $('#password').attr('placeholder', 'Please enter your Password');
         $('#password').css({ 'border': '2px solid red' });
         $('#password').focus(); 
       }
       else if (!password.match('^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$')) {
         $('#password').attr('placeholder', 'Use At least one uppercase and one special character ');
         $('#password').css({ 'border': '2px solid #ff1a1a' });
         $('#password').focus();
       }else{
         $('#first_name').css({ 'border-style': 'ridge','border':'2px solid green' });
 
         data = {
             "first_name": first_name,
             "last_name": last_name,
             "gender": gender,
             "user_type": user_type,
             "email": email,
             "contact": contact,
             "password": password,
         }
         $.ajax({
             url: 'http://localhost:96/userRequest/',
             type: 'post',
             dataType: 'json',
             data: data,
             success: function (res, textStatus, xhr) {
 
                 // console.log(res.data.email);
                 // if(res.userdata.email==$("#email").val()){
                 //     $('#email').attr('placeholder', 'This email already exists');
                 //     $('#email').css({ 'border': '2px solid red' });
                 //     $('#email').focus(); 
                 // }else{
                     alert('user registered !!');
                 //     console.log(res);
                 // }
                
             },
             error: function (xhr, textStatus, errorThrown) {
                 alert('Error! to register');
             }
         })
 
       }
 
                 
 
 
             //}
        // });
 
     });
     $.ajax({
 
         type: 'get',
         dataType: 'JSON',
         url: 'http://localhost:96/showuserRequest',
         success: function (data) {
             $.each(data, function (index) {
 
                 $("#user_request_table").append("<tr style'text-align:center'>" +
                     "<td class='col-xs-3'>" + data[index].first_name + ' ' + data[index].last_name + "</td>" +
                     "<td class='col-xs-3'>" + data[index].email + "</td>" +
                     "<td class='col-xs-2'>" + data[index].contact + "</td>" +
                     "<td class='col-xs-1'>" + data[index].gender + "</td>" +
                     "<td class='col-xs-2'>" + data[index].user_type + "</td>" +
                     "<td class='col-xs-1'>" + "<a href='Viewrequest.html?id=" + data[index]._id + "' class='btn btn-primary btn-sm'>" +
                     "View</a></td></tr>");
 
             }) //  
 
         },
         error: function () {
 
         }
     });
 
 
 
 
 
 
 
 
 
 })