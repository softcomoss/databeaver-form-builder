import axios from 'axios'
import { toast } from 'react-toastify'

import { formBuilderActionTypes } from '../../action-types/form-builder-actions.types'

export const changeFormName = (name) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.CHANGE_FORM_NAME,
    payload: {
      name
    }
  })
}

export const setActiveElement = (uniqueId) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.SET_ACTIVE_ELEMENT,
    payload: {
      uniqueId
    }
  })
}

export const changeFormDescription = (description) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.CHANGE_FORM_DESCRIPTION,
    payload: {
      description
    }
  })
}

export const addNewPage = (position) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.ADD_PAGE,
    payload: {
      label: `Page ${position + 1}`,
      pos: `${position + 1}`,
      elements: []
    }
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const deletePage = (index, numOfPages) => (dispatch) => {
  if (numOfPages > 1) {
    dispatch({
      type: formBuilderActionTypes.DELETE_PAGE,
      payload: index
    })
    dispatch({
      type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
    })
  }
}

export const setActivePage = (index) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.SET_ACTIVE_PAGE,
    payload: `Page ${index + 1}`
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const addSection = (sectionPosition) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.ADD_SECTION,
    payload: {
      sectionPosition: sectionPosition,
      section: {
        label: `Section ${sectionPosition + 1}`,
        pos: `${sectionPosition + 1}`,
        elements: []
      }
    }
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const deleteSection = (index) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.DELETE_SECTION,
    payload: index
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const setActiveSection = (index) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.SET_ACTIVE_SECTION,
    payload: `Section ${index + 1}`
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const updateElementView = () => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const deleteElement = (uniqueId, index) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.DELETE_ELEMENT,
    payload: {
      uniqueId,
      index
    }
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const saveForm = (formObject, callback) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.SAVING_FORM
  })

  let formDetails = {
    name: formObject.name,
    sector: formObject.sector,
    reason: formObject.purpose,
    formData: formObject.formdata
  }

  axios
    .post('/forms', formDetails)
    .then((response) => {
      if (response.data !== undefined && response.data.success === true) {
        dispatch({
          type: formBuilderActionTypes.SAVE_FORM,
          payload: {
            activeForm: response.data.data
          }
        })
      }
    })
    .then((data) => {
      dispatch({
        type: formBuilderActionTypes.SAVING_FORM_COMPLETED
      })
      callback()
    })
    .catch((error) => {
      dispatch({
        type: formBuilderActionTypes.SAVING_FORM_COMPLETED
      })
      if (error.response !== undefined && error.response.data !== undefined) {
        toast.error(error.response.data.error)
      }
    })
}

export const getAllForms = (page, callback) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.LOADING_ALL_FORMS
  })
  axios
    .get(`/forms?skip=${(page - 1) * 21}&limit=21`)
    .then((response) => {
      if (response.data !== undefined && response.data.success === true) {
        dispatch({
          type: formBuilderActionTypes.GET_ALL_FORMS,
          payload: {
            forms: response.data.data.forms,
            formsCount: response.data.data.count
          }
        })
      }
    })
    .then((res) => {
      dispatch({
        type: formBuilderActionTypes.LOADING_ALL_FORMS_COMPLETED
      })
      if (callback !== null && callback !== undefined) {
        callback()
      }
    })
    .catch((error) => {
      dispatch({
        type: formBuilderActionTypes.LOADING_ALL_FORMS_COMPLETED
      })
      // if (error.response !== undefined && error.response.data !== undefined) {
      // 	toast.error(error.response.data.error);
      // }
    })
}

export const searchForms = (page, query) => (dispatch) => {
  let url = ''
  let searchParameter = query.trim()
  if (searchParameter.length > 0) {
    url = `/forms/search?q=${query}&skip=${(page - 1) * 21}&limit=21`
  } else {
    url = `/forms?skip=${(page - 1) * 21}&limit=21`
  }
  axios
    .get(url)
    .then((response) => {
      if (response.data !== undefined && response.data.success === true) {
        dispatch({
          type: formBuilderActionTypes.GET_ALL_FORMS,
          payload: {
            forms: response.data.data.forms
          }
        })
      }
    })
    .catch((error) => {
      dispatch({
        type: formBuilderActionTypes.LOADING_ALL_FORMS_COMPLETED
      })
      // if (error.response !== undefined && error.response.data !== undefined) {
      // 	toast.error(error.response.data.error);
      // }
    })
}

export const getSingleForm = (id) => (dispatch) => {
  if (id !== undefined) {
    dispatch({
      type: formBuilderActionTypes.LOADING_SINGLE_FORM
    })
    axios
      .get(`/forms/${id}`)
      .then((response) => {
        if (response.data !== undefined && response.data.success === true) {
          dispatch({
            type: formBuilderActionTypes.GET_SINGLE_FORM,
            payload: {
              form: response.data.data
            }
          })
        }
      })
      .then((data) => {
        dispatch({
          type: formBuilderActionTypes.LOADING_SINGLE_FORM_COMPLETED
        })
      })
      .catch((error) => {
        dispatch({
          type: formBuilderActionTypes.LOADING_SINGLE_FORM_COMPLETED
        })
        // if (error.response !== undefined && error.response.data !== undefined) {
        // 	toast.error(error.response.data.error);
        // }
      })
  }
}

