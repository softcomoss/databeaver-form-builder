import React, { Component } from 'react'
import FormBuilderControlButtons from '../../containers/forms-module/Builder-control-button.container'
// import PageSwitcher from '../../containers/forms-module/Page-switcher.container'
// import { connect } from 'react-redux'
// import { toast } from 'react-toastify'
// import { showModal, closeModal } from '../../utils/modal-control.utils'

// import FormElementDisplay from '../../containers/forms-module/Form-elements-display.container'
// import RenameForm from '../../containers/forms-module/Rename-form.container'
// import PreviewForm from '../../containers/forms-module/Preview-form.container'
// import {
//   saveForm,
//   updateForm,
//   addQuickDispatchName,
//   addQuickProjectName,
//   addQuickExpectedNumberOfEntries,
//   addQuickDispatchStartDate,
//   addQuickDispatchDueDate,
//   sendQuickDispatch,
//   addGeneratedLink,
//   addQuickProjectId
// } from '../../redux/actions/form-action/form.actions'
// import ModalCloseButton from '../../components/modal-components/Close-button.component'
// import CustomHelmet from '../../components/helmet/Helmet'
// import { nameShortner } from '../../utils/card-name-shortener.utils'
// import { appURL } from '../../utils/base-url-switch.utils'

class Builder extends Component {
  constructor(props) {
    super(props)
    this.state = { copySuccess: '', addNewProject: false, saved: false }
  }

  // componentDidUpdate() {
  // 	const node = ReactDOM.findDOMNode(this);
  // 	node.scrollTop = node.scrollHeight;
  // }

  // saveDetails = () => {
  // 	const { saveForm, formData, activeForm, form, updateForm } = this.props;
  // 	// saveForm(formData);
  // 	let formDetails = {
  // 		id: activeForm._id,
  // 		formData: form.formdata,
  // 	};

  // 	updateForm(formDetails, () => {
  // 		toast.success("Form Updated");
  // 	});
  // };

  // componentDidMount() {
  // 	const { form } = this.props;
  // 	closeModal("#add-new-form");
  // 	closeModal("#edit-form");
  // 	if (form.name.length < 1) {
  // 		this.props.history.push("/createform");
  // 	}
  // }

  // /**
  //  * @function copyToClipboard
  //  * @description this should copy the generated link from the click of a button
  //  */
  // copyToClipboard = (e) => {
  // 	this.textArea.select();
  // 	document.execCommand("copy");
  // 	e.target.focus();
  // 	this.setState({ copySuccess: "Copied!" });
  // };

  // onSubmitQuickDispatch = () => {
  // 	const { sendQuickDispatch, addGeneratedLink } = this.props;

  // 	let dispatchDetails = {
  // 		name: this.props.quickDispatch.name,
  // 		dueDate: this.props.quickDispatch.dueDate,
  // 		form: this.props.quickDispatch.form,
  // 		totalExpectedEntries: this.props.quickDispatch.totalExpectedEntries,
  // 	};

  // 	if (this.state.addNewProject === true) {
  // 		dispatchDetails.projectName = this.props.quickDispatch.project;
  // 	} else {
  // 		dispatchDetails.projectId = this.props.quickDispatch.project;
  // 	}

  // 	sendQuickDispatch(dispatchDetails, () => {
  // 		showModal("#link-generated");
  // 	});
  // };

