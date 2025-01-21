import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class SceneManager {
    constructor(settings) {
        this.settings = settings;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            settings.cameraSettings.fieldOfView,
            window.innerWidth / window.innerHeight,
            settings.cameraSettings.nearPlane,
            settings.cameraSettings.farPlane
        );
        this.camera.position.z = settings.cameraSettings.positionZ;
        this.controls = null;
        this.group = new THREE.Group();
        this.scene.add(this.group);
    }

    init() {
        this.controls = new OrbitControls(this.camera, document.getElementById('container'));
        this.controls.minDistance = this.settings.orbitControls.minDistance;
        this.controls.maxDistance = this.settings.orbitControls.maxDistance;
        this.controls.enabled = this.settings.effectController.enableCameraControls;
    }
}