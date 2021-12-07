AFRAME.registerComponent("a-paddle", {
	schema: {
		counter: { type: "selector" },
	},

	init: function () {
		// Do something when component first attached.
		this.el.addEventListener("collide", (e) => {
			if (e.detail.body.el.id == "ballentity") {
				this.data.counter.components.counter.addValue();
			}
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
		let worldPos = new THREE.Vector3();
		this.el.object3D.getWorldPosition(worldPos);
		// console.log(worldPos);
	},
});
