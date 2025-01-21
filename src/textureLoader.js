import * as THREE from 'three';

export const loadTextures = () => {
    const textureLoader = new THREE.TextureLoader();
    const texturePaths = [
        'assets/icons/php.png',
        'assets/icons/js.webp',
        'assets/icons/ts.png',
        'assets/icons/python.png',
        'assets/icons/react.webp',
        'assets/icons/angular.png',
        'assets/icons/ruby.png',
        'assets/icons/java.png',
        'assets/icons/c.png',
        'assets/icons/c-sharp.png',
        'assets/icons/rust.png',
        'assets/icons/kotlin.png',
        'assets/icons/dart.png',
        'assets/icons/flutter.png',
        'assets/icons/scala.png',
        'assets/icons/docker.png',
        'assets/icons/kubernetes.png',
        'assets/icons/github.png',
        'assets/icons/vue.png',
        'assets/icons/html.webp',
        'assets/icons/aws.png',
        'assets/icons/graph-ql.webp',
        'assets/icons/open-ai.webp',
    ];

    return texturePaths.map(path => textureLoader.load(path));
};
