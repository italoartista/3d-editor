import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useStore, ObjectType } from "../store"

export function Sidebar() {
  const { addObject, selectedObject, updateObject, undo, redo, saveScene, present } = useStore()

  const handleAddObject = (type: ObjectType) => () => addObject({ type })

  const handleDelete = () => {
    if (selectedObject) {
      useStore.getState().removeObject(selectedObject.id)
    }
  }

  const handleUpdateObject = (property: string, value: any) => {
    if (selectedObject) {
      updateObject(selectedObject.id, { [property]: value })
    }
  }

  const handleSaveScene = () => {
    const name = prompt("Enter a name for your scene:", present.name)
    if (name) {
      saveScene(name)
    }
  }

  return (
    <div className="absolute top-0 right-0 w-64 h-full bg-white p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">3D Editor</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={handleAddObject("cube")}>Add Cube</Button>
          <Button onClick={handleAddObject("sphere")}>Add Sphere</Button>
          <Button onClick={handleAddObject("cylinder")}>Add Cylinder</Button>
          <Button onClick={handleAddObject("cone")}>Add Cone</Button>
        </div>
        <div className="flex space-x-2">
          <Button onClick={undo}>Undo</Button>
          <Button onClick={redo}>Redo</Button>
        </div>
        <Button onClick={handleSaveScene}>Save Scene</Button>
        {selectedObject && (
          <>
            <Button onClick={handleDelete}>Delete</Button>
            {["position", "rotation", "scale"].map((prop) => (
              <div key={prop} className="space-y-2">
                <Label className="text-lg font-semibold">{prop.charAt(0).toUpperCase() + prop.slice(1)}</Label>
                {["x", "y", "z"].map((axis, index) => (
                  <div key={axis} className="flex items-center space-x-2">
                    <Label>{axis.toUpperCase()}</Label>
                    <Input
                      type="number"
                      value={selectedObject[prop][index]}
                      onChange={(e) => handleUpdateObject(prop, [
                        ...selectedObject[prop].slice(0, index),
                        parseFloat(e.target.value),
                        ...selectedObject[prop].slice(index + 1)
                      ])}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            ))}
            <div className="space-y-2">
              <Label className="text-lg font-semibold">Material</Label>
              <div className="flex items-center space-x-2">
                <Label>Color</Label>
                <Input
                  type="color"
                  value={selectedObject.material.color}
                  onChange={(e) => handleUpdateObject("material", { ...selectedObject.material, color: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="space-y-1">
                <Label>Metalness</Label>
                <Slider
                  value={[selectedObject.material.metalness]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={([value]) => handleUpdateObject("material", { ...selectedObject.material, metalness: value })}
                />
              </div>
              <div className="space-y-1">
                <Label>Roughness</Label>
                <Slider
                  value={[selectedObject.material.roughness]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={([value]) => handleUpdateObject("material", { ...selectedObject.material, roughness: value })}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

