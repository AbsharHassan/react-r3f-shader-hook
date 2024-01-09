import React from 'react'
import DummyShaderComponent from '../../src/helpers/DummyShaderComponent'

describe('Implementation of use-shader-pass hook in a component', () => {
  it('updating the provided uniform should update it in the material as well', () => {
    cy.mount(<DummyShaderComponent />)

    cy.wait(1000)

    cy.get('[data-cy="material"]')
      .invoke('attr', 'data-material-value')
      .then((stateString) => {
        const state = JSON.parse(stateString as string)
        expect(state.uniforms.uTest).to.have.property('value', true)
      })
  })

  it('resizing the browser leads to uResolution being updated', () => {
    cy.viewport(1200, 900)

    cy.mount(<DummyShaderComponent />)

    cy.wait(1000)

    cy.get('[data-cy="material"]')
      .invoke('attr', 'data-material-value')
      .then((stateString) => {
        const state = JSON.parse(stateString as string)
        cy.wrap(state.uniforms.uResolution.value).should(
          'deep.equal',
          [1200, 900]
        )
      })

    cy.viewport(800, 600)

    cy.wait(1000)

    cy.get('[data-cy="material"]')
      .invoke('attr', 'data-material-value')
      .then((stateString) => {
        const state = JSON.parse(stateString as string)
        cy.wrap(state.uniforms.uResolution.value).should(
          'deep.equal',
          [800, 600]
        )
      })
  })
})
