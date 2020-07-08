import { formBuilderActionTypes } from '../../action-types/form-builder-actions.types'

export const addElement = (
  elementType,
  idExtension,
  label,
  readableName,
  format
) => (dispatch) => {
  let type = elementType
  let id = `${elementType}_${idExtension}`
  dispatch({
    type: formBuilderActionTypes.ADD_ELEMENT,
    payload: {
      type,
      id,
      format,
      readableName,
      label: label,
      description: ''
    }
  })
  dispatch({
    type: formBuilderActionTypes.SET_ACTIVE_ELEMENT,
    payload: {
      uniqueId: id
    }
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const addAddressElement = (
  elementType,
  idExtension,
  label,
  readableName,
  format
) => (dispatch) => {
  let type = elementType
  let id = `${elementType}_${idExtension}`
  dispatch({
    type: formBuilderActionTypes.ADD_ADDRESS_ELEMENT,
    payload: {
      type,
      id,
      format,
      readableName,
      label: label
    }
  })
  dispatch({
    type: formBuilderActionTypes.SET_ACTIVE_ELEMENT,
    payload: {
      uniqueId: id
    }
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const addFileUploadElement = (
  elementType,
  idExtension,
  label,
  readableName,
  format
) => (dispatch) => {
  let type = elementType
  let id = `${elementType}_${idExtension}`
  dispatch({
    type: formBuilderActionTypes.ADD_FILE_UPLOAD_ELEMENT,
    payload: {
      type,
      id,
      format,
      readableName,
      label: label
    }
  })
  dispatch({
    type: formBuilderActionTypes.SET_ACTIVE_ELEMENT,
    payload: {
      uniqueId: id
    }
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const addRatingElement = (
  elementType,
  idExtension,
  label,
  readableName
) => (dispatch) => {
  let type = elementType
  let id = `${elementType}_${idExtension}`
  dispatch({
    type: formBuilderActionTypes.ADD_RATING_ELEMENT,
    payload: {
      type,
      id,
      readableName,
      label: label,
      description: ''
    }
  })
  dispatch({
    type: formBuilderActionTypes.SET_ACTIVE_ELEMENT,
    payload: {
      uniqueId: id
    }
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const addMultichoiceElement = (
  elementType,
  idExtension,
  label,
  readableName
) => (dispatch) => {
  let type = elementType
  let id = `${elementType}_${idExtension}`
  dispatch({
    type: formBuilderActionTypes.ADD_MULTICHOICE_ELEMENT,
    payload: {
      type,
      id,
      readableName,
      label: label,
      withPhoto: false,
      options: [],
      description: ''
    }
  })
  dispatch({
    type: formBuilderActionTypes.SET_ACTIVE_ELEMENT,
    payload: {
      uniqueId: id
    }
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const addMultichoiceWithPhoto = (
  elementType,
  idExtension,
  label,
  readableName,
  format
) => (dispatch) => {
  let type = elementType
  let id = `${elementType}_${idExtension}`
  dispatch({
    type: formBuilderActionTypes.ADD_MULTICHOICE_WITH_PHOTO,
    payload: {
      type,
      id,
      format,
      readableName,
      label: label,
      description: ''
    }
  })
  dispatch({
    type: formBuilderActionTypes.SET_ACTIVE_ELEMENT,
    payload: {
      uniqueId: id
    }
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const addHybridGeolocation = (
  elementType,
  idExtension,
  label,
  readableName
) => (dispatch) => {
  let type = elementType
  let id = `${elementType}_${idExtension}`
  dispatch({
    type: formBuilderActionTypes.ADD_HYBRID_GEOLOCATION,
    payload: {
      type,
      id,
      readableName,
      label: label,
      description: ''
    }
  })
  dispatch({
    type: formBuilderActionTypes.SET_ACTIVE_ELEMENT,
    payload: {
      uniqueId: id
    }
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const addEmbeddedPhoto = (
  elementType,
  idExtension,
  label,
  readableName
) => (dispatch) => {
  let type = elementType
  let id = `${elementType}_${idExtension}`
  dispatch({
    type: formBuilderActionTypes.ADD_EMBEDDED_PHOTO,
    payload: {
      type,
      id,
      readableName,
      label: label,
      description: ''
    }
  })
  dispatch({
    type: formBuilderActionTypes.SET_ACTIVE_ELEMENT,
    payload: {
      uniqueId: id
    }
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const AddSinglePhoto = (
  elementType,
  idExtension,
  label,
  readableName
) => (dispatch) => {
  let type = elementType
  let id = `${elementType}_${idExtension}`
  dispatch({
    type: formBuilderActionTypes.ADD_SINGLE_PHOTO,
    payload: {
      type,
      id,
      readableName,
      label: label
    }
  })
  dispatch({
    type: formBuilderActionTypes.SET_ACTIVE_ELEMENT,
    payload: {
      uniqueId: id
    }
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const AddMultiPhoto = (
  elementType,
  idExtension,
  label,
  readableName
) => (dispatch) => {
  let type = elementType
  let id = `${elementType}_${idExtension}`
  dispatch({
    type: formBuilderActionTypes.ADD_MULTI_PHOTO,
    payload: {
      type,
      id,
      readableName,
      label: label
    }
  })
  dispatch({
    type: formBuilderActionTypes.SET_ACTIVE_ELEMENT,
    payload: {
      uniqueId: id
    }
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const addNumberElement = (
  elementType,
  idExtension,
  label,
  readableName,
  format
) => (dispatch) => {
  let type = elementType
  let id = `${elementType}_${idExtension}`
  dispatch({
    type: formBuilderActionTypes.ADD_NUMBER_ELEMENT,
    payload: {
      type,
      id,
      format,
      readableName,
      label: label,
      description: ''
    }
  })
  dispatch({
    type: formBuilderActionTypes.SET_ACTIVE_ELEMENT,
    payload: {
      uniqueId: id
    }
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}

export const reOderCurrentView = (currentPage, currentView) => (dispatch) => {
  dispatch({
    type: formBuilderActionTypes.REORDER_CURRENT_VIEW,
    payload: {
      currentPage,
      currentView
    }
  })
  dispatch({
    type: formBuilderActionTypes.UPDATE_ELEMENT_VIEW
  })
}
