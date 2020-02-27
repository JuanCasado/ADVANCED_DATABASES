

import { createStore } from "redux";
import popUpReducer, {actions} from './PopUpReducer'

export const popUpStore = createStore(popUpReducer);

export function setCoordinates (coordinates) {
  return {type : actions.SET_COORDINATES, coordinates}
}

export function setVisible (visible) {
  return {type : actions.SET_VISIBLE, visible}
}