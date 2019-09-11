$(document).ready(function(){
$("#logout").click(function(){
    alert("You are Logged out!!");
})

            ///////Date Formate
         $("#event_date").datepicker({
         dateFormat:"dd-MM-yy",
         changeMonth:true,
         changeYear:true
     });
    
     $("#uploaded_date").datepicker({
        dateFormat:"dd-MM-yy",
        changeMonth:true,
        changeYear:true
    });

    $("#assignment_date").datepicker({
        dateFormat:"dd-MM-yy",
        changeMonth:true,
        changeYear:true
    });
})


    ///chart

  