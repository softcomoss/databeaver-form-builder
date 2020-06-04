import React from 'react'

const Biometric = ({ elementDetails, index }) => {
  return (
    <React.Fragment>
      <div className='width-100-pc d-flx prev-question'>
        <span className='index-no'>{index + 1}</span>
        <div className='mb-2-nlc-noc-child formbuilder-prev-inpts'>
          <span className='label d-blk'>
            {elementDetails.label}{' '}
            {elementDetails.isMandatory && <span className='required'>*</span>}
          </span>
          <label htmlFor='uploadcam' className='upload'>
            <svg>
              <use xlinkHref='/uploads/icons.svg#biometric' />
            </svg>
          </label>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Biometric
