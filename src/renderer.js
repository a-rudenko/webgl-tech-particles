import * as THREE from 'three';

export class Renderer {
    constructor(scene, particles, containerId) {
        this.scene = scene;
        this.particles = particles;
        this.containerId = containerId;
        this.renderer = new THREE.WebGLRenderer({antialias: true});
    }

    init() {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById(this.containerId).appendChild(this.renderer.domElement);
        this.renderer.setAnimationLoop(() => this.animate());
    }

    animate() {
        this.particles.animate();
        this.renderer.render(this.scene.scene, this.scene.camera);
    }
}
