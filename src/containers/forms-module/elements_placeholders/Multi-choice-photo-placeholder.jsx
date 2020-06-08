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

import {
  editElementLabel,
  addElementHint,
  toggleBooleanState,
  addMaximumCharacters,
  addMinimumCharacters,
  addMultiChoiceOption,
  deleteMultichoiceOption,
  duplicateElement
} from '../../../redux/actions/form-action/formPropertyActions'
import FormLogic from '../Form-logic.container'

const MultiChoiceWithPhoto = (props) => {
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
    addMultiChoiceOption,
    deleteMultichoiceOption,
    duplicateElement
  } = props

  let elementLabel = ''
  let elementHint = ''
  let elementIsMandatory = false
  let elementEnabled = true
  let optionsWithPhoto = false
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
          optionsWithPhoto = element.withPhoto
          options = element.options
        }
      })
    }
  })

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
              <svg className='wh-25'>
                <use xlinkHref='/uploads/icons.svg#multi-choice' />
              </svg>
              <input
                onChange={(e) => {
                  editElementLabel(e.target.value)
                }}
                value={elementDetails.label}
                className='question'
                type='text'
                placeholder='Type Here'
              />
            </div>
            <div className='action-btn-wrapper d-flx-alc'>
              <button
                onClick={(e) => {
                  toggleBooleanState(
                    e.target.checked,
                    'isMandatory',
                    elementDetails.unique_id
                  )
                }}
                className='d-flx-alc-jc required-btn'
                data-uk-tooltip='title: Click to make the question compulsory; delay: 100; pos: bottom-center'
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
                  data-uk-dropdown='mode: click'
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
            {options !== undefined && options.length > 0
              ? options.map((option, i) => {
                  return (
                    <label key={i} className='input-check p-2'>
                      <input className='uk-checkbox' type='checkbox' />
                      <span>{option.label}</span>
                      <small
                        onClick={() => {
                          deleteMultichoiceOption(i)
                        }}
                        style={{ color: 'red' }}
                      >
                        delete option
                      </small>
                    </label>
                  )
                })
              : ''}
            <div className='flex-width-1-2 px-2 add-option'>
              <div className='input-wrapper'>
                <label htmlFor='min-char-num' className='form-inputs'>
                  <input
                    onChange={(e) => {
                      setOptionLabel(e.target.value)
                    }}
                    value={optionLabel}
                    type='text'
                    id='min-char-num'
                    placeholder=' '
                  />
                  <span className='label d-flx-alc'>Enter Value</span>
                </label>
                <label htmlFor='min-char-num' className='form-inputs'>
                  <input
                    onChange={(e) => {
                      {
                        /* console.log("image", e.target.value); */
                      }
                    }}
                    accept='image/*'
                    type='file'
                    placeholder=' '
                  />
                </label>
              </div>
            </div>
            <button
              onClick={() => {
                addMultiChoiceOption(optionLabel)
                setOptionLabel('')
              }}
              class='btn btn-fill mt-1 ml-2'
            >
              Add Option
            </button>

            <div className='flex-width-1-2 py-3 px-2'>
              <div className='d-flx-alc-jsb '>
                <label className='input-check'>
                  <input
                    onClick={(e) => {
                      toggleBooleanState(e.target.checked, 'isMandatory')
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
                    onChange={(e) => {
                      toggleBooleanState(
                        e.target.checked,
                        'enabled',
                        elementDetails.unique_id
                      )
                    }}
                    checked={elementEnabled}
                  />
                  <span>Enabled</span>
                </label>
                <label className='input-check'>
                  <input
                    className='uk-checkbox'
                    type='checkbox'
                    onChange={(e) => {
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
                    onChange={(e) => {
                      toggleBooleanState(
                        e.target.checked,
                        'validated',
                        elementDetails.unique_id
                      )
                    }}
                    checked={elementDetails.validated}
                  />
                  <span>Validated</span>
                </label>
              </div>
            </div>

            {/* form logic */}
            <FormLogic
              allPages={allPages}
              elementDetails={{ elementDetails }}
            />
          </div>
        </div>
        <div className='preview-container'>
          <div className='width-100-pc d-flx prev-question'>
            <span className='index-no'>{index + 1}</span>
            <div className='mb-2-nlc-noc-child formbuilder-prev-inpts'>
              <span className='label d-blk'>
                {elementDetails.label}.{' '}
                {elementDetails.isMandatory && (
                  <span className='required'>*</span>
                )}
              </span>
              {/* {elementDetails.options !== undefined && elementDetails.options.length > 0
								? elementDetails.options.map((option, i) => {
										return (
											<label key={i} className="input-check p-2">
												<input className="uk-checkbox" type="checkbox" />
												<span>{option.label}</span>
											</label>
										);
								  })
								: ""} */}
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
  addMultiChoiceOption,
  deleteMultichoiceOption,
  duplicateElement
})(MultiChoiceWithPhoto)
