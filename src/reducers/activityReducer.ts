import { Activity } from "../types"

export type ActivityActions = 
  { type: 'save-activity', payload: {newActivity : Activity}} |   // el payload son los datos que le pasamos junto a la accion
  { type: 'setActiveId', payload: {id : Activity['id']}} |
  { type: 'delete', payload: {id : Activity['id']}} |
  { type: 'restartApp'} 


export type ActivityState = {
  activities : Activity[], // El state del reducer se llama actividades y va a ser de tipo actividad
  activeId:Activity['id']
}

const localStorageActivities = () : Activity[]=> {
  const activities = localStorage.getItem('activities')
  return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
  activities: localStorageActivities(), // Inicia como un arreglo vacio
  activeId: ''
}

export const activityReducer = (
    state : ActivityState = initialState,
    action: ActivityActions
  ) => {
  if(action.type === 'save-activity') {
    // Este código maneja la lógica para actualizar el state
    let updatedActivities: Activity[] = []

    if(state.activeId) {
      updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity )
    }else {
      updatedActivities =  [...state.activities, action.payload.newActivity]
    }
    return {
      ...state, // tomo una copia del estado...
      activities:updatedActivities,
      activeId: '' // cada vez que edito reinicio el ID para continuar 
    }
  }
  if(action.type === 'setActiveId') {
    return {
      ...state,
      activeId: action.payload.id
    }
  }
  if(action.type === 'delete') {
    return {
      ...state,
      activities: state.activities.filter(activity => activity.id !== action.payload.id)
    }
  }
  if(action.type === 'restartApp') {
    return {
      activities: [],
      activeId: ''
    }
  }

  return state
}