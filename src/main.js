import { SceneManager } from './sceneManager.js';
import { ParticlesManager } from './particlesManager.js';
import { Renderer } from './renderer.js';
import { GUIManager } from './guiManager.js';
import { loadTextures } from './textureLoader.js';
import { loadSettings, exportSettings } from './settings.js';
async function init() {
    const settings = await loadSettings();
    const textures = loadTextures();

    const sceneManager = new SceneManager(settings);
    const particlesManager = new ParticlesManager(sceneManager, settings, textures);
    const renderer = new Renderer(sceneManager, particlesManager);
    const guiManager = new GUIManager(sceneManager, particlesManager, settings, exportSettings);

    sceneManager.init();
    particlesManager.init();
    renderer.init();
    guiManager.init();
}

init();