import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

interface IProps {
  left?: string;
}

const LoadingLayout = ({ left }: IProps) => {
  return (
    <LoaderWrapper $left={left}>
      <CircularProgress />
    </LoaderWrapper>
  );
};

const LoaderWrapper = styled.div<{ $left?: string }>`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: ${({ $left }) => ($left ? $left : 0)};
  z-index: 30;
`;

export default LoadingLayout;
