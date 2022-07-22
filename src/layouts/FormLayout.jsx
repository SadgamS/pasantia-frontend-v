import { Box, Grid } from "@mui/material"
import DashboardLayout from "./layoutContainers/DashboardLayout"

export const FormLayout = ({children}) => {
  return (
    <DashboardLayout>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
                <Box
                    sx={{
                        position: "relative",
                          mt: { xs:3,sm:3},
                          mx: { xs:0,sm:2, md:1, lg:1},
                          py: { xs:2,sm:2, md:2, lg:2},
                          px: { xs:2,sm:1, md:1, lg:1},
                          flexGrow: 1,
                      }}
                >
                    {children}
                </Box>
            </Grid>
        </Grid>
    </DashboardLayout>
  )
}
