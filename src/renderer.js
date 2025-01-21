import * as THREE from 'three';

export class Renderer {
    constructor(sceneManager, particlesManager) {
        this.sceneManager = sceneManager;
        this.particlesManager = particlesManager;
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
    }

    init() {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('container').appendChild(this.renderer.domElement);
        this.renderer.setAnimationLoop(() => this.animate());
    }

    animate() {
        this.particlesManager.animate();
        this.renderer.render(this.sceneManager.scene, this.sceneManager.camera);
    }
}