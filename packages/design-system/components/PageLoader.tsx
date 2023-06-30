import { Box, CircularProgress, CircularProgressProps } from '@mui/material';
import styled from 'styled-components';

const CenteredProgress = styled(Box)<{ $layout: any }>`
  display: flex;
  justify-content: center;
  height: ${(props) => ((props as any).$layout ? '100%' : '100vh')};
  align-content: center;
  align-items: center;
`;

export const PageLoader = ({ layout, ...rest }: { layout?: boolean } & CircularProgressProps) => (
  <CenteredProgress $layout={layout}>
    <CircularProgress size={60} {...rest} />
  </CenteredProgress>
);
