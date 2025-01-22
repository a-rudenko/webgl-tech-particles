import {GUI} from 'three/addons/libs/lil-gui.module.min.js';

export class Gui {
    constructor(scene, particles, settings, exportSettings) {
        this.scene = scene;
        this.particles = particles;
        this.settings = settings;
        this.exportSettings = exportSettings;
        this.gui = new GUI({title: 'Settings'});
    }

    init() {
        this.gui.add(this.settings.effectController, 'showLines').name('Show Lines').onChange((value) => {
            this.particles.linesMesh.visible = value;
        });
        this.gui.add(this.settings.effectController, 'minDistance', 10, 300).name('Min Distance');
        this.gui.add(this.settings.effectController, 'maxConnections', 0, 30, 1).name('Max Connections');
        this.gui.add(this.settings.effectController, 'particlesCount', 400, this.settings.sceneSettings.maxParticlesCount, 1).name('Particles Count').onChange((value) => {
            this.settings.sceneSettings.particlesCount = value;
            this.particles.updateParticles();
        });
        this.gui.add(this.settings.effectController, 'particleVelocity', 0, 2, 0.01).name('Particle Speed').onChange(() => {
            this.particles.updateParticleVelocities();
        });

        const motionFolder = this.gui.addFolder('Motion Settings');
        motionFolder.add(this.settings.effectController, 'enableRotation').name('Rotation');
        motionFolder.add(this.settings.effectController, 'rotationSpeed', 0, 1, 0.01).name('Rotation Speed');
        motionFolder.open();

        const colorFolder = this.gui.addFolder('Color Settings');
        this.settings.effectController.colorEnabled.forEach((enabled, index) => {
            colorFolder.add(this.settings.effectController.colorEnabled, index).name(`Enable Color ${index + 1}`).onChange(() => {
                this.particles.updateParticleColors();
            });
        });
        this.settings.effectController.availableColors.forEach((color, index) => {
            colorFolder.addColor(this.settings.effectController.availableColors, index).name(`Color ${index + 1}`).onChange(() => {
                this.particles.updateParticleColors();
            });
        });
        colorFolder.open();

        this.gui.add(this.settings.effectController, 'enableCameraControls').name('Camera Controls').onChange((value) => {
            this.scene.controls.enabled = value;
        });
        this.gui.add({ exportSettings: () => this.exportSettings(this.settings) }, 'exportSettings').name('Export Settings');
    }
}