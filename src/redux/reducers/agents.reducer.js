import { agentsActionTypes } from '../action-types/agents-actions.types'

const INITIAL_STATE = {
  allAgents: {},
  activeAgent: '',
  loadingAgent: false,
  page: 1,
  agentsCount: '',
  addingAgents: false,
  searchAgentResult: [],
  activeAgent: {},
  allAgentGroups: [],
  savingGroup: false,
  activeGroup: {},
  activeGroupId: '',
  agentsToAdd: [],
  loading: false,
  countries: [],
  states: [],
  cities: [],
  sendingMessage: false,
  agentsDashboardCount: {},
  agentsDashboardChart: {}
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case agentsActionTypes.GET_AGENTS:
      return {
        ...state,
        allAgents: action.payload.allAgents,
        agentsCount: action.payload.count
      }
      break
    case agentsActionTypes.LOADING_AGENTS:
      return {
        ...state,
        loadingAgents: true
      }
      break
    case agentsActionTypes.GET_AGENTS_DASHBOARD_COUNTS:
      return {
        ...state,
        agentsDashboardCount: action.payload
      }
      break
    case agentsActionTypes.GET_AGENTS_DASHBOARD_CHART:
      return {
        ...state,
        agentsDashboardChart: action.payload
      }
      break
    case agentsActionTypes.FILTER:
      return {
        ...state,
        allAgents: action.payload.allAgents
      }
      break
    case agentsActionTypes.AGENTS_LOADING_COMPLETED:
      return {
        ...state,
        loadingAgents: false
      }
      break
    case agentsActionTypes.ADDING_AGENT:
      return {
        ...state,
        addingAgent: true
      }
      break
    case agentsActionTypes.ADDING_AGENT_COMPLETED:
      return {
        ...state,
        addingAgent: false
      }
      break
    case agentsActionTypes.GET_SINGLE_AGENT:
      return {
        ...state,
        activeAgent: action.payload
      }
      break
    case agentsActionTypes.SENDING_MESSAGE:
      return {
        ...state,
        sendingMessage: true
      }
      break
    case agentsActionTypes.MESSAGE_SENT:
      return {
        ...state,
        sendingMessage: false
      }
      break
    case agentsActionTypes.SEARCH_AGENTS:
      return {
        ...state,
        allAgents: action.payload.allAgents
      }
      break
    case agentsActionTypes.GET_ALL_GROUPS:
      return {
        ...state,
        allAgentGroups: action.payload
      }
      break
    case agentsActionTypes.CREATING_NEW_GROUP:
      return {
        ...state,
        savingGroup: true
      }
      break
    case agentsActionTypes.CREATING_NEW_GROUP_COMPLETED:
      return {
        ...state,
        savingGroup: false
      }
      break
    case agentsActionTypes.GET_SINGLE_GROUP:
      return {
        ...state,
        activeGroup: action.payload,
        agentsToAdd: action.payload.agents
      }
      break
    case agentsActionTypes.ACTIVE_GROUP:
      return {
        ...state,
        activeGroupId: action.payload.id
      }
      break
    case agentsActionTypes.LOADING:
      return {
        ...state,
        loading: true
      }
      break
    case agentsActionTypes.LOADING_COMPLETED:
      return {
        ...state,
        loading: false
      }
    case agentsActionTypes.GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload
      }
      break
    case agentsActionTypes.GET_STATES:
      return {
        ...state,
        states: action.payload
      }
      break
    case agentsActionTypes.GET_CITIES:
      return {
        ...state,
        cities: action.payload
      }
      break
    default:
      return {
        ...state
      }
      break
  }
}
