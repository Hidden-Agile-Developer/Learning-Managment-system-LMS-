$(document).ready(function () {
    $.ajax({
             
type: 'get',
dataType : 'JSON',
url: 'http://localhost:96/ViewTeacher',
success: function(data) {
$.each(data,function(index){
$("#table_teacher").append("<tr style'text-align:center'>"+
"<td class='col-xs-3'>" + data[index].first_name+' '+data[index].last_name+"</td>"+
"<td class='col-xs-2'>" + data[index].email +"</td>"+
"<td class='col-xs-2'>" + data[index].contact + "</td>"+
"<td class='col-xs-2'>" +"<img src='http://localhost:96/images/"+data[index].profile_image+"' "+ "class='img-rounded' style=width:50px;height:50px;>" + "</td>"+
"<td class='col-xs-1'>"+ "<a href='teacherProfile.html?id="+data[index]._id+"' class='btn btn-primary btn-sm'>"+
"<i class='fa fa-edit'></a></td>"+
"<td class='col-xs-1'>"+ "<Button class='btn btn-primary btn-sm delete' teacher_id='"+data[index]._id+"'>"+
"<i class='fa fa-trash'></Button></td>"+
"<td class='col-xs-1'>"+ "<a href='job.html?email="+data[index].email+"' class='btn btn-primary btn-sm'>"+
"<i class='fa fa-list'></i></a></td></tr>");
}) //                        
},
error: function() {
alert("Sorry, you are not logged in.");
}
});

});