import { render, screen, fireEvent } from "@testing-library/react"
import { Object } from "./Object"
import { useStore } from "../store"

jest.mock("../store", () => ({
  useStore: jest.fn()
}))

const mockSetSelectedObject = jest.fn()

beforeEach(() => {
  (useStore as jest.Mock).mockReturnValue({
    setSelectedObject: mockSetSelectedObject,
    selectedObject: null
  })
})

describe("Object Component", () => {
  it("renders a cube", () => {
    render(<Object id="1" type="cube" position={[0, 0, 0]} rotation={[0, 0, 0]} />)
    expect(screen.getByRole("mesh")).toBeInTheDocument()
  })

  it("renders a sphere", () => {
    render(<Object id="2" type="sphere" position={[0, 0, 0]} rotation={[0, 0, 0]} />)
    expect(screen.getByRole("mesh")).toBeInTheDocument()
  })

  it("calls setSelectedObject on click", () => {
    render(<Object id="3" type="cube" position={[0, 0, 0]} rotation={[0, 0, 0]} />)
    fireEvent.click(screen.getByRole("mesh"))
    expect(mockSetSelectedObject).toHaveBeenCalledWith({
      id: "3",
      type: "cube",
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    })
  })
})