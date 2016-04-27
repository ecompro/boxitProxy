$(document).ready(function(){
	RotatorsInit();
	setInterval(Rotate, 5000);
	function RotatorsInit(){
		$(".Rotator").each(function(indexRotator){
			$(this).children("div:nth-child(1)").css("display","block");
			$(this).children(".BannerSelecters").children(".Banner").each(function(index){
				if(index == 0){
					$(this).addClass("Selected");
				}else{
					$(this).removeClass("Selected");
				}
			})
		});
	}
	function Rotate(){
		$(".Rotator").each(function(indexRotator){
			var NumbersOfBanners = Number($(this).children("div").length) - 1;
			var $Object = $(this);
			var NextIndex = 0;
			$(this).children("div").each(function(index){
				if(!$(this).hasClass("BannerSelecters")){
					var Display = $(this).css("display");
					if(Display == "block"){
						if(index >= (NumbersOfBanners - 1)){
							NextIndex = 0;
						}else{
							NextIndex = index + 1
						}
					}else{

					}
				}
			});
			$(this).children("div").css("display","none");
			$(this).children(".BannerSelecters").css("display","block");
			$(this).children(".BannerSelecters").children(".Banner").removeClass("Selected");
			$(this).children(".BannerSelecters").children(".Banner:nth-child("+ Number(NextIndex + 1) +")").addClass("Selected");
			$(this).children("div:nth-child("+ Number(NextIndex + 1) +")").css("display","block");
		});
	}
	function RotateClick(object, index){
		object.children("div").css("display","none");
		object.children(".BannerSelecters").css("display","block");
		object.children(".BannerSelecters").children(".Banner").removeClass("Selected");
		object.children(".BannerSelecters").children(".Banner:nth-child("+ Number(index + 1) +")").addClass("Selected");
		object.children("div:nth-child("+ Number(index + 1) +")").css("display","block");
	}
	$("body").on("click",".BannerSelecters .Banner",function(){
		var $Object = $(this).closest(".BannerSelecters").closest(".Rotator");
		var index = $(this).index();
		RotateClick($Object,index);
	});
});