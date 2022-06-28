import { createTheme } from "@mui/material/styles";
import borders from "./base/borders";
import boxShadows from "./base/boxShadows";
import breakpoints from "./base/breakpoints";
import colors from "./base/colors";
import typography from "./base/typography";
import card from "./components/card";
import sidenav from "./components/sidenav";

import boxShadow from "./functions/boxShadow";
import hexToRgb from "./functions/hexToRgb";
import linearGradient from "./functions/linearGradient";
import pxToRem from "./functions/pxToRem";
import rgba from "./functions/rgba";


export default createTheme({
    breakpoints: {...breakpoints},
    palette: {...colors},
    boxShadows: {...boxShadows},
    borders: {...borders},
    // typography: {...typography},
    functions:{
        boxShadow,
        hexToRgb,
        linearGradient,
        pxToRem,
        rgba,
    },
    components:{
        MuiDrawer: { ...sidenav },
        MuiCard: {...card}
    }
})