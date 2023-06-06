import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Fade, Grid, Typography } from '@mui/material';
import { useAppSelector } from 'store/hooks';
import { getAddedRecord } from 'store/slices/design/modalsSlice';
import styled from 'styled-components';

interface IProps {
  open: boolean;
  message: string | null;
  top?: string;
  left?: string;
}

const RecordMessage = ({ open, message, top, left }: IProps) => {
  const { type } = useAppSelector(getAddedRecord);

  switch (type) {
    case 'success':
      return (
        <Fade in={open}>
          <Message container $top={top} $left={left}>
            <CheckCircleOutlineIcon color="success" />
            <Typography variant="body1">{message}</Typography>
          </Message>
        </Fade>
      );
    case 'info':
      return (
        <Fade in={open}>
          <MessageInfo container $top={top} $left={left}>
            <InfoOutlinedIcon color="info" />
            <Typography variant="body1">{message}</Typography>
          </MessageInfo>
        </Fade>
      );
    case 'error':
      return (
        <Fade in={open}>
          <MessageError container $top={top} $left={left}>
            <InfoOutlinedIcon color="error" />
            <Typography variant="body1">{message}</Typography>
          </MessageError>
        </Fade>
      );
    default:
      return <></>;
  }
};

const Message = styled(Grid)<{ $top?: string; $left?: string }>`
  padding: 1rem 1.5rem;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    #2e7d32;
  border-radius: 6px;
  position: absolute;
  top: ${({ $top }) => ($top ? $top : 0)};
  left: ${({ $left }) => ($left ? $left : 0)};
  display: flex;
  align-items: center;
  z-index: 99999;

  svg {
    margin-right: 0.5rem;
  }
`;

const MessageInfo = styled(Message)`
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    #0288d1;
`;

const MessageError = styled(Message)`
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    #d32f2f;
`;

export default RecordMessage;
