const importMap = {
    "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.172.0/build/three.module.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.172.0/examples/jsm/"
    }
};

const script = document.createElement('script');
script.type = 'importmap';
script.innerHTML = JSON.stringify(importMap);
document.head.appendChild(script);
