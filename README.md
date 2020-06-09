# databeaver-form-builder

> A web SDK for building form generating applications in a fly.

[![NPM](https://img.shields.io/npm/v/databeaver-form-builder.svg)](https://www.npmjs.com/package/databeaver-form-builder) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save databeaver-form-builder
```

## Usage

```jsx
import React from 'react'

import { FormBuilder } from 'databeaver-form-builder'
import 'databeaver-form-builder/dist/styles/style.css'

const App = (props) => {
  const onSaveForm = (data) => {
    console.log(data)

    return data
  }
  return (
    <FormBuilder uploadAddress={'upload-url'} {...props} onSave={onSaveForm} />
  )
}

export default App
```

## Styling with UI-kit

Paste the following lines on your index.html file

```bash
  <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/uikit@3.5.3/dist/css/uikit.min.css"
    />


     <!-- UIkit JS -->
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.5.3/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.5.3/dist/js/uikit-icons.min.js"></script>
```

## License

<!-- MIT © [w3bh4ck](https://github.com/w3bh4ck) -->
