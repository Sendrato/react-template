import { Box, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

import { StyledPaper } from '../styled-mui';

export interface ITableBlockProps {
  gap?: string;
  withContainer?: boolean;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export const TableBlock = ({ children, withContainer, gap, sx }: ITableBlockProps) => {
  if (withContainer) {
    return (
      <StyledPaper sx={sx} padding={gap}>
        {children}
      </StyledPaper>
    );
  }

  return (
    <Box padding={gap} sx={sx}>
      {children}
    </Box>
  );
};
