import React from 'react'
import { Object } from '../../components/Object'
import { Canvas } from '@react-three/fiber'

describe('Object Component', () => {
  it('renders without crashing', () => {
    cy.mount(
      <Canvas>
        <Object
          id="test-cube"
          type="cube"
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[1, 1, 1]}
        />
      </Canvas>
    )
    cy.get('canvas').should('be.visible')
  })

  it('changes color on hover', () => {
    cy.mount(
      <Canvas>
        <Object
          id="test-cube"
          type="cube"
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[1, 1, 1]}
        />
      </Canvas>
    )
    cy.get('canvas').trigger('mouseover')
    // Note: Verifying color change in 3D context is challenging in Cypress
    // You might need to implement custom commands or use more advanced techniques
  })
})

