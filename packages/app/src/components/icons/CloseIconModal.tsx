import CloseIcon from '@mui/icons-material/Close';
import { memo } from 'react';
import styled from 'styled-components';

const CloseIconModal = memo(
  ({ onClick, sx }: { onClick: () => void; sx?: Record<string, any> }) => {
    return <Icon onClick={onClick} sx={sx} />;
  },
);

CloseIconModal.displayName = 'CloseIconModal';

const Icon = styled(CloseIcon)`
  cursor: pointer;

  &:hover {
    color: #dc2626;
  }
`;

export default CloseIconModal;
