import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormSectors from '../../containers/forms-module/Form-sector.container'
import Pagination from 'rc-pagination'
import { showModal, closeModal } from '../../utils/modal-control.utils'
import FormCard from '../../containers/forms-module/Form-card.container'
import { createNewForm } from '../../redux/actions/form-action/formPropertyActions'
import {
  getAllForms,
  saveForm,
  addQuickDispatchForm,
  searchForms
} from '../../redux/actions/form-action/form.actions'
import { toast } from 'react-toastify'
import EmptyForm from '../../components/empty-state/Empty-form-state.component'
import PageLoader from '../../components/loaders/Page-loader.component'
import AccessRestriction from '../../components/acess-restriction/Access-restriction.component'

class AllForms extends Component {
  constructor() {
    super()
    this.state = {
      formName: '',
      sector: '',
      purpose: '',
      formToUpdate: {},
      currentPage: 1,
      permissions: []
    }
  }

  onInputChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  goToFormBuilder = (formName, sector, purpose) => {
    if (formName !== '' && sector !== '' && purpose !== '') {
      const { createNewForm } = this.props
      createNewForm(formName, sector, purpose)
      setTimeout(() => {
        this.props.history.push('/form-builder')
      }, 100)
    } else {
      showModal('#create-from-scratch-main')
      closeModal('#add-new-form')
      toast.error('Please fill in the form details')
    }
  }

  createNewFormFromScratch = () => {
    const { formName, sector, purpose } = this.state
    const { history, saveForm, createNewForm } = this.props
    let formObject = {
      name: formName
    }
    if (sector.length > 0) {
      formObject.sector = sector
    }
    if (purpose.length > 0) {
      formObject.reason = purpose
    }
    createNewForm(formObject)
    saveForm(formObject, () => {
      setTimeout(() => {
        history.push('/form-builder')
      }, 100)
      closeModal('#create-from-scratch-main')
    })
  }

  componentDidMount() {
    const { getAllForms, loadingForms, allFormsCreated, history } = this.props
    const { currentPage } = this.state
    getAllForms(currentPage)
    let permissions = JSON.parse(sessionStorage.getItem('__beaver__perms'))
    if (permissions !== null)
      this.setState({
        permissions
      })
  }

  onSelectFormToUpdate = (form) => {
    this.setState({
      formToUpdate: form
    })
  }

  changePage = (page) => {
    this.setState({
      currentPage: page
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.props.getAllForms(this.state.currentPage)
    }
  }

  render() {
    const { permissions } = this.state
    const { allFormsCreated, loadingForms, formsCount } = this.props

    return (
      <React.Fragment>
        <main className='main' id='mainContent'>
          <div className='main-bg not-padded maxwidth-xxl mx-auto'>
            <svg className='full-graph'>
              <use xlinkHref='/uploads/icons.svg#bg-bkgd' />
            </svg>
            <svg className='qua-graph'>
              <use xlinkHref='/uploads/icons.svg#bg-bleft' />
            </svg>
            <svg className='angle'>
              <use xlinkHref='/uploads/icons.svg#bg-bright' />
            </svg>

            <div className='main-wrapper cont-w-snav'>
              <FormSectors />
              <section className='width-3-4 main-section-wrapper'>
                <div className='d-flx-alc-jsb mb-2'>
                  <h2 className='section-header'>all forms</h2>
                  <a
                    onClick={() => {
                      showModal('#create-from-scratch-main')
                    }}
                    className={
                      permissions.includes('Forms_Create_Form')
                        ? 'link-btn-colord link-like-btn'
                        : 'link-btn-colord link-like-btn disabled'
                    }
                  >
                    <svg>
                      <use xlinkHref='/uploads/icons.svg#create-form' />
                    </svg>
                    <span className='prefix'>Add new form</span>
                  </a>
                  <div id='create-from-scratch-main' data-uk-modal>
                    <div className='uk-modal-dialog uk-margin-auto-vertical border-radius'>
                      <button
                        className='uk-modal-close-default'
                        type='button'
                        data-uk-close
                      />
                      <h2 className='uk-modal-title'>Name your form</h2>
                      <div className='uk-modal-body'>
                        <div className='input-wrapper'>
                          <label htmlFor='form-name' className='form-inputs'>
                            <input
                              onChange={this.onInputChange}
                              name='formName'
                              type='text'
                              id='form-name'
                              placeholder=' '
                              required
                            />
                            <span className='label'>
                              Form name <span className='co-warning'>*</span>
                            </span>
                          </label>
                        </div>
                        <div className='input-wrapper'>
                          <label htmlFor='form-name' className='form-inputs'>
                            <input
                              onChange={this.onInputChange}
                              name='sector'
                              type='text'
                              id='form-name'
                              placeholder=' '
                              required
                            />
                            <span className='label'>Sector</span>
                          </label>
                        </div>
                        <div className='input-wrapper'>
                          <label htmlFor='form-name' className='form-inputs'>
                            <input
                              onChange={this.onInputChange}
                              name='purpose'
                              type='text'
                              id='form-name'
                              placeholder=' '
                            />
                            <span className='label'>
                              What are you creating it for
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className='uk-modal-footer uk-text-left'>
                        <button
                          onClick={() => {
                            this.createNewFormFromScratch()
                          }}
                          className='modal-actn-btn modal-accept-btn'
                          type='button'
                        >
                          Continue
                        </button>
                        <button
                          className='uk-modal-close modal-cancel-btn modal-actn-btn'
                          type='button'
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='d-flx-alc-fw form-util'>
                  <label className='box-deco-smallr search r-width-300'>
                    <svg>
                      <use href='/uploads/icons.svg#search' />
                    </svg>
                    <input
                      onChange={(e) => {
                        e.target.value.length > 0
                          ? this.props.searchForms(
                              this.state.currentPage,
                              e.target.value
                            )
                          : this.props.getAllForms(this.state.currentPage)
                      }}
                      type='search'
                      placeholder='Search for forms'
                    />
                  </label>
                </div>

                <section className='mb-8 minheight-50vh'>
                  {permissions.includes('Forms_View_Form') ? (
                    <React.Fragment>
                      {loadingForms === false && allFormsCreated.length > 0 && (
                        <ul className='card-list none flex-width-1-3wgr'>
                          {allFormsCreated.map((singleForm, i) => {
                            return (
                              <div key={i}>
                                <FormCard
                                  key={singleForm._id}
                                  formDetails={singleForm}
                                  formToUpdate={this.state.formToUpdate}
                                  selectFormToUpdate={this.onSelectFormToUpdate}
                                  getAllForms={getAllForms}
                                  history={this.props.history}
                                />
                              </div>
                            )
                          })}
                        </ul>
                      )}
                      {loadingForms === false && allFormsCreated.length < 1 && (
                        <EmptyForm history={this.props.history} />
                      )}
                      {loadingForms === true && <PageLoader />}
                    </React.Fragment>
                  ) : (
                    <AccessRestriction />
                  )}
                </section>
                {allFormsCreated.length > 0 &&
                  permissions.includes('Forms_View_Form') && (
                    <Pagination
                      onChange={this.changePage}
                      defaultCurrent={1}
                      total={formsCount}
                      pageSize={21}
                    />
                  )}
              </section>
            </div>
          </div>
        </main>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  form: state.formReducer,
  formData: state.formReducer,
  allFormsCreated: state.formReducer.allFormsCreated,
  loadingForms: state.formReducer.loadingForms,
  formsCount: state.formReducer.formsCount
})

export default connect(mapStateToProps, {
  createNewForm,
  getAllForms,
  saveForm,
  addQuickDispatchForm,
  searchForms
})(AllForms)
