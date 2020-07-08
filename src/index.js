import React from 'react'
import Main from './Main'

export const FormBuilder = ({ uploadAddress, onSave }) => {
  return (
    <div>
      <Main onSave={onSave} uploadAddress={uploadAddress} />
    </div>
  )
}
