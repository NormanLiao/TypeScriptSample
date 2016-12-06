///<reference path="../typings/threejs/three.d.ts" />
///<reference path="../typings/jquery/jquery.d.ts" />

import { Scene } from './Scene';

export class View {
    renderer: THREE.Renderer;
    sceneManager: Scene;


    constructor() {
        this.sceneManager = new Scene();
        this.renderer = new THREE.WebGLRenderer();
    }

    /**
     * Initial webGL scene function.
     * @param target  no parameter input
     * @returns       no return value
     */
    public InitScene() {
        this.sceneManager.LnitScene();
        this.Render();

        document.body.appendChild(this.renderer.domElement);
    }

    /**
     * render webgl view
     * @param target  no parameter input
     * @returns       no return value
     */
    private Render() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.sceneManager.scene, this.sceneManager.camera);
    }
}

window.onload = () => {
    let view = new View();
    view.InitScene();
};