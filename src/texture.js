import * as THREE from 'three';

export const loadTextures = () => {
    const textureLoader = new THREE.TextureLoader();
    const texturePaths = [
        './dist/assets/icons/php.webp',
        './dist/assets/icons/js.webp',
        './dist/assets/icons/ts.webp',
        './dist/assets/icons/python.webp',
        './dist/assets/icons/react.webp',
        './dist/assets/icons/angular.webp',
        './dist/assets/icons/ruby.webp',
        './dist/assets/icons/java.webp',
        './dist/assets/icons/c.webp',
        './dist/assets/icons/c-sharp.webp',
        './dist/assets/icons/rust.webp',
        './dist/assets/icons/kotlin.webp',
        './dist/assets/icons/dart.webp',
        './dist/assets/icons/flutter.webp',
        './dist/assets/icons/scala.webp',
        './dist/assets/icons/docker.webp',
        './dist/assets/icons/kubernetes.webp',
        './dist/assets/icons/github.webp',
        './dist/assets/icons/vue.webp',
        './dist/assets/icons/html.webp',
        './dist/assets/icons/aws.webp',
        './dist/assets/icons/graph-ql.webp',
        './dist/assets/icons/open-ai.webp',
    ];

    return texturePaths.map(path => textureLoader.load(path));
};
