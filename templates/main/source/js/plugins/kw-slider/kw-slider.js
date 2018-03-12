(function () {

	var mobileDetect = /Android|iPhone|iPad|iPod|BlackBerry|WPDesktop|IEMobile|Opera Mini/i.test(navigator.userAgent);
	var bugIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
	var ie10 = (navigator.appVersion.indexOf("MSIE 10") !== -1) ? true : false;

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
			mainClass: 'kw-slider'
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

			this.tags.element = this.opts.element;

			this.createDOM();
			this.resize();
			this.events();
		},

		createDOM: function() {

			var obj = this;

			this.tags.slider = createElement('kw-slider');
			this.tags.sliderSection = createElement('kw-slider__section', this.tags.slider);
			this.tags.sliderScroll = createElement('kw-slider__section', this.tags.sliderSection);
			this.tags.sliderButtons = createElement('kw-slider__buttons', this.tags.sliderSection);
			this.tags.sliderPrev = createElement('kw-slider__prev', this.tags.sliderButtons);
			this.tags.sliderNext = createElement('kw-slider__next', this.tags.sliderButtons);
			this.tags.sliderNav = createElement('kw-slider__nav', this.tags.sliderSection);

			this.tags.element.parentNode.insertBefore(this.tags.slider, this.tags.element);
			this.tags.sliderScroll.appendChild(this.tags.element);

			this.tags.element.classList.add(this.opts.mainClass + '__list');
			this.tags.children = this.tags.element.children;

			this.each(this.tags.children, function() {
				this.classList.add(obj.opts.mainClass + '__item');
			});

		},

		getValues: function () {

		},

		setValues: function () {

		},

		resize: function () {
			this.getValues();
			this.setValues();
		},

		events: function () {
			this.resize();
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