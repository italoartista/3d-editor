import { cn } from "./utils"

describe("cn function", () => {
  it("combines class names", () => {
    expect(cn("class1", "class2")).toBe("class1 class2")
  })

  it("handles conditional class names", () => {
    expect(cn("class1", false && "class2", "class3")).toBe("class1 class3")
  })

  it("merges Tailwind classes correctly", () => {
    expect(cn("p-4", "p-2")).toBe("p-2")
  })
})