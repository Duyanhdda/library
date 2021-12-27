document.write('<script src="../../plugins/moment/moment.min.js"></script>');


$("#form-add-student").submit(function (e) {
    e.preventDefault();
    //Write code to check if student id is existed!
    //Camel case
    var studentId = $("input[name='id']").val();
    var form = $(this);
    console.log(studentId)
    //AJAX
    $.post("/student/checkId", { id: studentId }, function (data) {
        console.log(data);
        if (data.status == "FOUND") {
            //alert("Đã tồn tại mã số sinh viên này!");
            $(document).Toasts('create', {
                class: 'bg-danger',
                title: 'Quản lý Sinh viên',
                subtitle: 'Library',
                body: 'Đã tồn tại sinh viên này! Hãy nhập lại.'
            })
        }
        else {
            $(document).Toasts('create', {
                class: 'bg-success',
                title: 'Quản lý Sinh viên',
                subtitle: 'Library',
                body: 'Successfully. Have a nice day!',
              });
              setTimeout(function () {
                form.unbind("submit").submit();
              }, 1000);
            // console.log("NOT FOUND");

        }
    });
});




$("#tab-students")
    .DataTable({
        dom: "Bfrtip", //Thêm dom vào thì nó sẽ hiện đồng thời giữa language và bottom
        responsive: true,
        lengthChange: false,
        autoWidth: false,
        language: {
            url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Vietnamese.json",
        },
        columnDefs: [{
            targets: 5,
            orderable: false,
        }],
        buttons: [
            {
                extend: 'copyHtml5',
                exportOptions: {
                    columns: [0, ':visible']
                }
            },
            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 5]
                }
            },
            'colvis'
        ],
    });


$('.btn-history').click(function(e){
    var id = $(this).data("id");
    var lastName = $(this).data("last-name");
    var firstName = $(this).data("first-name");
    var countInOut = $(this).data("count-in-out");
    $("#HistoryStudentModal input[name='id']").val(id);
    $("#HistoryStudentModal input[name='lastName']").val(lastName);
    $("#HistoryStudentModal input[name='firstName']").val(firstName);
    $("#HistoryStudentModal input[name='countInOut']").val(countInOut);
    
    $.post("/turn/getHistoryTurn", { id: id }, function (historyList) {
        console.log(historyList);
        console.log(historyList.turnOfStudent.length);
        var t = $('#historyModal').DataTable();
        t.rows().remove().draw();
        for (var i = 0; i < historyList.turnOfStudent.length; i++) {
            //console.log(historyList.turnOfStudent[i]['creatAt']);
            if(historyList.turnOfStudent[i]['turnInOut'] == true){
                t.row
                .add([
                `<center name="turnInOut"><td> Vào </td></center>`,
                `<center name="creatAt"><td > ${moment(historyList.turnOfStudent[i]['createAt']).format('lll')} </td></center>`,
                ])
                .draw(false);
            }
            else {
                t.row
                .add([
                `<center name="turnInOut"><td> Ra </td></center>`,
                `<center name="creatAt"><td > ${moment(historyList.turnOfStudent[i]['createAt']).format('lll')} </td></center>`,
                ])
                .draw(false);
            }
        }
    });  
    $('#HistoryStudentModal').modal('show');
});


$(".btn-edit").click(function (e) {
    var id = $(this).data("id");
    var lastName = $(this).data("last-name");
    var firstName = $(this).data("first-name");
    var email = $(this).data("email");
    console.log(id, lastName, firstName, email);
    $("#EditStudentModal input[name='id']").val(id);
    $("#EditStudentModal input[name='lastName']").val(lastName);
    $("#EditStudentModal input[name='firstName']").val(firstName);
    $("#EditStudentModal input[name='email']").val(email);
    $('#EditStudentModal').modal('show');
});

$(".btn-delete").click(function (e) {
    var id = $(this).data("id"); //data này mix với data ở button edit truyền lên
    //console.log(id);
    $("#DeleteStudentModal input[name='id']").val(id);
    $('#DeleteStudentModal').modal('show');
});

$(".btn-deleteAll").click(function (e) {
    var id = $(this).data("id"); //data này mix với data ở button edit truyền lên
    //console.log(id);
    $("#DeleteStudentModal input[name='id']").val(id);
    $('#DeleteStudentModal').modal('show');
});


$(function () { //Show name file when browser in upload file
    bsCustomFileInput.init();
  });
