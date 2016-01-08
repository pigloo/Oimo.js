/**
 * The broad-phase is used for collecting possible pairs
 * for collision based on the input from the group-phase.
 * @author lo-th
 * @author xprogram
 */
OIMO.BroadPhase = function(){
	this.useBoundingBoxes = true; // Whether or not to use AABBs in broadphase
	this.shapes = [];
	this.pairs = [];
	this.numChecks = 0;
};
OIMO.BroadPhase.prototype = {
	constructor: OIMO.BroadPhase,

	computePairs: function(){
		this.pairs = []; // Reset array
		this.numChecks = 0; // Reset checks amount
		this.collectPairs();
	},
	collectPairs: function(){
		OIMO.err("BroadPhase", OIMO.ERR_INHERITANCE);
	},
	intersectTest: function(shape1, shape2){ // From cannon.js
		if(this.useBoundingBoxes){
			if(shape1.aabb.overlaps(shape2.aabb))
				this.addPair(shape1, shape2);
		} else {
			if(shape1.position.distanceTo(shape2.position) <= shape2.boundingRadius * 2)
				this.addPair(shape1, shape2);
		}

		this.numChecks++;
	},
	addPair: function(p1, p2){
		this.pairs.push(new OIMO.Pair(p1, p2));
	}
};
