const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.9); 

const pointLight = new THREE.PointLight(0xffffff, 1, 100); 
pointLight.position.set(5, 5, 5); 
scene.add(pointLight);

function createStarShape() {
    const shape = new THREE.Shape();
    const outerRadius = 1;
    const innerRadius = 0.5;
    const spikes = 5;

    for (let i = 0; i < spikes * 2; i++) {
        const angle = (i / (spikes * 2)) * Math.PI * 2;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) {
            shape.moveTo(x, y);
        } else {
            shape.lineTo(x, y);
        }
    }
    shape.closePath();
    return shape;
}

function createStar() {
    const starShape = createStarShape();
    const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1 };
    const geometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
    const material = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.4 }); // Gold-like material
    const star = new THREE.Mesh(geometry, material);
    return star;
}

const star = createStar();
scene.add(star);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    star.rotation.x += 0.01; 
    star.rotation.y += 0.01; 
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
