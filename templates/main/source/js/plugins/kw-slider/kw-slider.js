(function () {

	var mobileDetect = /Android|iPhone|iPad|iPod|BlackBerry|WPDesktop|IEMobile|Opera Mini/i.test(navigator.userAgent);
	var bugIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
	var ie10 = (navigator.appVersion.indexOf("MSIE 10") !== -1) ? true : false;

	var mouseEvents = {};

	mouseEvents.start = mobileDetect ? 'touchstart' : 'mousedown';
	mouseEvents.move = mobileDetect ? 'touchmove' : 'mousemove';
	mouseEvents.end = mobileDetect ? 'touchend' : 'mouseup';

	var createElement = function (cls, parent) {
		var obj = document.createElement('div');
		obj.className = cls;
		if (parent) {
			parent.appendChild(obj);
		}
		return obj;
	}
	function KwSlider(opts) {

		this.opts = this.extend({
			mainClass: 'kw-slider',
			arrows: true
		}, opts);

		if (!this.opts.element) {
			return false;
		}

		this.init();

	}

	KwSlider.prototype = {

		init: function (opts) {

			this.tags = {};
			this.values = {};
			this.values.x = 0;
			this.values.counterSlide = 0;

			this.tags.element = this.opts.element;

			this.createDOM();
			this.resize();
			this.eventsResize();
			this.eventsButtons();
			this.eventsDrag();
		},

		createDOM: function() {

			var obj = this;

			this.tags.slider = createElement(this.opts.mainClass);
			this.tags.sliderSection = createElement(this.opts.mainClass + '__section', this.tags.slider);
			this.tags.sliderScroll = createElement(this.opts.mainClass + '__scroll', this.tags.sliderSection);
			this.tags.sliderButtons = createElement(this.opts.mainClass + '__buttons', this.tags.sliderSection);
			this.tags.sliderPrev = createElement(this.opts.mainClass + '__prev', this.tags.sliderButtons);
			this.tags.sliderNext = createElement(this.opts.mainClass + '__next', this.tags.sliderButtons);
			this.tags.sliderNav = createElement(this.opts.mainClass + '__nav', this.tags.sliderSection);

			this.tags.element.parentNode.insertBefore(this.tags.slider, this.tags.element);
			this.tags.sliderScroll.appendChild(this.tags.element);

			this.tags.element.classList.add(this.opts.mainClass + '__list');
			this.tags.children = this.tags.element.children;

			this.each(this.tags.children, function() {
				this.classList.add(obj.opts.mainClass + '__item');
			});

		},

		getValues: function () {

			this.tags.slider.classList.remove('kw-enable');

			this.values.width = this.tags.element.scrollWidth;
			this.values.widthParent = this.tags.sliderSection.offsetWidth;
			this.values.trigger = false;

			if(this.values.width <= this.values.widthParent) {
				this.values.trigger = false;
				return false;
			}

			this.values.trigger = true;

			this.tags.slider.classList.add('kw-enable');
			this.values.width = this.tags.element.scrollWidth;
			this.values.widthParent = this.tags.sliderScroll.offsetWidth;
			this.values.step = this.values.widthParent;
			this.values.widthItem = this.tags.children[0].offsetWidth;
			this.values.widthLimit = this.values.width - this.values.widthParent;

		},

		resize: function () {
			this.getValues();
			this.state();
		},

		state: function() {

			if(this.values.trigger) {

				if(this.opts.arrows) {
					this.tags.sliderButtons.classList.add('kw-show-buttons');
				}

				this.values.x = this.values.counterSlide * this.values.step;

				if(Math.abs(this.values.x) >= this.values.widthLimit) {
					this.values.x = this.values.widthLimit * (-1);
				}
				this.transformX(this.tags.element, this.values.x);

				return false;

			}

			if(this.opts.arrows) {
				this.tags.sliderButtons.classList.remove('kw-show-buttons');
			}

			this.transformClearX(this.tags.element);

		},

		eventsDrag: function () {

			var obj = this;
			var triggerMove = false;
			var coords = {};

			this.tags.element.addEventListener(mouseEvents.start, function(e) {

				triggerMove = true;
				coords.shiftX = mobileDetect ? e.touches[0].pageX : e.pageX;
				obj.tags.slider.classList.add('kw-drag');

			});

			document.addEventListener(mouseEvents.move, function(e) {

				if(triggerMove) {

					e.stopPropagation();
					e.preventDefault();

					coords.x = (mobileDetect ? e.touches[0].pageX : e.pageX) - coords.shiftX - obj.values.x;

					obj.transformX(obj.tags.element, coords.x);
				}

			});

			document.addEventListener(mouseEvents.end, function() {
				triggerMove = false;
				obj.tags.slider.classList.remove('kw-drag');
				obj.values.x = coords.x;
			});

		},

		eventsButtons: function () {

			var obj = this;

			this.tags.sliderPrev.addEventListener(mouseEvents.end, function(e) {

				e.stopPropagation();
				obj.values.x = obj.values.x + obj.values.step;

				obj.values.counterSlide = obj.values.counterSlide - 1;

				if(Math.abs(obj.values.x) >= 0) {
					obj.values.x = 0;
					obj.values.counterSlide = 0;
				}
				obj.transformX(obj.tags.element, obj.values.x);

			});

			this.tags.sliderNext.addEventListener(mouseEvents.end, function(e) {

				e.stopPropagation();
				obj.values.x = obj.values.x - obj.values.step;

				obj.values.counterSlide = obj.values.counterSlide + 1;

				if(Math.abs(obj.values.x) >= obj.values.widthLimit) {
					obj.values.x = obj.values.widthLimit * (-1);
					obj.values.counterSlide = Math.floor(obj.values.width / obj.values.widthParent);
				}
				obj.transformX(obj.tags.element, obj.values.x);

			});

		},

		eventsResize: function () {

			var obj = this;

			window.addEventListener('resize', function() {
				obj.resize();
			});
			window.addEventListener('orientationchange', function() {
				obj.resize();
			});

		},

		transformX: function(element, x) {
			element.style['-webkit-transform'] = 'translateX(' + x + 'px)';
			element.style['-moz-transform'] = 'translateX(' + x + 'px)';
			element.style['-ms-transform'] = 'translateX(' + x + 'px)';
			element.style['transform'] = 'translateX(' + x + 'px)';
		},

		transformClearX: function(element) {
			element.style['-webkit-transform'] = '';
			element.style['-moz-transform'] = '';
			element.style['-ms-transform'] = '';
			element.style['transform'] = '';
		},

		extend: function (defaults, source) {

			for (var key in source) {
				if (source.hasOwnProperty(key)) {
					defaults[key] = source[key];
				}
			}

			return defaults;
		},

		each: function(array, callback) {
			Array.prototype.forEach.call(array, function(node, index) {
				callback.call(node, index);
			});
		}
	}

	window.KwSlider = KwSlider;

})(window);

window.addEventListener('load', function () {

	var slider = document.querySelector('#js-list');

	var kwSLider = new KwSlider({
		element: slider
	});

});