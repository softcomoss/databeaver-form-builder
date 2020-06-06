import axios from 'axios'
import uid from 'uid'
import {
  EDIT_ELEMENT_LABEL,
  ADD_ELEMENT_DESCRIPTION,
  ADD_ELEMENT_HINT,
  ADD_ELEMENT_FORMAT,
  CONFIGURE_RATING,
  EDIT_RATING_LABEL,
  EDIT_MULTICHOICE_OPTIONS_LABEL,
  ADD_MULTICHOICE_OPTION,
  DELETE_MULTICHOICE_OPTION,
  ADD_MULTICHOICE_WITH_PHOTO_OPTION,
  TOGGLE_BOOLEAN,
  OPEN_FIELD_RULES,
  CLOSE_FIELD_RULES,
  ADD_NEW_FORM,
  RENAME_FORM,
  ADD_MIN_CHARS,
  ADD_MAX_CHARS,
  ADD_MAX_RATING,
  NEW_NAME_FOR_FORM_EDIT,
  GET_FORM_TO_EDIT,
  LOADING_ALL_FORMS_COMPLETED,
  LOADING_SINGLE_FORM_COMPLETED,
  LOADING_SINGLE_FORM,
  LOADING,
  TOGGLE_WITH_PHOTO,
  ADD_RULE,
  REMOVE_RULE,
  SET_SELECTED,
  SET_CONDITION,
  SET_VALUE,
  SET_JUMP_TO,
  SET_OTHERWISE,
  EDIT_PLACEHOLDER,
  CLEAR_MAX_LENGTH,
  CLEAR_MIN_LENGTH,
  TOGGLE_FORMATTED_NUMERIC,
  EDIT_NUMBER_FORMAT,
  SET_LOGIC_ACTION,
  SET_LOGIC_OPTION,
  SET_LOGIC_TARGET,
  EDIT_ADDRESS,
  DUPLICATE_ELEMENT,
  UPDATE_ELEMENT_VIEW,
  SET_ACTIVE_ELEMENT
} from '../../action-types/form-builder-actions.types'

export const addElementHint = (hint) => (dispatch) => {
  dispatch({
    type: ADD_ELEMENT_HINT,
    payload: {
      hint
    }
  })
}

export const editElementLabel = (label) => (dispatch) => {
  dispatch({
    type: EDIT_ELEMENT_LABEL,
    payload: {
      label
    }
  })
}

export const duplicateElement = (element, index, currentPage) => (dispatch) => {
  let newId = uid(7)
  let page = parseInt(currentPage.split(' ').pop())
  dispatch({
    type: DUPLICATE_ELEMENT,
    payload: { element, index, page, newId }
  })

  dispatch({
    type: SET_ACTIVE_ELEMENT,
    payload: {
      uniqueId: newId
    }
  })
  dispatch({
    type: UPDATE_ELEMENT_VIEW
  })
}

export const addElementFormat = (format) => (dispatch) => {
  dispatch({
    type: ADD_ELEMENT_FORMAT,
    payload: {
      format
    }
  })
}

export const configureRating = (number) => (dispatch) => {
  dispatch({
    type: CONFIGURE_RATING,
    payload: {
      number
    }
  })
}

export const editRatingLabel = (label, index) => (dispatch) => {
  dispatch({
    type: EDIT_RATING_LABEL,
    payload: {
      label,
      index
    }
  })
}

export const editNumberFormat = (format) => (dispatch) => {
  dispatch({
    type: EDIT_NUMBER_FORMAT,
    payload: format
  })
}

export const editMultiChoiceOptionsLabel = (label, index) => (dispatch) => {
  dispatch({
    type: EDIT_MULTICHOICE_OPTIONS_LABEL,
    payload: {
      label,
      index
    }
  })
}

export const deleteMultichoiceOption = (index) => (dispatch) => {
  dispatch({
    type: DELETE_MULTICHOICE_OPTION,
    payload: {
      index
    }
  })
}

export const addMultiChoiceOption = (withPhoto, label, url) => (dispatch) => {
  dispatch({
    type: ADD_MULTICHOICE_OPTION,
    payload: {
      label,
      url,
      withPhoto
    }
  })
}

export const addElementDescription = (description) => (dispatch) => {
  dispatch({
    type: ADD_ELEMENT_DESCRIPTION,
    payload: {
      description
    }
  })
}

