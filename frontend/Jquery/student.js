$(document).ready(function () {
$.ajax({

        type: 'get',
        dataType : 'JSON',
        url: 'http://localhost:96/ViewStudent',
        success: function(data) {
                    $.each(data,function(index){
                      $("#table_student").append("<tr style'text-align:center'>"+
                        "<td class='col-xs-2'>" + data[index].first_name+' '+data[index].last_name+"</td>"+
                        "<td class='col-xs-2'>" + data[index].email +"</td>"+
                        "<td class='col-xs-2'>" + data[index].contact + "</td>"+
                        "<td class='col-xs-2'>" + data[index].subject + "</td>"+
                        "<td class='col-xs-1'>" + data[index].semister + "</td>"+
                        "<td class='col-xs-1'>" + data[index].section + "</td>"+
                        "<td class='col-xs-1'>"+ "<a href='profile.html?id="+data[index]._id+"' class='btn btn-primary btn-sm'>"+
                        "<i class='fa fa-edit'></a></td>"+
                        "<td class='col-xs-1'>"+ "<Button class='btn btn-primary btn-sm delete' student_id='"+data[index]._id+"'>"+
                        "<i class='fa fa-trash'></Button></td></tr>");
                       
                    }); 
                  
        },
        error: function() {
          alert("Sorry, you are not logged in.");
        }
      });

});