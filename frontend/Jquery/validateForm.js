$(document).ready(function(){

   $('#error_first_name').hide(); 
   $('#error_last_name').hide(); 
   $('#error_email').hide(); 
   $('#error_contact').hide();


   var firstName_err=true;
   var lastName_err=true;
   var firstName_err=true;
   var contact_err=true;
   
$('#first_name').keyup(function(){
    firstname_check();
})


function firstname_check(){
    var firstname_val=$('#first_name').val();
    if(firstname_val.length==''){
        $('#error_first_name').show();
        $('#error_first_name').html('**First name required**');
        $('#error_first_name').focus();
        $('#error_first_name').css("color", "red");
        firstName_err=false;
        return false;
    }
    else{
        $('#error_first_name').hide();
       
    }

    if(firstname_val.length<3){
        $('#error_first_name').show();
        $('#error_first_name').html('**Not valid First name**');
        $('#error_first_name').focus();
        $('#error_first_name').css("color", "red");
        firstName_err=false;
        return false;
    }
    else{
        $('#error_first_name').hide();
       
    }

    
    if(firstname_val.length<3){
        $('#error_first_name').show();
        $('#error_first_name').html('**Not valid First name**');
        $('#error_first_name').focus();
        $('#error_first_name').css("color", "red");
        firstName_err=false;
        return false;
    }
    else{
        $('#error_first_name').hide();
       
    }
}


})
