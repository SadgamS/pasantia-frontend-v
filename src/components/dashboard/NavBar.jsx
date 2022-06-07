import { AppBar, Badge, Box, IconButton, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';

const StyledToolBar = styled(Toolbar) ({
    display: "flex",
    justifyContent: "space-between", 
});

const Icons = styled(Box)(({theme})=>({
    display: "flex",
    alignItems: "center",
    gap: "20px"
}));

const NavBar = () => {
  const [open, setOpen] = useState(false);  
  return (
     <AppBar position='sticky' 
        sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1, 
        }}>
        <StyledToolBar>
            <Typography variant='h5'
                sx={{display:{xs:"none", sm:"block"} }}
            >
                Sistema
            </Typography >
            <MenuIcon sx={{ display:{xs:"block", sm:"none"}}}/>
            <Typography variant='h5'
                sx={{display:{xs:"block", sm:"none"} }}
            >
                Sistema
            </Typography >
            <Icons>
                <Badge badgeContent={4} color="error">
                    <NotificationsIcon />
                </Badge>
                <IconButton
                    aria-aria-haspopup='true'
                    onClick={(e)=>setOpen(true)}
                    color='inherit'
                >
                    <AccountCircleIcon fontSize='large'/>       
                </IconButton>
             </Icons>
        </StyledToolBar>
             <Menu
                id="basic-menu"
                // anchorEl={anchorEl}
                open={open}
                onClose={(e)=>setOpen(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem >Profile</MenuItem>
                <MenuItem >My account</MenuItem>
                <MenuItem >Logout</MenuItem>
            </Menu>
     </AppBar> 
  )
}

export default NavBar