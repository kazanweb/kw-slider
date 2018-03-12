(function () {

	function KwSlider(opts) {

		this.opts = this.extend({}, opts);

		if (!this.opts.element) {
			return false;
		}

		this.init();

	}

	KwSlider.prototype = {

		init: function (opts) {

			this.tags = {};
			this.values = {};

			this.resize();
			this.events();
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
		}
	}

})(window);

document.addEventListener('load', function () {

	var slider = document.querySelector('#js-list');

	var kwSLider = new KwSlider({
		element: slider
	});

});