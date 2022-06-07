import { Box, Stack } from '@mui/material'
import React from 'react'
import NavBar from '../../dashboard/NavBar'
import { PageContent } from '../../dashboard/PageContent'
import SideBar from '../../dashboard/SideBar'

const Home = () => {
  return (
    <Box sx={{display: 'flex'}}>
        <NavBar />
      {/* <Stack direction='row' spacing={2} justifyContent='space-between'> */}
        <SideBar />
        <PageContent /> 
      {/* </Stack> */}
    </Box>
  )
}

export default Home