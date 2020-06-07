import { replaceElementTypes } from '../../action-types/replace-elements.types'
import {
  SET_ACTIVE_ELEMENT,
  UPDATE_ELEMENT_VIEW
} from '../../action-types/form-builder-actions.types'
import uid from 'uid'

export const replaceElement = (elementType, index, activePage) => (
  dispatch
) => {
  let type = elementType
  let id = `${elementType}_${uid(7)}`
  if (
    elementType === 'shortText' ||
    elementType === 'multiLine' ||
    elementType === 'agreement' ||
    elementType === 'phoneNumber' ||
    elementType === 'areaMap' ||
    elementType === 'locationMap' ||
    elementType === 'biometric' ||
    elementType === 'date' ||
    elementType === 'links' ||
    elementType === 'time' ||
    elementType === 'defaultText' ||
    elementType === 'email'
  ) {
    dispatch({
      type: replaceElementTypes.REPLACE_ELEMENT,
      payload: {
        format: 'text',
        readableName: 'short text',
        label: 'Short Text',
        type: type,
        unique_id: id,
        pos: index,
        label: '',
        enabled: true,
        hint: '',
        hidden: false,
        maxLength: '',
        minLength: '',
        isMandatory: false,
        placeholder: ''
      },
      index,
      activePage
    })
  } else if (elementType === 'address') {
    dispatch({
      type: replaceElementTypes.REPLACE_ELEMENT,
      payload: {
        type: type,
        unique_id: id,
        pos: index,
        label: '',
        enabled: true,
        hidden: false,
        isMandatory: false,
        houseNumber: '',
        streetAddress: '',
        nearestLandMark: ''
      },
      index,
      activePage
    })
  } else if (elementType === 'fileUpload' || elementType === 'imageCapture') {
    dispatch({
      type: replaceElementTypes.REPLACE_ELEMENT,
      payload: {
        type: type,
        unique_id: id,
        pos: index,
        label: '',
        hidden: false,
        enabled: true,
        isMandatory: false,
        multipleUpload: false
      },
      index,
      activePage
    })
  } else if (elementType === 'multiChoice' || elementType === 'singleChoice') {
    dispatch({
      type: replaceElementTypes.REPLACE_ELEMENT,
      payload: {
        type: type,
        unique_id: id,
        pos: index,
        label: '',
        enabled: true,
        hidden: false,
        hint: '',
        withPhoto: false,
        isMandatory: false,
        options: [],
        logics: [{ condition: '', values: [], action: '', target: '' }]
      },
      index,
      activePage
    })
  } else if (elementType === 'number') {
    dispatch({
      type: replaceElementTypes.REPLACE_ELEMENT,
      payload: {
        type: type,
        unique_id: id,
        pos: index,
        label: '',
        enabled: true,
        hidden: false,
        formattedNumeric: false,
        format: '',
        maxLength: '',
        minLength: '',
        isMandatory: false
      },
      index,
      activePage
    })
  } else if (elementType === 'rating') {
    dispatch({
      type: replaceElementTypes.REPLACE_ELEMENT,
      payload: {
        type: type,
        unique_id: id,
        pos: index,
        label: '',
        hidden: false,
        enabled: true,
        isMandatory: false,
        rules: [],
        ratings: [
          { label: 'label 1' },
          { label: 'label 2' },
          { label: 'label 3' },
          { label: 'label 4' }
        ],
        numOfRatings: 4,
        selected: false
      },
      index,
      activePage
    })
  }
  dispatch({
    type: SET_ACTIVE_ELEMENT,
    payload: {
      uniqueId: id
    }
  })
  dispatch({
    type: UPDATE_ELEMENT_VIEW
  })
}
