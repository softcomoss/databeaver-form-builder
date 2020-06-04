import React from 'react'

const LongTextPreview = ({ elementDetails, index }) => {
  return (
    <React.Fragment>
      <div className='width-100-pc d-flx prev-question'>
        <span className='index-no'>{index + 1}</span>
        <div className='width-100-pc formbuilder-prev-inpts'>
          <label htmlFor='text' className='fb-input'>
            <span className='label'>
              {elementDetails.label}{' '}
              {elementDetails.isMandatory && (
                <span className='required'>*</span>
              )}
            </span>
            <textarea
              style={{ border: '1px solid #ccc' }}
              disabled
              rows='4'
              placeholder={elementDetails.placeholder}
              id='textarea'
            >
              {elementDetails.placeholder}
            </textarea>
          </label>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LongTextPreview
