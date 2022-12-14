import "./style.css";
import * as THREE from "three";
import anime from "animejs";

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
//////////////////////////////////////////////////////////////


// Background
const spaceTexture = new THREE.TextureLoader().load("https://i.ibb.co/QDS74Yp/space1bg.jpg");
scene.background = spaceTexture;

// Torus
const torusTexture = new THREE.TextureLoader().load("https://i.ibb.co/5xGrfRZ/background.jpg");
const geometry = new THREE.TorusGeometry(10, 3, 14, 100);
const material = new THREE.MeshStandardMaterial({map: torusTexture, normalMap: torusTexture});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);


// Moon
const moonTexture = new THREE.TextureLoader().load("https://i.ibb.co/5xGrfRZ/background.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 31, 31),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonTexture,
  })
);
moon.position.z = 25;
moon.position.setX(-10);
scene.add(moon);


// Avatar
const aTexture = new THREE.TextureLoader().load("https://i.ibb.co/wyw6Zjf/mypic.jpg");
const Rishabh = new THREE.Mesh(
  new THREE.BoxGeometry(2, 3, 0.1),
  new THREE.MeshBasicMaterial({ map: aTexture })
);
Rishabh.position.z = -5;
Rishabh.position.x = 2;
scene.add(Rishabh);


// Lights
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);


// add small small starts 
function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 10, 10);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);


// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;
 
  torus.rotation.z += 0.09;

  // Rishabh.rotation.y += 0.01;
  // Rishabh.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;
  Rishabh.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();


// test animation
const text = document.querySelector(".text");
text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");

const text2 = document.querySelector(".text2");
text2.innerHTML = text2.textContent.replace(/\S/g, "<span>$&</span>");

const text3 = document.querySelector(".text3");
text3.innerHTML = text3.textContent.replace(/\S/g, "<span>$&</span>");

const text4 = document.querySelector(".text4");
text4.innerHTML = text4.textContent.replace(/\S/g, "<span>$&</span>");

const text5 = document.querySelector(".text5");
text5.innerHTML = text5.textContent.replace(/\S/g, "<span>$&</span>");

const animation = anime.timeline({
  targets: ".text span, .text2 span, .text3 span, .text4 span,  .text5 span",
  easing: "easeInOutExpo",
  loop: true,
});

animation
  .add({
    rotate: function () {
      return anime.random(-360, 360);
    },
    translateX: function () {
      return anime.random(-300, 300);
    },
    translateY: function () {
      return anime.random(-300, 300);
    },
    duration: 10000,
    delay: anime.stagger(80),
  })
  .add({
    rotate: 0,
    translateX: 0,
    translateY: 0,
    duration: 500,
    delay: anime.stagger(0),
  });
// animation2.add({rotate: 45})
