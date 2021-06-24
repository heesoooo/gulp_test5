// modal common
if (typeof $.fn.modal !== 'function') {
	(function($) {
		$.fn.modal = function(options) {
			var defaults = {
				show: false,
				overlayDrop: true
			}
			var options = $.extend(defaults, options);
			var $btnOpen = $('[data-toggle="modal"]');
			var modal = this;
			if (options.overlayDrop == true) {
				if ($('body').find('.modal-backdrop').length == 0) {
					$('body').prepend('<div class="modal-backdrop"></div>');
				}
				var overlay = $('.modal-backdrop');
			}

			function modalShow() {
				$('body').addClass('modal-open');
				modal.show();
				overlay.show();
				var windowH = $(window).height();
				var modalDialog = modal.find('.modal-content');
				var modalDialogH = modalDialog.height();
				var modalDialogHfix = windowH / 2 - modalDialogH + 50;
				if (modalDialogHfix < 0) {
					modalDialogHfix = 30;
				}
				modalDialog.css('margin-top', modalDialogHfix);
				$(window).resize(function() {
					var windowH = $(window).height();
					var modalDialog = modal.find('.modal-content');
					var modalDialogH = modalDialog.height();
					var modalDialogHfix = windowH / 2 - modalDialogH + 50;
					if (modalDialogHfix < 0) {
						modalDialogHfix = 30;
					}
					modalDialog.css('margin-top', modalDialogHfix);
				});
			}
			if (options.show == true) {
				modalShow();
			}

		}
	})(jQuery);
}

var legal_edu_pc = legal_edu_pc || {};
legal_edu_pc = {
	init: function() {
		//this.loadTimeOut = function() {};
		//this.fileRegist = 0;
		legal_edu_pc.modalCommon();
		legal_edu_pc.headerFix();
		legal_edu_pc.scrollDown();
		legal_edu_pc.legalListSlider();
		legal_edu_pc.complteQuickStep();
		legal_edu_pc.legalContentsSlider();
		legal_edu_pc.partnerListSlider();
		legal_edu_pc.btnTop();
		legal_edu_pc.subjectWrapFixed();
	},

	// modalCommon
	modalCommon: function() {
		$('[data-toggle="modal"]').click(function() {
			var target = $(this).attr('data-target');
			$(target).modal({
				show: true
			})
			return false;
		});

		$('[data-dismiss="modal"]').click(function() {
			$('body').removeClass('modal-open');
			$('.modal-backdrop').hide();
			$('.modal').hide();
			return false;
		});

	},

	// headerFixed
	headerFix: function() {
		let className = {
			headerWrap: $("header")
		}

		$(window).on("scroll", function() {
			if ($(window).scrollTop() > 0) {
				className.headerWrap.addClass('active');
			} else {
				className.headerWrap.removeClass('active');
			}
		});
	},

	// Scroll Down
	scrollDown: function() {
		let className = {
			scrollItem: $(".paging-scroll>a")
		}
		className.scrollItem.on("click", function(e) {
			e.preventDefault();
			var target = $(this).attr("href");
			$("html, body").stop().animate({
				scrollTop: $(target).offset().top
			}, 500, 'linear');
		});
	},

	// legalEdu List Slider
	legalListSlider: function() {
		let className = {
			legalListSlider: $(".legal-estimate-list.swiper-container"),
			legalListSliderItem: $(".legal-estimate-list.swiper-container > div")
		}
		if (className.legalListSliderItem.length > 1) {
			className.legalListSlider.each(function() {
				const mainSwiper = new Swiper(this, {
					slidesPerView: 2.3,
					spaceBetween: 20,
					loop: true,
					centeredSlides: true,
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev"
					},
					pagination: {
						el: ".swiper-pagination",
						clickable: true
					}
				});
			});
		}
	},

	complteQuickStep: function() {
		if ($("body section").hasClass("main-content02")) {
			var stepContsTop = $(".main-content02").position().top - 200;
			$(window).on("scroll", function() {
				if ($(window).scrollTop() >= stepContsTop) {
					$(".complete-quick-step, .complete-quick-step dl, .complete-quick-step dt, .complete-quick-step dd h4").addClass("active");
				}
			});
		}
	},

	// legalContents List Slider
	legalContentsSlider: function() {
		let className = {
			legalContentsSlider: $(".legal-contents-list.swiper-container"),
			legalContentsSliderItem: $(".legal-contents-list.swiper-container > div")
		}

		if (className.legalContentsSliderItem.length > 1) {
			className.legalContentsSlider.each(function() {
				const mainSwiper2 = new Swiper(this, {
					slidesPerView: 4.3,
					spaceBetween: 20,
					loop: true,
					centeredSlides: true,
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev"
					},
				});
			});
		}
	},

	// partnerListSlider List Slider
	partnerListSlider: function() {
		let className = {
			partnerListSlider: $(".legal-partners-list.swiper-container")
		}
		className.partnerListSlider.each(function() {
			const mainSwiper3 = new Swiper(this, {
				speed: 4000,
				spaceBetween: 0,
				slidesPerView: 1.55,
				loop: true,
				autoplay: {
					delay: 1000,
					disableOnInteraction: false,
				}
			});
		});
	},

	// top Button
	btnTop: function() {
		let className = {
			btnTop: $(".btn-legal-top")
		}

		$(window).scroll(function() {
			if ($(this).scrollTop() > 500) {
				className.btnTop.fadeIn();
			} else {
				className.btnTop.fadeOut();
			}
		});
		if (className.btnTop.length > 0) {
			className.btnTop.on("click", function(e) {
				e.preventDefault();
				$("body,html").animate({
					scrollTop: 0
				}, 500);
			});
		}
	},

	subjectWrapFixed: function() {
		$(".subject-list-sidebar").height($(window).height() - 70);

		if ($("body div").hasClass("subject-select-wrap")) {
			var subjectWrapTop = $(".subject-select-wrap").position().top - 70;

			$(window).on("scroll", function() {
				if ($(window).scrollTop() >= subjectWrapTop) {
					$(".list-item-header, .subject-list-sidebar").addClass("fixed");
				} else {
					$(".list-item-header, .subject-list-sidebar").removeClass("fixed");
				}
			});
		}
	}
};

jQuery(function($) {
	legal_edu_pc.init();
});