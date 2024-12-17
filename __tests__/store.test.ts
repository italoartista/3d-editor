import { useStore } from '../store'

describe('Store', () => {
  beforeEach(() => {
    useStore.getState().reset()
  })

  test('should add an object', () => {
    const { addObject, objects } = useStore.getState()
    addObject({ type: 'cube' })
    expect(objects.length).toBe(1)
    expect(objects[0].type).toBe('cube')
  })

  test('should remove an object', () => {
    const { addObject, removeObject, objects } = useStore.getState()
    addObject({ type: 'cube' })
    const id = objects[0].id
    removeObject(id)
    expect(objects.length).toBe(0)
  })

  test('should update an object', () => {
    const { addObject, updateObject, objects } = useStore.getState()
    addObject({ type: 'cube' })
    const id = objects[0].id
    updateObject(id, { position: [1, 1, 1] })
    expect(objects[0].position).toEqual([1, 1, 1])
  })

  test('should set selected object', () => {
    const { addObject, setSelectedObject, selectedObject } = useStore.getState()
    addObject({ type: 'cube' })
    const obj = useStore.getState().objects[0]
    setSelectedObject(obj)
    expect(selectedObject).toEqual(obj)
  })
})

