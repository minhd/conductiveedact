(function($) {

	skel
		.breakpoints({
			xlarge: '(max-width: 1680px)',
			large: '(max-width: 1280px)',
			medium: '(max-width: 980px)',
			small: '(max-width: 736px)',
			xsmall: '(max-width: 480px)'
		});

	$(function() {

		// Disable animations/transitions until the page has loaded.
		$('body').addClass('is-loading');
		$(window).on('load', function() {
			window.setTimeout(function() {
				$('body').removeClass('is-loading');
			}, 100);
		});

		$('form').placeholder();

		skel.on('+medium -medium', function() {
			$.prioritize(
				'.important\\28 medium\\29',
				skel.breakpoint('medium').active
			);
		});

	});

})(jQuery);