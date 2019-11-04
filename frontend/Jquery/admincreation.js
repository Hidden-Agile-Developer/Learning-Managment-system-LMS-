$(document).ready(function(){

var tok = localStorage.getItem('token');
$.ajax({
    type: 'get',
    url: 'http://localhost:96/viewDataAdmin/',
    beforeSend: function(xhr) {
      if (tok) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
      }
    },
    success: function(data) {
      $("#userName").append(data.first_name);

      $("#dataemail").append(data.email);

      $("#firsr_name").val(data.first_name);
      $("#last_name").val(data.last_name);
      $("#gender").val(data.gender);
      $("#email").val(data.email);
      $("#contact").val(data.contact);
      $("#password").val(data.password);
      $("#aid").val(data._id);
      console.log(data);                                  
    },
    error: function() {
      alert("Sorry, you are not logged in.");
    }
  });


});