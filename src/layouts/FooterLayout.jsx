// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import MDTypography from "../theme/components/MDTypography";
import MDBox from "../theme/components/MDBox";

export const FooterLayout = ({ light }) => {

  return (
    <Box position="absolute" width="100%" bottom={0} py={4}>
      <Container>
        <Box
          width="100%"
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems="center"
          px={1.5}
        >
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            color={light ? "white" : "text"}
            fontSize={15}
          >
            &copy; {new Date().getFullYear()}, 
            <Link href="https://www.diputados.gob.bo/" target="_blank">
              <MDTypography variant="button" fontWeight="medium" color={light ? "white" : "dark"}>
                &nbsp;Camara de Diputados&nbsp;
              </MDTypography>
            </Link>
          </MDBox>
        </Box>
      </Container>
    </Box>
  )
}

// Setting default props for the Footer
FooterLayout.defaultProps = {
  light: false,
};

// Typechecking props for the Footer
FooterLayout.propTypes = {
 light: PropTypes.bool,
};
