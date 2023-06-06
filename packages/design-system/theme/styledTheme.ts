import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

import { breakpoints } from './system/breakpoints';
import { colors } from './system/colors';
import { fontStyle } from './system/fonts';
import { spacing } from './system/spacing';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    font-family: 'Inter', sans-serif;
  }

  a {
    color: #6183E4;
    font-weight: 400;
    text-decoration: none;

    &:focus,
    &:hover {
      text-decoration: none;
    }
  }

  .MuiButtonBase-root.MuiButton-root{
    box-shadow: none;
    border-radius: 6px;
    &:hover{
      box-shadow: none;
    }
    
  }
  .MuiButton-containedPrimary{
    background: #3460DC;
  }
  .MuiButton-outlinedPrimary{
    border-color: #3460DC;
    color: #3460DC;
  }
  .MuiButton-textPrimary{
    color: #3460DC;
  }

  .MuiButton-containedSecondary{
    background: #475569;
    &:hover {
      background-color: #233044;
    }
  }

  .MuiFormControl-root{
    margin: 0.75rem 0;
  
    > label {
      color: #94a3b8;
    }
  
    > div.MuiInputBase-root > fieldset {
      border: 1px solid #94a3b8;
    }
  }
`;

export const theme: DefaultTheme = {
  // patterns
  ...breakpoints,
  colors,
  fontStyle,
  spacing,
  // components
};
