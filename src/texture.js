import * as THREE from 'three';

const DEFAULT_ICONS = [
    'php.webp',
    'js.webp',
    'ts.webp',
    'python.webp',
    'react.webp',
    'angular.webp',
    'ruby.webp',
    'java.webp',
    'c.webp',
    'c-sharp.webp',
    'rust.webp',
    'kotlin.webp',
    'dart.webp',
    'flutter.webp',
    'scala.webp',
    'docker.webp',
    'kubernetes.webp',
    'github.webp',
    'vue.webp',
    'html.webp',
    'aws.webp',
    'graph-ql.webp',
    'open-ai.webp',
];

const DEFAULT_ICON_FOLDER = './dist/assets/icons';

const loadTexture = (textureLoader, path) => {
    return new Promise((resolve) => {
        textureLoader.load(
            path,
            (texture) => {
                texture.needsUpdate = true;
                resolve(texture);
            },
            undefined,
            () => {
                resolve(null);
            }
        );
    });
};

const loadDefaultTextures = async (textureLoader) => {
    const textures = await Promise.all(
        DEFAULT_ICONS.map((fileName) =>
            loadTexture(textureLoader, `${DEFAULT_ICON_FOLDER}/${fileName}`)
        )
    );

    return textures.filter(texture => texture !== null);
};

const loadCustomTextures = async (textureLoader, iconFolderPath) => {
    try {
        const response = await fetch(`${iconFolderPath}/iconList.json`);
        const files = await response.json();
        const textures = await Promise.all(
            files.map((fileName) =>
                loadTexture(textureLoader, `${iconFolderPath}/${fileName}`)
            )
        );

        return textures.filter(texture => texture !== null);
    } catch (error) {
        return [];
    }
};

export const loadTextures = async (iconFolderPath) => {
    const textureLoader = new THREE.TextureLoader();
    if (!iconFolderPath) {
        return loadDefaultTextures(textureLoader);
    }

    return loadCustomTextures(textureLoader, iconFolderPath);
};
