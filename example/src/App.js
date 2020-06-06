import React from 'react'

import { FormBuilder } from 'databeaver-form-builder'
import 'databeaver-form-builder/dist/styles/uikit.css'
import 'databeaver-form-builder/dist/styles/device.css'
import 'databeaver-form-builder/dist/styles/style.css'
import 'databeaver-form-builder/dist/styles/custom.css'
// import { UIkit } from 'uikit'

const App = (props) => {
  return (
    <FormBuilder
      uploadAddress={
        'https://api-databeaverv3-agent-staging.bluegreensoft.com/v3/files/noauth'
      }
      {...props}
    />
  )
}

export default App
