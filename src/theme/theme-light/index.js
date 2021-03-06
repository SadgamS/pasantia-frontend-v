import { createTheme } from "@mui/material/styles";
import borders from "./base/borders";
import boxShadows from "./base/boxShadows";
import breakpoints from "./base/breakpoints";
import colors from "./base/colors";
import globals from "./base/globals";
import typography from "./base/typography";
import autocomplete from "./components/autocomplete";
import breadcrumbs from "./components/breadcrumbs";
import card from "./components/card";
import divider from "./components/divider";
import formControlLabel from "./components/formControlLabel";
import formLabel from "./components/formLabel";
import input from "./components/input";
import inputLabel from "./components/inputLabel";
import inputOutlined from "./components/inputOutlined";
import list from "./components/list";
import listItem from "./components/listItem";
import listItemText from "./components/listItemText";
import menu from "./components/menu";
import menuItem from "./components/menuItem";
import radio from "./components/radio";
import sidenav from "./components/sidenav";
import tableContainer from "./components/tableContainer";
import textField from "./components/textField";

import boxShadow from "./functions/boxShadow";
import hexToRgb from "./functions/hexToRgb";
import linearGradient from "./functions/linearGradient";
import pxToRem from "./functions/pxToRem";
import rgba from "./functions/rgba";

import { esES } from "@mui/material/locale";
import icon from "./components/icon";
import svgIcon from "./components/svgIcon";

export default createTheme({
    breakpoints: {...breakpoints},
    palette: {...colors},
    boxShadows: {...boxShadows},
    borders: {...borders},
    typography: {...typography},
    functions:{
        boxShadow,
        hexToRgb,
        linearGradient,
        pxToRem,
        rgba,
    },
    components:{
        MuiCssBaseline: {
            styleOverrides:{
                ...globals,
            }
        },
        MuiAutocomplete: { ...autocomplete } , 
        MuiBreadcrumbs: { ...breadcrumbs },
        MuiDrawer: { ...sidenav },
        MuiDivider: { ...divider },
        MuiCard: {...card},
        MuiList: { ...list },
        MuiListItem: { ...listItem },
        MuiListItemText: { ...listItemText },
        MuiTextField: { ...textField },
        MuiInput: { ...input },
        MuiInputLabel: { ...inputLabel },
        MuiOutlinedInput: { ...inputOutlined },
        MuiDataGrid: { ...tableContainer },
        MuiMenu: { ...menu },
        MuiMenuItem: { ...menuItem },
        MuiRadio: { ...radio },
        MuiFormControlLabel: { ...formControlLabel },
        MuiFormLabel: { ...formLabel },
        MuiIcon: { ...icon },
        MuiSvgIcon: { ...svgIcon },
    },
    },
    esES,
);
