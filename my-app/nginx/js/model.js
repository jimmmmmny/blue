import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { FBXLoader } from "https://unpkg.com/three@0.108.0/examples/jsm/loaders/FBXLoader.js";

let WIDTH = 1000;
let HEIGHT = 800;

let scene, camera, renderer;

let model = new THREE.Object3D();
let modelBody = new THREE.Object3D();

const init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(35, WIDTH / HEIGHT, 10, 1200);
    camera.position.set(0, 15, 280);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(WIDTH, HEIGHT);
    // renderer.shadowMap.enabled = true;

    document.querySelector("#canvasWrap").appendChild(renderer.domElement);

    {
        var light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
        light.position.set(100, 100, 100);
        scene.add(light);
    }
    {
        const color = 0xffffff;
        const intensity = 2;
        const light = new THREE.PointLight(color, intensity);
        light.position.set(140, 160, 150);
        scene.add(light);
    }

    fbxLoadFunc("./img/model/doughnut.fbx");
};

const fbxLoadFunc = (modelName) => {
    const fbxLoader = new FBXLoader();
    fbxLoader.load(
        modelName,
        (object) => {
            console.log(object);
         
            let scaleNum = 1;
            object.scale.set(scaleNum, scaleNum, scaleNum);

            model.add(object.children[0]);
            model.rotation.set(0.4, 9.3, 0);

            modelBody.position.set(0, 10, 0);
            modelBody.add(model);
            scene.add(modelBody);

            gsap.from("h1", {
                duration: 0.8,
                y: 150,
                opacity: 0,
                ease: "back.out",
            });
            gsap.from(model.position, {
                duration: 0.8,
                scale: 0.6,
                ease: "Power3.easeInOut",
            });
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
            console.log(error);
        }
    );
};

let moveNum = 0;
let scrollTop = 0;

const animate = () => {
    moveNum += (scrollTop / 300 - moveNum) * 0.1;
    // console.log(moveNum);

    model.rotation.y += 0.01;
    modelBody.rotation.y = moveNum;
    modelBody.rotation.z = moveNum / 1;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

init();
animate();

const scrollFunc = () => {
    scrollTop = window.scrollY;
};

window.addEventListener("scroll", scrollFunc);
