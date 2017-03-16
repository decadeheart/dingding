
$().ready(function() {
// 在键盘按下并释放及提交后验证提交表单
  $("#signupform").validate({
	    rules: {
	      firstname: "required",
	      lastname: "required",
	      'user[name]': {
	        required: true,
	        minlength: 5,
	        maxlength:12
	      },
	      'user[password]': {
	        required: true,
	        minlength: 5,
	        maxlength:12
	      },
	      confirmpassword: {
	        required: true,
	        minlength: 5,
	        maxlength:12,
	      },
	      email: {
	        required: true,
	        email: true
	      },
	      agree: "required"
	    }
	});
});