import { Canvas } from "@react-three/fiber"
import { OrbitControls, Grid } from "@react-three/drei"
import { Suspense, useEffect } from "react"
import { Object } from "./Object"
import { Sidebar } from "./Sidebar"
import { useStore, Scene } from "../store"

export function Scene() {
  const { present, loadScene } = useStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault()
          useStore.getState().undo()
        } else if (e.key === 'y') {
          e.preventDefault()
          useStore.getState().redo()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleLoadScene = () => {
    const sceneName = prompt("Enter the name of the scene to load:")
    if (sceneName) {
      const sceneData = localStorage.getItem(`scene_${sceneName}`)
      if (sceneData) {
        loadScene(JSON.parse(sceneData) as Scene)
      } else {
        alert("Scene not found.")
      }
    }
  }

  return (
    <div className="w-full h-screen relative">
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <Grid infiniteGrid />
          <OrbitControls makeDefault />
          {present.objects.map((obj) => (
            <Object key={obj.id} {...obj} />
          ))}
        </Suspense>
      </Canvas>
      <Sidebar />
      <div className="absolute top-4 left-4">
        <Button onClick={handleLoadScene}>Load Scene</Button>
      </div>
    </div>
  )
}

