
import './index.css';
import * as serviceWorker from './serviceWorker';
import AirplaneMap from './openlayers/AirplaneMap'

const airplaneMap = new AirplaneMap()

serviceWorker.unregister()//register()
