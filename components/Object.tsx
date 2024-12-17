import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Mesh, CylinderGeometry, ConeGeometry } from "three"
import { useStore, ObjectType } from "../store"
import { TransformControls } from "@react-three/drei"

interface ObjectProps {
  id: string
  type: ObjectType
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  material: {
    color: string
    metalness: number
    roughness: number
  }
}

export function Object({ id, type, position, rotation, scale, material }: ObjectProps) {
  const ref = useRef<Mesh>(null)
  const { setSelectedObject, selectedObject, updateObject } = useStore()
  const [hovered, setHovered] = useState(false)

  const isSelected = selectedObject?.id === id
  const color = isSelected ? "hotpink" : hovered ? "lightblue" : material.color

  const handleClick = (event: any) => {
    event.stopPropagation()
    setSelectedObject({ id, type, position, rotation, scale, material })
  }

  const handleTransform = (e: any) => {
    const { position, rotation, scale } = e.target.object
    updateObject(id, {
      position: [position.x, position.y, position.z],
      rotation: [rotation.x, rotation.y, rotation.z],
      scale: [scale.x, scale.y, scale.z],
    })
  }

  const getGeometry = () => {
    switch (type) {
      case "cube":
        return <boxGeometry args={[1, 1, 1]} />
      case "sphere":
        return <sphereGeometry args={[0.5, 32, 32]} />
      case "cylinder":
        return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
      case "cone":
        return <coneGeometry args={[0.5, 1, 32]} />
      default:
        return <boxGeometry args={[1, 1, 1]} />
    }
  }

  return (
    <>
      <mesh
        ref={ref}
        position={position}
        rotation={rotation}
        scale={scale}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {getGeometry()}
        <meshStandardMaterial
          color={color}
          metalness={material.metalness}
          roughness={material.roughness}
        />
      </mesh>
      {isSelected && (
        <TransformControls object={ref} onObjectChange={handleTransform} />
      )}
    </>
  )
}