export const editFormName = (id, name, callback) => (dispatch) => {
  // console.log("check data", id, name);
  axios
    .put(`/forms/${id}`, { name })
    .then((response) => {
      if (response.data !== undefined && response.data.success === true) {
        toast.success('Form Renamed')
      }
    })
    .then((data) => {
      callback()
    })
    .catch((error) => {
      dispatch({
        type: formBuilderActionTypes.LOADING_ALL_FORMS_COMPLETED
      })
      if (error.response !== undefined && error.response.data !== undefined) {
        toast.error(error.response.data.error)
      }
    })
}

export const inputNewFormName = (name) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.INPUT_NEW_FORM_NAME,
    payload: {
      name
    }
  })
}

export const deleteForm = (id) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.LOADING
  })
  axios
    .delete(`/forms/${id}`)
    .then((response) => {
      if (response.data !== undefined && response.data.success === true) {
        toast.success('Form Deleted')
        setTimeout(() => {
          window.location.replace('/createform')
        }, 1500)
        dispatch({
          type: formBuilderActionTypes.LOADING_ALL_FORMS_COMPLETED
        })
      }
    })
    .then((date) => {
      dispatch({
        type: formBuilderActionTypes.LOADING_COMPLETE
      })
    })
    .catch((error) => {
      dispatch({
        type: formBuilderActionTypes.LOADING_COMPLETE
      })
      if (error.response !== undefined && error.response.data !== undefined) {
        toast.error(error.response.data.error)
      }
    })
}

export const duplicateForm = (id, callback) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.LOADING
  })
  axios
    .post(`/forms/duplicate/${id}`)
    .then((response) => {
      if (response.data !== undefined && response.data.success === true) {
        toast.success('Form Duplicated')
        setTimeout(() => {
          window.location.replace('/createform')
        }, 1500)
        dispatch({
          type: formBuilderActionTypes.LOADING_ALL_FORMS_COMPLETED
        })
      }
    })
    .then((data) => {
      callback()
    })
    .then((res) => {
      dispatch({
        type: formBuilderActionTypes.LOADING_COMPLETE
      })
    })
    .catch((error) => {
      dispatch({
        type: formBuilderActionTypes.LOADING_ALL_FORMS_COMPLETED
      })
      if (error.response !== undefined && error.response.data !== undefined) {
        toast.error(error.response.data.error)
      }
      dispatch({
        type: formBuilderActionTypes.LOADING_COMPLETE
      })
    })
}

export const addQuickDispatchName = (name) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.QUICK_DISPATCH_NAME,
    payload: { name }
  })
}

export const addQuickProjectName = (name) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.QUICK_DISPATCH_PROJECT,
    payload: { name }
  })
}

export const addQuickProjectId = (id) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.QUICK_DISPATCH_PROJECT_ID,
    payload: { id }
  })
}

export const addQuickExpectedNumberOfEntries = (number) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.QUICK_NUMBER_OF_ENTRIES,
    payload: { number }
  })
}

export const addQuickDispatchStartDate = (date) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.QUICK_DISPATCH_START_DATE,
    payload: { date }
  })
}

export const addQuickDispatchDueDate = (date) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.QUICK_DISPATCH_DUE_DATE,
    payload: { date }
  })
}

export const addQuickDispatchForm = (form) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.QUICK_DISPATCH_FORM,
    payload: { form }
  })
}

export const updateForm = (updatedDetails, callback) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.SAVING_FORM
  })
  axios
    .put(`/forms/${updatedDetails.id}`, { formData: updatedDetails.formData })
    .then((response) => {
      if (response.data !== undefined && response.data.success === true) {
        dispatch({
          type: formBuilderActionTypes.SAVING_FORM_COMPLETED
        })
      }
    })
    .then((data) => {
      callback()
    })
    .catch((error) => {
      dispatch({
        type: formBuilderActionTypes.SAVING_FORM_COMPLETED
      })
      if (error.response !== undefined && error.response.data !== undefined) {
        toast.error(error.response.data.error)
      }
    })
}

export const sendQuickDispatch = (dispatchDetails, callback) => (dispatch) => {
  axios
    .post(`/dispatches/quick`, dispatchDetails)
    .then((response) => {
      if (response.data !== undefined && response.data.success === true) {
        let link = response.data.data._id
        dispatch({
          type: formBuilderActionTypes.SHOW_LINK,
          payload: {
            link
          }
        })
        callback()
      }
    })
    .catch((error) => {
      dispatch({
        type: formBuilderActionTypes.LOADING_ALL_FORMS_COMPLETED
      })
      if (error.response !== undefined && error.response.data !== undefined) {
        toast.error(error.response.data.error)
      }
    })
}

export const addGeneratedLink = (link) => (dispatch) => {
  // console.log("show generated link"`https://databeaverv3staging.bluegreensoft.com/${link}`);
  // dispatch({
  // 	type: formBuilderActionTypes.SHOW_LINK,
  // 	payload: { link }
  // });
}
