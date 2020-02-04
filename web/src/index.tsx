
import './index.css';
import * as serviceWorker from './serviceWorker';
import AirplaneMap from './openlayers/AirplaneMap'
import React from 'react'
import ReactDOM from 'react-dom'

import { Button } from './UIComponents/Button'


ReactDOM.render(<Button />, document.getElementById('sidebar'))
const airplaneMap = new AirplaneMap()

serviceWorker.unregister()//register()
