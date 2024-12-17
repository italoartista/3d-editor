import { create } from "zustand"
import { produce } from "immer"
import { Color } from "three"

export type ObjectType = "cube" | "sphere" | "cylinder" | "cone"

interface Material {
  color: string
  metalness: number
  roughness: number
}

interface Object3D {
  id: string
  type: ObjectType
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  material: Material
}

interface Scene {
  name: string
  objects: Object3D[]
}

interface HistoryState {
  past: Scene[]
  present: Scene
  future: Scene[]
}

interface EditorState extends HistoryState {
  selectedObject: Object3D | null
  addObject: (object: Omit<Object3D, "id" | "position" | "rotation" | "scale" | "material">) => void
  removeObject: (id: string) => void
  updateObject: (id: string, updates: Partial<Object3D>) => void
  setSelectedObject: (object: Object3D | null) => void
  undo: () => void
  redo: () => void
  saveScene: (name: string) => void
  loadScene: (scene: Scene) => void
}

const initialMaterial: Material = {
  color: "#ff9900",
  metalness: 0.1,
  roughness: 0.5,
}

const initialScene: Scene = {
  name: "Untitled Scene",
  objects: [],
}

const initialState: HistoryState = {
  past: [],
  present: initialScene,
  future: [],
}

export const useStore = create<EditorState>((set) => ({
  ...initialState,
  selectedObject: null,
  addObject: (object) =>
    set(
      produce((state: EditorState) => {
        const newObject = {
          ...object,
          id: Math.random().toString(36).substr(2, 9),
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          material: initialMaterial,
        }
        state.past.push(state.present)
        state.present.objects.push(newObject)
        state.future = []
      })
    ),
  removeObject: (id) =>
    set(
      produce((state: EditorState) => {
        state.past.push(state.present)
        state.present.objects = state.present.objects.filter((obj) => obj.id !== id)
        state.future = []
      })
    ),
  updateObject: (id, updates) =>
    set(
      produce((state: EditorState) => {
        state.past.push(state.present)
        state.present.objects = state.present.objects.map((obj) =>
          obj.id === id ? { ...obj, ...updates } : obj
        )
        state.future = []
        if (state.selectedObject?.id === id) {
          state.selectedObject = { ...state.selectedObject, ...updates }
        }
      })
    ),
  setSelectedObject: (object) => set({ selectedObject: object }),
  undo: () =>
    set(
      produce((state: EditorState) => {
        if (state.past.length > 0) {
          const newPresent = state.past.pop()!
          state.future.unshift(state.present)
          state.present = newPresent
        }
      })
    ),
  redo: () =>
    set(
      produce((state: EditorState) => {
        if (state.future.length > 0) {
          const newPresent = state.future.shift()!
          state.past.push(state.present)
          state.present = newPresent
        }
      })
    ),
  saveScene: (name) =>
    set(
      produce((state: EditorState) => {
        state.present.name = name
        localStorage.setItem(`scene_${name}`, JSON.stringify(state.present))
      })
    ),
  loadScene: (scene) =>
    set(
      produce((state: EditorState) => {
        state.past.push(state.present)
        state.present = scene
        state.future = []
      })
    ),
}))

