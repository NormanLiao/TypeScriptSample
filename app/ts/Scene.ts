///<reference path="../typings/threejs/three.d.ts" />

export class Scene {

    scene: THREE.Scene;
    camera: THREE.Camera;
    mesh: THREE.Mesh[];

    constructor() {

    }

    public LnitScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200);
        this.camera.position.z = 150;
        this.AddLight(0xffffff, 2.0, new THREE.Vector3(100, 100, 30) );
        this.LoadObject();
    }

    private LoadObject() {
        let geometry: THREE.SphereBufferGeometry = this.LoadGeometry();
        let material: THREE.Material = this.LoadMaterial();
        let mesh: THREE.Object3D = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
    }

    private LoadGeometry() {
        let geometry: THREE.SphereBufferGeometry  = new THREE.SphereBufferGeometry( 10, 10, 16 );
        return geometry;
    }

    private LoadMaterial() {
        let material: THREE.Material = new THREE.MeshPhongMaterial({ color: 0x660066, specular: 1.0 });
        return material;
    }

    private AddLight(color: number|string, intensity: number, position: THREE.Vector3) {
        let ambientlight =  new THREE.AmbientLight(color, 0.3);
        this.scene.add(ambientlight);

        let light =  new THREE.DirectionalLight(color, intensity);
        light.position.set(position.x, position.y, position.z);
        this.scene.add(light);
    }
}