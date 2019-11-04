
  //upload event
  $(document).ready(function () {

//     n =  new Date();
// y = n.getFullYear();
// m = n.getMonth() + 1;
// d = n.getDate();
// document.getElementById("date").innerHTML = m + "/" + d + "/" + y;

var d = new Date();

          var month = d.getMonth()+1;
          var day = d.getDate();

          var sysdate = d.getFullYear() + '/' +
              (month<10 ? '0' : '') + month + '/' +
              (day<10 ? '0' : '') + day;

              console.log(sysdate);

    $("#date").append(sysdate);
      $('#btnuploadevent').click(function (e) {
          e.preventDefault();
    
           eventname = $("#event_name").val();
           happeningdate = $("#happening_date").val();
          data = {
              "eventName" : eventname,
              "happeningDate" : happeningdate,
              "uploadedDate":sysdate,
          }

          $.ajax({
              url: 'http://localhost:96/addEvent/',
              type: 'post',
              dataType: 'json',
              data:data,
              success: function (res, textStatus, xhr) {
                  alert('Event Successfully added');
                  location.href="event.html";
              },
              error: function (xhr, textStatus, errorThrown) {
                  console.log('Error in Operation');
              }
          });
      });

      

      $.ajax({
        type: 'get',
        url: 'http://localhost:96/showEventDetails',
        // beforeSend: function(xhr) {
        //   if (tok) {
        //     xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
        //   }
        // },
        success: function(data) {
        
                    $.each(data,function(index){
                 
                      
                      $("#tbeventDetails").append("<tr style='text-align:center'>"+
                          "<td class='col-xs-6'>" + data[index].eventName+ "</td>"+
                        "<td class='col-xs-2'>" +new Date(data[index].happeningDate).toISOString().split('T')[0]+ "</td>"+
                        "<td class='col-xs-2'>" + new Date(data[index].uploadedDate).toISOString().split('T')[0]+ "</td>"+
                       
                       "<td class='col-xs-1'><a href='event.html?id="
                       +data[index]._id+"' class='btn btn-primary btn-sm'><i class='fa fa-edit'></i> </a> </td>"+
                       "<td class='col-xs-1'>"+
                       " <button  class='btn btn-danger btn-sm delete' event_id='"+data[index]._id+"'><i class='fa fa-trash'></i> </button></td></tr>");
                       

                    })
                     // // 
                  
        },
        error: function() {
          alert("Sorry, you are not logged in.");
        }
      }); 

    

      // view Specific Event

      var urlParams = new URLSearchParams(window.location.search);

// console.log(urlParams.get("id"));
 var id = urlParams.get("id");


      $.getJSON("http://localhost:96/showSpecificEvent/" + id, function (result) {
        // e.preventDefault();
    console.log(result.happeningDate);
    console.log(result._id);
    $('#event_name').val(result.eventName);
    $('#happening_date').val(new Date(result.happeningDate).toISOString().split('T')[0]);
 
});

// Update specific event
 // Update 
 $("#btnEventUpdate").click(function () {
                
           eventname = $("#event_name").val();
           happeningdate = $("#happening_date").val();
                
                  var data = {
                "eventName" : eventname,
                "happeningDate" : happeningdate,
                }
                

                $.ajax({
                    type: "PUT",
                    url: "http://localhost:96/updateSpecificEvent/" + id,
                    data: data,
                    success: function (result) {
                      alert("Successfully Updated");
                      location.href="event.html";
                        console.log("successfully updated!")
                
                    }
                });
                return false;
            });

  //  delete Specific Event
  $("#tbeventDetails").on('click','.delete',function(){
        eid=$(this).attr('event_id');
        // alert(id);
       // alert(id);
			   	$.ajax({
        type: 'DELETE',
        url: 'http://localhost:96/deleteSpecificEvent/'+eid,
        success: function(data) {
		    location.href="event.html";
          alert("Event Deleted Successfully");                           
        },
        error: function() {
          alert("Sorry, you are not logged in.");
        }
      });
			   })


  });


