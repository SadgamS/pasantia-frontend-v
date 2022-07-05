

// Material Dashboard 2 React Base Styles
import colors from "../base/colors";
import borders from "../base/borders";
import typography from "../base/typography";

// Material Dashboard 2 React helper functions
import pxToRem from "../functions/pxToRem";

const { info, grey, transparent, error } = colors;
const { borderRadius } = borders;
const { size } = typography;

const inputOutlined = {
  styleOverrides: {
    root: {
      backgroundColor: transparent.main,
      fontSize: size.sm,
      borderRadius: borderRadius.md,

      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: info.main,
        },
      },
      
      "&.Mui-error":{
        backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23F44335' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23F44335' stroke='none'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `right ${pxToRem(12)} center`,
        backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,
        "&.Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: error.main,
          },
        },
      },
    },



    input: {
      color: grey[700],
      padding: pxToRem(12),
      backgroundColor: transparent.main,
    },

    inputSizeSmall: {
      fontSize: size.xs,
      padding: pxToRem(10),
    },

    multiline: {
      color: grey[700],
      padding: 0,
    },
  },
};

export default inputOutlined;
