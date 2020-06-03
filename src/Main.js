import React from 'react'
import Builder from './page/form/Form-builder.page'
import { Provider } from 'react-redux'
import store from './redux/store/Store'

const Main = () => {
  return (
    <Provider store={store}>
      <Builder />
    </Provider>
  )
}

export default Main
