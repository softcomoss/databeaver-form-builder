import React from 'react'
import Builder from './page/builder/Form-builder.page'
import { Provider } from 'react-redux'
import store from './redux/store/Store'

const Main = ({ uploadAddress, onSave }) => {
  return (
    <Provider store={store}>
      <Builder onSave={onSave} uploadAddress={uploadAddress} />
    </Provider>
  )
}

export default Main
