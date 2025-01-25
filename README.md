<h1 align="center">WebGL Tech Particles</h1>

<div align="center">
  <a href="https://github.com/a-rudenko/webgl-tech-particles/blob/main/LICENSE" target="_blank" style="text-decoration: none;">
    <img src="https://img.shields.io/github/license/a-rudenko/webgl-tech-particles" alt="GitHub license" >
  </a>
  <a href="https://www.npmjs.com/package/webgl-tech-particles" target="_blank" style="text-decoration: none;">
    <img src="https://img.shields.io/npm/v/webgl-tech-particles" alt="Latest version">
  </a>
  <a href="https://www.npmjs.com/package/webgl-tech-particles" target="_blank" style="text-decoration: none;">
    <img src="https://img.shields.io/bundlephobia/min/webgl-tech-particles" alt="Minified size">
  </a>
  <a href="https://www.npmjs.com/package/webgl-tech-particles" target="_blank" style="text-decoration: none;">
    <img src="https://img.shields.io/npm/dw/webgl-tech-particles" alt="npm" >
  </a>
</div>

Interactive 3D particle system with technology icons using WebGL and Three.js.

This project is an interactive 3D visualization of technology icons (e.g., JavaScript, Python, React, Docker, etc.)
implemented with WebGL and Three.js. Particles representing different technologies move dynamically in a 3D space,
connecting with each other based on customizable parameters.

<h2>Install</h2>

Using npm:

```bash
$ npm i animal-avatar-generator
```

<h2>Usage</h2>

```js
import {initWebGLTechParticles} from 'webgl-tech-particles';

initWebGLTechParticles('tech-particles');
```

To apply your custom settings, you need to specify the path to `settings.json` as the second parameter
in `initWebGLTechParticles`:

```js
import {initWebGLTechParticles} from 'webgl-tech-particles';

initWebGLTechParticles('tech-particles', 'settings.json');
```

If you want to use a custom icon set, you need to specify the path to the icon folder in your `settings.json`:

```
"iconFolderPath": "icons"
```

Also in the icon folder you need to create a file `iconList.json` and specify which icons to load.

Example of `iconList.json`:

```
[
    "vue.webp",
    "react.webp",
    "dart.webp",
    "rust.webp",
    "aws.webp"
]
```

<i>For correct operation, it is better to upload small icons in png and webp formats.</i>

<h2>CDN Usage</h2>

You can also use this package directly in the browser via CDN without installing it via npm. To do this, include the following script tag in your HTML file:

```html
<script type="module">
  import { initWebGLTechParticles } from 'https://cdn.jsdelivr.net/npm/webgl-tech-particles@:vesrion/dist/webgl-tech-particles.js';
  initWebGLTechParticles('tech-particles', 'settings.json');
</script>
```

<i>Replace `:vesrion` with the version you need</i>

<h2>Settings</h2>

Example with basic <a href="https://github.com/a-rudenko/webgl-tech-particles/blob/main/settings.json" target="_blank">
settings</a>.

Below is a description of the settings.

<h3>Particle Settings:</h3>

| Name                   | Default                            | Description                                                                                                                 |
|------------------------|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| `enableRotation`       | `false`                            | Enable/disable sphere rotation                                                                                              |
| `rotationSpeed`        | `0.1`                              | Rotation speed                                                                                                              |
| `showLines`            | `true`                             | Show/hide meshes between particles (icons)                                                                                  |
| `minDistance`          | `150`                              | Minimum distance to create meshes connecting particles                                                                      |
| `maxConnections`       | `20`                               | Maximum number of connections                                                                                               |
| `particleVelocity`     | `0.1`                              | Velocity of particles                                                                                                       |
| `colorEnabled []`      | `[true, true, true]`               | The sphere can have 3 colors for the meshes connecting the particles, this setting allows you to turn on/off certain colors |
| `availableColors []`   | `['#b02727', '#454545','#15154c']` | Available colors for meshes                                                                                                 |
| `enableCameraControls` | `true`                             | Enable/disable the ability to rotate and resize the sphere                                                                  |

<h3>Camera Settings:</h3>

| Name          | Default | Description                                                               |
|---------------|---------|---------------------------------------------------------------------------|
| `positionZ`   | `1750`  | Initial position of the sphere by Z coordinates                           |
| `farPlane`    | `4000`  | The farthest distance that can be obtained by resizing a sphere           |
| `nearPlane`   | `1`     | Minimum distance from the camera at which objects begin to be displayed   |
| `fieldOfView` | `45`    | Maximum distance from the camera at which objects will still be displayed |

<h3>Orbit Controls Settings:</h3>

| Name          | Default | Description                                                     |
|---------------|---------|-----------------------------------------------------------------|
| `minDistance` | `1000`  | Minimum distance the camera can get to the target (focus point) |
| `maxDistance` | `3000`  | Maximum distance the camera can get to the target (focus point) |

<h3>Scene Settings:</h3>

| Name                | Default | Description                            |
|---------------------|---------|----------------------------------------|
| `halfRadius`        | `400`   | Radius value for constructing a sphere |
| `iconSize`          | `20`    | Icons size                             |
| `particlesCount`    | `500`   | Number of particles                    |
| `maxParticlesCount` | `1000`  | Maximum number of particles            |

<h2>Credits</h2>
It is mainly developed using the JavaScript 3D library <a href="https://github.com/mrdoob/three.js">three.js</a>.

<h2>License</h2>
<a href="https://github.com/a-rudenko/webgl-tech-particles/blob/main/LICENSE">MIT</a>
