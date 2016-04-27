$(document).ready(function(){
	if(Number($(".BannerSelecters").length) >= 1){
		$(".BannerSelecters").each(function(index){
			var WidthRotator = Number($(this).closest(".Rotator").width());
			var WidthBannerSelecters = Number($(this).width());
			var Left = (WidthRotator / 2) - (WidthBannerSelecters / 2);
			$(this).css("left",Left+"px");
		});
	}
	$("body").on("click",".FAQS .FAQ .Title",function(){
		$(".FAQS .FAQ").removeClass("Selected");
		$(this).closest(".FAQ").addClass("Selected");
	});
	$("body").on("click",".Mobile .Top .Menu",function(){
		$(".MobileMenu").show();
		$("body").css("overflow","hidden");
	});
	$("body").on("click",".MobileMenu .Menu .Header .Close",function(){
		$(".MobileMenu").hide();
		$("body").css("overflow","auto");
	});
	$("body").on("click", ".MobileMenu .Menu .Groups .Group .Header", function(){
		$(this).closest(".Group").find(".Options").toggle();
	});
})