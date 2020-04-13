
import React from 'react'
import Home from '../Home'
import AdminHome from '../Admin/AdminHome'
import ContestBuilder from '../Admin/ContestBuilder'
import ManageAdmins from '../Admin/ManageAdmins'
import Profile from '../User/Profile'
import LogIn from '../Auth/LogIn'
import SignUp from '../Auth/SignUp'
import LogOut from '../Auth/LogOut'

class Tab {
  public readonly path : String
  public readonly name : String
  public readonly component : any
  constructor (path : String, name : String, component : any = null) {
    this.path = path
    this.name = name
    this.component = component
  }
}

export enum TabID {
  Home,
  AdminHome,
  ContestBuilder,
  ManageAdmins,
  Profile,
  LogIn,
  SignUp,
  LogOut,
}

//const TabStorage = new Map<TabID, Tab>()

const createTab = (tab : TabID) : Tab => {
  switch (tab) {
    case TabID.Home: return new Tab('/', 'Home', <Home/>)
    case TabID.AdminHome: return new Tab('/', 'Admin', <AdminHome/>)
    case TabID.ContestBuilder: return new Tab(getTab(TabID.Home).path+'contest-builder', 'Contest Builder', <ContestBuilder/>)
    case TabID.ManageAdmins: return new Tab(getTab(TabID.Home).path+'manage-admins', 'Manage Admins', <ManageAdmins/>)
    case TabID.Profile: return new Tab(getTab(TabID.Home).path+'user-profile', 'Profile', <Profile/>)
    case TabID.LogIn: return new Tab(getTab(TabID.Home).path+'log-in', 'Log In', <LogIn/>)
    case TabID.SignUp: return new Tab(getTab(TabID.Home).path+'sign-up', 'Sign Up', <SignUp/>)
    case TabID.LogOut: return new Tab(getTab(TabID.Home).path+'log-out', 'Log Out', <LogOut/>)
  }
}

export const getTab = (tab : TabID) : Tab => {
  /*
  if (TabStorage.has(tab))
    return TabStorage.get(tab)!
  else {
    const newTab = createTab(tab)
    TabStorage.set(tab, newTab)
    return newTab
  }
  */
  return createTab(tab)
}
