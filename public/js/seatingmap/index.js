$("#form-add-map").submit(function (e) {
    e.preventDefault();
    //Write code to check if student id is existed!
    //Camel case

    var form = $(this);
    //console.log(studentId)
    //AJAX

            // console.log("NOT FOUND");
            form.unbind("submit").submit();

});
$(".btn-delete").click(function (e) {
    $('#DeleteStudentModal').modal('show');
  });