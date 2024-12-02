import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', qubeAnimation);

function qubeAnimation() {
  let scene = document.querySelector('.gw-parts-scene');

  if (!scene) {
    return;
  }

  // Create parts
  for (let i = 0; i < 2; i++) {
    qwcreatePart(scene);
  }

  function qwcreatePart(scene) {
    let part = document.createElement('div');
    part.classList.add('gw-part');

    let partItem = document.createElement('div');
    partItem.classList.add('gw-part__item');

    part.appendChild(partItem); // append partItem to part
    scene.appendChild(part); // append part to scene
  }

  // Add some delay to make sure the DOM is fully rendered before animations
  setTimeout(() => {
    gsap.to('.gw-part', {
      duration: 30,
      x: -500,
      y: -700,
      borderRadius: '15px',
      rotate: 500,
      backgroundColor: 'transparent',
      border: '5px solid rgba(255, 255, 255, 0.6)',
      scale: 1.2,
      repeat: 50,
    });

    gsap.to('.gw-part__item', {
      duration: 30,
      borderRadius: '15px',
      x: 460,
      y: -410,
      rotate: 340,
      backgroundColor: 'transparent',
      border: '5px solid rgba(255, 255, 255, 0.6)',
      scale: 1.2,
      repeat: 50,
    });
  }, 100); // Slight delay to ensure elements are in the DOM
}
