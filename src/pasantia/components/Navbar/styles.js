function navbar(theme, ownerState) {
  const { palette, boxShadows, functions, transitions, breakpoints, borders } =
    theme;
  const { transparentNavbar, darkMode, light } = ownerState;

  const { dark, white, text, transparent, background } = palette;
  const { navbarBoxShadow } = boxShadows;
  const { rgba, pxToRem } = functions;
  const { borderRadius } = borders;

  return {
    boxShadow: transparentNavbar ? 'none' : navbarBoxShadow,
    backdropFilter: transparentNavbar
      ? 'none'
      : `saturate(200%) blur(${pxToRem(30)})`,
    backgroundColor: transparentNavbar
      ? `${transparent.main} !important`
      : rgba(darkMode ? background.default : white.main, 0.8),

    color: () => {
      let color;

      if (light) {
        color = white.main;
      } else if (transparentNavbar) {
        color = text.main;
      } else {
        color = dark.main;
      }

      return color;
    },

    top: pxToRem(12),
    minHeight: pxToRem(75),
    borderRadius: borderRadius.xl,
    paddingTop: pxToRem(8),
    paddingBottom: pxToRem(8),
    paddingRight: pxToRem(8),
    paddingLeft: pxToRem(16),
    display: 'grid',
    alignItems: 'center',

    '& > *': {
      transition: transitions.create('all', {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    '& .MuiToolbar-root': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      [breakpoints.up('sm')]: {
        minHeight: 'auto',
        padding: `${pxToRem(4)} ${pxToRem(8)}`,
      },
    },
  };
}

const navbarContainer = ({ breakpoints }) => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  pt: 0.5,
  pb: 0.5,

  [breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '0',
    paddingBottom: '0',
  },
});

const navbarRow = ({ breakpoints }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',

  [breakpoints.up('md')]: {
    justifyContent: 'stretch',
    width: 'max-content',
  },

  [breakpoints.up('xl')]: {
    justifyContent: 'stretch !important',
    width: 'max-content !important',
  },
});

const navbarMobileMenu = ({ breakpoints }) => ({
  display: 'inline-block',
  lineHeight: 0,

  [breakpoints.up('xl')]: {
    display: 'none',
  },
});

export { navbar, navbarContainer, navbarRow, navbarMobileMenu };
