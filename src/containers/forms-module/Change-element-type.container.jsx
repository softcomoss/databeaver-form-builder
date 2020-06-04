import React from 'react'
import { connect } from 'react-redux'
import { replaceElement } from '../../redux/actions/form-action/replaceElementActions'
// import ModalCloseButton from "../../components/modal-components/Close-button.component";

const ChangeElementType = ({
  replaceElement,
  elementType,
  index,
  activePage,
  closeModal
}) => {
  return (
    <React.Fragment>
      {/* <ModalCloseButton /> */}
      <h2 className='uk-modal-title'> Select new element type</h2>
      <div className='uk-modal-body mb-2'>
        <label htmlFor className='inp-select mt-2'>
          <span className='label'></span>
          <select
            onChange={(e) => {
              replaceElement(e.target.value, index, activePage)
              closeModal()
            }}
          >
            <option value=''>Select type</option>
            <option value='shortText'>Short Text</option>
            <option value='multiLine'>Long Text</option>
            <option value='email'>Email</option>
            <option value='date'>Date</option>
            <option value='time'>Time</option>
            <option value='address'>Address</option>
            <option value='rating'>Rating</option>
            <option value='phoneNumber'>Phone Number</option>
            <option value='number'>Number</option>
            <option value='multiChoice'>Multi Choice</option>
            <option value='imageCapture'>Image Capture</option>
            <option value='singleChoice'>Single Choice</option>
            <option value='locationMap'>Location Map</option>
            <option value='areaMap'>Area Map</option>
            <option value='fileUpload'>File Upload</option>
            <option value='links'>Link</option>
            <option value='biometric'>Biometric</option>
            <option value='agreement'>Agreement</option>
            <option value='defaultText'>Default Text</option>
          </select>
        </label>
      </div>
      <div className='uk-modal-footer uk-text-left'></div>
    </React.Fragment>
  )
}

export default connect(null, { replaceElement })(ChangeElementType)
