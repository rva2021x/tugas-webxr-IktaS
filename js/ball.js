AFRAME.registerComponent("a-pong-ball", {
	schema: {
		handEl: { type: "selector" },
		counter: { type: "selector" },
		paddle: { type: "selector" },
	},

	init: function () {
		// Do something when component first attached.
		this.raycaster = new THREE.Raycaster();
		this.loaded = false;
		this.hold = false;

		this.data.handEl.addEventListener("triggerdown", () => {
			this.hold = true;
			this.data.counter.components.counter.reset();
		});

		this.data.handEl.addEventListener("triggerup", () => {
			this.hold = false;
			this.el.components["dynamic-body"].syncToPhysics();
			this.data.counter.components.counter.reset();
		});

		this.el.addEventListener("collide", (e) => {
			this.el.components.sound.playSound();
			setTimeout(() => this.el.components.sound.stopSound(), 70);
		});

		this.el.addEventListener("body-loaded", () => {
			this.ballRB = this.el.components["dynamic-body"].body;
			this.paddleObj = this.data.paddle.object3D;
			this.loaded = true;
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
		// if (this.loaded) {
		// 	this.limitSphere([this.paddleObj]);
		// }
		if (this.hold) {
			this.ballRB.position.copy(this.data.handEl.object3D.position);
			this.ballRB.velocity.copy(new THREE.Vector3());
			this.ballRB.angularVelocity.copy(new THREE.Vector3());
			// this.el.setAttribute("position", {
			// 	x: this.data.handEl.object3D.position.x,
			// 	y: this.data.handEl.object3D.position.y,
			// 	z: this.data.handEl.object3D.position.z,
			// });
			// if (this.el.components["dynamic-body"]) {
			// 	this.el.components["dynamic-body"].syncToPhysics();
			// }
		}
	},

	limitSphere: function (objs) {
		let arr;
		this.raycaster.set(
			this.ballRB.position.clone(),
			this.ballRB.velocity.clone().unit()
		);
		this.raycaster.far = this.ballRB.velocity.length();
		arr = this.raycaster.intersectObjects(objs);

		if (arr.length) {
			this.ballRB.position.copy(arr[0].point);
		}
	},
});
