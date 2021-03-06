import colors from "../base/colors";
import borders from "../base/borders";

// Material Dashboard 2 React helper functions
import pxToRem from "../functions/pxToRem";

const { white } = colors;
const { borderRadius } = borders;

const sidenav = {
  styleOverrides: {
    root: {
      width: pxToRem(260),
      whiteSpace: "nowrap",
      border: "none",
    },

    paper: {
      width: pxToRem(260),
      backgroundColor: white.main,
      height: `calc(100vh - ${pxToRem(20)})`,
      margin: pxToRem(10),
      borderRadius: borderRadius.xl,
      border: "none",
    },

    paperAnchorDockedLeft: {
      borderRight: "none",
    },
  },
};

export default sidenav;
