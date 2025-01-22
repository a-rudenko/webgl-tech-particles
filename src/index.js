import { Scene } from './scene.js';
import { Particles } from './particles.js';
import { Renderer } from './renderer.js';
import { loadTextures } from './texture.js';
import { loadSettings } from './settings.js';
import './assets/css/main.css';

async function init() {
    const settings = await loadSettings();
    const textures = loadTextures();

    const scene = new Scene(settings);
    const particles = new Particles(scene, settings, textures);
    const renderer = new Renderer(scene, particles);

    scene.init();
    particles.init();
    renderer.init();
}

init();