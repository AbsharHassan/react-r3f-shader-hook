import React from 'react'
import DummyShaderComponent from '../helpers/DummyShaderComponent'

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
})
