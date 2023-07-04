import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

const LoadingLayout = () => (
  <LoaderWrapper>
    <CircularProgress />
  </LoaderWrapper>
);
const LoaderWrapper = styled.div`
  width: fill-available;
  height: fill-available;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
`;

export default LoadingLayout;
