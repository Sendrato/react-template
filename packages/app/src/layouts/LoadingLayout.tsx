import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

interface IProps {
  left?: string;
}

const LoadingLayout = ({}: IProps) => {
  return (
    <LoaderWrapper>
      <CircularProgress />
    </LoaderWrapper>
  );
};

const LoaderWrapper = styled.div`
  width: webkit-fill-available;
  height: webkit-fill-available;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
`;

export default LoadingLayout;
