$(document).ready(function(){
    delete_section();
    delete_course()
    add_course();
    add_section();
    var student_id;
    var job_id;
    var id;
        $.ajax({
             
            type: 'get',
            dataType : 'JSON',
            url: 'http://localhost:94/viewCourse',
            success: function(data) {
                        $.each(data,function(index){
                          $("#subject").append(
                            "<option>" + data[index].course_name +"</option>"
                         );
                         $("#subject1").append(
                            "<option>" + data[index].course_name +"</option>"
                         );

                         $("#table_course").append("<tr style'text-align:center'>"+
                         "<td class='col-xs-10'>" + data[index].course_name+"</td>"+
                         "<td class='col-xs-2'>"+ "<Button class='btn btn-primary btn-sm remove' course_id='"+data[index]._id+"'>"+
                         "Delete</Button></td>tr>");


                         }) //  
                        },
            error: function() {
              alert("Sorry, you are not logged in.");
            }
          });

          
          $.ajax({
            
            type: 'get',
            dataType : 'JSON',
            url: 'http://localhost:94/viewSection',
            success: function(data) {
                $.each(data,function(index){
                    
                    $("#table_section").append("<tr style'text-align:center'>"+
                      "<td class='col-xs-4'>" + data[index].subject+"</td>"+
                      "<td class='col-xs-4'>" + data[index].semister +"</td>"+
                      "<td class='col-xs-2'>" + data[index].section + "</td>"+
                      "<td class='col-xs-2'>"+ "<Button class='btn btn-primary btn-sm remove' section_id='"+data[index]._id+"'>"+
                      "Delete</Button></td>tr>");

                           
                        }) //     
            },
            error: function() {
              alert("Sorry, you are not logged in.");
            }
          });

    
    
       function update_teacher(){
        var urlParams = new URLSearchParams(window.location.search);
        var id = urlParams.get("id");
        console.log(id);
    
    
       $.getJSON("http://localhost:94/viewTeacher/" + id, function (result) {
           console.log(result._id);
           $("#first_name").val(result.first_name);
           $("#last_name").val(result.last_name);
           $("#gender").val(result.gender);
           $("#email").val(result.email);
           $("#contact").val(result.contact);        
    
        });
    
           $("#update_teacher").click(function(){
           first_name=$("#first_name").val();
           last_name=$("#last_name").val();
           gender=$("#gender").val();
           email=$("#email").val();
           contact=$("#contact").val();
              
           data={
          "first_name":first_name,
          "last_name":last_name,
          "gender":gender,
          "email":email,
          "contact":contact,
        }
    
          $.ajax({
          url:'http://localhost:94/updateTeacher/' + id,
          type:'PUT',
          dataType:'json',
          data:data,
          success:function(res, textStatus, xhr){
          alert('Teacher updated!!');     
          console.log(res);          
           },
          error:function(xhr, textStatus, errorThrown){
          alert('Error! to update Teacher');
           }
                
          });
          });
          }
    
       

          function add_course(){
            $("#add_course").click(function(){
                course_name=$("#course_name").val();
        
                data={
                    "course_name":course_name,            
                }
        
                $.ajax({
                    url:'http://localhost:94/addCourse/',
                    type:'post',
                    dataType:'JSON',
                    data:data,
                    success:function(res, textStatus, xhr){
                    location.href=("updateSC.html");  
                    alert('Course Added !!'); 
                         
                        console.log(res);          
                    },
                    error:function(xhr, textStatus, errorThrown){
                        alert('Error! to Add Course');
                    }
        
        
                })
        
        
               });
        
          }

          //////
          function add_section(){
            $("#add_section").click(function(){
                subject=$("#subject").val();
                semister=$("#semister").val();
                section=$("#section").val();

        
                data={
                    "subject":subject,
                    "semister":semister,
                    "section":section            
                }
        
                $.ajax({
                    url:'http://localhost:94/addSection/',
                    type:'post',
                    dataType:'JSON',
                    data:data,
                    success:function(res, textStatus, xhr){
                    location.href=("updateSC.html");  
                    alert('Section Added !!'); 
                         
                        console.log(res);          
                    },
                    error:function(xhr, textStatus, errorThrown){
                        alert('Error! to Add Section');
                    }
        
        
                })        
               });        
          }


          function delete_section(){
            $("#table_section").on('click','.remove',function(){
                console.log(job_id);
              id=$(this).attr('section_id');
                               $.ajax({
                    type: 'DELETE',
                    url: 'http://localhost:94/deleteSeciton/'+id,
                  
                    success: function(data) {
                        location.href="updateSC.html";
                      alert("Deleted Successfully");                           
                    },
                    error: function() {
                      alert("Sorry, you are not logged in.");
                    }
                  });
                });
            
          }
////////////

function delete_course(){
    $("#table_course").on('click','.remove',function(){
        console.log(job_id);
      id=$(this).attr('course_id');
                       $.ajax({
            type: 'DELETE',
            url: 'http://localhost:94/deleteCourse/'+id,
          
            success: function(data) {
                location.href="updateSC.html";
              alert("Deleted Successfully");                           
            },
            error: function() {
              alert("Sorry, you are not logged in.");
            }
          });
        });
    
  }

    
    
    });

    function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("section_search");
        filter = input.value.toUpperCase();
        table = document.getElementById("table_section");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
      
      }

      
