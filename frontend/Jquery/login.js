$(document).ready(function () {

    $('#btn_login').click(function () {
        email = $("#user_email").val();
        password = $("#user_password").val();
        user_type = $("#user_type").val();

        console.log(email);
        console.log(password);

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
                        location.href = ("signup.html");
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
                        location.href = ("signup.html");
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
    });


});
