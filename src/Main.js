import React from 'react'
import Builder from './page/builder/Form-builder.page'
import { Provider } from 'react-redux'
import store from './redux/store/Store'

const Main = ({ uploadAddress, onSave }) => {
  return (
    <div data-testid='main-mount'>
      <Provider store={store}>
        <Builder onSave={onSave} uploadAddress={uploadAddress} />
      </Provider>
    </div>
  )
}

export default Main
