import React, { useState } from 'react'
import { connect } from 'react-redux'
import uid from 'uid'
import {
  deleteElement,
  setActiveElement
} from '../../../redux/actions/form-action/form.actions'
import {
  addElement,
  addMultichoiceElement
} from '../../../redux/actions/form-action/formControlActions'
import { showModal, closeModal } from '../../../utils/modal-control.utils'
import ChangeElementType from '../Change-element-type.container'
import {
  editElementLabel,
  addElementHint,
  toggleBooleanState,
  addMaximumCharacters,
  addMinimumCharacters,
  addMultiChoiceWithPhotoOption,
  deleteMultichoiceOption,
  duplicateElement
} from '../../../redux/actions/form-action/formPropertyActions'
import FormLogic from '../Form-logic.container'
import ImageCaptureIcon from '../../../icons/Image-capture.icon'
import { nameShortner } from '../../../utils/card-name-shortener.utils'

const ImageChoice = (props) => {
  const [settingsDisplay, toggleSettings] = useState(false)
  const [optionLabel, setOptionLabel] = useState('')
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
    addMultiChoiceWithPhotoOption,
    deleteMultichoiceOption,
    duplicateElement,
    serialNumber
  } = props

  let elementLabel = ''
  let elementHint = ''
  let elementIsMandatory = false
  let elementEnabled = true
  let allPages = []
  let options = []
  formData.map((page, i) => {
    allPages.push(page.elements)
    if (page.label === activePage) {
      page.elements.map((element, i) => {
        if (element.unique_id === activeElement) {
          elementLabel = element.label
          elementHint = element.hint
          elementIsMandatory = element.isMandatory
          elementEnabled = element.enabled
          options = element.options
        }
      })
    }
  })

  const onCloseModal = () => {
    closeModal(`#change-type-${elementDetails.unique_id}`)
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
              <ImageCaptureIcon />
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
                uk-tooltip='title: Click to make the question compulsory; delay: 100; pos: bottom-center'
                title
                aria-expanded='false'
              >
                <svg
                  style={
                    elementDetails.isMandatory
                      ? { color: '#0081c2' }
                      : { color: '#666' }
                  }
                >
                  <use xlinkHref='/uploads/icons.svg#required' />
                </svg>
              </button>
              <button
                onClick={() => {
                  toggleSettings(!settingsDisplay)
                }}
                className='d-flx-alc-jc settings-btn'
              >
                <svg>
                  <use xlinkHref='/uploads/icons.svg#settings' />
                </svg>
              </button>
              <div className='uk-inline'>
                <button className='d-flx-alc-jc' type='button'>
                  <svg>
                    <use xlinkHref='/uploads/icons.svg#more-hor' />
                  </svg>
                </button>
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
                        elementType={'imageChoice'}
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
            <div className='flex-width-1-2 py-3 px-2'>
              <div className='d-flx-alc-jsb '>
                <label className='input-check'>
                  <input
                    onClick={(e) => {
                      toggleBooleanState(
                        e.target.checked,
                        'isMandatory',
                        elementDetails.unique_id
                      )
                    }}
                    className='uk-checkbox'
                    type='checkbox'
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
                <label className='input-check'>
                  <input
                    className='uk-checkbox'
                    type='checkbox'
                    onClick={(e) => {
                      toggleBooleanState(
                        e.target.checked,
                        'multipleUpload',
                        elementDetails.unique_id
                      )
                    }}
                    checked={elementDetails.multipleUpload}
                  />
                  <span>Multiple files</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='preview-container'>
          <div className='width-100-pc d-flx prev-question'>
            <div className='width-100-pc formbuilder-prev-inpts'>
              <span className='label mb-1 d-blk'>
                {serialNumber + 1}.{' '}
                <span
                  className='label uk-text-truncate'
                  data-uk-tooltip={`title: ${elementDetails.label}; pos: bottom-left`}
                >
                  {elementDetails.isMandatory && (
                    <span className='required'>*</span>
                  )}
                  {nameShortner(elementDetails.label, 30)}.{' '}
                </span>
              </span>
              <label htmlFor={`${elementDetails.unique_id}`} className='upload'>
                <input
                  disabled
                  type='file'
                  id={`${elementDetails.unique_id}`}
                />
                <svg>
                  <use xlinkHref='/uploads/icons.svg#clip' />
                </svg>
                <span>Capture image(jpg, png)</span>
                <span>Not more than 18mb</span>
              </label>
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
  addMultichoiceElement,
  setActiveElement,
  editElementLabel,
  addElementHint,
  toggleBooleanState,
  addMinimumCharacters,
  addMaximumCharacters,
  addMultiChoiceWithPhotoOption,
  deleteMultichoiceOption,
  duplicateElement
})(ImageChoice)
