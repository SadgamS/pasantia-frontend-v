
// @mui material components
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";


// Material Dashboard 2 React example components
import { PageLayout } from "./layoutContainers/PageLayout";
// import { FooterLayout } from "./FooterLayout";

export const BasicLayout = ({ image, children }) => {
  return (
    <PageLayout>
      <Box
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Box px={1} width="100%" height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </Box>
      {/* <FooterLayout light/>   */}
    </PageLayout>
  )
}

