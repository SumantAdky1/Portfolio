// Year stamp
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  
  // Initialize skill bars
  initSkillBars();
  
  // Initialize typewriter animation with a small delay
  setTimeout(() => {
    initTypewriter();
  }, 100);
});

// Also try to initialize on window load as fallback
window.addEventListener('load', () => {
  if (!document.getElementById('typewriter').textContent) {
    console.log('Fallback typewriter initialization');
    initTypewriter();
  }
});

// Typewriter Animation
function initTypewriter() {
  const typewriterEl = document.getElementById('typewriter');
  console.log('Typewriter element:', typewriterEl); // Debug log
  
  if (!typewriterEl) {
    console.error('Typewriter element not found!');
    return;
  }
  
  const headlines = [
    "Turning ideas into elegant code.",
    "Modern web development, with style.",
    "From concept to code — flawlessly."
  ];
  
  console.log('Starting typewriter with headlines:', headlines); // Debug log
  
  let currentHeadlineIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function typeWriter() {
    const currentHeadline = headlines[currentHeadlineIndex];
    
    if (isDeleting) {
      // Deleting characters
      typewriterEl.textContent = currentHeadline.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50; // Faster deletion
    } else {
      // Typing characters
      typewriterEl.textContent = currentHeadline.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 100; // Normal typing speed
    }
    
    // Check if we've finished typing the current headline
    if (!isDeleting && currentCharIndex === currentHeadline.length) {
      // Pause at the end before starting to delete
      typingSpeed = 2000; // 2 second pause
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      // Finished deleting, move to next headline
      isDeleting = false;
      currentHeadlineIndex = (currentHeadlineIndex + 1) % headlines.length;
      typingSpeed = 500; // Pause before starting next headline
    }
    
    setTimeout(typeWriter, typingSpeed);
  }
  
  // Start the typewriter animation
  typeWriter();
}

// Enhanced card tilt with smooth transitions
document.querySelectorAll('.card3d').forEach(card => {
  let isHovering = false;
  
  card.addEventListener('mouseenter', () => {
    isHovering = true;
  });
  
  card.addEventListener('mousemove', e => {
    if (!isHovering) return;
    
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    
    // Calculate tilt based on mouse position
    const centerX = r.width / 2;
    const centerY = r.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    // Apply smooth transform with CSS transition
    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    isHovering = false;
    // Smooth reset to original position
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
  });
});

// GSAP entrance animations with improved timing and visibility
window.addEventListener('load', () => {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    
    // Set initial visibility for all sections
    gsap.set('section', { visibility: 'visible' });
    gsap.set('.card3d, .badge-tech, .section-title, li, .cert-icon, .cert-badge', { 
      visibility: 'visible',
      opacity: 1,
      y: 0 
    });
    
    // Hero content animation - only animate entrance, don't hide
    gsap.fromTo('.hero-content p', 
      { opacity: 0, y: 25 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        delay: 0.2, 
        ease: 'power3.out' 
      }
    );
    
    gsap.fromTo('.hero-content .btn-glow', 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        delay: 0.4, 
        stagger: 0.1, 
        ease: 'power2.out' 
      }
    );
    
    gsap.fromTo('.hero-badges .badge-tech', 
      { opacity: 0, scale: 0.8 }, 
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        delay: 0.6, 
        stagger: 0.05, 
        ease: 'back.out(1.7)' 
      }
    );
    
    // Section animations with improved triggers - only animate on scroll, don't hide content
    const sections = document.querySelectorAll('section');
    sections.forEach((sec, index) => {
      if (sec.id === 'top') return; // Skip hero section
      
      const elements = sec.querySelectorAll('.section-title, .card3d, .badge-tech, li, .cert-icon, .cert-badge');
      
      // Set initial state for scroll animations
      gsap.set(elements, { 
        opacity: 1, 
        y: 0,
        visibility: 'visible'
      });
      
      // Create scroll-triggered entrance animation
      gsap.fromTo(elements, 
        { 
          opacity: 0, 
          y: 25,
          visibility: 'visible'
        },
        {
          scrollTrigger: { 
            trigger: sec, 
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none none'
          },
          opacity: 1, 
          y: 0, 
          stagger: 0.08, 
          duration: 0.8, 
          ease: 'power2.out',
          delay: index * 0.1,
          visibility: 'visible'
        }
      );
    });
    
    // Special animation for certifications - only animate entrance
    gsap.fromTo('.certification-card', 
      { 
        opacity: 1,
        y: 0,
        rotationX: 0,
        visibility: 'visible'
      },
      {
        scrollTrigger: { 
          trigger: '#certifications', 
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        rotationX: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        visibility: 'visible'
      }
    );
    
    // Floating animation for hero badges
    gsap.to('.hero-badges', {
      y: -10,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1
    });
  }
});

// THREE.JS HERO SCENE (inspired by 3D portfolio style)
(function initThree() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || !window.THREE) return;

  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(55, 2, 0.1, 100);
  camera.position.set(0, 0, 6);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w || canvas.height !== h) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
  };
  const onResize = () => { resize(); };
  window.addEventListener('resize', onResize);
  resize();

  // Lights
  const hemi = new THREE.HemisphereLight(0xa78bfa, 0x0b1220, 1.0);
  scene.add(hemi);
  const dir = new THREE.DirectionalLight(0x22d3ee, 1.1);
  dir.position.set(3, 3, 4);
  scene.add(dir);

  // Geometry: low-poly orb + wireframe ring
  const orbGeo = new THREE.IcosahedronGeometry(1.6, 1);
  const orbMat = new THREE.MeshStandardMaterial({
    color: 0x3ec5d6,
    roughness: 0.25,
    metalness: 0.6,
    envMapIntensity: 0.8,
  });
  const orb = new THREE.Mesh(orbGeo, orbMat);
  scene.add(orb);

  const ringGeo = new THREE.TorusGeometry(2.6, 0.02, 16, 200);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xa78bfa, wireframe: true, opacity: 0.6, transparent: true });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 3;
  scene.add(ring);

  // Particles
  const pGeo = new THREE.BufferGeometry();
  const count = 500;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.02, color: 0xffffff });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // Mouse parallax with smooth interpolation
  const targetRot = { x: 0, y: 0 };
  const currentRot = { x: 0, y: 0 };
  
  window.addEventListener('mousemove', (e) => {
    const nx = (e.clientX / window.innerWidth) - 0.5;
    const ny = (e.clientY / window.innerHeight) - 0.5;
    targetRot.y = nx * 0.6;
    targetRot.x = ny * 0.6;
  });

  // Animate with smooth camera movement
  const clock = new THREE.Clock();
  function tick() {
    const t = clock.getElapsedTime();
    const delta = clock.getDelta();
    
    // Smooth rotation for objects
    orb.rotation.y += 0.003;
    orb.rotation.x += 0.0015;
    ring.rotation.z += 0.001;
    particles.rotation.y -= 0.0006;

    // Smooth camera interpolation for parallax
    currentRot.x += (targetRot.x - currentRot.x) * 0.05;
    currentRot.y += (targetRot.y - currentRot.y) * 0.05;
    
    camera.position.x += (currentRot.y * 2 - camera.position.x) * 0.02;
    camera.position.y += (-currentRot.x * 2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
})();

// Add smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
