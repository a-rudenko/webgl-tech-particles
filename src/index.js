import {Scene} from './scene.js';
import {Particles} from './particles.js';
import {Renderer} from './renderer.js';
import {loadTextures} from './texture.js';
import {loadSettings} from './settings.js';
import './assets/css/main.css';

export async function initWebGLTechParticles(containerId, settingsPath, iconFolderPath ) {
    const settings = await loadSettings(settingsPath);
    const textures = await loadTextures(iconFolderPath);
    const scene = new Scene(settings, containerId);
    const particles = new Particles(scene, settings, textures);
    const renderer = new Renderer(scene, particles, containerId);

    scene.init();
    particles.init();
    renderer.init();
}