export const editPlaceholder = (placeholder) => (dispatch) => {
  dispatch({
    type: EDIT_PLACEHOLDER,
    payload: {
      placeholder
    }
  })
}

export const addMultiChoiceWithPhotoOption = (index) => (dispatch) => {
  dispatch({
    type: ADD_MULTICHOICE_WITH_PHOTO_OPTION,
    payload: {
      index
    }
  })
}

export const toggleBooleanState = (state, name, id) => (dispatch) => {
  dispatch({
    type: TOGGLE_BOOLEAN,
    payload: {
      state,
      name,
      id
    }
  })
}

export const openFieldRules = () => (dispatch) => {
  dispatch({
    type: OPEN_FIELD_RULES
  })
}

export const closeFieldRules = () => (dispatch) => {
  dispatch({
    type: CLOSE_FIELD_RULES
  })
}

export const createNewForm = (formObject) => (dispatch) => {
  dispatch({
    type: ADD_NEW_FORM,
    payload: {
      formName: formObject.name,
      sector: formObject.sector !== undefined ? formObject.sector : '',
      purpose: formObject.reason !== undefined ? formObject.reason : ''
    }
  })
}

export const onRenameForm = (newName) => (dispatch) => {
  dispatch({
    type: RENAME_FORM,
    payload: {
      newName
    }
  })
}

export const addMaximumCharacters = (maxChars) => (dispatch) => {
  dispatch({
    type: ADD_MAX_CHARS,
    payload: {
      maxChars
    }
  })
}

export const addMinimumCharacters = (minChars) => (dispatch) => {
  dispatch({
    type: ADD_MIN_CHARS,
    payload: {
      minChars
    }
  })
}

export const clearMinimumCharacters = () => (dispatch) => {
  dispatch({
    type: CLEAR_MIN_LENGTH
  })
}

export const addMaximumRating = (number) => (dispatch) => {
  dispatch({
    type: ADD_MAX_RATING,
    payload: {
      number
    }
  })
}

export const clearMaximumRating = () => (dispatch) => {
  dispatch({
    type: CLEAR_MAX_LENGTH
  })
}

export const onAddNewNameForDuplicate = (newName, id) => (dispatch) => {
  dispatch({
    type: NEW_NAME_FOR_FORM_EDIT,
    payload: {
      newName,
      id
    }
  })
}

export const getFormDetailsToEdit = (id, callback) => (dispatch) => {
  dispatch({
    type: LOADING_SINGLE_FORM
  })
  axios
    .get(`/forms/${id}`)
    .then((response) => {
      if (response.data !== undefined && response.data.success === true) {
        dispatch({
          type: GET_FORM_TO_EDIT,
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
        type: LOADING_SINGLE_FORM_COMPLETED
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
        // 	type: GET_FORM_TO_EDIT,
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
        type: LOADING_SINGLE_FORM_COMPLETED
      })
      if (error.response !== undefined && error.response.data !== undefined) {
        // toast.error(error.response.data.error);
      }
    })
}

export const toggleWithPhoto = () => (dispatch) => {
  dispatch({
    type: TOGGLE_WITH_PHOTO
  })
}

export const toggleFormattedNumeric = () => (dispatch) => {
  dispatch({
    type: TOGGLE_FORMATTED_NUMERIC
  })
}

export const addRule = () => (dispatch) => {
  dispatch({
    type: ADD_RULE
  })
}

export const removeRule = () => (dispatch) => {
  dispatch({
    type: REMOVE_RULE
  })
}

export const setLogicOption = (index, value) => (dispatch) => {
  dispatch({
    type: SET_LOGIC_OPTION,
    payload: {
      index,
      value
    }
  })
}

export const setCondition = (index, value) => (dispatch) => {
  dispatch({
    type: SET_CONDITION,
    payload: {
      index,
      value
    }
  })
}

export const setLogicAction = (index, value) => (dispatch) => {
  dispatch({
    type: SET_LOGIC_ACTION,
    payload: {
      index,
      value
    }
  })
}

export const setLogicTarget = (index, value) => (dispatch) => {
  dispatch({
    type: SET_LOGIC_TARGET,
    payload: {
      index,
      value
    }
  })
}

export const setOtherwise = (value) => (dispatch) => {
  dispatch({
    type: SET_OTHERWISE,
    payload: {
      value
    }
  })
}

export const editAddress = (property, value) => (dispatch) => {
  dispatch({
    type: EDIT_ADDRESS,
    payload: {
      value,
      property
    }
  })
}
