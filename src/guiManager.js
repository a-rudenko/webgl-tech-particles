import {GUI} from 'three/addons/libs/lil-gui.module.min.js';

export class GUIManager {
    constructor(sceneManager, particlesManager, settings, exportSettings) {
        this.sceneManager = sceneManager;
        this.particlesManager = particlesManager;
        this.settings = settings;
        this.exportSettings = exportSettings;
        this.gui = new GUI({title: 'Settings'});
    }

    init() {
        this.gui.add(this.settings.effectController, 'showLines').name('Show Lines').onChange((value) => {
            this.particlesManager.linesMesh.visible = value;
        });
        this.gui.add(this.settings.effectController, 'minDistance', 10, 300).name('Min Distance');
        this.gui.add(this.settings.effectController, 'maxConnections', 0, 30, 1).name('Max Connections');
        this.gui.add(this.settings.effectController, 'particlesCount', 400, this.settings.sceneSettings.maxParticlesCount, 1).name('Particles Count').onChange((value) => {
            this.settings.sceneSettings.particlesCount = value;
            this.particlesManager.updateParticles();
        });
        this.gui.add(this.settings.effectController, 'particleVelocity', 0, 2, 0.01).name('Particle Speed').onChange(() => {
            this.particlesManager.updateParticleVelocities();
        });

        const motionFolder = this.gui.addFolder('Motion Settings');
        motionFolder.add(this.settings.effectController, 'enableRotation').name('Rotation');
        motionFolder.add(this.settings.effectController, 'rotationSpeed', 0, 1, 0.01).name('Rotation Speed');
        motionFolder.open();

        const colorFolder = this.gui.addFolder('Color Settings');
        this.settings.effectController.colorEnabled.forEach((enabled, index) => {
            colorFolder.add(this.settings.effectController.colorEnabled, index).name(`Enable Color ${index + 1}`).onChange(() => {
                this.particlesManager.updateParticleColors();
            });
        });
        this.settings.effectController.availableColors.forEach((color, index) => {
            colorFolder.addColor(this.settings.effectController.availableColors, index).name(`Color ${index + 1}`).onChange(() => {
                this.particlesManager.updateParticleColors();
            });
        });
        colorFolder.open();

        this.gui.add(this.settings.effectController, 'enableCameraControls').name('Camera Controls').onChange((value) => {
            this.sceneManager.controls.enabled = value;
        });
        this.gui.add({ exportSettings: () => this.exportSettings(this.settings) }, 'exportSettings').name('Export Settings');
    }
}