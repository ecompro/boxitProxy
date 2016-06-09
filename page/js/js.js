$(document).ready(function(){
	if(Number($(".BannerSelecters").length) >= 1){
		$(".BannerSelecters").each(function(index){
			var WidthRotator = Number($(this).closest(".Rotator").width());
			var WidthBannerSelecters = Number($(this).width());
			var Left = (WidthRotator / 2) - (WidthBannerSelecters / 2);
			$(this).css("left",Left+"px");
		});
	}
	$(window).resize(function(){
		$(".BannerSelecters").each(function(index){
			var WidthRotator = Number($(this).closest(".Rotator").width());
			var WidthBannerSelecters = Number($(this).width());
			var Left = (WidthRotator / 2) - (WidthBannerSelecters / 2);
			$(this).css("left",Left+"px");
		});
	});
        
        function banner(){
           
            $(".BannerSelecters").each(function(index){
			var WidthRotator = Number($(this).closest(".Rotator").width());
			var WidthBannerSelecters = Number($(this).width());
			var Left = (WidthRotator / 2) - (WidthBannerSelecters / 2);
			$(this).css("left",Left+"px");
		});
            
            
        };
       
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
        
        $("body").on("click",".closeMmenu",function(){
		$(".MobileMenu").hide();
                $(this).closest(".Group").find(".Options").toggle();
		$("body").css("overflow","auto");
	});
        
	$("body").on("click", ".MobileMenu .Menu .Groups .Group ", function(){
		$(this).closest(".Group").find(".Options").toggle();
	});
	$("body").on("click",".BoxitStoreContainer .ShoppingTrends .Arrow",function(){
		var NextBack = "";
		if($(this).hasClass("Next")){
			NextBack = "Next";
		}else{
			if($(this).hasClass("Back")){
				NextBack = "Back";
			}
		}
		CalculateShoppingTrendsScroll(NextBack);
		$(".BoxitStoreContainer .ShoppingTrends .Trends").stop().animate({
			scrollLeft: Left
		}, 200)
		var leftTmp = $(".BoxitStoreContainer .ShoppingTrends .Trends").offset().left;
		if(Left <= 0){
			$(".BoxitStoreContainer .ShoppingTrends .Trends").stop().animate({
				scrollLeft: 0
			}, 200);
			Left = 0;
		}
		if(Left >= Number(widthTmp - $(".BoxitStoreContainer .ShoppingTrends .Trends").width())){
			$(".BoxitStoreContainer .ShoppingTrends .Trends").stop().animate({
				scrollLeft: Number(widthTmp - $(".BoxitStoreContainer .ShoppingTrends .Trends").width())
			}, 200);
			Left = Number(widthTmp - $(".BoxitStoreContainer .ShoppingTrends .Trends").width());
		}
	});
	var widthTmp = 0;
	$(".BoxitStoreContainer .ShoppingTrends .Trends .Product").each(function(index){
		widthTmp = widthTmp + $(this).width();
	});
	
	function CalculateShoppingTrendsScroll(NextBack){
		var leftTmp = 400;
		switch(NextBack){
			case "Next":
				if(Left < widthTmp){
					Left = Left + leftTmp;
				}
			break;
			case "Back":
				if(Left > 0){
					Left = Left - leftTmp;
				}
			break;
		}
	}
})