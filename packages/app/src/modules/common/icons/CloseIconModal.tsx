import CloseIcon from '@mui/icons-material/Close';
import { memo } from 'react';
import styled from 'styled-components';

import { KeyValueString } from '@services/types/generated/common';

const CloseIconModal = memo(
  ({ onClick, sx }: { onClick: () => void; sx?: KeyValueString }) => {
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
