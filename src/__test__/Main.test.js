import React from 'react'
import { render } from '@testing-library/react'
import Main from '../Main'

it('The Component should render without crashing', () => {
  const { queryByTestId } = render(<Main />)
  expect(queryByTestId('main-mount')).toBeTruthy()
})
