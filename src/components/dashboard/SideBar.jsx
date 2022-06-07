import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from 'react';




const SideBar = () => {

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
      <DashboardIcon />
      </Toolbar>
      <Box sx={{overflow: 'auto'}}>
      <List component='nav'>
          <ListItem disablePadding>
              <ListItemButton >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary='Dashboard'/>
              </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
              <ListItemButton >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary='Dashboard'/>
              </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
              <ListItemButton >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary='Dashboard'/>
              </ListItemButton>
          </ListItem>
      </List>
      </Box>
    </Drawer>    
  )
}

export default SideBar