var myAudio1 = new Audio('/dist/sound/success.wav');
var myAudio2 = new Audio('/dist/sound/error.wav');
var input = document.getElementById('input_id');
input.focus();
input.select();
$('.cccc-edit').click(function (e) {
  e.preventDefault();
  var studentId = $("#form-search-student input[name='id']").val();
  console.log(studentId);
  $.post('/currentlibrary/checkId', { id: studentId }, function (data) {
    if (data.status == 'NOT_FOUND') {
      myAudio2.play();
      $(document).Toasts('create', {
        class: 'bg-danger',
        title: 'Quản lý Sinh viên',
        subtitle: 'Library',
        body: 'Bạn không phải sinh viên khoa máy tính',
      });
      e.preventDefault();
      var form = $(this);
      setTimeout(function () {
        window.location.replace('/currentlibrary');
      }, 1000);
    } else {
      myAudio1.play();
      $(document).Toasts('create', {
        class: 'bg-success',
        title: 'Quản lý Sinh viên',
        subtitle: 'Library',
        body: 'Successfully. Have a nice day!',
      });
      //   Delay to display alert
      e.preventDefault();
      var form = $(this);
      setTimeout(function () {
        window.location.replace('/currentlibrary');
      }, 1000);
    }
  });
});

$("#form-search-student").submit(function (e) {
  e.preventDefault();
  //Write code to check if student id is existed!
  //Camel case
  var studentId = $("input[name='id']").val();
  var form = $(this);
        $.post('/currentlibrary/checkId', { id: studentId }, function (data) {
        if (data.status == 'NOT_FOUND') {
          myAudio2.play();
          $(document).Toasts('create', {
            class: 'bg-danger',
            title: 'Quản lý Sinh viên',
            subtitle: 'Library',
            body: 'Bạn không phải sinh viên khoa máy tính',
          });
        } else {
          myAudio1.play();
          $(document).Toasts('create', {
            class: 'bg-success',
            title: 'Quản lý Sinh viên',
            subtitle: 'Library',
            body: 'Successfully. Have a nice day!',
          });
        //   Delay to display alert
        }
      });
  setTimeout(function () {
    window.location.replace("/currentlibrary");
  }, 1000);

});

// $('.aaaaa').keypress(function (event) {
//   if (event.keyCode === 13) {
//     $(document).Toasts('create', {
//       class: 'bg-danger',
//       title: 'Quản lý Sinh viên',
//       subtitle: 'Library',
//       body: 'Bạn không phải sinh viên khoa máy tính',
//     });
//     btn.click();
//   }
//   clearInterval(5000);
// });

// var x ;
// setInterval(function() {
//   var studentId = $("#form-search-student input[name='id']").val();

//   if (studentId.length==7 && studentId!=x){
//     $.post('/currentlibrary/checkId', { id: studentId }, function (data) {
//       if (data.status == 'NOT_FOUND') {
//         $(document).Toasts('create', {
//           class: 'bg-danger',
//           title: 'Quản lý Sinh viên',
//           subtitle: 'Library',
//           body: 'Bạn không phải sinh viên khoa máy tính',
//         });
//         //e.preventDefault();
//         var form = $(this);
//         setTimeout(function () {
//           window.location.replace("/currentlibrary");
//         }, 2000);
//       } else {

//         $(document).Toasts('create', {
//           class: 'bg-success',
//           title: 'Quản lý Sinh viên',
//           subtitle: 'Library',
//           body: 'Successfully. Have a nice day!',
//         });
//       //   Delay to display alert
//        // e.preventDefault();
//         var form = $(this);
//         setTimeout(function () {
//           window.location.replace("/currentlibrary");
//         }, 2000);

//       }
//     });

//   }
//   x= studentId;

// }, 1000);

// $('.cccc-out').click(function (e) {
//   e.preventDefault();
//   var studentId = $("#form-search-student input[name='id']").val();
//   console.log(studentId);
//   $.post('/currentlibrary/checkout', { id: studentId }, function (data) {
//     console.log(data);

//   })
// });
$(".btn-delete").click(function (e) {
  $('#DeleteStudentModal').modal('show');
});