
const initialState = {
  visible: false,
  skipCoordinates: false,
  coordinates: '',
  content: []
}

export const actions = {
  SET_VISIBLE: 'SET_VISIBLE',
  SET_COORDINATES: 'SET_COORDINATES',
  SET_CONTENT: 'SET_CONTENT'
}

export default function popUpReducer(state = initialState, action) {
  if (action.type === actions.SET_COORDINATES){
    return Object.assign({}, state, {
      visible: !state.skipCoordinates,
      skipCoordinates: false,
      coordinates: action.coordinates,
    })
  } else if (action.type === actions.SET_VISIBLE){
    return Object.assign({}, state, {
      visible: action.visible,
      skipCoordinates: true,
    })
  } else if (action.type === actions.SET_CONTENT){
    return Object.assign({}, state, {
      visible: !state.skipCoordinates,
      skipCoordinates: false,
      content: action.content
    })
  }
  return state;
}