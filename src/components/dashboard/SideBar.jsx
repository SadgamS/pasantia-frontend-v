import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from 'react';




const SideBar = () => {

  return (
    <Box
      component="nav"
      sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
    >

      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
        open
      >
        <Toolbar>
        <DashboardIcon />
        </Toolbar>
        <List>
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
      </Drawer>    
    </Box>
  )
}

export default SideBar