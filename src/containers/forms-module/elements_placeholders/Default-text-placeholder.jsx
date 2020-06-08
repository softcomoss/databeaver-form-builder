import React, { useState } from 'react'
import { connect } from 'react-redux'
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
  editPlaceholder,
  duplicateElement
} from '../../../redux/actions/form-action/formPropertyActions'
import { nameShortner } from '../../../utils/card-name-shortener.utils'
import ShortTextIcon from '../../../icons/Short-text.icons'

const DefaultText = (props) => {
  const [settingsDisplay, toggleSettings] = useState(false)
  const {
    elementDetails,
    deleteElement,

    setActiveElement,
    activeElement,
    index,
    editElementLabel,
    formData,
    activePage,

    toggleBooleanState,

    duplicateElement
  } = props

  let elementLabel = ''
  let elementHint = ''
  let elementIsMandatory = false
  let elementEnabled = true
  let maxChars = null
  let minChars = null
  let placeholder = ''
  if (formData.length > 0) {
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
            placeholder = element.placeholder
          }
        })
      }
    })
  }

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
              <ShortTextIcon />
              <input
                onChange={(e) => {
                  editElementLabel(e.target.value)
                }}
                value={elementDetails.label}
                className='question'
                type='text'
                placeholder='Enter a default text...'
              />
            </div>
            <div className='action-btn-wrapper d-flx-alc'>
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
                        elementType={'defaultText'}
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
        <div className='preview-container'>
          <div className='width-100-pc d-flx prev-question'>
            <span className='index-no'></span>
            <div className='width-100-pc formbuilder-prev-inpts'>
              <label htmlFor='text' className='fb-input'>
                <span
                  className='label uk-text-truncate'
                  data-uk-tooltip={`title: ${elementDetails.label}; pos: bottom-left`}
                >
                  {elementDetails.isMandatory && (
                    <span className='required'>*</span>
                  )}
                  {nameShortner(elementDetails.label, 30)}{' '}
                </span>
                {/* <input readOnly type="text" id="text" placeholder={elementDetails.placeholder} /> */}
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
  addElement,
  setActiveElement,
  editElementLabel,
  addElementHint,
  toggleBooleanState,
  addMinimumCharacters,
  addMaximumCharacters,
  editPlaceholder,
  duplicateElement
})(DefaultText)
