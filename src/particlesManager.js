import * as THREE from 'three';

export class ParticlesManager {
    constructor(sceneManager, settings, textures) {
        this.sceneManager = sceneManager;
        this.settings = settings;
        this.textures = textures;
        this.particlesData = [];
        this.sprites = [];
        this.linesMesh = null;
        this.positions = new Float32Array(settings.sceneSettings.maxParticlesCount * settings.sceneSettings.maxParticlesCount * 3);
        this.colors = new Float32Array(settings.sceneSettings.maxParticlesCount * settings.sceneSettings.maxParticlesCount * 3);
    }

    init() {
        this.updateParticles();
        this.linesMesh = new THREE.LineSegments(this.getGeometry(), new THREE.LineBasicMaterial({
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
        }));
        this.sceneManager.group.add(this.linesMesh);
    }

    updateParticles() {
        while (this.sprites.length > this.settings.sceneSettings.particlesCount) {
            this.sceneManager.group.remove(this.sprites.pop());
        }

        for (let i = this.sprites.length; i < this.settings.sceneSettings.particlesCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = this.settings.sceneSettings.halfRadius + Math.random() * 50;
            const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
                map: this.textures[i % this.textures.length],
                transparent: true,
            }));

            sprite.scale.set(this.settings.sceneSettings.iconSize, this.settings.sceneSettings.iconSize, 1);
            sprite.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );

            this.sceneManager.group.add(sprite);
            this.sprites.push(sprite);
            this.particlesData.push({
                velocity: new THREE.Vector3(this.getVelocity(), this.getVelocity(), this.getVelocity()),
                connections: [],
                color: new THREE.Color()
            });
        }

        this.updateParticleColors();
    }

    updateParticleColors() {
        const activeColors = this.settings.effectController.availableColors.filter((_, index) => this.settings.effectController.colorEnabled[index]);
        for (let i = 0; i < this.settings.sceneSettings.particlesCount; i++) {
            if (activeColors.length > 0) {
                this.particlesData[i].color = new THREE.Color(activeColors[Math.floor(Math.random() * activeColors.length)]);
            } else {
                this.particlesData[i].color = new THREE.Color(1, 1, 1);
            }
        }
    }

    updateParticleVelocities() {
        for (let i = 0; i < this.particlesData.length; i++) {
            this.particlesData[i].velocity.set(this.getVelocity(), this.getVelocity(), this.getVelocity());
        }
    }

    getVelocity() {
        return (-1 + Math.random() * 2) * this.settings.effectController.particleVelocity;
    }

    getGeometry() {
        let geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3).setUsage(THREE.DynamicDrawUsage));
        geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3).setUsage(THREE.DynamicDrawUsage));
        geometry.computeBoundingSphere();
        geometry.setDrawRange(0, 0);

        return geometry;
    }

    animate() {
        let vertexPos = 0;
        let colorPos = 0;
        let numConnected = 0;

        for (let i = 0; i < this.settings.sceneSettings.particlesCount; i++) {
            this.particlesData[i].connections = [];
        }

        for (let i = 0; i < this.settings.sceneSettings.particlesCount; i++) {
            const particleData = this.particlesData[i];
            const sprite = this.sprites[i];

            sprite.position.add(particleData.velocity);
            if (sprite.position.length() > this.settings.sceneSettings.halfRadius) {
                sprite.position.normalize().multiplyScalar(this.settings.sceneSettings.halfRadius);
                particleData.velocity.negate();
            }

            if (particleData.connections.length >= this.settings.effectController.maxConnections) {
                continue;
            }

            for (let j = i + 1; j < this.settings.sceneSettings.particlesCount; j++) {
                const spriteB = this.sprites[j];
                const particleDataB = this.particlesData[j];

                if (particleDataB.connections.length >= this.settings.effectController.maxConnections) {
                    continue;
                }

                if (sprite.position.distanceTo(spriteB.position) < this.settings.effectController.minDistance) {
                    particleData.connections.push(j);
                    particleDataB.connections.push(i);
                    this.positions[vertexPos++] = sprite.position.x;
                    this.positions[vertexPos++] = sprite.position.y;
                    this.positions[vertexPos++] = sprite.position.z;
                    this.positions[vertexPos++] = spriteB.position.x;
                    this.positions[vertexPos++] = spriteB.position.y;
                    this.positions[vertexPos++] = spriteB.position.z;

                    const color1 = particleData.color || new THREE.Color(1, 1, 1);
                    const color2 = particleDataB.color || new THREE.Color(1, 1, 1);

                    this.colors[colorPos++] = color1.r;
                    this.colors[colorPos++] = color1.g;
                    this.colors[colorPos++] = color1.b;
                    this.colors[colorPos++] = color2.r;
                    this.colors[colorPos++] = color2.g;
                    this.colors[colorPos++] = color2.b;

                    numConnected++;
                }
            }
        }

        this.linesMesh.geometry.setDrawRange(0, numConnected * 2);
        this.linesMesh.geometry.attributes.position.needsUpdate = true;
        this.linesMesh.geometry.attributes.color.needsUpdate = true;

        if (this.settings.effectController.enableRotation) {
            this.sceneManager.group.rotation.y += this.settings.effectController.rotationSpeed / 100;
        }
    }
}