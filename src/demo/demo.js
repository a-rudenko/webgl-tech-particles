import { Scene } from '../scene.js';
import { Particles } from '../particles.js';
import { Renderer } from '../renderer.js';
import { Gui } from '../gui.js';
import { loadTextures } from '../texture.js';
import { loadSettings, exportSettings } from '../settings.js';
import '../assets/css/main.css';

export async function initWebGLTechParticles(containerId) {
    const settings = await loadSettings();
    const textures = await loadTextures(settings.iconFolderPath);
    const scene = new Scene(settings, containerId);
    const particles = new Particles(scene, settings, textures);
    const renderer = new Renderer(scene, particles, containerId);
    const gui = new Gui(scene, particles, settings, exportSettings);

    scene.init();
    particles.init();
    renderer.init();
    gui.init();
}
