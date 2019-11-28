$(document).ready(function () {

    $('#btn_login').click(function () {
        email = $("#user_email").val();
        password = $("#user_password").val();
        user_type = $("#user_type").val();

        // console.log(email);
        // console.log(password);

         if(email == ''){
            $('#user_email').attr('placeholder', 'Please enter your email address');
            $('#user_email').css({ 'border': '2px solid red' });
            $('#user_email').focus();
          }
          else if (!email.match('[A-Za-z_]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$')) {
            $('#user_email').attr('placeholder', 'Please Enter Valid Email');
            $('#user_email').css({ 'border': '2px solid #ff1a1a' });
            $('#user_email').focus();
          }

          else if(password ==''){
            $('#user_password').attr('placeholder', 'Please enter your contact number');
            $('#user_password').css({ 'border': '2px solid red' });
            $('#user_password').focus(); 
          }
          else if (!password.match('^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$')) {
            $('#user_password').attr('placeholder', 'Enter Your Password ');
            $('#user_password').css({ 'border': '2px solid #ff1a1a' });
            $('#user_password').focus();
          }
          else{

            data = {
                "email": email,
                "password": password
            }

        if (user_type == "Admin") {
            $.ajax({
                url: 'http://localhost:96/loginUser/',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (res, textStatus, xhr) {
                console.log(res)
                if (res.email < 1) {
                alert("Invalid username/password")
                }
                else {
                alert("Successfully Log In");
                location.href = ("admindashboard.html");
                localStorage.setItem('token', res.token);
                }
                },

                error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
                }
                });
                }

        else if (user_type == "Student") {
                $.ajax({

                url: 'http://localhost:96/loginStudent/',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (res, textStatus, xhr) {
                console.log(res)
                if (res.email < 1) {
                alert("Invalid username/password")
                }
                else {
                alert("Successfully Log In");
                location.href = ("studentDashboard.html");
                localStorage.setItem('token', res.token);
                }
                },

                error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
                }
                });
                }

        else if (user_type == "Teacher") {
            $.ajax({

                url: 'http://localhost:96/loginTeacher/',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (res, textStatus, xhr) {
                console.log(res)
                if (res.email < 1) {
                alert("Invalid username/password")
                }
                else {
                alert("Successfully Log In");
                location.href = ("teacherdashboard.html");
                localStorage.setItem('token', res.token);
                    }
                },

                error: function (xhr, textStatus, errorThrown) {
                    console.log('Error in Operation');
                }
            });
        }
        else {
            alert("Invalid usertype")
        }
    }
    });


});
