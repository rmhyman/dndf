/*
 Escape Velocity 2.0 by HTML5 UP
 html5up.net | @n33co
 Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
 */

window._skel_config = {
	preset : 'standard',
	prefix : 'css/style',
	resetCSS : true,
	breakpoints : {
		'1000px' : {
			grid : {
				gutters : 20
			}
		}
	}
};

window._skel_panels_config = {
	preset : 'standard'
};
function FormerizeHelper() {
	var _fakes = new Array(), _form = jQuery(this);
	_form.find('input[type=text],textarea').each(function() {
		var e = jQuery(this);
		if (e.val() == '' || e.val() == e.attr('placeholder')) {
			e.addClass('formerize-placeholder');
			e.val(e.attr('placeholder'));
		}
	}).blur(function() {
		var e = jQuery(this);
		if (e.attr('name').match(/_fakeformerizefield$/))
			return;
		if (e.val() == '') {
			e.addClass('formerize-placeholder');
			e.val(e.attr('placeholder'));
		}
	}).focus(function() {
		var e = jQuery(this);
		if (e.attr('name').match(/_fakeformerizefield$/))
			return;
		if (e.val() == e.attr('placeholder')) {
			e.removeClass('formerize-placeholder');
			e.val('');
		}
	});
	_form.find('input[type=password]').each(function() {
		var e = jQuery(this);
		var x = jQuery(jQuery('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text'));
		if (e.attr('id') != '')
			x.attr('id', e.attr('id') + '_fakeformerizefield');
		if (e.attr('name') != '')
			x.attr('name', e.attr('name') + '_fakeformerizefield');
		x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e);
		if (e.val() == '')
			e.hide();
		else
			x.hide();
		e.blur(function(event) {
			event.preventDefault();
			var e = jQuery(this);
			var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]');
			if (e.val() == '') {
				e.hide();
				x.show();
			}
		});
		x.focus(function(event) {
			event.preventDefault();
			var x = jQuery(this);
			var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']');
			x.hide();
			e.show().focus();
		});
		x.keypress(function(event) {
			event.preventDefault();
			x.val('');
		});
	});
	_form.submit(function() {
		jQuery(this).find('input[type=text],input[type=password],textarea').each(function(event) {
			var e = jQuery(this);
			if (e.attr('name').match(/_fakeformerizefield$/))
				e.attr('name', '');
			if (e.val() == e.attr('placeholder')) {
				e.removeClass('formerize-placeholder');
				e.val('');
			}
		});
	}).bind("reset", function(event) {
		event.preventDefault();
		jQuery(this).find('select').val(jQuery('option:first').val());
		jQuery(this).find('input,textarea').each(function() {
			var e = jQuery(this);
			var x;
			e.removeClass('formerize-placeholder');
			switch (this.type) {
				case 'submit':
				case 'reset':
					break;
				case 'password':
					e.val(e.attr('defaultValue'));
					x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]');
					if (e.val() == '') {
						e.hide();
						x.show();
					} else {
						e.show();
						x.hide();
					}
					break;
				case 'checkbox':
				case 'radio':
					e.attr('checked', e.attr('defaultValue'));
					break;
				case 'text':
				case 'textarea':
					e.val(e.attr('defaultValue'));
					if (e.val() == '') {
						e.addClass('formerize-placeholder');
						e.val(e.attr('placeholder'));
					}
					break;
				default:
					e.val(e.attr('defaultValue'));
					break;
			}
		});
		window.setTimeout(function() {
			for (x in _fakes)
			_fakes[x].trigger('formerize_sync');
		}, 10);
	});
	return _form;
}

jQuery(function() {

	jQuery.fn.n33_formerize = FormerizeHelper();
	jQuery.browser = {};
	(function() {
		jQuery.browser.msie = false;
		jQuery.browser.version = 0;
		if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
			jQuery.browser.msie = true;
			jQuery.browser.version = RegExp.$1;
		}
	})();

	var _bh = jQuery('body, html'), _window = jQuery(window), _nav = jQuery('#nav');

	// Desktop
	jQuery('#nav > ul').dropotron({
		offsetY : -20,
		offsetX : -1,
		mode : 'fade',
		noOpenerFade : true,
		alignment : 'center',
		detach : false
	});

	// Forms (IE <= 9 only)
	if (jQuery.browser.msie && jQuery.browser.version <= 9)
		jQuery('form').n33_formerize();
	// Links
	jQuery('a').click(function(e) {
		var t = jQuery(this), h = t.attr('href'), article;

		if (h.charAt(0) == '#' && h.length > 1 && ( article = jQuery('article#' + h.substring(1))).length > 0) {
			var pos = Math.max(article.parent().offset().top - _nav.height() + 15, 0);
			e.preventDefault();
			_bh.animate({
				scrollTop : pos
			}, 'slow', 'swing');
		}
	});

});
jQuery(function() {
	// Stick the #nav to the top of the window
	var nav = $('#nav');
	var navHomeY = nav.offset().top;
	var isFixed = false;
	var $w = $(window);
	$w.scroll(function() {
		var scrollTop = $w.scrollTop();
		var shouldBeFixed = scrollTop > navHomeY;
		if (shouldBeFixed && !isFixed) {
			nav.css({
				position : 'fixed',
				top : 0,
				left : nav.offset().left,
				width : nav.width()
			});
			isFixed = true;
		} else if (!shouldBeFixed && isFixed) {
			nav.css({
				position : 'static'
			});
			isFixed = false;
		}
	});
});

