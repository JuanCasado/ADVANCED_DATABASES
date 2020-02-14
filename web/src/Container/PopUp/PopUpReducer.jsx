
const initialState = {
  visible: false,
  coordinates: null,
  skipCoordinates: false,
}

export const actions = {
  SET_VISIBLE: 'SET_VISIBLE',
  SET_COORDINATES: 'SET_COORDINATES'
}

export default function popUpReducer(state = initialState, action) {
  if (action.type === actions.SET_COORDINATES){
    return Object.assign({}, state, {
      visible: !state.skipCoordinates,
      coordinates: action.coordinates,
      skipCoordinates: false,
    })
  } else if (action.type === actions.SET_VISIBLE){
    return Object.assign({}, state, {
      visible: action.visible,
      skipCoordinates: true
    })
  }
  return state;
}