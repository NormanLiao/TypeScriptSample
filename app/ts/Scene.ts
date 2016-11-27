///<reference path="../typings/threejs/three.d.ts" />

export class Scene {

    scene: THREE.Scene;
    camera: THREE.Camera;
    mesh: THREE.Mesh[];
 
    constructor() {

    }

    public initScene() 
    {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200);
        this.camera.position.z = 150;
        this.addLight(0xffffff, 2.0, new THREE.Vector3(100,100,30) );
        this.loadObject();
    }
    
    public loadObject()
    {
        let geometry: THREE.SphereBufferGeometry = this.loadGeometry();
        let material: THREE.Material = this.loadMaterial();
        let mesh: THREE.Object3D = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
    }

    public loadGeometry()
    {
        let geometry: THREE.SphereBufferGeometry  = new THREE.SphereBufferGeometry( 10, 10, 16 )
        return geometry;
    }

    public loadMaterial()
    {
        let material: THREE.Material = new THREE.MeshPhongMaterial({ color: 0x660066, specular: 1.0 });
        return material;
    }

    addLight(color: number|string, intensity: number, position: THREE.Vector3)
    {
        let ambientlight =  new THREE.AmbientLight(color,0.3);
        this.scene.add(ambientlight);

        let light =  new THREE.DirectionalLight(color,intensity);
        light.position.set(position.x,position.y,position.z);
        this.scene.add(light);
    }
}