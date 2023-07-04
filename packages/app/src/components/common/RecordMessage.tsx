import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Fade, Typography } from '@mui/material';
import { useNotificationsContext } from 'contexts/NotificationsContext';

import { AlertContainer } from '../styled-mui';

interface IProps {
  open: boolean;
  message: string | null;
  top?: string;
  left?: string;
}

const RecordMessage = ({ open, message, top, left }: IProps) => {
  const {
    record: { type },
  } = useNotificationsContext();

  return (
    <Fade in={open}>
      <AlertContainer type={type} container top={top} left={left}>
        {type === 'success' ? (
          <CheckCircleOutlineIcon color={type} />
        ) : (
          <InfoOutlinedIcon color={type} />
        )}
        <Typography variant="body1">{message}</Typography>
      </AlertContainer>
    </Fade>
  );
};

export default RecordMessage;
