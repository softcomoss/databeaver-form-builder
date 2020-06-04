import React, { useState } from 'react'
import { connect } from 'react-redux'
import uid from 'uid'
import {
  deleteElement,
  setActiveElement
} from '../../../redux/actions/form-action/form.actions'
import { addElement } from '../../../redux/actions/form-action/formControlActions'
import { showModal, closeModal } from '../../../utils/modal-control.utils'
import ChangeElementType from '../Change-element-type.container'
import {
  editElementLabel,
  addElementHint,
  toggleBooleanState,
  addMaximumCharacters,
  addMinimumCharacters,
  duplicateElement
} from '../../../redux/actions/form-action/formPropertyActions'
import { numbersOnly } from '../../../utils/numbers-only.utils'
import { nameShortner } from '../../../utils/card-name-shortener.utils'
import FileUploadIcon from '../../../icons/File-upload.icons'

const FileUpload = (props) => {
  const [settingsDisplay, toggleSettings] = useState(false)
  const {
    elementDetails,
    deleteElement,
    addElement,
    setActiveElement,
    activeElement,
    index,
    editElementLabel,
    formData,
    activePage,
    addElementHint,
    toggleBooleanState,
    addMaximumCharacters,
    addMinimumCharacters,
    duplicateElement,
    serialNumber
  } = props

  let elementLabel = ''
  let elementHint = ''
  let elementIsMandatory = false
  let elementEnabled = true
  let maxChars = null
  let minChars = null
  formData.map((page, i) => {
    if (page.label === activePage) {
      page.elements.map((element, i) => {
        if (element.unique_id === activeElement) {
          elementLabel = element.label
          elementHint = element.hint
          elementIsMandatory = element.isMandatory
          elementEnabled = element.enabled
          maxChars = element.maxLength
          minChars = element.minChars
        }
      })
    }
  })

  const onCloseModal = () => {
    closeModal(`#change-type-${elementDetails.unique_id}`)
  }

  const changeMaxSize = (value) => {
    let reg = /^[0-9]+$/
    if (
      (value.match(reg) && parseInt(value.split('')[0]) !== 0) ||
      value.length < 1
    ) {
      addMaximumCharacters(value)
    }
  }

  return (
    <React.Fragment>
      <div
        onClick={() => {
          setActiveElement(elementDetails.unique_id)
        }}
        className='d-flx-alc-fw form-components'
      >
        <div
          className={
            activeElement === elementDetails.unique_id
              ? 'form-input is-active'
              : 'form-input'
          }
        >
          <div className='d-flx-alc-jsb width-100-pc px-2'>
            <div className='d-flx-alc-fw py-2 width-100-pc uk-animation-slide-left'>
              <FileUploadIcon />
              <input
                onChange={(e) => {
                  editElementLabel(e.target.value)
                }}
                value={elementDetails.label}
                className='question'
                type='text'
                placeholder='Type Question Here...'
              />
            </div>
            <div className='action-btn-wrapper d-flx-alc'>
              <button
                onClick={(e) => {
                  toggleBooleanState(
                    !elementDetails.isMandatory,
                    'isMandatory',
                    elementDetails.unique_id
                  )
                }}
                className='d-flx-alc-jc required-btn'
                data-uk-tooltip='title: Click to make the question compulsory; delay: 100; pos: bottom-center'
                title
                aria-expanded='false'
              >
                <span
                  style={{
                    color:
                      elementIsMandatory &&
                      elementDetails.unique_id === activeElement
                        ? '#0081c2'
                        : '#666',
                    fontSize: '34px',
                    paddingTop: '14px'
                  }}
                >
                  *
                </span>
              </button>
              <span
                onClick={() => {
                  toggleSettings(!settingsDisplay)
                }}
                style={{ cursor: 'pointer', paddingRight: '10px' }}
                data-uk-icon='icon: cog'
              ></span>
              <div className='uk-inline'>
                <span
                  aria-expanded='false'
                  style={{ cursor: 'pointer' }}
                  data-uk-icon='icon: more-vertical'
                ></span>
                <div
                  uk-dropdown='mode: click'
                  className='drop-wrapper px-1h uk-dropdown'
                >
                  <ul className='drop-lists none my-0'>
                    <li className='drop-list-item'>
                      <button
                        type='button'
                        onClick={() =>
                          duplicateElement(elementDetails, index, activePage)
                        }
                      >
                        Duplicate
                      </button>
                    </li>
                    <li className='drop-list-item'>
                      <button
                        type='button'
                        onClick={() =>
                          showModal(`#change-type-${elementDetails.unique_id}`)
                        }
                      >
                        Change type
                      </button>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          deleteElement(
                            elementDetails.unique_id,
                            elementDetails.pos
                          )
                        }}
                        className='co-warning drop-del'
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                  <div
                    id={`change-type-${elementDetails.unique_id}`}
                    data-uk-modal
                    className='uk-modal'
                  >
                    <div className='uk-modal-dialog uk-margin-auto-vertical border-radius'>
                      <ChangeElementType
                        closeModal={onCloseModal}
                        elementType={'fileUpload'}
                        index={index}
                        activePage={activePage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              settingsDisplay
                ? 'input-dtls border-top py-2 uk-animation-slide-bottom-medium active'
                : 'input-dtls uk-animation-slide-bottom-medium border-top py-2'
            }
          >
            <div className='flex-width-1-2 px-2'>
              <div className='input-wrapper'>
                <label htmlFor='max-char-num' className='form-inputs'>
                  <input
                    onChange={(e) => {
                      if (
                        numbersOnly(e.target.value) ||
                        e.target.value === ''
                      ) {
                        changeMaxSize(e.target.value)
                      }
                    }}
                    type='tel'
                    id='max-char-num'
                    placeholder=' '
                    value={
                      isNaN(elementDetails.maxLength)
                        ? ''
                        : elementDetails.maxLength
                    }
                  />
                  <span className='label d-flx-alc'>Max Size(KB)</span>
                </label>
              </div>
            </div>
            <div className='flex-width-1-2 py-3 px-2'>
              <div className='d-flx-alc-jsb '>
                <label className='input-check'>
                  <input
                    className='uk-checkbox'
                    type='checkbox'
                    onClick={(e) => {
                      toggleBooleanState(
                        e.target.checked,
                        'isMandatory',
                        elementDetails.unique_id
                      )
                    }}
                    checked={elementDetails.isMandatory}
                  />
                  <span>Required</span>
                </label>
                <label className='input-check'>
                  <input
                    className='uk-checkbox'
                    type='checkbox'
                    onClick={(e) => {
                      toggleBooleanState(
                        e.target.checked,
                        'enabled',
                        elementDetails.unique_id
                      )
                    }}
                    checked={elementDetails.enabled}
                  />
                  <span>Enabled</span>
                </label>
                <label className='input-check'>
                  <input
                    className='uk-checkbox'
                    type='checkbox'
                    onClick={(e) => {
                      toggleBooleanState(
                        e.target.checked,
                        'hidden',
                        elementDetails.unique_id
                      )
                    }}
                    checked={elementDetails.hidden}
                  />
                  <span>Hidden</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='preview-container'>
          <div className='width-100-pc d-flx prev-question'>
            <div className='width-100-pc formbuilder-prev-inpts'>
              <span className='index-no'>{serialNumber + 1}.</span>
              <div className='mb-2-nlc-noc-child formbuilder-prev-inpts'>
                <span
                  className='label uk-text-truncate'
                  data-uk-tooltip={`title: ${elementDetails.label}; pos: bottom-left`}
                >
                  {elementDetails.isMandatory && (
                    <span className='required'>*</span>
                  )}
                  {nameShortner(elementDetails.label, 30)}.{' '}
                </span>
                <label
                  htmlFor={`${elementDetails.unique_id}`}
                  className='upload'
                >
                  <input
                    disabled
                    type='file'
                    id={`${elementDetails.unique_id}`}
                  />
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#clip' />
                  </svg>
                  <span>Upload file(videos, pdf, .csv)</span>
                  {elementDetails.maxLength !== undefined &&
                    elementDetails.maxLength.length > 0 && (
                      <span>Not more than {elementDetails.maxLength}kb</span>
                    )}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  activeElement: state.formReducer.activeElement,
  formData: state.formReducer.formdata,
  elements: state.formReducer,
  activePage: state.formReducer.activePage,
  activeSection: state.formReducer.activeSection,
  currentView: state.formReducer.currentView,
  activeElement: state.formReducer.activeElement
})

export default connect(mapStateToProps, {
  deleteElement,
  addElement,
  setActiveElement,
  editElementLabel,
  addElementHint,
  toggleBooleanState,
  addMinimumCharacters,
  addMaximumCharacters,
  duplicateElement
})(FileUpload)
