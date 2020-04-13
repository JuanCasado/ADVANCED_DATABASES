
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'
import Tab from '@material-ui/core/Tab'
import Grid from '@material-ui/core/Grid'

import { useLocation, Link } from 'react-router-dom'
import AvatarIcon from './AvatarIcon'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    marginTop: 5,
  }
}))

const getCurrentTabIndex = (tabs, location) => {
  for (let index = 0; index < tabs.length; ++index)
    if (tabs[index].path === location)
      return index
  return 0
}

export default function NavBar ({tabs}) {
  const classes = useStyles();
  const location = useLocation()
  const [currentTab, setTab] = React.useState(getCurrentTabIndex (tabs, location.pathname))

  React.useEffect(()=>{
    setTab(getCurrentTabIndex (tabs, location.pathname))
  }, [location, tabs])

  const handleChange = (event, newValue) => {
    setTab(newValue);
  }

  return (
    <nav className={classes.root}>
      <AppBar position="static">
      <Toolbar variant="dense">
        <Grid container spacing={3}>
          <Grid item xs={10} sm={11}>
            <Tabs 
              value={currentTab} 
              onChange={handleChange} 
              aria-label="simple tabs example">
              {tabs.map((tab, i) => (
                <Tab label={tab.name} {...a11yProps(i)} key={i} component={Link} to={tab.path}/>
              ))}
            </Tabs>
          </Grid>
          <Grid item xs={2} sm={1} className={classes.icon}>
            <AvatarIcon/>
          </Grid>
        </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  )
}