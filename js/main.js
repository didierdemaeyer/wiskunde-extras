(function($) {

	// scrolling to hoofdstuk
	$('.hoofdstuk').on('click', function (e){
		e.preventDefault();

		var hoofdstuk = $(this).attr('href');

		$('html, body').animate({
			scrollTop: $(hoofdstuk).offset().top
		}, 	500);
	});

	// scrolling to hoofdstuk on mobile
	$('#select-hoofdstuk').on('change', function (e) {
		var hoofdstuk = $(this).val();

		$('html, body').animate({
			scrollTop: $(hoofdstuk).offset().top
		}, 	500);
	})



	// masonry for links
	$('.grid').masonry({
		// options
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		percentPosition: true
	});



	var offset = 300,
	//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
	offset_opacity = 1200,
	//duration of the top scrolling animation (in ms)
	scroll_top_duration = 500,
	//grab the "back to top" link
	$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		}, scroll_top_duration
		);
	});


})(jQuery);
