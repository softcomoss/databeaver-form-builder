import React from 'react'
import { connect } from 'react-redux'
import {
  addNewPage,
  deletePage,
  setActivePage,
  addSection,
  setActiveSection,
  deleteSection
} from '../../redux/actions/form-action/form.actions'
import PageCloseIcon from '../../icons/Page-close.icons'

const PageSwitcher = (props) => {
  const {
    addNewPage,
    formdata,
    deletePage,
    activePage,
    setActivePage,
    addSection,
    activeSection,
    setActiveSection,
    deleteSection,
    currentView
  } = props
  return (
    <ul uk-tab className='my-0 form-tabs uk-tab'>
      {formdata.map((page, i) => {
        return (
          <React.Fragment>
            <li
              onClick={() => {
                setActivePage(i)
              }}
              key={i}
              className={
                activePage.split(' ')[1] == i + 1
                  ? 'form-tab-link uk-active'
                  : 'form-tab-link'
              }
              aria-expanded='true'
            >
              <a className='tab-link'>
                <span>page {i + 1}</span>
                <span
                  onClick={() => {
                    deletePage(i, formdata.length)
                  }}
                >
                  <PageCloseIcon />
                </span>
              </a>
            </li>
          </React.Fragment>
        )
      })}
      <li className='add-new-page' aria-expanded='false'>
        <button
          type='button'
          onClick={(e) => {
            addNewPage(formdata.length)
          }}
          className='bg-transparent '
        >
          <svg>
            <use xlinkHref='/uploads/icons.svg#plus' />
          </svg>
          <span>New page</span>
        </button>
      </li>
    </ul>
  )
}

const mapStateToProps = (state) => ({
  elements: state.formReducer,
  formdata: state.formReducer.formdata,
  activePage: state.formReducer.activePage,
  activeSection: state.formReducer.activeSection,
  currentView: state.formReducer.currentView
})

export default connect(mapStateToProps, {
  addNewPage,
  deletePage,
  setActivePage,
  addSection,
  setActiveSection,
  deleteSection
})(PageSwitcher)
