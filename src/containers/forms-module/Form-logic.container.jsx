import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  addRule,
  removeRule,
  setLogicOption,
  setCondition,
  setLogicAction,
  setLogicTarget,
  setOtherwise
} from '../../redux/actions/form-action/formPropertyActions'

const FormLogic = (props) => {
  const {
    formData,
    allPages,
    logics,
    addRule,
    removeRule,
    setLogicOption,
    setCondition,
    setLogicAction,
    setLogicTarget,
    setOtherwise
  } = props
  const { elementDetails } = props.elementDetails
  // const [elementRule, addRule] = useState([]);
  const [selectedIf, setIf] = useState('Select a target element')
  const [numberOfConditions, setNumberOfConditions] = useState([
    { condition: 1 }
  ])
  // const [allElements, setAllElements] = useState([])
  let allElements = []

  const getAllElements = (formData) => {
    formData.map((page, i) => {
      allElements.push(page)
    })
  }

  const addCondition = () => {
    let updatedCondition = [...numberOfConditions]
    addRule()
    updatedCondition.push({ condition: 1 })
    setNumberOfConditions(updatedCondition)
  }

  useEffect(() => {
    getAllElements(formData)
    allElements = [...allPages].flat()
  })

  return (
    <React.Fragment>
      <div className='logic-wrapper border-top px-2'>
        <div className='d-flx-alc-jsb'>
          <div className='d-flx-alc'>
            <h3 className='reg-txt mr-2'>Logic</h3>
            <svg
              uk-tooltip='title: check to make the question compulsory; delay: 100; pos: bottom-center'
              width={12}
              height={12}
            >
              <use xlinkHref='/uploads/icons.svg#tooltip' />
            </svg>
          </div>
          <a href className='underline'>
            Learn how logic works
          </a>
        </div>
        <p className='co-heading my-2 fw-medium'>
          When someone answers{' '}
          <span className='co-primary'>{elementDetails.label}</span>,
        </p>
        <p className='co-heading my-2 fw-medium'>If</p>

        {elementDetails.logics !== undefined
          ? elementDetails.logics.map((logic, i) => {
              return (
                <React.Fragment>
                  <div key={i} className='logic-question-container '>
                    <div className='uk-inline filter'>
                      <div class='uk-margin'>
                        <select
                          value={logic.condition}
                          onChange={(e) => setCondition(i, e.target.value)}
                          class='uk-select'
                        >
                          <option value=''>Condition</option>
                          <option value='equal'>Equal to</option>
                          <option value='contains'>Contains</option>
                        </select>
                      </div>
                    </div>
                    <div className='uk-inline drop-input width-100-pc mx-1'>
                      <div class='uk-margin'>
                        <select
                          value={logic.value}
                          onChange={(e) => setLogicOption(i, e.target.value)}
                          class='uk-select'
                        >
                          <option value=''>Select option</option>
                          {elementDetails.options !== undefined
                            ? elementDetails.options.map((option, i) => {
                                return (
                                  <option value={option.label} key={i}>
                                    {option.label}
                                  </option>
                                )
                              })
                            : ''}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='logic-question-container'>
                    <div className='uk-inline filter'>
                      <div class='uk-margin'>
                        <select
                          value={logic.action}
                          onChange={(e) => setLogicAction(i, e.target.value)}
                          class='uk-select'
                        >
                          <option value=''>Select action</option>
                          <option value='hide'>hide</option>
                          <option value='show'>show</option>
                        </select>
                      </div>
                    </div>
                    <div className='uk-inline drop-input width-100-pc'>
                      <div class='uk-margin'>
                        <select
                          value={logic.target}
                          onChange={(e) => setLogicTarget(i, e.target.value)}
                          class='uk-select'
                        >
                          <option value=''>Select Target</option>
                          {allPages.flat().map((data, i) => {
                            return (
                              <option value={data.unique_id} key={i}>
                                {data.label}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  {elementDetails.logics !== undefined &&
                    elementDetails.logics.length !== i + 1 && (
                      <button disabled className='btn btn-no-fill mb-1'>
                        And
                      </button>
                    )}
                </React.Fragment>
              )
            })
          : ''}

        <div className='d-flx-alc'>
          <button disabled className='btn btn-no-fill'>
            And
          </button>
          <button
            onClick={() => {
              removeRule()
            }}
            className='btn btn-no-fill ml-2h'
            data-uk-tooltip='title: Remove logic; pos: bottom'
          >
            -
          </button>
          <button
            onClick={() => addCondition()}
            className='btn btn-no-fill ml-2h'
            data-uk-tooltip='title: Add new logic; pos: bottom'
          >
            +
          </button>
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
  addRule,
  removeRule,
  setLogicOption,
  setCondition,
  setLogicAction,
  setLogicTarget,
  setOtherwise
})(FormLogic)
