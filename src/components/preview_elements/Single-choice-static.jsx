import React from 'react'

const SinglechoicePreview = ({ elementDetails, index }) => {
  const { options, withPhoto } = elementDetails

  const renderOptions = () => {
    return options.map((option, i) => (
      <label key={i} className='input-check'>
        <input disabled className='uk-checkbox' type='radio' disabled />
        <span>{option.label}</span>
      </label>
    ))
  }

  const renderOptionsWithPhoto = () => {
    return options.map((option, i) => (
      <label key={i} htmlFor='check-opt2' className='input-radio'>
        <img src={option.url} alt='' />
        <input
          disabled
          type='radio'
          className='uk-radio'
          id={`${elementDetails.unique_id}i`}
          name='quest1'
        />
      </label>
    ))
  }

  return (
    <React.Fragment>
      {withPhoto === false && (
        <div className='width-100-pc d-flx prev-question'>
          <span className='index-no'>{index + 1}</span>
          <div className='mb-2-nlc-noc-child formbuilder-prev-inpts'>
            <span className='label d-blk'>
              {elementDetails.label}{' '}
              {elementDetails.isMandatory && (
                <span className='required'>*</span>
              )}
            </span>
            {renderOptions()}
            {elementDetails.other && (
              <div className='input-wrapper width-100-pc px-2'>
                <label htmlFor='min-char-num' className='form-inputs'>
                  <input
                    type='text'
                    id='min-char-num'
                    placeholder=' '
                    disabled
                  />
                  <span className='label d-flx-alc'>Other</span>
                </label>
              </div>
            )}
          </div>
        </div>
      )}

      {withPhoto === true && (
        <div className='width-100-pc d-flx prev-question'>
          <div className='formbuilder-prev-inpts'>
            <span className='label mb-1 d-blk'>
              {elementDetails.label}{' '}
              {elementDetails.isMandatory && (
                <span className='required'>*</span>
              )}
            </span>
            <div className='flex-width-1-3-wg'>{renderOptionsWithPhoto()}</div>
            {elementDetails.other && (
              <div className='input-wrapper width-100-pc px-2'>
                <label htmlFor='min-char-num' className='form-inputs'>
                  <input
                    type='text'
                    id='min-char-num'
                    placeholder=' '
                    disabled
                  />
                  <span className='label d-flx-alc'>Other</span>
                </label>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default SinglechoicePreview
