import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import BuilderControlButtonContainer from '../Builder-control-button.container'
import store from '../../../redux/store/Store'

const ControlComponent = () => (
  <Provider store={store}>
    <BuilderControlButtonContainer />
  </Provider>
)

it('Control buttons should be rendered should render without crashing', () => {
  const { queryByTestId } = render(<ControlComponent />)
  expect(queryByTestId('control-buttons')).toBeTruthy()
})

describe('Check search input value', () => {
  it('should search control buttons on-change', () => {
    const { queryByPlaceholderText } = render(<ControlComponent />)
    const componentSearch = queryByPlaceholderText('Search')
    fireEvent.change(componentSearch, { target: { value: 'anything' } })
    expect(componentSearch.value).toBe('anything')
  })
})
