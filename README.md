<h1 align="center">
    react-r3f-shader-hook
</h1>

<p align="center">
    A React (R3F) hook to apply a shader to the entire scene without having to use <code>EffectComposer</code>
</p>

<div align="center">
    <a href='https://www.npmjs.com/package/react-r3f-shader-hook'>
      <img alt="NPM Version" src="https://img.shields.io/npm/v/react-r3f-shader-hook">
    </a>
    <img alt="Static Badge" src="https://img.shields.io/badge/types-included-darkGreen">
</div>

### What does it do?

This package provides a hook which lets you apply a shader to an entire three.js scene without the hassle and overhead of using the `EffectComposer`. Simply call the hook with your desired shaders and you're done. It even returns a `material` object with which you can easily access and manipulate the uniforms.

Under the hood it works by implementing [postprocessing with a 3 vertix `Quad`](https://gist.github.com/luruke/94bb1de6c463520e52f04e87d5d2e37b#file-postfx-js) (a triangle) based on the approach by @luruke. Full credit for the original logic and concepts goes to him. This project builds on his approach by adapting it to the modern React framework, utilizing hooks for state and lifecycle management. This makes it very easy and intuitive to use in react-three-fiber.

### Advantages

- 🚀 More performant since it utilizes a quad with 3 vertices instead of 4

- 📦 Works out of the box. No need to import other components

- 🎈 Lightweight. Perfect for projects where using `EffectComposer` may be overkill

- 💡 More intuitive and simpler to use

- ⚡ Although `EffectComposer` offers a variety of complex custom solutions, this provides a quick and dirty way to enahance your scene

- 📐 Automatically handles resizing, offering an advantage over using Three.js out-of-the-box, where you would need to worry about handling responsiveness.

### Documentation

The hook accepts any parameters that the `RawShaderMaterial` from [three.js](https://threejs.org/docs/#api/en/materials/RawShaderMaterial) accepts. The three you will most commonly deal with are the following:

<!-- update these to be more descriptive -->

- `vertexShader`: string
- `fragmentShader`: string
- `uniforms`: object

### Installation

With [Node.js](https://nodejs.org/en) installed on your machine, run the following to install the library:

```
npm i react-r3f-shader-hook
```

Keep in mind you will need the following dependencies installed in your project as they are peerDependencies of this library:

```js
{
    "@react-three/fiber": "^8.15.12",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": ">=0.159.0 <1.0.0"
}
```

### Usage

Once installed, simply import the hook like so:

```js
import useShaderPass from 'react-r3f-shader-hook'
```

<!-- be more descriptive of the RawShaderMaterial -->

and call the hook while passing in your desired `vertexShader`, `fragmentShader` and `uniforms`. If you wish to access the uniforms in your code after the shader has been applied to the scene, the hook returns a material of the type `RawShaderMaterial`.

```js
const shaderPassMaterial = useShaderPass({
  vertexShader,
  fragmentShader,
  uniforms,
})
```

and there you go. Your custom shaders are applied to the whole scene!

Now, to access the uniforms you provided, you can simply use material returned from the hook to read and change your uniforms. Just like you would with a `<shaderMaterial>` element when using react-three-fiber! For example:

```js
useFrame((state) => {
  shaderPassMaterial.uniforms.uTime.value = state.clock.getElapsedTime()
})
```

Keep in mind that, like react-three-fiber hooks, this hook can only be called in a component that is a child of the `<Canvas>` component:

```js
const Scene = () => {
  const vertexShader = /* Your vertex shader */
  const fragmentShader = /* Your fragment shader */
  const uniforms = /* Your uniforms */

  const shaderPassMaterial = useShaderPass({
    vertexShader,
    fragmentShader,
    uniforms,
  })

  return (
    <mesh>
      <boxGeometry args={[2, 2]} />
      <meshBasicMaterial />
    </mesh>
  )
}

function App() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  )
}

export default App
```

### Contributing

Documentation on contributing can be found in [CONTRIBUTING.md](CONTRIBUTING.md)

### License

This library is [MIT Licensed](LICENSE)
