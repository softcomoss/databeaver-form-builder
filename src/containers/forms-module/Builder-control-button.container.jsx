import React, { useState, useEffect } from 'react'
// import uid from "uid";
// import "./FormBuilderControlButtons.css";
// import { connect } from "react-redux";
// import {
// 	addElement,
// 	addRatingElement,
// 	addMultichoiceElement,
// 	addMultichoiceWithPhoto,
// 	addHybridGeolocation,
// 	addEmbeddedPhoto,
// 	AddSinglePhoto,
// 	AddMultiPhoto,
// 	addNumberElement,
// 	addFileUploadElement,
// 	addAddressElement,
// } from "../../redux/actions/form-action/formControlActions";
import { displayControls } from '../../utils/form-controls.utils'

const FormBuilderControlButtons = (props) => {
  const [openDrawer, toggleDrawer] = useState(false)
  const [mouseVerticalLocation, setMouseVerticalLocation] = useState(0)
  const [query, setQuery] = useState('')
  const [controlList, setControlList] = useState([])

  const {
    addElement,
    addRatingElement,
    addNumberElement,
    addMultichoiceElement,
    addMultichoiceWithPhoto,
    addHybridGeolocation,
    addEmbeddedPhoto,
    AddSinglePhoto,
    AddMultiPhoto,
    addAddressElement,
    addFileUploadElement
  } = props
  let id = uid(7)

  useEffect(() => {
    setControlList(displayControls(query))
  }, [query])

  return (
    <>
      <section
        onMouseMove={(e) => {
          setMouseVerticalLocation(e.screenY)
        }}
        class={
          openDrawer
            ? 'add-form-fields-wrapper expand'
            : 'add-form-fields-wrapper'
        }
      >
        <button
          onClick={() => {
            toggleDrawer(!openDrawer)
          }}
          className={
            openDrawer
              ? 'add-form-fields-drawer toggler'
              : 'add-form-fields-drawer toggler open-drawer'
          }
        >
          <svg>
            <use xlinkHref='/uploads/icons.svg#left-drop' />
          </svg>
        </button>
        <div className='add-form-fields-inner-wrapper'>
          <div className='search-form-fields'>
            <button
              onClick={() => {
                toggleDrawer(!openDrawer)
              }}
              className='search-btn toggler'
            >
              <svg>
                <use href='/uploads/icons.svg#search' />
              </svg>
            </button>
            <label className='search'>
              <svg>
                <use href='/uploads/icons.svg#search' />
              </svg>
              <input
                onChange={(e) => setQuery(e.target.value)}
                type='search'
                placeholder='Search'
              />
            </label>
          </div>
          <div className='add-form-fields-list'>
            {controlList.includes('short text') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addElement(
                      'shortText',
                      uid(7),
                      'Short Text',
                      'Short Text',
                      'text'
                    )
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#short-text' />
                  </svg>
                  <span className='btn-title'>Short text</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 200}px`,
                    left: '60px'
                  }}
                >
                  <h4>Short text</h4>
                  <p>
                    Good for short answers like names and what you had for
                    breakfast.
                  </p>
                </div>
              </div>
            )}
            {controlList.includes('long text') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addElement(
                      'multiLine',
                      uid(7),
                      'Long Text',
                      'Single Line',
                      'textArea'
                    )
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#long-text' />
                  </svg>
                  <span className='btn-title'>Long text</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 200}px`,
                    left: '60px'
                  }}
                >
                  <h4>Long text</h4>
                  <p>
                    Good for longer answers that might require multiple lines of
                    text like Addresses and a short description about yourself.
                  </p>
                </div>
              </div>
            )}
            {controlList.includes('email') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addElement('email', uid(7), 'Email', 'Email', 'email')
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#email' />
                  </svg>
                  <span className='btn-title'>Email</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 200}px`,
                    left: '60px'
                  }}
                >
                  <h4>Email</h4>
                  <p>Good for capturing email addresses</p>
                </div>
              </div>
            )}
            {controlList.includes('date') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addElement('date', uid(7), 'Date', 'date', 'date')
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#date' />
                  </svg>
                  <span className='btn-title'>Date</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 200}px`,
                    left: '60px'
                  }}
                >
                  <h4>Date</h4>
                  <p>
                    Good for dates like date of birth and date of employment in
                    this format (dd/mm/yyyy)
                  </p>
                </div>
              </div>
            )}
            {controlList.includes('time') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addElement('time', uid(7), ' Time', 'time', 'time')
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#time' />
                  </svg>
                  <span className='btn-title'>Time</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 200}px`,
                    left: '60px'
                  }}
                >
                  <h4>time</h4>
                  <p>
                    Good for timely answers like meeting time and event time in
                    Hours, minutes &amp; seconds
                  </p>
                </div>
              </div>
            )}
            {controlList.includes('address') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addAddressElement(
                      'address',
                      uid(7),
                      ' address',
                      'address',
                      'address'
                    )
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#address' />
                  </svg>
                  <span className='btn-title'>Address</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 200}px`,
                    left: '60px'
                  }}
                >
                  <h4>address</h4>
                  <p>Good for collecting address of a location</p>
                </div>
              </div>
            )}
            {controlList.includes('ratings') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addRatingElement(
                      'rating',
                      uid(7),
                      'Rating',
                      'Rating',
                      'rating'
                    )
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#ratings' />
                  </svg>
                  <span className='btn-title'>Ratings</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 200}px`,
                    left: '60px'
                  }}
                >
                  <h4>Ratings</h4>
                  <p>
                    Good for feedback on performance or services like how well
                    the customer service was and how good a road is.
                  </p>
                </div>
              </div>
            )}
            {controlList.includes('phone number') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addElement(
                      'phoneNumber',
                      uid(7),
                      'phoneNumber',
                      'phoneNumber',
                      'phone'
                    )
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#phone' />
                  </svg>
                  <span className='btn-title'>Phone number</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 200}px`,
                    left: '60px'
                  }}
                >
                  <h4>Phone number</h4>
                  <p>
                    Good for phone number answers of any kind in the format
                    country code followed by the actual number
                  </p>
                </div>
              </div>
            )}
            {controlList.includes('number') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addNumberElement(
                      'numbers',
                      uid(7),
                      'Numbers',
                      'number',
                      'number'
                    )
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#number' />
                  </svg>
                  <span className='btn-title'>Number</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 200}px`,
                    left: '60px'
                  }}
                >
                  <h4>Number</h4>
                  <p>
                    Good for numeric answers like age, number of cars owned and
                    can be formatted to collect BVNs or account numbers.
                  </p>
                </div>
              </div>
            )}
            {controlList.includes('multiple choice') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addMultichoiceElement(
                      'multiChoice',
                      uid(7),
                      'Multi-choice',
                      'Multi Choice',
                      'checkbox'
                    )
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#multi-choice' />
                  </svg>
                  <span className='btn-title'>Multiple choice</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 200}px`,
                    left: '60px'
                  }}
                >
                  <h4>Multiple choice</h4>
                  <p>
                    Good for multiple option answers like your favorite dishes,
                    brands you like and training attended.
                  </p>
                </div>
              </div>
            )}
            {controlList.includes('image capture') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addFileUploadElement(
                      'imageCapture',
                      uid(7),
                      'Image Capture',
                      'Image Capture',
                      'image'
                    )
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#image-choice' />
                  </svg>
                  <span className='btn-title'>Image capture</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 200}px`,
                    left: '60px'
                  }}
                >
                  <h4>Image capture</h4>
                  <p>
                    Good for photograph answers like Building images, headshots
                    and event images.
                  </p>
                </div>
              </div>
            )}
            {controlList.includes('single choice') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addMultichoiceElement(
                      'singleChoice',
                      uid(7),
                      'Single Choice',
                      'Single Choice',
                      'radio'
                    )
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#single-option' />
                  </svg>
                  <span className='btn-title'>Single choice</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 200}px`,
                    left: '60px'
                  }}
                >
                  <h4>Single choice</h4>
                  <p>
                    Good for single option answers like Yes/No, Age range and
                    Gender
                  </p>
                </div>
              </div>
            )}
            {controlList.includes('location') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addElement(
                      'locationMap',
                      uid(7),
                      'Location Map',
                      'Location Map'
                    )
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#location' />
                  </svg>
                  <span className='btn-title'>Location</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 200}px`,
                    left: '60px'
                  }}
                >
                  <h4>Location</h4>
                  <p>
                    Good for location answers like countries, states and cities
                  </p>
                </div>
              </div>
            )}
            {controlList.includes('area map') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addElement('areaMap', uid(7), 'Area Map', 'Area Map')
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#area-map' />
                  </svg>
                  <span className='btn-title'>Area map</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 200}px`,
                    left: '60px'
                  }}
                >
                  <h4>Area map</h4>
                  <p>
                    Good for capturing how big a location or an area is like
                    farm and petrol station size
                  </p>
                </div>
              </div>
            )}
            {controlList.includes('file upload') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addFileUploadElement(
                      'fileUpload',
                      uid(7),
                      'File Upload',
                      'File Upload',
                      'file'
                    )
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#file-upload' />
                  </svg>
                  <span className='btn-title'>File upload</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 200}px`,
                    left: '60px'
                  }}
                >
                  <h4>File upload</h4>
                  <p>Good for attachments like pdf, word, excel and videos</p>
                </div>
              </div>
            )}
            {controlList.includes('link') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() => addElement('links', uid(7), 'Links', 'Links')}
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#links' />
                  </svg>
                  <span className='btn-title'>Link</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 200}px`,
                    left: '60px'
                  }}
                >
                  <h4>Links</h4>
                  <p>Good for URLs like websites and LinkedIn profiles</p>
                </div>
              </div>
            )}
            {controlList.includes('biometric') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addElement(
                      'biometric',
                      uid(7),
                      'Biometric Capture',
                      'Biometric'
                    )
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#biometric' />
                  </svg>
                  <span className='btn-title'>biometric</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 150}px`,
                    left: '60px'
                  }}
                >
                  <h4>biometric</h4>
                  <p>
                    Good for fingerprint capture for verification and enrollment
                  </p>
                </div>
              </div>
            )}
            {controlList.includes('agreement') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addElement(
                      'agreement',
                      uid(7),
                      'Agreement',
                      'Agreement',
                      'file'
                    )
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#agreement' />
                  </svg>
                  <span className='btn-title'>Agreement</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 150}px`,
                    left: '60px'
                  }}
                >
                  <h4>Agreement</h4>
                  <p>
                    Good for ensuring acceptance from users such agreeing to
                    give out certain information and it’s usage by the users.
                  </p>
                </div>
              </div>
            )}
            {controlList.includes('default text') && (
              <div className='add-form-fields-item mt-1h'>
                <button
                  onClick={() =>
                    addElement(
                      'defaultText',
                      uid(7),
                      'Default Text',
                      'Default Text'
                    )
                  }
                  className='fields-btn-ls'
                >
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#short-text' />
                  </svg>
                  <span className='btn-title'>Default Text</span>
                </button>
                <div
                  className='form-input-dtls'
                  style={{
                    top: `${mouseVerticalLocation - 150}px`,
                    left: '60px'
                  }}
                >
                  <h4>Default text</h4>
                  <p>Good for notes and quotes</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

// const mapStateToProps = (state) => ({
// 	type: state.addElement,
// 	id: state.addElement,
// });

// export default connect(mapStateToProps, {
// 	addElement,
// 	addRatingElement,
// 	addMultichoiceElement,
// 	addHybridGeolocation,
// 	addEmbeddedPhoto,
// 	AddSinglePhoto,
// 	AddMultiPhoto,
// 	addNumberElement,
// 	addMultichoiceWithPhoto,
// 	addFileUploadElement,
// 	addAddressElement,
// })(FormBuilderControlButtons);

export default FormBuilderControlButtons
