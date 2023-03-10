import { RGBELoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/RGBELoader.js';

// Load HDR environment map
new RGBELoader().load('./HDR/dancing_hall_1k.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        this._scene.environment = texture;
        // Create render target
        const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        renderTarget.texture.format = THREE.RGBAFormat;
        renderTarget.texture.type = THREE.FloatType;
        renderTarget.texture.generateMipmaps = false;
        //...
}, undefined, (error) => {
        console.error(`Failed to load HDR file: ${error}`);
});