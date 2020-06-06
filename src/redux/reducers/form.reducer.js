import {
  ADD_ELEMENT,
  CHANGE_FORM_NAME,
  CHANGE_FORM_DESCRIPTION,
  ADD_PAGE,
  DELETE_PAGE,
  SET_ACTIVE_PAGE,
  ADD_SECTION,
  SET_ACTIVE_SECTION,
  DELETE_SECTION,
  UPDATE_ELEMENT_VIEW,
  SET_ACTIVE_ELEMENT,
  DELETE_ELEMENT,
  EDIT_ELEMENT_LABEL,
  ADD_ELEMENT_DESCRIPTION,
  ADD_ELEMENT_HINT,
  ADD_ELEMENT_FORMAT,
  ADD_RATING_ELEMENT,
  CONFIGURE_RATING,
  EDIT_RATING_LABEL,
  ADD_MULTICHOICE_ELEMENT,
  EDIT_MULTICHOICE_OPTIONS_LABEL,
  ADD_MULTICHOICE_OPTION,
  DELETE_MULTICHOICE_OPTION,
  ADD_MULTICHOICE_WITH_PHOTO_OPTION,
  ADD_HYBRID_GEOLOCATION,
  TOGGLE_BOOLEAN,
  ADD_EMBEDDED_PHOTO,
  ADD_SINGLE_PHOTO,
  ADD_MULTI_PHOTO,
  OPEN_FIELD_RULES,
  CLOSE_FIELD_RULES,
  ADD_MULTICHOICE_WITH_PHOTO,
  ADD_NEW_FORM,
  RENAME_FORM,
  ADD_MAX_CHARS,
  ADD_MIN_CHARS,
  ADD_MAX_RATING,
  GET_ALL_FORMS,
  LOADING_ALL_FORMS,
  LOADING_ALL_FORMS_COMPLETED,
  GET_SINGLE_FORM_DETAIL,
  NEW_NAME_FOR_FORM_EDIT,
  GET_FORM_TO_EDIT,
  PREVIEW_SINGLE_FORM,
  LOADING_SINGLE_FORM,
  LOADING_SINGLE_FORM_COMPLETED,
  SAVING_FORM,
  SAVE_FORM,
  LOADING,
  LOADING_COMPLETE,
  INPUT_NEW_FORM_NAME,
  GET_SINGLE_FORM,
  TOGGLE_WITH_PHOTO,
  ADD_RULE,
  REMOVE_RULE,
  SET_LOGIC_OPTION,
  SET_CONDITION,
  SET_VALUE,
  SET_JUMP_TO,
  SET_OTHERWISE,
  EDIT_PLACEHOLDER,
  QUICK_DISPATCH_NAME,
  QUICK_DISPATCH_START_DATE,
  QUICK_DISPATCH_DUE_DATE,
  QUICK_DISPATCH_PROJECT,
  QUICK_DISPATCH_FORM,
  SAVING_FORM_COMPLETED,
  QUICK_NUMBER_OF_ENTRIES,
  SHOW_LINK,
  CLEAR_MAX_LENGTH,
  CLEAR_MIN_LENGTH,
  ADD_NUMBER_ELEMENT,
  TOGGLE_FORMATTED_NUMERIC,
  EDIT_NUMBER_FORMAT,
  SET_LOGIC_ACTION,
  SET_LOGIC_TARGET,
  ADD_FILE_UPLOAD_ELEMENT,
  ADD_ADDRESS_ELEMENT,
  EDIT_ADDRESS,
  QUICK_DISPATCH_PROJECT_ID,
  REORDER_CURRENT_VIEW,
  DUPLICATE_ELEMENT
} from '../action-types/form-builder-actions.types'
import { replaceElementTypes } from '../action-types/replace-elements.types'

