import {GUI} from 'lil-gui';

export class Gui {
    constructor(scene, particles, settings, exportSettings) {
        this.scene = scene;
        this.particles = particles;
        this.settings = settings;
        this.exportSettings = exportSettings;
        this.gui = new GUI({title: 'Settings'});
        this.openColorPicker = null;
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
            const controller = colorFolder.addColor(this.settings.effectController.availableColors, index).name(`Color ${index + 1}`).onChange(() => {
                this.particles.updateParticleColors();
            });
            this.attachInlineColorPicker(controller);
        });
        colorFolder.open();
    }

    attachInlineColorPicker(controller) {
        const nativeInput = controller.$input;
        nativeInput.style.pointerEvents = 'none';
        nativeInput.tabIndex = -1;

        controller.domElement.classList.add('has-inline-color-picker');

        const picker = document.createElement('div');
        picker.className = 'inline-color-picker';
        picker.hidden = true;

        const sv = document.createElement('canvas');
        sv.className = 'inline-color-picker-sv';
        sv.width = 200;
        sv.height = 90;

        const hue = document.createElement('input');
        hue.type = 'range';
        hue.min = '0';
        hue.max = '360';
        hue.step = '1';
        hue.className = 'inline-color-picker-hue';
        hue.setAttribute('aria-label', `${controller._name} hue`);

        picker.append(sv, hue);
        controller.domElement.appendChild(picker);

        const state = hexToHsv(controller.$input.value);
        const paintSv = () => {
            const ctx = sv.getContext('2d');
            const {width, height} = sv;
            const hueColor = hsvToHex(state.h, 1, 1);
            const sat = ctx.createLinearGradient(0, 0, width, 0);
            sat.addColorStop(0, '#fff');
            sat.addColorStop(1, hueColor);
            ctx.fillStyle = sat;
            ctx.fillRect(0, 0, width, height);
            const val = ctx.createLinearGradient(0, 0, 0, height);
            val.addColorStop(0, 'rgba(0,0,0,0)');
            val.addColorStop(1, '#000');
            ctx.fillStyle = val;
            ctx.fillRect(0, 0, width, height);
            const x = state.s * width;
            const y = (1 - state.v) * height;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.strokeStyle = state.v > 0.55 ? '#111' : '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        };

        const applyColor = () => {
            controller.setValue(hsvToHex(state.h, state.s, state.v));
        };

        const syncFromController = () => {
            Object.assign(state, hexToHsv(controller.$input.value));
            hue.value = String(Math.round(state.h));
            paintSv();
        };

        const setSvFromPointer = (event) => {
            const rect = sv.getBoundingClientRect();
            state.s = clamp((event.clientX - rect.left) / rect.width, 0, 1);
            state.v = clamp(1 - (event.clientY - rect.top) / rect.height, 0, 1);
            applyColor();
            paintSv();
        };

        hue.addEventListener('input', () => {
            state.h = Number(hue.value);
            applyColor();
            paintSv();
        });

        sv.addEventListener('pointerdown', (event) => {
            sv.setPointerCapture(event.pointerId);
            setSvFromPointer(event);
        });

        sv.addEventListener('pointermove', (event) => {
            if (sv.hasPointerCapture(event.pointerId)) {
                setSvFromPointer(event);
            }
        });

        controller.$display.style.cursor = 'pointer';
        controller.$display.addEventListener('click', () => {
            const opening = picker.hidden;
            if (this.openColorPicker && this.openColorPicker !== picker) {
                this.openColorPicker.hidden = true;
            }
            if (opening) {
                syncFromController();
                picker.hidden = false;
                this.openColorPicker = picker;
            } else {
                picker.hidden = true;
                this.openColorPicker = null;
            }
        });

        controller.$text.addEventListener('input', () => {
            if (!picker.hidden) {
                syncFromController();
            }
        });

        syncFromController();
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

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function hexToHsv(hex) {
    const int = parseInt(hex.replace('#', ''), 16);
    const r = ((int >> 16) & 255) / 255;
    const g = ((int >> 8) & 255) / 255;
    const b = (int & 255) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let h = 0;

    if (delta !== 0) {
        if (max === r) {
            h = 60 * (((g - b) / delta) % 6);
        } else if (max === g) {
            h = 60 * ((b - r) / delta + 2);
        } else {
            h = 60 * ((r - g) / delta + 4);
        }
    }

    if (h < 0) {
        h += 360;
    }

    return {h, s: max === 0 ? 0 : delta / max, v: max};
}

function hsvToHex(h, s, v) {
    const c = v * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = v - c;
    let r = 0;
    let g = 0;
    let b = 0;

    if (h < 60) {
        r = c;
        g = x;
    } else if (h < 120) {
        r = x;
        g = c;
    } else if (h < 180) {
        g = c;
        b = x;
    } else if (h < 240) {
        g = x;
        b = c;
    } else if (h < 300) {
        r = x;
        b = c;
    } else {
        r = c;
        b = x;
    }
    const toByte = (channel) => Math.round((channel + m) * 255).toString(16).padStart(2, '0');

    return `#${toByte(r)}${toByte(g)}${toByte(b)}`;
}
