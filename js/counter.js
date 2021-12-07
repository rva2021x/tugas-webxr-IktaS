AFRAME.registerComponent("counter", {
	schema: {
		initialValue: { type: "int", default: 0 },
		text: { type: "selector" },
	},

	init: function () {
		this.value = this.data.initialValue;
		this.text = this.data.text;
		// Do something when component first attached.
	},

	update: function () {
		// Do something when component's data is updated.
	},

	remove: function () {
		// Do something the component or its entity is detached.
	},

	tick: function (time, timeDelta) {},

	addValue: function () {
		console.log("add 1");
		this.value += 1;
		this.text.setAttribute("value", this.value);
	},

	reset: function () {
		console.log(this.data.text.components.text);
		console.log("reset");
		this.value = 0;
		this.text.setAttribute("value", this.value);
	},
});
