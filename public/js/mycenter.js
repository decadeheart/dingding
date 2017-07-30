$(function() {
	var $mycenterTitles = $('#mycenter-list a');
	$mycenterTitles.click(function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $mycenterTitles.index(this);
		console.log(index);
		$('#mycenter-content .mycenter-content').eq(index).show().siblings().hide();
	});
});