const INITIAL_STATE = {
  allFormsCreated: [],
  formsCount: 0,
  loadingForms: false,
  generatedLink: '',
  savingForm: false,
  loadingPreview: false,
  currentForm: {},
  activeForm: {},
  name: 'sample',
  formPreview: {},
  description: '',
  sector: '',
  purpose: '',
  openFieldRules: false,
  activeElement: '',
  activePage: 'Page 1',
  activeSection: 'Section 1',
  formdata: [{ label: 'Page 1', pos: '1', elements: [] }],
  data: [],
  currentView: [],
  fetchedFormToEdit: false,
  loading: false,
  quickDispatch: {
    name: '',
    startDate: '',
    dueDate: '',
    form: '',
    project: '',
    projectId: '',
    totalExpectedEntries: ''
  }
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_ELEMENT:
      let updatedState = [...state.formdata]
      updatedState.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.push({
            type: action.payload.type,
            unique_id: action.payload.id,
            pos: page.elements.length,
            label: '',
            enabled: true,
            hint: '',
            hidden: false,
            maxLength: '',
            minLength: '',
            description: action.payload.description,
            isMandatory: false,
            format: action.payload.format,
            placeholder: ''
          })
        }
      })
      return {
        ...state,
        formdata: updatedState
      }
      break

    case DUPLICATE_ELEMENT:
      let elementArrayToAddDuplicate = [...state.formdata]
      elementArrayToAddDuplicate[action.payload.page - 1].elements.splice(
        action.payload.index + 1,
        0,
        {
          ...action.payload.element,
          unique_id: action.payload.newId
        }
      )
      return {
        ...state,
        formdata: elementArrayToAddDuplicate
      }
      break

    case REORDER_CURRENT_VIEW:
      let latestFormOrder = [...state.formdata]
      latestFormOrder.map((page, i) => {
        if (action.payload.currentPage === page.label) {
          page.elements = action.payload.currentView
        }
      })
      return {
        ...state,
        currentView: action.payload.currentView,
        formdata: latestFormOrder
      }
      break

    case ADD_ADDRESS_ELEMENT:
      let toUpdateAddress = [...state.formdata]
      toUpdateAddress.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.push({
            type: action.payload.type,
            unique_id: action.payload.id,
            pos: page.elements.length,
            label: '',
            enabled: true,
            hidden: false,
            isMandatory: false,
            houseNumber: '',
            streetAddress: '',
            nearestLandMark: ''
          })
        }
      })
      return {
        ...state,
        formdata: toUpdateAddress
      }
      break

    case ADD_FILE_UPLOAD_ELEMENT:
      let stateToAddFileUpload = [...state.formdata]
      stateToAddFileUpload.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.push({
            type: action.payload.type,
            unique_id: action.payload.id,
            pos: page.elements.length,
            label: '',
            hidden: false,
            enabled: true,
            isMandatory: false,
            format: action.payload.format,
            multipleUpload: false
          })
        }
      })
      return {
        ...state,
        formdata: stateToAddFileUpload
      }
      break

    case ADD_NUMBER_ELEMENT:
      let initialStateToUpdateNumber = [...state.formdata]
      initialStateToUpdateNumber.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.push({
            type: action.payload.type,
            unique_id: action.payload.id,
            pos: page.elements.length,
            label: '',
            enabled: true,
            hidden: false,
            hint: '',
            formattedNumeric: false,
            format: '',
            maxLength: '',
            minLength: '',
            description: action.payload.description,
            isMandatory: false,

            type: action.payload.format,
            placeholder: ''
          })
        }
      })
      return {
        ...state,
        formdata: initialStateToUpdateNumber
      }
      break

    case ADD_RATING_ELEMENT:
      let stateToUpdate = [...state.formdata]
      stateToUpdate.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.push({
            type: action.payload.type,
            unique_id: action.payload.id,
            pos: page.elements.length,
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
            selected: false,
            settings: {}
          })
        }
      })
      return {
        ...state,
        formdata: stateToUpdate
      }
      break
    case CHANGE_FORM_NAME:
      return {
        ...state,
        name: action.payload.name
      }
      break
    case CHANGE_FORM_DESCRIPTION:
      return {
        ...state,
        description: action.payload.description
      }
      break
    case SET_ACTIVE_ELEMENT:
      return {
        ...state,
        activeElement: action.payload.uniqueId
      }
      break
    case ADD_PAGE:
      let tempPages = state.formdata
      tempPages.push(action.payload)
      return {
        ...state,
        formdata: tempPages
      }
      break
    case DELETE_PAGE:
      let newForm = [] //form after deletion
      let deletePageArray = state.formdata
      let index = action.payload
      deletePageArray.splice(index, 1)
      deletePageArray.map((newPage) => {
        newPage.label = `Page ${newForm.length + 1}`
        newPage.pos = `Page ${newForm.length + 1}`
        newForm.push(newPage)
      })
      return {
        ...state,
        formdata: newForm,
        activeSection: 'Section 1'
      }
      break
    case replaceElementTypes.REPLACE_ELEMENT:
      let stateToReplaceElement = [...state.formdata]
      stateToReplaceElement.map((elem, i) => {
        if (elem.label === action.activePage) {
          elem.elements.splice(action.index, 1, action.payload)
          // console.log("replace", action.payload);
        }
      })
      // console.log("replace", action.payload, action.index, action.activePage);
      return {
        ...state
      }
      break
    case RENAME_FORM:
      return {
        ...state,
        name: action.payload.newName
      }
      break

    case SET_ACTIVE_PAGE:
      let newActivePage = action.payload
      let formatPayload = parseInt(action.payload.split(' ')[1])
      if (state.formdata.length < formatPayload) {
        newActivePage = 'Page 1'
      }
      return {
        ...state,
        activePage: newActivePage,
        activeSection: 'Section 1'
      }
      break
    case ADD_SECTION:
      let addSectionToPage = state.formdata.filter((match) => {
        return match.label == state.activePage
      })
      let sectionToAdd = addSectionToPage[0].sections
      sectionToAdd.push(action.payload.section)
      return {
        ...state
      }
      break

    case SET_ACTIVE_SECTION:
      let newActiveSection = action.payload
      let pageForTargetSection = ''
      let extractForm = [...state.formdata]
      extractForm.map((page, i) => {
        if (page.label === state.activePage) {
          pageForTargetSection = page
        }
      })
      if (
        pageForTargetSection.sections.length <
        parseInt(action.payload.split(' ')[1])
      ) {
        newActiveSection = 'Section 1'
      }
      return {
        ...state,
        activeSection: newActiveSection
      }
      break
    case DELETE_SECTION:
      let newFormAfterSectionDelete = []
      let newSectionAfterDelete = []
      let PageToDeleteSection = {}
      let tempForm = state.formdata
      tempForm.map((page) => {
        if (page.label === state.activePage) {
          PageToDeleteSection = page
        }
      })
      PageToDeleteSection.sections.filter((match) => {
        return match.label != action.payload
      })
      if (PageToDeleteSection.sections.length > 1) {
        PageToDeleteSection.sections.splice(action.payload, 1)
      }
      PageToDeleteSection.sections.map((section, i) => {
        section.label = `Section ${i + 1}`
        section.pos = i + 1
        newSectionAfterDelete.push(section)
      })
      return {
        ...state,
        formdata: tempForm,
        activeSection: 'Section 1'
      }
      break
    case UPDATE_ELEMENT_VIEW:
      let tempView = [...state.formdata]
      let currenetElementsView = []
      tempView.map((targetPage, i) => {
        if (
          targetPage.label === state.activePage &&
          targetPage.elements.length > 0
        ) {
          targetPage.elements.map((targetElement, i) => {
            currenetElementsView.push(targetElement)
          })
        }
      })
      return {
        ...state,
        currentView: currenetElementsView
      }
      break
    case DELETE_ELEMENT:
      let getFormData = [...state.formdata]
      let formAfterDelete = []
      getFormData.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.splice(action.payload.index, 1)
          page.elements.map((item, i) => {
            item.pos = i
          })
        }
      })
      return {
        ...state,
        formdata: getFormData
      }
      break
    case EDIT_ELEMENT_LABEL:
      let formToEditLabel = [...state.formdata]
      formToEditLabel.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.label = action.payload.label
            }
          })
        }
      })
      return {
        ...state,
        formdata: formToEditLabel
      }
      break

    case EDIT_ADDRESS:
      let toEditAddress = [...state.formdata]
      toEditAddress.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element[action.payload.property] = action.payload.value
            }
          })
        }
      })
      return {
        ...state,
        formdata: toEditAddress
      }
      break

    case EDIT_NUMBER_FORMAT:
      let formToEditNumberFormat = [...state.formdata]
      formToEditNumberFormat.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.format = action.payload
            }
          })
        }
      })
      return {
        ...state,
        formdata: formToEditNumberFormat
      }
      break

    case EDIT_RATING_LABEL:
      let formToEditRatingLabel = [...state.formdata]
      formToEditRatingLabel.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.ratings[action.payload.index].label = action.payload.label
            }
          })
        }
      })
      return {
        ...state,
        formdata: formToEditRatingLabel
      }
      break

    case ADD_MAX_CHARS:
      let formToAddMaxChars = [...state.formdata]
      formToAddMaxChars.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.maxLength = action.payload.maxChars
            }
          })
        }
      })
      return {
        ...state,
        formdata: formToAddMaxChars
      }
      break

    case ADD_MIN_CHARS:
      let formToAddMinChars = [...state.formdata]
      formToAddMinChars.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.minLength = action.payload.minChars
            }
          })
        }
      })
      return {
        ...state,
        formdata: formToAddMinChars
      }
      break

    case CLEAR_MIN_LENGTH:
      let formToClearMinChars = [...state.formdata]
      formToClearMinChars.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.minLength = ''
            }
          })
        }
      })
      return {
        ...state,
        formdata: formToClearMinChars
      }
      break

    case ADD_MAX_RATING:
      let formToAddMaxRating = [...state.formdata]
      formToAddMaxRating.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.ratings = []
              if (
                action.payload.number <= 0 ||
                action.payload.number === null
              ) {
                element.ratings = []
              } else {
                for (let x = 0; x < action.payload.number; x++) {
                  element.ratings.push({ label: `label ${x}` })
                }
                element.numOfRatings = parseInt(action.payload.number)
              }
            }
          })
        }
      })
      return {
        ...state,
        formdata: formToAddMaxRating
      }
      break

    case ADD_ELEMENT_HINT:
      let elementToEditHint = [...state.formdata]
      elementToEditHint.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.hint = action.payload.hint
            }
          })
        }
      })
      return {
        ...state,
        formdata: elementToEditHint
      }
      break

    case EDIT_PLACEHOLDER:
      let elementToEditPlaceholder = [...state.formdata]
      elementToEditPlaceholder.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.placeholder = action.payload.placeholder
            }
          })
        }
      })
      return {
        ...state,
        formdata: elementToEditPlaceholder
      }
      break

    case ADD_ELEMENT_DESCRIPTION:
      let elementToAddDescription = [...state.formdata]
      elementToAddDescription.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.description = action.payload.description
            }
          })
        }
      })
      return {
        ...state,
        formdata: elementToAddDescription
      }
      break

    case ADD_ELEMENT_FORMAT:
      let elementToAddFormat = state.formdata
      elementToAddFormat.map((page, i) => {
        if (page.label === state.activePage) {
          page.sections.map((section, i) => {
            if (section.label === state.activeSection) {
              section.elements.map((element, i) => {
                if (element.unique_id === state.activeElement) {
                  element.format = action.payload.format
                }
              })
            }
          })
        }
      })
      return {
        ...state,
        formdata: elementToAddFormat
      }
      break

    case ADD_MULTICHOICE_ELEMENT:
      let stateToAddMultichoice = [...state.formdata]
      stateToAddMultichoice.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.push({
            type: action.payload.type,
            unique_id: action.payload.id,
            pos: page.elements.length,
            label: '',
            enabled: true,
            other: false,
            hidden: false,
            hint: '',
            withPhoto: false,
            isMandatory: false,
            options: [],
            logics: [{ condition: '', values: [], action: '', target: '' }]
          })
        }
      })
      return {
        ...state,
        formdata: stateToAddMultichoice
      }
      break

    case TOGGLE_WITH_PHOTO:
      let stateToToggleWithPhoto = [...state.formdata]
      stateToToggleWithPhoto.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.withPhoto = !element.withPhoto
              element.options = []
            }
          })
        }
      })
      return {
        ...state,
        formdata: stateToToggleWithPhoto
      }
      break

    case TOGGLE_FORMATTED_NUMERIC:
      let stateToToggleFormattedNumeric = [...state.formdata]
      stateToToggleFormattedNumeric.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.formattedNumeric = !element.formattedNumeric
              if (element.formattedNumeric === false) {
                element.format = ''
              }
            }
          })
        }
      })
      return {
        ...state,
        formdata: stateToToggleFormattedNumeric
      }
      break

    case ADD_RULE:
      let formDataToAddRule = [...state.formdata]
      formDataToAddRule.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.logics.push({
                condition: '',
                values: [],
                action: '',
                target: ''
              })
            }
          })
        }
      })
      return {
        ...state,
        formdata: formDataToAddRule
      }
      break

    case REMOVE_RULE:
      let formDataToRemoveRule = [...state.formdata]
      formDataToRemoveRule.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              if (element.logics.length > 1) {
                element.logics.pop()
              }
            }
          })
        }
      })
      return {
        ...state,
        formdata: formDataToRemoveRule
      }
      break

    case SET_LOGIC_OPTION:
      let formToAddSelected = [...state.formdata]
      formToAddSelected.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.logics[action.payload.index].value = action.payload.value
            }
          })
        }
      })
      return {
        ...state,
        formdata: formToAddSelected
      }
      break

    case SET_CONDITION:
      let formToAddCondition = [...state.formdata]
      formToAddCondition.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.logics[action.payload.index].condition =
                action.payload.value
            }
          })
        }
      })
      return {
        ...state,
        formdata: formToAddCondition
      }
      break

    case SET_LOGIC_ACTION:
      let formToSetValue = [...state.formdata]
      formToSetValue.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.logics[action.payload.index].action = action.payload.value
            }
          })
        }
      })
      return {
        ...state,
        formdata: formToSetValue
      }
      break

    case SET_LOGIC_TARGET:
      let formToSetJump = [...state.formdata]
      formToSetJump.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.logics[action.payload.index].target = action.payload.value
            }
          })
        }
      })
      return {
        ...state,
        formdata: formToSetJump
      }
      break

    case SET_OTHERWISE:
      let formToSEtOtherwise = [...state.formdata]
      formToSEtOtherwise.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.logic.otherwise = action.payload.value
            }
          })
        }
      })
      return {
        ...state,
        formdata: formToSEtOtherwise
      }
      break

    case ADD_MULTICHOICE_WITH_PHOTO:
      let stateToAddMultichoiceWithPhoto = [...state.formdata]
      stateToAddMultichoiceWithPhoto.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.push({
            type: action.payload.type,
            unique_id: action.payload.id,
            pos: page.elements.length,
            label: '',
            enabled: true,
            hidden: false,
            hint: '',
            isMandatory: false,
            options: [],
            logic: []
          })
        }
      })
      return {
        ...state,
        formdata: stateToAddMultichoiceWithPhoto
      }
      break

    case EDIT_MULTICHOICE_OPTIONS_LABEL:
      let formBeforeEditMultichoiceOptionLabel = state.formdata
      formBeforeEditMultichoiceOptionLabel.map((page, i) => {
        if (page.label === state.activePage) {
          page.sections.map((section, i) => {
            if (section.label === state.activeSection) {
              section.elements.map((element, i) => {
                if (element.unique_id === state.activeElement) {
                  element.options[action.payload.index].label =
                    action.payload.label
                }
              })
            }
          })
        }
      })
      return {
        ...state,
        formdata: formBeforeEditMultichoiceOptionLabel
      }
      break

    case ADD_MULTICHOICE_OPTION:
      let formToAddMultichoiceOption = [...state.formdata]
      formToAddMultichoiceOption.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              if (action.payload.withPhoto === true) {
                element.options.push({
                  label: action.payload.label,
                  url: action.payload.url
                })
              } else {
                element.options.push({ label: action.payload.label })
              }
            }
          })
        }
      })
      return {
        ...state,
        formdata: formToAddMultichoiceOption
      }
      break

    case DELETE_MULTICHOICE_OPTION:
      let formToDeleteMultichoiceOPtion = [...state.formdata]
      formToDeleteMultichoiceOPtion.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.options.splice(action.payload.index, 1)
            }
          })
        }
      })
      return {
        ...state,
        formdata: formToDeleteMultichoiceOPtion
      }
      break

    case ADD_MULTICHOICE_WITH_PHOTO_OPTION:
      let formToAddMultichoiceOptionWithPhoto = [...state.formdata]
      formToAddMultichoiceOptionWithPhoto.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === state.activeElement) {
              element.options.push({
                label: `option ${action.payload.index}`,
                file: ''
              })
            }
          })
        }
      })
      return {
        ...state,
        formdata: formToAddMultichoiceOptionWithPhoto
      }
      break

    case TOGGLE_BOOLEAN:
      let formToEditGeoData = [...state.formdata]
      formToEditGeoData.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.map((element, i) => {
            if (element.unique_id === action.payload.id) {
              let name = action.payload.name
              element[name] = action.payload.state
            }
          })
        }
      })
      return {
        ...state,
        formdata: formToEditGeoData
      }
      break
    case ADD_EMBEDDED_PHOTO:
      let stateToAddEmbeddedPhoto = state.formdata
      stateToAddEmbeddedPhoto.map((page, i) => {
        if (page.label === state.activePage) {
          page.sections.map((section, i) => {
            if (section.label === state.activeSection) {
              section.elements.push({
                type: action.payload.type,
                unique_id: action.payload.id,
                pos: section.elements.length,
                label: action.payload.label,
                enabled: true,
                hidden: false,
                file: '',
                quality: '',
                isMandatory: false,
                rules: [],
                selected: false
              })
            }
          })
        }
      })
      return {
        ...state,
        formdata: stateToAddEmbeddedPhoto
      }
      break

    case ADD_SINGLE_PHOTO:
      let stateToAddSinglePhoto = state.formdata
      stateToAddSinglePhoto.map((page, i) => {
        if (page.label === state.activePage) {
          page.sections.map((section, i) => {
            if (section.label === state.activeSection) {
              section.elements.push({
                type: action.payload.type,
                unique_id: action.payload.id,
                pos: section.elements.length,
                label: '',
                enabled: true,
                hidden: false,
                quality: '',
                isMandatory: false,
                rules: [],
                selected: false
              })
            }
          })
        }
      })
      return {
        ...state,
        formdata: stateToAddSinglePhoto
      }
      break
    case ADD_MULTI_PHOTO:
      let stateToAddMultiPhoto = state.formdata
      stateToAddMultiPhoto.map((page, i) => {
        if (page.label === state.activePage) {
          page.elements.push({
            type: action.payload.type,
            unique_id: action.payload.id,
            pos: page.elements.length,
            label: '',
            enabled: true,
            hidden: false,
            quality: '',
            isMandatory: false,
            rules: [],
            selected: false
          })
        }
      })
      return {
        ...state,
        formdata: stateToAddMultiPhoto
      }
      break

    case OPEN_FIELD_RULES:
      return {
        ...state,
        openFieldRules: true
      }
      break
    case CLOSE_FIELD_RULES:
      return {
        ...state,
        openFieldRules: false
      }
      break

    case ADD_NEW_FORM:
      return {
        ...state,
        name: action.payload.formName,
        sector: action.payload.sector,
        purpose: action.payload.purpose,
        formdata: [{ label: 'Page 1', pos: '1', elements: [] }]
      }
      break

    case LOADING_ALL_FORMS:
      return {
        ...state,
        loadingForms: true
      }
      break
    case LOADING_ALL_FORMS_COMPLETED:
      return {
        ...state,
        loadingForms: false
      }
      break

    case GET_ALL_FORMS:
      return {
        ...state,
        allFormsCreated: action.payload.forms,
        formsCount: action.payload.formsCount
      }
      break

    case GET_SINGLE_FORM_DETAIL:
      const { form } = action.payload
      return {
        ...state,
        currentForm: form,
        formdata: form.formData,
        name: form.name,
        reason: form.reason,
        purpose: form.purpose,
        sector: form.sector,
        fetchedFormToEdit: true,
        currentView: formData.formData[0].elements
      }
      break

    case NEW_NAME_FOR_FORM_EDIT:
      return {
        ...state,
        name: action.payload.newName
      }
      break

    case GET_FORM_TO_EDIT:
      const { formData } = action.payload
      let quickDispatchFormAdded = { ...state.quickDispatch }
      quickDispatchFormAdded.form = formData._id
      return {
        ...state,
        activeForm: formData,
        formdata: formData.formData,
        name: formData.name,
        purpose: formData.reason,
        sector: formData.sector,
        quickDispatch: quickDispatchFormAdded,
        currentView:
          formData.formData.length > 0 ? formData.formData[0].elements : []
      }
      break

    case PREVIEW_SINGLE_FORM:
      return {
        ...state,
        formPreview: action.payload.form
      }
      break

    case LOADING_SINGLE_FORM:
      return {
        ...state,
        loadingPreview: true
      }
      break

    case LOADING_SINGLE_FORM_COMPLETED:
      return {
        ...state,
        loadingPreview: false
      }
      break

    case SAVING_FORM:
      return {
        ...state,
        savingForm: true
      }
      break
    case SAVING_FORM_COMPLETED:
      return {
        ...state,
        savingForm: false
      }
      break

    case SAVE_FORM:
      let quickDispatchFormAddedOnSave = { ...state.quickDispatch }
      quickDispatchFormAddedOnSave.form = action.payload.activeForm._id
      return {
        ...state,
        activeForm: action.payload.activeForm,
        quickDispatch: quickDispatchFormAddedOnSave
      }
      break

    case LOADING:
      return {
        ...state,
        loading: true
      }
      break

    case LOADING_COMPLETE:
      return {
        ...state,
        loading: false
      }
      break
    case INPUT_NEW_FORM_NAME:
      return {
        ...state,
        name: action.payload.name
      }
      break
    case GET_SINGLE_FORM:
      return {
        ...state,
        formPreview: action.payload.form
      }
      break

    case SHOW_LINK:
      return {
        ...state,
        generatedLink: action.payload.link
      }
      break

    case QUICK_DISPATCH_NAME:
      let quickNameEdit = { ...state.quickDispatch }
      quickNameEdit.name = action.payload.name
      return {
        ...state,
        quickDispatch: quickNameEdit,
        generatedLink: ''
      }
      break

    case QUICK_DISPATCH_PROJECT:
      let quickProjectNameAdded = { ...state.quickDispatch }
      quickProjectNameAdded.project = action.payload.name
      quickProjectNameAdded.projectId = ''
      return {
        ...state,
        quickDispatch: quickProjectNameAdded
      }
      break

    case QUICK_DISPATCH_PROJECT_ID:
      let quickProjectIdAdded = { ...state.quickDispatch }
      quickProjectIdAdded.projectId = action.payload.id
      quickProjectIdAdded.project = ''
      return {
        ...state,
        quickDispatch: quickProjectIdAdded
      }
      break

    case QUICK_NUMBER_OF_ENTRIES:
      let numberOfEntriesAdded = { ...state.quickDispatch }
      numberOfEntriesAdded.totalExpectedEntries = parseInt(
        action.payload.number
      )
      return {
        ...state,
        quickDispatch: numberOfEntriesAdded
      }
      break

    case QUICK_DISPATCH_START_DATE:
      let quickDispatchStartDateAdded = { ...state.quickDispatch }
      let formattedStartDate = new Date(action.payload.date).toISOString()
      quickDispatchStartDateAdded.startDate = formattedStartDate
      return {
        ...state,
        quickDispatch: quickDispatchStartDateAdded
      }
      break

    default:
      return state
      break
  }
}
