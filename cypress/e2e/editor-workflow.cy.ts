describe('Editor Workflow', () => {
  it('should create a simple scene', () => {
    cy.visit('/')

    // Add a cube
    cy.get('button').contains('Add Cube').click()

    // Add a sphere
    cy.get('button').contains('Add Sphere').click()

    // Select the cube
    cy.get('canvas').click(400, 300) // Adjust coordinates as needed

    // Move the cube
    cy.get('input[name="positionX"]').clear().type('2')
    cy.get('input[name="positionY"]').clear().type('0')
    cy.get('input[name="positionZ"]').clear().type('0')

    // Select the sphere
    cy.get('canvas').click(600, 300) // Adjust coordinates as needed

    // Move the sphere
    cy.get('input[name="positionX"]').clear().type('-2')
    cy.get('input[name="positionY"]').clear().type('0')
    cy.get('input[name="positionZ"]').clear().type('0')

    // Verify that the scene contains two objects
    // This might require custom commands or more advanced techniques

    // Verify that the objects are in the correct positions
    // This might require custom commands or more advanced techniques
  })
})

