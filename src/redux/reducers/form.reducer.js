import { formBuilderActionTypes } from '../action-types/form-builder-actions.types'
import { replaceElementTypes } from '../action-types/replace-elements.types'

const INITIAL_STATE = {
  name: '',
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
  currentView: []
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case formBuilderActionTypes.ADD_ELEMENT:
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

    case formBuilderActionTypes.DUPLICATE_ELEMENT:
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

    case formBuilderActionTypes.REORDER_CURRENT_VIEW:
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

    case formBuilderActionTypes.ADD_ADDRESS_ELEMENT:
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

    case formBuilderActionTypes.ADD_FILE_UPLOAD_ELEMENT:
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

    case formBuilderActionTypes.ADD_NUMBER_ELEMENT:
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

    case formBuilderActionTypes.ADD_RATING_ELEMENT:
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
    case formBuilderActionTypes.CHANGE_FORM_NAME:
      return {
        ...state,
        name: action.payload.name
      }
      break
    case formBuilderActionTypes.CHANGE_FORM_DESCRIPTION:
      return {
        ...state,
        description: action.payload.description
      }
      break
    case formBuilderActionTypes.SET_ACTIVE_ELEMENT:
      return {
        ...state,
        activeElement: action.payload.uniqueId
      }
      break
    case formBuilderActionTypes.ADD_PAGE:
      let tempPages = state.formdata
      tempPages.push(action.payload)
      return {
        ...state,
        formdata: tempPages
      }
      break
    case formBuilderActionTypes.DELETE_PAGE:
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

      return {
        ...state
      }
      break
    case formBuilderActionTypes.RENAME_FORM:
      return {
        ...state,
        name: action.payload.newName
      }
      break

    case formBuilderActionTypes.SET_ACTIVE_PAGE:
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
    case formBuilderActionTypes.ADD_SECTION:
      let addSectionToPage = state.formdata.filter((match) => {
        return match.label == state.activePage
      })
      let sectionToAdd = addSectionToPage[0].sections
      sectionToAdd.push(action.payload.section)
      return {
        ...state
      }
      break

    case formBuilderActionTypes.SET_ACTIVE_SECTION:
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
    case formBuilderActionTypes.DELETE_SECTION:
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
    case formBuilderActionTypes.UPDATE_ELEMENT_VIEW:
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
    case formBuilderActionTypes.DELETE_ELEMENT:
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
    case formBuilderActionTypes.EDIT_ELEMENT_LABEL:
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

    case formBuilderActionTypes.EDIT_ADDRESS:
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

    case formBuilderActionTypes.EDIT_NUMBER_FORMAT:
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

    case formBuilderActionTypes.EDIT_RATING_LABEL:
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

    case formBuilderActionTypes.ADD_MAX_CHARS:
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

    case formBuilderActionTypes.ADD_MIN_CHARS:
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

    case formBuilderActionTypes.CLEAR_MIN_LENGTH:
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

    case formBuilderActionTypes.ADD_MAX_RATING:
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

    case formBuilderActionTypes.ADD_ELEMENT_HINT:
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

    case formBuilderActionTypes.EDIT_PLACEHOLDER:
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

    case formBuilderActionTypes.ADD_ELEMENT_DESCRIPTION:
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

    case formBuilderActionTypes.ADD_ELEMENT_FORMAT:
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

    case formBuilderActionTypes.ADD_MULTICHOICE_ELEMENT:
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

    case formBuilderActionTypes.TOGGLE_WITH_PHOTO:
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

    case formBuilderActionTypes.TOGGLE_FORMATTED_NUMERIC:
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

    case formBuilderActionTypes.ADD_RULE:
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

    case formBuilderActionTypes.REMOVE_RULE:
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

    case formBuilderActionTypes.SET_LOGIC_OPTION:
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

    case formBuilderActionTypes.SET_CONDITION:
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

    case formBuilderActionTypes.SET_LOGIC_ACTION:
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

    case formBuilderActionTypes.SET_LOGIC_TARGET:
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

    case formBuilderActionTypes.SET_OTHERWISE:
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

    case formBuilderActionTypes.ADD_MULTICHOICE_WITH_PHOTO:
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

    case formBuilderActionTypes.EDIT_MULTICHOICE_OPTIONS_LABEL:
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

    case formBuilderActionTypes.ADD_MULTICHOICE_OPTION:
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

    case formBuilderActionTypes.DELETE_MULTICHOICE_OPTION:
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

    case formBuilderActionTypes.ADD_MULTICHOICE_WITH_PHOTO_OPTION:
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

    case formBuilderActionTypes.TOGGLE_BOOLEAN:
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
    case formBuilderActionTypes.ADD_EMBEDDED_PHOTO:
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

    case formBuilderActionTypes.ADD_SINGLE_PHOTO:
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
    case formBuilderActionTypes.ADD_MULTI_PHOTO:
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

    case formBuilderActionTypes.OPEN_FIELD_RULES:
      return {
        ...state,
        openFieldRules: true
      }
      break
    case formBuilderActionTypes.CLOSE_FIELD_RULES:
      return {
        ...state,
        openFieldRules: false
      }
      break

    case formBuilderActionTypes.ADD_NEW_FORM:
      return {
        ...state,
        name: action.payload.formName,
        sector: action.payload.sector,
        purpose: action.payload.purpose,
        formdata: [{ label: 'Page 1', pos: '1', elements: [] }]
      }
      break

    case formBuilderActionTypes.LOADING_ALL_FORMS:
      return {
        ...state,
        loadingForms: true
      }
      break
    case formBuilderActionTypes.LOADING_ALL_FORMS_COMPLETED:
      return {
        ...state,
        loadingForms: false
      }
      break

    case formBuilderActionTypes.GET_ALL_FORMS:
      return {
        ...state,
        allFormsCreated: action.payload.forms,
        formsCount: action.payload.formsCount
      }
      break

    case formBuilderActionTypes.GET_SINGLE_FORM_DETAIL:
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

    case formBuilderActionTypes.NEW_NAME_FOR_FORM_EDIT:
      return {
        ...state,
        name: action.payload.newName
      }
      break

    case formBuilderActionTypes.GET_FORM_TO_EDIT:
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

    case formBuilderActionTypes.PREVIEW_SINGLE_FORM:
      return {
        ...state,
        formPreview: action.payload.form
      }
      break

    case formBuilderActionTypes.LOADING_SINGLE_FORM:
      return {
        ...state,
        loadingPreview: true
      }
      break

    case formBuilderActionTypes.LOADING_SINGLE_FORM_COMPLETED:
      return {
        ...state,
        loadingPreview: false
      }
      break

    case formBuilderActionTypes.SAVING_FORM:
      return {
        ...state,
        savingForm: true
      }
      break
    case formBuilderActionTypes.SAVING_FORM_COMPLETED:
      return {
        ...state,
        savingForm: false
      }
      break

    case formBuilderActionTypes.SAVE_FORM:
      let quickDispatchFormAddedOnSave = { ...state.quickDispatch }
      quickDispatchFormAddedOnSave.form = action.payload.activeForm._id
      return {
        ...state,
        activeForm: action.payload.activeForm,
        quickDispatch: quickDispatchFormAddedOnSave
      }
      break

    case formBuilderActionTypes.LOADING:
      return {
        ...state,
        loading: true
      }
      break

    case formBuilderActionTypes.LOADING_COMPLETE:
      return {
        ...state,
        loading: false
      }
      break
    case formBuilderActionTypes.INPUT_NEW_FORM_NAME:
      return {
        ...state,
        name: action.payload.name
      }
      break
    case formBuilderActionTypes.GET_SINGLE_FORM:
      return {
        ...state,
        formPreview: action.payload.form
      }
      break

    case formBuilderActionTypes.SHOW_LINK:
      return {
        ...state,
        generatedLink: action.payload.link
      }
      break

    case formBuilderActionTypes.QUICK_DISPATCH_NAME:
      let quickNameEdit = { ...state.quickDispatch }
      quickNameEdit.name = action.payload.name
      return {
        ...state,
        quickDispatch: quickNameEdit,
        generatedLink: ''
      }
      break

    case formBuilderActionTypes.QUICK_DISPATCH_PROJECT:
      let quickProjectNameAdded = { ...state.quickDispatch }
      quickProjectNameAdded.project = action.payload.name
      quickProjectNameAdded.projectId = ''
      return {
        ...state,
        quickDispatch: quickProjectNameAdded
      }
      break

    case formBuilderActionTypes.QUICK_DISPATCH_PROJECT_ID:
      let quickProjectIdAdded = { ...state.quickDispatch }
      quickProjectIdAdded.projectId = action.payload.id
      quickProjectIdAdded.project = ''
      return {
        ...state,
        quickDispatch: quickProjectIdAdded
      }
      break

    case formBuilderActionTypes.QUICK_NUMBER_OF_ENTRIES:
      let numberOfEntriesAdded = { ...state.quickDispatch }
      numberOfEntriesAdded.totalExpectedEntries = parseInt(
        action.payload.number
      )
      return {
        ...state,
        quickDispatch: numberOfEntriesAdded
      }
      break

    case formBuilderActionTypes.QUICK_DISPATCH_START_DATE:
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
