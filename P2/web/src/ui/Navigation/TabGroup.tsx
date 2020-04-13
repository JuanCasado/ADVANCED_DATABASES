
import { getTab, TabID } from './Tab'

const unregisteredTabs = ()=> [
  getTab(TabID.Home),
  getTab(TabID.LogIn),
  getTab(TabID.SignUp),
]

const user = ()=> [
  getTab(TabID.Home),
  getTab(TabID.Profile),
  getTab(TabID.LogOut),
]

const admin = ()=> [
  getTab(TabID.AdminHome),
  getTab(TabID.Profile),
  getTab(TabID.ContestBuilder),
  getTab(TabID.LogOut),
]

const greatAdmin = ()=> [
  getTab(TabID.AdminHome),
  getTab(TabID.Profile),
  getTab(TabID.ContestBuilder),
  getTab(TabID.ManageAdmins),
  getTab(TabID.LogOut),
]

export enum TabGroupID {
  unregistered,
  user,
  admin,
  greatAdmin,
}

export const getTabGroup = (tabGroup : TabGroupID) => {
  switch (tabGroup) {
    case TabGroupID.unregistered : return unregisteredTabs()
    case TabGroupID.user : return user()
    case TabGroupID.admin : return admin()
    case TabGroupID.greatAdmin : return greatAdmin()
  }
}