  render() {
    const {
      form,
      activeForm,
      allProjects,
      savingForm,
      addQuickProjectName,
      addQuickProjectId
    } = this.props
    return (
      <React.Fragment>
        <main className='main' id='mainContent'>
          <div className='main-bg not-padded maxwidth-xxl mx-auto'>
            <div className='main-wrapper form-builder-wrapper overf-hidden'>
              <a
                href='#add-form-fields'
                className='link-btn-colord add-form-fields'
                data-
              >
                <svg>
                  <use xlinkHref='/uploads/icons.svg#create-form' />
                </svg>
                <span className='prefix'>Add form fields</span>
              </a>

              <FormBuilderControlButtons />
              <section className='form-fields-container'>
                <ul className='uk-breadcrumb breadcrumb'>
                  <li>
                    <a href='/createform/'>All forms</a>
                  </li>
                  <li>
                    {/* <span
                      className='card-title capitalize uk-text-truncate'
                      uk-tooltip={`title: ${form.name}; pos: bottom`}
                    >
                      {nameShortner(form.name, 25)}
                    </span> */}
                  </li>
                </ul>
                <div className='pos-rel mt-2'>
                  {/* <PageSwitcher /> */}

                  <ul className='input-list-wrapper uk-switcher my-0 '>
                    {/* <FormElementDisplay /> */}
                  </ul>

                  <div className='form-extras'>
                    <div className='form-extra'>
                      <button
                        className='modal-actn-btn modal-accept-btn'
                        uk-tooltip='title:DataBeaver autosaves all your work as long as your internet is working; delay: 100; pos: bottom-center'
                        title
                        aria-expanded='false'
                      >
                        {savingForm ? 'Saving...' : 'Save'}
                      </button>
                      <div className='uk-inline'>
                        <button className='d-flx-alc btn p-1' type='button'>
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
                              <a>Rename</a>
                              <div
                                id='rename-form'
                                data-uk-modal
                                className='uk-modal'
                              >
                                <div className='uk-modal-dialog uk-margin-auto-vertical border-radius'>
                                  {/* <RenameForm saveDetails={this.saveDetails} /> */}
                                </div>
                              </div>
                            </li>
                            <li className='drop-list-item'>
                              <a>Share draft</a>
                              <div
                                id='rename-form'
                                data-uk-modal
                                className='uk-modal'
                              >
                                <div className='uk-modal-dialog uk-margin-auto-vertical border-radius'></div>
                              </div>
                            </li>
                            <li className='drop-list-item'>
                              <a>Generate link</a>

                              <div
                                id='generate-link'
                                data-uk-modal
                                className='uk-modal'
                              >
                                <div className='uk-modal-dialog uk-margin-auto-vertical border-radius'>
                                  {/* <ModalCloseButton /> */}
                                  <h2 className='uk-modal-title'>
                                    {' '}
                                    Generate link
                                  </h2>
                                  <div className='uk-modal-body'>
                                    <div
                                      className='input-wrapper'
                                      style={{ marginBottom: '1rem' }}
                                    >
                                      {this.state.addNewProject === true ? (
                                        <label
                                          htmlFor='project-name'
                                          className='form-inputs'
                                        >
                                          <input
                                            onChange={(e) =>
                                              addQuickProjectName(
                                                e.target.value
                                              )
                                            }
                                            type='text'
                                            id='project-name'
                                            placeholder=' '
                                          />
                                          <span className='label'>
                                            Project name
                                          </span>
                                        </label>
                                      ) : (
                                        <React.Fragment>
                                          <label className='label'>
                                            Select Project
                                          </label>
                                          <select class='uk-select'>
                                            <option value=''>
                                              select a project
                                            </option>
                                            {/* {allProjects.projects !==
                                              undefined &&
                                            allProjects.projects.length > 0 ? (
                                              allProjects.projects.map(
                                                (project, i) => {
                                                  return (
                                                    <>
                                                      <option
                                                        key={i}
                                                        value={project._id}
                                                      >
                                                        {project.name}
                                                      </option>
                                                    </>
                                                  )
                                                }
                                              )
                                            ) : (
                                              <option value=''>
                                                No Project created
                                              </option>
                                            )} */}
                                          </select>
                                        </React.Fragment>
                                      )}
                                    </div>
                                    {/* <button
                                      style={{
                                        backgroundColor: '#0081c2',
                                        borderRadius: '4px'
                                      }}
                                      className='uk-button uk-button-primary uk-button-small'
                                      onClick={() =>
                                        this.setState({
                                          addNewProject: !this.state
                                            .addNewProject
                                        })
                                      }
                                      type='button'
                                    >
                                      {!this.state.addNewProject
                                        ? 'New project'
                                        : 'Existing project'}
                                    </button> */}
                                    {/* <div className='input-wrapper'>
                                      <label
                                        htmlFor='dispatch-name'
                                        className='form-inputs'
                                      >
                                        <input
                                          onChange={(e) =>
                                            this.props.addQuickDispatchName(
                                              e.target.value
                                            )
                                          }
                                          type='text'
                                          id='dispatch-name'
                                          placeholder=' '
                                        />
                                        <span className='label'>
                                          Dispatch name
                                        </span>
                                      </label>
                                    </div> */}
                                    {/* <div className='input-wrapper'>
                                      <label
                                        htmlFor='entries-to-collect'
                                        className='form-inputs'
                                      >
                                        <input
                                          onChange={(e) =>
                                            this.props.addQuickExpectedNumberOfEntries(
                                              e.target.value
                                            )
                                          }
                                          type='number'
                                          id='entries-to-collect'
                                          placeholder=' '
                                        />
                                        <span className='label'>
                                          Total number of entries to collect
                                        </span>
                                      </label>
                                    </div> */}
                                  </div>
                                  <div className='uk-modal-footer uk-text-left'>
                                    <button
                                      onClick={() => showModal('#pick-date')}
                                      className='modal-actn-btn modal-accept-btn'
                                      type='button'
                                    >
                                      Next
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div
                                id='pick-date'
                                data-uk-modal
                                className='uk-modal'
                              >
                                <div className='uk-modal-dialog uk-margin-auto-vertical border-radius'>
                                  {/* <ModalCloseButton /> */}
                                  <h2 className='uk-modal-title'>
                                    {' '}
                                    Generate link
                                  </h2>
                                  <div className='uk-modal-body'>
                                    <div className='input-wrapper'>
                                      <label
                                        htmlFor='dispatch-name'
                                        className='form-inputs'
                                      >
                                        {/* <input
                                          onChange={(e) =>
                                            this.props.addQuickDispatchDueDate(
                                              e.target.value
                                            )
                                          }
                                          type='date'
                                          id='dispatch-name'
                                          placeholder=' '
                                        /> */}
                                        <span className='label'>End Date</span>
                                      </label>
                                    </div>
                                  </div>

                                  {/* <div className='uk-modal-footer uk-text-left'>
                                    <button
                                      onClick={this.onSubmitQuickDispatch}
                                      className='modal-actn-btn modal-accept-btn'
                                      type='button'
                                    >
                                      Generate Link
                                    </button>

                                    <div
                                      id='link-generated'
                                      data-uk-modal
                                      className='uk-modal'
                                    >
                                      <div className='uk-modal-dialog uk-margin-auto-vertical border-radius'>
                                        <ModalCloseButton />
                                        <h2 className='uk-modal-title'>
                                          Link Generated
                                        </h2>
                                        <div className='uk-modal-body'>
                                          <label
                                            htmlFor='link-name'
                                            className='form-inputs'
                                          >
                                            <input
                                              ref={(textarea) =>
                                                (this.textArea = textarea)
                                              }
                                              type='text'
                                              id='link-name'
                                              placeholder=' '
                                              value={`${appURL}generated-form/${this.props.link}`}
                                            />
                                            <span className='label'>Link</span>
                                            <button
                                              style={{ zIndex: 3100 }}
                                              onClick={this.copyToClipboard}
                                              className='copy-btn'
                                            >
                                              <svg>
                                                <use xlinkHref='/uploads/icons.svg#copy' />
                                              </svg>
                                            </button>
                                          </label>
                                          {this.state.copySuccess}
                                        </div>
                                        <div className='uk-modal-footer uk-text-left'>
                                          <p className='microtext co-faint-gray fw-bold'>
                                            Share via
                                          </p>
                                          <div className='social-media-btn-wrapper'>
                                            <button>
                                              <svg>
                                                <use xlinkHref='/uploads/icons.svg#twitter' />
                                              </svg>
                                            </button>
                                            <button>
                                              <svg>
                                                <use xlinkHref='/uploads/icons.svg#fcbk' />
                                              </svg>
                                            </button>
                                            <button>
                                              <svg>
                                                <use xlinkHref='/uploads/icons.svg#lnkd' />
                                              </svg>
                                            </button>
                                            <button>
                                              <svg>
                                                <use xlinkHref='/uploads/icons.svg#message' />
                                              </svg>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      id='share-draft'
                                      data-uk-modal
                                      className='uk-modal'
                                    >
                                      <div className='uk-modal-dialog uk-margin-auto-vertical border-radius'>
                                        <ModalCloseButton />
                                        <h2 className='uk-modal-title'>
                                          Draft link
                                        </h2>
                                        <div className='uk-modal-body'>
                                          <label
                                            htmlFor='link-name'
                                            className='form-inputs'
                                          >
                                            <input
                                              ref={(textarea) =>
                                                (this.textArea = textarea)
                                              }
                                              type='text'
                                              id='link-name'
                                              placeholder=' '
                                              value={`${appURL}draft/${this.props.activeForm._id}`}
                                            />
                                            <span className='label'>Link</span>
                                            <button
                                              style={{ zIndex: 3100 }}
                                              onClick={this.copyToClipboard}
                                              className='copy-btn'
                                            >
                                              <svg>
                                                <use xlinkHref='/uploads/icons.svg#copy' />
                                              </svg>
                                            </button>
                                          </label>
                                          {this.state.copySuccess}
                                        </div>
                                      </div>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className='preview-info-wrap d-flx-jsb'>
                      <h3>Preview</h3>
                      <button
                        onClick={() => showModal('#form-preview')}
                        className='preview-btn ml-2'
                        type='button'
                      >
                        <svg>
                          <use xlinkHref='/uploads/icons.svg#preview' />
                        </svg>
                      </button>
                      <div
                        id='form-preview'
                        className='uk-modal-full preview-modal'
                        uk-modal
                        style={{ display: 'block' }}
                      >
                        <div className='uk-modal-dialog'>
                          {/* <ModalCloseButton /> */}
                          {/* <PreviewForm /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </React.Fragment>
    )
  }
}

/* const mapStateToProps = (state) => ({
  form: state.formReducer,
  savingForm: state.formReducer.savingForm,
  link: state.formReducer.generatedLink,
  formData: state.formReducer,
  activeForm: state.formReducer.activeForm,
  allFormsCreated: state.formReducer.allFormsCreated,
  loadingForms: state.formReducer.loadingForms,
  quickDispatch: state.formReducer.quickDispatch,
  allProjects: state.projects.allProjects
})
*/

// export default connect(mapStateToProps, {
//   saveForm,
//   updateForm,
//   addQuickDispatchName,
//   addQuickProjectName,
//   addQuickExpectedNumberOfEntries,
//   addQuickDispatchStartDate,
//   addQuickDispatchDueDate,
//   sendQuickDispatch,
//   addGeneratedLink,
//   addQuickProjectId
// })(Builder)

export default Builder
