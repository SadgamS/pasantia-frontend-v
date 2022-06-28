import { Box, Typography } from "@mui/material"
import SidenavRoot from "./SidenavRoot"

export const Sidenav = ({...rest}) => {
  return (
    <SidenavRoot
        {...rest}
        variant="permanent"
        ownerState={{}}
    >
        <Box pt={3} pb={4} textAlign='center'>
            <Box>
                <Typography component='h6' fontWeight='medium'>
                    Sistema Pasantia
                </Typography>
            </Box>
        </Box>

    </SidenavRoot>
  )
}
