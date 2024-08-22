gsap.registerPlugin(Draggable, InertiaPlugin);

var cards = gsap.utils.toArray(".creative-pro"),
    dragDistancePerRotation = 3000,
    radius = 520,
    proxy = document.createElement("div"), 
    progressWrap = gsap.utils.wrap(0, 1),
    spin = gsap.fromTo(cards, {
      rotationY: i => i * 360 / cards.length
    }, {
      rotationY: "-=360",
      duration: 20,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50% " + -radius + "px"
    }),
    startProgress;

Draggable.create(proxy, {
  trigger: ".demoWrapper", 
  type: "x", 
  inertia: true,
  allowNativeTouchScrolling: true,
  onPress() {
    gsap.killTweensOf(spin); 
    spin.timeScale(0); 
    startProgress = spin.progress(); 
  },
  onDrag: updateRotation,
  onThrowUpdate: updateRotation,
  onRelease() {
    if (!this.tween || !this.tween.isActive()) { 
      gsap.to(spin, {timeScale: 1, duration: 1});
    }
  },
  onThrowComplete() {
    gsap.to(spin, {timeScale: 1, duration: 1});
  }
});

function updateRotation() {
  let p = startProgress + (this.startX - this.x) / dragDistancePerRotation;
  spin.progress(progressWrap(p));
}