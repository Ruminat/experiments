import { css } from "lit";

export const palette = {
  gray100: css`#222222`,
  gray90: css`#383838`,
  gray80: css`#4e4e4e`,
  gray70: css`#646464`,
  gray60: css`#7a7a7a`,
  gray50: css`#919191`,
  gray40: css`#a7a7a7`,
  gray30: css`#bdbdbd`,
  gray20: css`#d3d3d3`,
  gray10: css`#e9e9e9`,
  gray01: css`#fdfdfd`,

  blue100: css`#00b2ff`,
  blue90: css`#19baff`,
  blue80: css`#33c1ff`,
  blue70: css`#4dc9ff`,
  blue60: css`#66d1ff`,
  blue50: css`#80d9ff`,
  blue40: css`#99e0ff`,
  blue30: css`#b3e8ff`,
  blue20: css`#ccf0ff`,
  blue10: css`#e6f7ff`,
  blue01: css`#fcfeff`,

  red100: css`#ff4d00`,
  red90: css`#ff5f19`,
  red80: css`#ff7133`,
  red70: css`#ff824d`,
  red60: css`#ff9466`,
  red50: css`#ffa680`,
  red40: css`#ffb899`,
  red30: css`#ffcab3`,
  red20: css`#ffdbcc`,
  red10: css`#ffede6`,
  red01: css`#fffdfc`,

  green100: css`#09bc8a`,
  green90: css`#22c396`,
  green80: css`#3ac9a1`,
  green70: css`#53d0ad`,
  green60: css`#6bd7b9`,
  green50: css`#84dec5`,
  green40: css`#9de4d0`,
  green30: css`#b5ebdc`,
  green20: css`#cef2e8`,
  green10: css`#e6f8f3`,
  green01: css`#fdfefe`,

  yellow100: css`#ffc15e`,
  yellow90: css`#ffc76e`,
  yellow80: css`#ffcd7e`,
  yellow70: css`#ffd48e`,
  yellow60: css`#ffda9e`,
  yellow50: css`#ffe0af`,
  yellow40: css`#ffe6bf`,
  yellow30: css`#ffeccf`,
  yellow20: css`#fff3df`,
  yellow10: css`#fff9ef`,
  yellow01: css`#fffefd`,

  white: css`white`,
  black: css`black`,
} as const;

export const colors = {
  skeleton: {
    background: css`#eee`,
    gradiend1: css`#ececec`,
    gradiend2: css`#f5f5f5`,
    gradiend3: css`#ececec`,
  },
  primaryText: palette.black,
  errorText: palette.red90,
  secondaryText: palette.gray50,
};
