
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
					maxlength:12,
	      },
	      confirmpassword: {
	        required: true,
	        minlength: 5,
					maxlength:12,
					equalTo: "#password"
	      },
	      email: {
	        required: true,
	        email: true
	      },
	      agree: "required"
	    }
	});
});
function myCheck()
{
	for(var i=0;i<document.form1.elements.length-1;i++)
	{
		if(document.form1.elements[i].value=="")
		{
			alert("当前表单不能有空项");
			document.form1.elements[i].focus();
			return false;
		}
	}
	return true;
	
}