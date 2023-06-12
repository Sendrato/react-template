import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Fade, Typography } from '@mui/material';
import { useAppSelector } from 'store/hooks';
import { getAddedRecord } from 'store/slices/design/modalsSlice';

import { AlertContainer } from './styled-mui';

interface IProps {
  open: boolean;
  message: string | null;
  top?: string;
  left?: string;
}

const RecordMessage = ({ open, message, top, left }: IProps) => {
  const { type } = useAppSelector(getAddedRecord);

  return (
    <Fade in={open}>
      <AlertContainer $type={type} container $top={top} $left={left}>
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
