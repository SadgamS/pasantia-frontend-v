import { Card, Grid } from "@mui/material"
import DashboardLayout from "./layoutContainers/DashboardLayout"

export const FormLayout = ({children}) => {
  return (
    <DashboardLayout>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
                <Card
                    sx={{
                        position: "relative",
                          mt: { xs:3,sm:3},
                          mx: { xs:0,sm:2, md:1, lg:2, xl:0},
                          py: { xs:2,sm:2, md:2, lg:3, xl:3},
                          px: { xs:2,sm:2, md:3, lg:4, xl:4},
                          flexGrow: 1,
                      }}
                >
                    {children}
                </Card>
            </Grid>
        </Grid>
    </DashboardLayout>
  )
}
