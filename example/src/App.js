import React from 'react'

import { FormBuilder } from 'databeaver-form-builder'
import 'databeaver-form-builder/dist/styles/style.css'

const App = (props) => {
  const onSaveForm = (data) => {
    console.log(data)
    return data
  }
  return (
    <FormBuilder
      uploadAddress={
        'https://api-databeaverv3-agent-staging.bluegreensoft.com/v3/files/noauth'
      }
      {...props}
      onSave={onSaveForm}
    />
  )
}

export default App
