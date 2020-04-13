
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import * as AdminActions from './AdminActions'

import { getTabGroup, TabGroupID } from './Navigation/TabGroup'
import NavBar from './Navigation/NavBar'
import Footer from './Navigation/Footer'

import { auth, database } from './Firebase'

function App() {

  const [tabs, setTabs] = React.useState(getTabGroup(TabGroupID.unregistered))
  
  React.useEffect(()=>{
    const unsubscribe = auth().onAuthStateChanged(async (user)=>{
      if (user === null) { // Not registered user
        setTabs(getTabGroup(TabGroupID.unregistered));return unsubscribe
      }
      await user.getIdToken(true)
      // Subscribe to realtime database for admin updates
      database().ref('isAdmin/'+user.uid).on('value', async (snapshot) => {
        user.getIdToken(true)
        const isAdmin = await AdminActions.isAdmin()
        if (isAdmin) { // Great Admin user
          setTabs(getTabGroup(TabGroupID.greatAdmin));return unsubscribe
        }
        const idToken = await user.getIdTokenResult()
        if (!!idToken.claims.admin){// Regular Admin user
          setTabs(getTabGroup(TabGroupID.admin));return unsubscribe
        }
        // Registered user
        setTabs(getTabGroup(TabGroupID.user))
      })
      const isAdmin = await AdminActions.isAdmin()
      if (isAdmin) { // Great Admin user
        setTabs(getTabGroup(TabGroupID.greatAdmin));return unsubscribe
      }
      const idToken = await user.getIdTokenResult()
      if (!!idToken.claims.admin){// Regular Admin user
        setTabs(getTabGroup(TabGroupID.admin));return unsubscribe
      }
      // Registered user
      setTabs(getTabGroup(TabGroupID.user))
      return unsubscribe
    })
  },[setTabs])

  return (
    <div>
      <Router>
        <NavBar tabs={tabs}/>
        <Switch>
          {tabs.map((tab,i)=>(
            <Route exact path={tab.path} key={i}>
              {tab.component}
            </Route>
          ))}
          <Route path="*">
            <Redirect to={'/'}/>
          </Route>
        </Switch>
      </Router>
      <Footer/>
    </div>
  )
}

export default App;
