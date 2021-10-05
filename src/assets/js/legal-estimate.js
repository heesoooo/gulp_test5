// modal common
if (typeof $.fn.modal !== 'function') {
	(function ($) {
		$.fn.modal = function (options) {
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
				$(window).resize(function () {
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
	init: function () {
		//this.loadTimeOut = function() {};
		//this.fileRegist = 0;
		legal_edu_pc.modalCommon();
		legal_edu_pc.headerFix();
		legal_edu_pc.scrollDown();
		legal_edu_pc.scrollDown2();
		legal_edu_pc.legalListSlider();
		legal_edu_pc.complteQuickStep();
		legal_edu_pc.legalContentsSlider();
		legal_edu_pc.partnersLitSlider();
		legal_edu_pc.btnTop();
		legal_edu_pc.subjectWrapFixed();
		legal_edu_pc.footerIsms();
	},

	// modalCommon
	modalCommon : function() {
		$('[data-toggle="modal"]').click(function () {
			var target = $(this).attr('data-target');
			$(target).modal({ show: true })
			return false;
		});

		$('[data-dismiss="modal"]').click(function () {
			$('body').removeClass('modal-open');
			$('.modal-backdrop').hide();
			$('.modal').hide();
			return false;
		});
	
	},

	// headerFixed
	headerFix: function () {
		var className = {
			headerWrap: $("header")
		}

		$(window).on("scroll", function () {

			if ($(window).scrollTop() > 0) {
				className.headerWrap.addClass('active');
			} else {
				className.headerWrap.removeClass('active');
			}
		});

	},

	// Scroll Down
	scrollDown: function () {
		var className = {
			scrollItem: $(".paging-scroll>a")
		}
		className.scrollItem.on("click", function (e) {
			e.preventDefault();
			var target = $(this).attr("href");
			$("html, body").stop().animate({
				scrollTop: $(target).offset().top
			}, 500, 'linear');
		});
	},

	// Scroll Down
	scrollDown2: function () {
		var className = {
			scrollItem2: $(".btn-key-visual a")
		}
		className.scrollItem2.on("click", function () {
			var target = $(this).attr("href");
			$("html, body").stop().animate({
				scrollTop: $(target).offset().top - 100
			}, 500, 'linear');
		});
	},

	// legalEdu List Slider
	legalListSlider: function () {
		var className = {
			legalListSlider: $(".legal-estimate-list.swiper-container"),
			legalListSliderItem: $(".legal-estimate-list.swiper-container > div")
		}
		if (className.legalListSliderItem.length > 1) {
			var swiper = new Swiper(className.legalListSlider, {
				slidesPerView: 'auto',
				spaceBetween: 20,
				loop: true,
				centeredSlides: true,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev"
				},
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
					allowTouchMove: false
				},
				
			});
		}
	},

	complteQuickStep : function() {

		if ( $("body section").hasClass("main-content02") ){
			var stepContsTop = $(".main-content02").position().top - 200;
			$(window).on("scroll", function () {
				if ($(window).scrollTop() >= stepContsTop) {
					$(".complete-quick-step, .complete-quick-step dl, .complete-quick-step dt, .complete-quick-step dd h4").addClass("active");
				}
			});
		}

	},

	// legalContents List Slider
	legalContentsSlider: function () {
		var className = {
			legalContentsSlider: $(".legal-contents-list.swiper-container"),
			legalContentsSliderItem: $(".legal-contents-list.swiper-container > div"),
			legalContentsPreventArea: $(".legal-contents-list .swiper-slide .info-contents .link-edu")
		}
		if (className.legalContentsSliderItem.length > 1) {

			var swiper2 = new Swiper(className.legalContentsSlider, {
				slidesPerView: 'auto',
				spaceBetween: 20,
				loop: true,
				centeredSlides: true,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev"
				},
				allowTouchMove: false
				// breakpoints: {
				// 	1200 : {
				// 		slidesPerView: 4.3,
				// 	},
				// },
			}); 
			
		}
	},

	// partnersLitSlider List Slider
	partnersLitSlider: function () {
		var className = {
			partnersLitSlider: $(".legal-partners-list.swiper-container"),
			partnersLitSliderItem: $(".legal-partners-list.swiper-container > div")
		}
		if (className.partnersLitSliderItem.length > 0) {

			var swiper3 = new Swiper(className.partnersLitSlider, {
				speed: 4000,
				spaceBetween: 0,
				slidesPerView: 1.55,
				loop: true,
				autoplay: {
					delay: 1000,
					disableOnInteraction: false,
				},
			});
		}
	},

	// top Button
	btnTop: function () {
		var className = {
			btnTop: $(".btn-legal-top")
		}

		$(window).scroll(function () {
			if ($(this).scrollTop() > 500) {
				className.btnTop.fadeIn();
			} else {
				className.btnTop.fadeOut();
			}
		});
		if (className.btnTop.length > 0) {
			className.btnTop.on("click", function (e) {
				e.preventDefault();
				$("body,html").animate({
					scrollTop: 0
				}, 500);
			});
		}
	},

	subjectWrapFixed : function() {
		var className = {
			subjectLstSide: $(".subject-list-sidebar")
		}
		
		
		if ( $("body div").hasClass("subject-select-wrap") ){
			var subjectWrapTop = $(".subject-select-wrap").position().top - 70;
			
			$(window).on("scroll", function () {
				if ($(window).scrollTop() > subjectWrapTop) {
					className.subjectLstSide.height($(window).height() - 70);
					$(".list-item-header, .subject-list-sidebar").addClass("fixed");
					className.subjectLstSide.css("top", 70);
					
					var sidebarBottom = className.subjectLstSide.offset().top + className.subjectLstSide.height();
					var stickyStop = $('.subject-list').offset().top + $('.subject-list').height() + 150;
	
					if (stickyStop < sidebarBottom) {
						className.subjectLstSide.removeClass("fixed");
						className.subjectLstSide.css({"top":"auto","bottom":"0"});
					}
				}
				else {
					$(".list-item-header, .subject-list-sidebar").removeClass("fixed");
					className.subjectLstSide.css("top", 0);
				}
			});
		}
	},

	footerIsms : function() {
		$('.certified .isms').click(function () {
			$(this).next(".certification").fadeIn();
		});
		$('.certified').mouseleave(function () {
			$('.certification').fadeOut();
		});
	}
};

jQuery(function ($) {
	legal_edu_pc.init();
});