import axios from 'axios'
import uid from 'uid'
import { formBuilderActionTypes } from '../../action-types/form-builder-actions.types'

export const addElementHint = (hint) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.ADD_ELEMENT_HINT,
    payload: {
      hint
    }
  })
}

export const editElementLabel = (label) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.EDIT_ELEMENT_LABEL,
    payload: {
      label
    }
  })
}

export const duplicateElement = (element, index, currentPage) => (dispatch) => {
  let newId = uid(7)
  let page = parseInt(currentPage.split(' ').pop())
  dispatch({
    type: formBuilderActionTypes.DUPLICATE_ELEMENT,
    payload: { element, index, page, newId }
  })

  dispatch({
    type: formBuilderActionTypes.SET_ACTIVE_ELEMENT,
    payload: {
      uniqueId: newId
    }
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const addElementFormat = (format) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.ADD_ELEMENT_FORMAT,
    payload: {
      format
    }
  })
}

export const configureRating = (number) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.CONFIGURE_RATING,
    payload: {
      number
    }
  })
}

export const editRatingLabel = (label, index) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.EDIT_RATING_LABEL,
    payload: {
      label,
      index
    }
  })
}

export const editNumberFormat = (format) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.EDIT_NUMBER_FORMAT,
    payload: format
  })
}

export const editMultiChoiceOptionsLabel = (label, index) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.EDIT_MULTICHOICE_OPTIONS_LABEL,
    payload: {
      label,
      index
    }
  })
}

export const deleteMultichoiceOption = (index) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.DELETE_MULTICHOICE_OPTION,
    payload: {
      index
    }
  })
}

export const addMultiChoiceOption = (withPhoto, label, url) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.ADD_MULTICHOICE_OPTION,
    payload: {
      label,
      url,
      withPhoto
    }
  })
}

export const addElementDescription = (description) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.ADD_ELEMENT_DESCRIPTION,
    payload: {
      description
    }
  })
}

export const editPlaceholder = (placeholder) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.EDIT_PLACEHOLDER,
    payload: {
      placeholder
    }
  })
}

export const addMultiChoiceWithPhotoOption = (index) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.ADD_MULTICHOICE_WITH_PHOTO_OPTION,
    payload: {
      index
    }
  })
}

export const toggleBooleanState = (state, name, id) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.TOGGLE_BOOLEAN,
    payload: {
      state,
      name,
      id
    }
  })
}

export const openFieldRules = () => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.OPEN_FIELD_RULES
  })
}

export const closeFieldRules = () => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.CLOSE_FIELD_RULES
  })
}

export const createNewForm = (formObject) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.ADD_NEW_FORM,
    payload: {
      formName: formObject.name,
      sector: formObject.sector !== undefined ? formObject.sector : '',
      purpose: formObject.reason !== undefined ? formObject.reason : ''
    }
  })
}

export const onRenameForm = (newName) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.RENAME_FORM,
    payload: {
      newName
    }
  })
}

export const addMaximumCharacters = (maxChars) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.ADD_MAX_CHARS,
    payload: {
      maxChars
    }
  })
}

export const addMinimumCharacters = (minChars) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.ADD_MIN_CHARS,
    payload: {
      minChars
    }
  })
}

export const clearMinimumCharacters = () => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.CLEAR_MIN_LENGTH
  })
}

export const addMaximumRating = (number) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.ADD_MAX_RATING,
    payload: {
      number
    }
  })
}

export const clearMaximumRating = () => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.CLEAR_MAX_LENGTH
  })
}

export const onAddNewNameForDuplicate = (newName, id) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.NEW_NAME_FOR_FORM_EDIT,
    payload: {
      newName,
      id
    }
  })
}

export const getFormDetailsToEdit = (id, callback) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.LOADING_SINGLE_FORM
  })
  axios
    .get(`/forms/${id}`)
    .then((response) => {
      if (response.data !== undefined && response.data.success === true) {
        dispatch({
          type: formBuilderActionTypes.GET_FORM_TO_EDIT,
          payload: {
            formData: response.data.data
          }
        })
      }
    })
    .then((data) => {
      callback()
    })
    .catch((error) => {
      dispatch({
        type: formBuilderActionTypes.LOADING_SINGLE_FORM_COMPLETED
      })
      if (error.response !== undefined && error.response.data !== undefined) {
        // toast.error(error.response.data.error);
      }
    })
}

export const uploadImageAction = (url, folder, files, callback) => (
  dispatch
) => {
  axios
    .post(url, uploadDetails)
    .then((response) => {
      if (response.data !== undefined && response.data.success === true) {
        // dispatch({
        // 	type: formBuilderActionTypes.GET_FORM_TO_EDIT,
        // 	payload: {
        // 		formData: response.data.data
        // 	}
        // });
      }
    })
    .then((data) => {
      callback()
    })
    .catch((error) => {
      dispatch({
        type: formBuilderActionTypes.LOADING_SINGLE_FORM_COMPLETED
      })
      if (error.response !== undefined && error.response.data !== undefined) {
        // toast.error(error.response.data.error);
      }
    })
}

export const toggleWithPhoto = () => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.TOGGLE_WITH_PHOTO
  })
}

export const toggleFormattedNumeric = () => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.TOGGLE_FORMATTED_NUMERIC
  })
}

export const addRule = () => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.ADD_RULE
  })
}

export const removeRule = () => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.REMOVE_RULE
  })
}

export const setLogicOption = (index, value) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.SET_LOGIC_OPTION,
    payload: {
      index,
      value
    }
  })
}

export const setCondition = (index, value) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.SET_CONDITION,
    payload: {
      index,
      value
    }
  })
}

export const setLogicAction = (index, value) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.SET_LOGIC_ACTION,
    payload: {
      index,
      value
    }
  })
}

export const setLogicTarget = (index, value) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.SET_LOGIC_TARGET,
    payload: {
      index,
      value
    }
  })
}

export const setOtherwise = (value) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.SET_OTHERWISE,
    payload: {
      value
    }
  })
}

export const editAddress = (property, value) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.EDIT_ADDRESS,
    payload: {
      value,
      property
    }
  })
}
