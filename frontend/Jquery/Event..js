$(document).ready(function(){

    add_event();
    update_event();
    delete_event();
    var event_id;

    ///////////
    var tok = localStorage.getItem('token');
    // alert(tok)
              
            
          /// dashboard creation
               $.ajax({
            type: 'get',
            url: 'http://localhost:94/viewDataAdmin/',
            beforeSend: function(xhr) {
              if (tok) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
              }
            },
            success: function(data) {
              $("#adminuser").append(data.first_name);
              $("#userImage").append( "<img src='http://localhost:94/images/"+data.profile_image+"' "+ "class='img-circle' style=width:30px;height:30px; position:relative; margin-top:5px;>");
              $("#ram").append( "<img src='http://localhost:94/images/"+data.profile_image+"' "+ "class='img-circle' style=width:150px;height:150px; position:relative; margin-top:5px;>");
              $("#dataemail").append(data.email);

              $("#first_name").val(data.first_name);
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
      

    ////////////

        $.ajax({
         
          type: 'get',
          dataType : 'JSON',
          url: 'http://localhost:94/viewEvent',
          success: function(data) {
        
                      $.each(data,function(index){
                        $("#event_table").append("<tr style'text-align:center'>"+
                          "<td class='col-xs-6'>" + data[index].event_name+"</td>"+
                          "<td class='col-xs-2'>" + data[index].event_date +"</td>"+
                          "<td class='col-xs-2'>" + data[index].uploaded_date + "</td>"+
                          "<td class='col-xs-1'>"+ "<a href='updateEvent.html?id="+data[index]._id+"' class='btn btn-primary btn-sm'>"+
                          "Edit</a></td>"+
                          "<td class='col-xs-1'>"+ "<Button class='btn btn-primary btn-sm delete' event_id='"+data[index]._id+"'>"+
                          "Delete</Button></td></tr>");
                         
                      }) //  
                    
          },
          error: function() {
            alert("Sorry, you are not logged in.");
          }
        });
   
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 $.ajax({
         
  type: 'get',
  dataType : 'JSON',
  url: 'http://localhost:94/viewEvent',
  success: function(data) {
              $.each(data,function(index){
                $("#event_table_user").append("<tr style'text-align:center'>"+
                  "<td class='col-xs-6'>" + data[index].event_name+"</td>"+
                  "<td class='col-xs-3'>" + data[index].event_date +"</td>"+
                  "<td class='col-xs-3'>" + data[index].uploaded_date + "</td></tr>");
                 
              }) //  
            
  },
  error: function() {
    alert("Sorry, you are not logged in.");
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      



function add_event(){
    $("#event_add").click(function(){       
       event_name=$("#event_name").val();
       event_date=$("#event_date").val();
       uploaded_date=$("#uploaded_date").val();
      

       data={
           "event_name":event_name,
           "event_date":event_date,
           "uploaded_date":uploaded_date
                      
       }

       $.ajax({
           url:'http://localhost:94/add_event/',
           type:'post',
           dataType:'json',
           data:data,
           success:function(res, textStatus, xhr){
               alert('Event added!!');    
               location.href="adminDashboard.html" 
               console.log(res);          
           },
           error:function(xhr, textStatus, errorThrown){
               alert('Error! to add event');
           }
       });


      });

   }

   ////update event

   function update_event(){
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");
    console.log(id);


   $.getJSON("http://localhost:94/viewEvent/" + id, function (result) {
       console.log(result._id);
       $("#event_name").val(result.event_name);
       $("#event_date").val(result.event_date);
       $("#uploaded_date").val(result.uploaded_date);
        

    });

       $("#update_event").click(function(){
       event_name=$("#event_name").val();
       event_date=$("#event_date").val();
       uploaded_date=$("#uploaded_date").val();
          
       data={
      "event_name":event_name,
      "event_date":event_date,
      "uploaded_date":uploaded_date                       
           }
      $.ajax({
      url:'http://localhost:94/updateEvent/' + id,
      type:'PUT',
      dataType:'json',
      data:data,
      success:function(res, textStatus, xhr){
        location.href="adminDashboard.html";
      alert('Event updated!!');     
      console.log(res);          
       },
      error:function(xhr, textStatus, errorThrown){
      alert('Error! to update event');
       }
            
      });
      });
      }
   

      function delete_event(){
        $("#event_table").on('click','.delete',function(){
              console.log(event_id);
            id=$(this).attr('event_id');
                             $.ajax({
                  type: 'DELETE',
                  url: 'http://localhost:94/deleteEvent/'+id,
                
                  success: function(data) {
                      location.href="adminDashboard.html";
                    alert("Deleted Successfully");                           
                  },
                  error: function() {
                    alert("Sorry, you are not logged in.");
                  }
                });
              });
      }

    });