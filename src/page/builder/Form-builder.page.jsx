import React, { Component } from 'react'
import FormBuilderControlButtons from '../../containers/forms-module/Builder-control-button.container'
import PageSwitcher from '../../containers/forms-module/Page-switcher.container'
import { connect } from 'react-redux'

import FormElementDisplay from '../../containers/forms-module/Form-elements-display.container'
import {
  saveForm,
  updateForm,
  changeFormName
} from '../../redux/actions/form-action/form.actions'

class Builder extends Component {
  constructor(props) {
    super(props)
    this.state = { copySuccess: '', addNewProject: false, saved: false }
  }

  saveForm = () => {
    const { onSave, formData } = this.props
    onSave(formData)
  }

  render() {
    const { changeFormName } = this.props
    return (
      <React.Fragment>
        <main
          style={{ fontSize: '12px' }}
          className='main body-wrap'
          id='mainContent'
        >
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
                  <input
                    className='question'
                    onChange={(e) => changeFormName(e.target.value)}
                    type='text'
                    placeholder='Enter form name...'
                  />
                </ul>
                <div className='pos-rel mt-2'>
                  <PageSwitcher />

                  <ul className='input-list-wrapper uk-switcher my-0 '>
                    <FormElementDisplay
                      uploadAddress={this.props.uploadAddress}
                    />
                  </ul>

                  <div className='form-extras'>
                    <div
                      style={{ fontSize: '16px', cursor: 'pointer' }}
                      className='form-extra'
                    >
                      <span onClick={this.saveForm} aria-expanded='false'>
                        save
                      </span>
                    </div>
                    <div className='preview-info-wrap d-flx-jsb'>
                      <h3>Preview</h3>
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

const mapStateToProps = (state) => ({
  form: state.formReducer,
  formData: state.formReducer
})

export default connect(mapStateToProps, {
  saveForm,
  updateForm,
  changeFormName
})(Builder)
