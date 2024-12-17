import { Button } from "@/components/ui/button"
import { useStore } from "../store"

export function Toolbar() {
  const { addObject, selectedObject, setSelectedObject, updateObject } = useStore()

  const handleAddCube = () => addObject({ type: "cube" })
  const handleAddSphere = () => addObject({ type: "sphere" })

  const handleDelete = () => {
    if (selectedObject) {
      setSelectedObject(null)
      useStore.getState().removeObject(selectedObject.id)
    }
  }

  return (
    <div className="absolute top-0 left-0 p-4 space-y-2">
      <Button onClick={handleAddCube}>Add Cube</Button>
      <Button onClick={handleAddSphere}>Add Sphere</Button>
      {selectedObject && (
        <>
          <Button onClick={handleDelete}>Delete</Button>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Position X</label>
            <input
              type="number"
              value={selectedObject.position[0]}
              onChange={(e) =>
                updateObject(selectedObject.id, {
                  position: [parseFloat(e.target.value), selectedObject.position[1], selectedObject.position[2]],
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          {/* Add similar inputs for Y and Z positions, and rotations */}
        </>
      )}
    </div>
  )
}

