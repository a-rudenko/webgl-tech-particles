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
        this.addGeneralControls();
        this.addMotionControls();
        this.addColorControls();
        this.addCameraControls();
        this.addExportButton();
    }

    addGeneralControls() {
        this.gui.add(this.settings.effectController, 'showLines').name('Show Lines').onChange(() => {
            this.particles.updateLinesVisibility();
        });
        this.gui.add(this.settings.effectController, 'minDistance', 10, 300).name('Min Distance');
        this.gui.add(this.settings.effectController, 'maxConnections', 0, 30, 1).name('Max Connections');
        this.gui.add(this.settings.sceneSettings, 'particlesCount', 400, this.settings.sceneSettings.maxParticlesCount, 1).name('Particles Count').onChange(() => {
            this.particles.updateParticles();
        });
        this.gui.add(this.settings.effectController, 'particleVelocity', 0, 2, 0.01).name('Particle Speed').onChange(() => {
            this.particles.updateParticleVelocities();
        });
    }

    addMotionControls() {
        const motionFolder = this.gui.addFolder('Motion Settings');
        motionFolder.add(this.settings.effectController, 'enableRotation').name('Rotation');
        motionFolder.add(this.settings.effectController, 'rotationSpeed', 0, 1, 0.01).name('Rotation Speed');
        motionFolder.open();
    }

    addColorControls() {
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
    }

    addCameraControls() {
        this.gui.add(this.settings.effectController, 'enableCameraControls').name('Camera Controls').onChange((value) => {
            this.scene.controls.enabled = value;
        });
    }

    addExportButton() {
        this.gui.add({exportSettings: () => this.exportSettings(this.settings)}, 'exportSettings').name('Export Settings');
    }
}
