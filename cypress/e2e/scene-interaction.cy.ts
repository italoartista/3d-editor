describe('Scene Interaction', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should add a cube to the scene', () => {
    cy.get('button').contains('Add Cube').click()
    // Verify that a cube has been added to the scene
    // This might require custom commands or more advanced techniques
  })

  it('should select an object when clicked', () => {
    cy.get('button').contains('Add Cube').click()
    cy.get('canvas').click(400, 300) // Adjust coordinates as needed
    // Verify that the object is selected
    // This might require checking if the TransformControls are visible
  })

  it('should update object properties', () => {
    cy.get('button').contains('Add Cube').click()
    cy.get('canvas').click(400, 300) // Select the cube
    cy.get('input[name="positionX"]').clear().type('1')
    cy.get('input[name="positionY"]').clear().type('1')
    cy.get('input[name="positionZ"]').clear().type('1')
    // Verify that the object's position has been updated
    // This might require custom commands or more advanced techniques
  })
})

