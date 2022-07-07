// Material Dashboard 2 React base styles
import colors from "../base/colors";
import typography from "../base/typography";

const { text } = colors;
const { size } = typography;

const formLabel = {
  styleOverrides: {
    root: {
      color: text.main,
      fontSize: size.sm,
    },
  },
};

export default formLabel;
