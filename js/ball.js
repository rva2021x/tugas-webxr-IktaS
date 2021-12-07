AFRAME.registerComponent("a-pong-ball", {
	schema: {
		handEl: { type: "selector" },
		counter: { type: "selector" },
	},

	init: function () {
		// Do something when component first attached.
		this.data.handEl.addEventListener("triggerdown", () => {
			this.el.setAttribute("position", {
				x: this.data.handEl.object3D.position.x,
				y: this.data.handEl.object3D.position.y,
				z: this.data.handEl.object3D.position.z,
			});
			if (this.el.components["dynamic-body"]) {
				this.el.components["dynamic-body"].syncToPhysics();
			}
			this.data.counter.components.counter.reset();
		});

		this.el.addEventListener("collide", (e) => {
			this.el.components.sound.playSound();
			setTimeout(() => this.el.components.sound.stopSound(), 70);
		});
	},

	update: function () {
		// Do something when component's data is updated.
	},

	remove: function () {
		// Do something the component or its entity is detached.
	},

	tick: function (time, timeDelta) {
		// Do something on every scene tick or frame.
	},
});
