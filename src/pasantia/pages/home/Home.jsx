import { Box, Stack } from '@mui/material'
import React from 'react'
import DashboardLayout from '../../../layouts/layoutContainers/DashboardLayout'
import { Navbar } from '../../../pasantia/components/Navbar/Navbar'
import { Sidenav } from '../../../pasantia/components/Sidenav/Sidenav'

const Home = () => {
  return (
    <DashboardLayout>

      <Navbar />
      <Sidenav />
        {/* <NavBar /> */}
      {/* <Stack direction='row' spacing={2} justifyContent='space-between'> */}
        {/* <SideBar /> */}
        {/* <PageContent />  */}
      {/* </Stack> */}
    </DashboardLayout>
   
  )
}

export default Home