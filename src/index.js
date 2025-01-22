import { SceneManager } from './sceneManager.js';
import { ParticlesManager } from './particlesManager.js';
import { Renderer } from './renderer.js';
import { loadTextures } from './textureLoader.js';
import { loadSettings } from './settings.js';
import './assets/css/main.css';

async function init() {
    const settings = await loadSettings();
    const textures = loadTextures();

    const sceneManager = new SceneManager(settings);
    const particlesManager = new ParticlesManager(sceneManager, settings, textures);
    const renderer = new Renderer(sceneManager, particlesManager);

    sceneManager.init();
    particlesManager.init();
    renderer.init();
}

init();