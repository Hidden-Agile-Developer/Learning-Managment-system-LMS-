/// admin approval
$(document).ready(function () {
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
                var userImage = data.filename;

                alert(userImage);
            },
            error: function () {
                alert("Image upload failed!");
            }
        });
    });





    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");
    console.log(id);

    $.getJSON("http://localhost:96/showuserRequest/" + id, function (result) {
        console.log(result._id);
        $("#first_name").val(result.first_name);
        $("#last_name").val(result.last_name);
        $("input[type='radio']:checked").val(result.gender);
        $("#user_type").val(result.user_type);
        $("#contact").val(result.contact);
        $("#email").val(result.email);
        $("#password").val(result.password);
        $("#user_id").val(result._id);

    });



    // $("#delete_request").click(function () {
    //     $.ajax({
    //         type: 'DELETE',
    //         url: 'http://localhost:96/deleterequest/' + id,

    //         success: function (data) {
    //             location.href = "requestuser.html";
    //             alert("Deleted Successfully");
    //         },
    //         error: function () {
    //             alert("Sorry, you are not logged in.");
    //         }
    //     });
    // });



    $("#btn_user_Approval").click(function () {

        var first_name = $("#first_name").val();
        var last_name = $("#last_name").val();
        var gender = $("input[type='radio']:checked").val();
        var user_type = $("#user_type").val();
        var contact = $("#contact").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var subject = $("#subject").val();
        var semister = $("#semister").val();
        var section = $("#section").val();

  if(user_type=="Student"){
        data = {
            "first_name": first_name,
            "last_name": last_name,
            "gender": gender,
            "user_type": user_type,
            "email": email,
            "contact": contact,
            "password": password,
            "subject": subject,
            "semister": semister,
            "section": section,
            "profile_image": userImage

        }

        $.ajax({
            url: 'http://localhost:96/addStudent/',
            type: 'post',
            dataType: 'JSON',
            data: data,
            success: function (res, textStatus, xhr) {
                alert('user registered !!');
                console.log(res);
            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Error! to register');
            }

        
        });
    }

    else if(user_type=="Teacher"){
    alert("Teacher");
    data1 = {
        "first_name": first_name,
        "last_name": last_name,
        "gender": gender,
        "user_type": user_type,
        "email": email,
        "contact": contact,
        "password": password,
        "profile_image": userImage
    }

    $.ajax({
        url: 'http://localhost:96/addTeacher/',
        type: 'post',
        dataType: 'JSON',
        data: data1,
        success: function (res, textStatus, xhr) {
            alert('user registered !!');
            console.log(res);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Error! to register');
        }

    })
    }

    else{
        alert("Failed to register!! User type not verified");
    }



    });


  





    });


