// 1.引入threejs
import * as THREE from "three";
//2. 引入RGBELoader 加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// 4. 引入轨道控制器（控制器的一种）-----围绕物体进行查看
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
// 5.引入模型解析器
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

// 3.构建需要的3d的类
class Base3d {
  constructor(selector, onFinish) {
    this.container = document.querySelector(selector); //场景中创建的物体
    this.camera; // 照相机（Camera）
    this.scene; // 场景（Scene）
    this.renderer; // 渲染器（Renderer）

    this.model; // 模型
    this.plate; // 玻璃展台
    this.mixer; // 混合器/物体的数据
    this.clock = new THREE.Clock(); // 初始化计时器

    // 灯光一二三
    this.spotlight1;
    this.spotlight2;
    this.spotlight3

    this.timeoutid;
    // 模型加载完成回调函数
    this.onFinish = onFinish;
    // 进度函数
    this.progressFn;

    //初始化
    this.init()
    // 渲染界面
    this.animate()
  }

  init () {
    this.initScene(); //初始化场景
    this.initCamera(); //初始化照相机
    this.initRenderer(); //初始化渲染器
    // this.initControls(); //初始化控制器
    this.addMesh(); //添加模型/物体

    //监听场景大小(页面尺寸)，调节渲染尺寸
    window.addEventListener("resize", this.onWindowResize.bind(this));

    // 监听滚轮事件
    window.addEventListener("mousewheel", this.onMouseWheel.bind(this));
  }
  initScene () {
    this.scene = new THREE.Scene(); //初始化场景
    this.setEnvMap('003'); //初始化场景的背景
  }
  initCamera () {
    /**
     * PerspectiveCamera 透视相机
     *
     * 第一个参数为 角度 例如 45 45°
     * 第二个参数为 摄像头的宽高比例
     * 第三个参数为 最近的距离为多少
     * 第四个参数为 最远的距离为多少
     */
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.25,
      200
    )

    // 设置摄像机的位置 (参数为三位坐标)
    this.camera.position.set(-1.8, 0.6, 2.7)
  }
  initRenderer () {
    /**
     * 初始化渲染器
     *
     * antialias 表示抗锯齿 指模型的圆润程度
     */
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    //设置屏幕像素比
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // 渲染的尺寸大小 当前设备宽 当前设备高
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // 色调映射 ACESFilmicToneMapping--电影级别的
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    //曝光程度
    this.renderer.toneMappingExposure = 3
    // 渲染的画面挂载到元素上
    this.container.appendChild(this.renderer.domElement);
  }
  initControls () {
    /**
     * 初始化控制器
     *
     * 第一个参数为 摄像头
     * 第二个参数为 渲染器
     */
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  //设置场景的背景
  setEnvMap (hdr) {
    new RGBELoader().setPath("./files/hdr/").load(hdr + ".hdr", (texture) => {
      /**
       * 纹理的映射
       *
       * EquirectangularReflectionMapping 圆柱映射
       */
      texture.mapping = THREE.EquirectangularReflectionMapping;
      // 加载纹理对象
      this.scene.background = texture; // 设置背景
      this.scene.environment = texture; // 设置环境
    })
  }

  // 设置模型
  setModel (modelName) {
    return new Promise((resolve, reject) => {
      // 初始化解析器
      const loader = new GLTFLoader().setPath('files/gltf/')
      loader.load(modelName, (gltf) => {

        // 如果存在模型则删除他
        this.model && this.model.removeFromParent();

        //场景的第一个就是模型
        this.model = gltf.scene.children[0]
        if ('bag2.glb' == modelName && !this.plate) {
          this.plate = gltf.scene.children[5];
          // this.scene.add(this.plate)

          // 添加场景
          this.scene.add(gltf.scene)
          // 修改摄像头为模型的摄像头
          this.camera = gltf.cameras[0]
          // 调用动画
          this.mixer = new THREE.AnimationMixer(gltf.scene.children[1])
          // 生成动画动作
          this.animateAction = this.mixer.clipAction(gltf.animations[0])
          // 设置动画播放时长
          this.animateAction.setDuration(20).setLoop(THREE.LoopOnce)
          // 设置播放完成之后停止
          this.animateAction.clampWhenFinished = true;
          // // 设置播放动画
          // this.animateAction.play()


          // 设置灯光
          this.spotlight1 = gltf.scene.children[2].children[0]
          // 调节亮度
          this.spotlight1.intensity = 1
          this.spotlight2 = gltf.scene.children[3].children[0]
          this.spotlight2.intensity = 1
          this.spotlight3 = gltf.scene.children[4].children[0]
          this.spotlight3.intensity = 1
        }
        this.scene.add(this.model)
        this.onFinish();
        resolve(modelName + '模型添加成功')
      }, progress => {
        // console.log(progress, "模型加载进度");
        this.progressFn(progress);
      })
    })
  }
  onProgress (fn) {
    this.progressFn = fn;
  }
  //添加模型/物体
  addMesh () {
    this.setModel('bag2.glb')
  }

  // 渲染界面
  render () {
    // 获取变化时间--->形成时间差
    let delta = this.clock.getDelta()
    // 更新混合器
    this.mixer && this.mixer.update(delta)
    this.renderer.render(this.scene, this.camera)
  }
  //渲染帧
  animate () {
    this.renderer.setAnimationLoop(this.render.bind(this))
  }

  //监听场景大小(页面尺寸)，调节渲染尺寸
  onWindowResize () {
    // 摄像机的比例
    this.camera.aspect = window.innerWidth / window.innerHeight
    // 矩阵转换 （三维转成二维进行展示）
    this.camera.updateProjectionMatrix()
    // 渲染的界面重新设置尺寸
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  onMouseWheel (e) {
    let timeScale = e.deltaY > 0 ? 1 : -1;
    this.animateAction.setEffectiveTimeScale(timeScale);
    this.animateAction.paused = false;
    this.animateAction.play();
    if (this.timeoutid) {
      clearTimeout(this.timeoutid);
    }
    this.timeoutid = setTimeout(() => {
      this.animateAction.halt(0.5);
    }, 300)
  }
}

export default Base3d
