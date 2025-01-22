import * as THREE from 'three';

export const loadTextures = () => {
    const textureLoader = new THREE.TextureLoader();
    const texturePaths = [
        './assets/icons/php.webp',
        './assets/icons/js.webp',
        './assets/icons/ts.webp',
        './assets/icons/python.webp',
        './assets/icons/react.webp',
        './assets/icons/angular.webp',
        './assets/icons/ruby.webp',
        './assets/icons/java.webp',
        './assets/icons/c.webp',
        './assets/icons/c-sharp.webp',
        './assets/icons/rust.webp',
        './assets/icons/kotlin.webp',
        './assets/icons/dart.webp',
        './assets/icons/flutter.webp',
        './assets/icons/scala.webp',
        './assets/icons/docker.webp',
        './assets/icons/kubernetes.webp',
        './assets/icons/github.webp',
        './assets/icons/vue.webp',
        './assets/icons/html.webp',
        './assets/icons/aws.webp',
        './assets/icons/graph-ql.webp',
        './assets/icons/open-ai.webp',
    ];

    return texturePaths.map(path => textureLoader.load(path));
};
