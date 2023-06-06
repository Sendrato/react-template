import { useMedia } from 'hooks';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { TableTitle, TableTitleContainer } from '../styled-mui';

interface IProps {
  title?: string;
  tooltipComponent?: ReactElement;
  selectedComponent?: ReactElement;
  selected?: any[];
  hasSelect: boolean;
}

const EnhancedTableTooltip = ({
  title = '',
  tooltipComponent,
  selectedComponent,
  selected,
  hasSelect,
}: IProps) => {
  const { isMobile } = useMedia();
  const gap = selected?.length
    ? isMobile
      ? '0.75rem'
      : '0'
    : isMobile
    ? '3.53rem'
    : '2.78rem';

  return (
    <>
      {!!title || !!tooltipComponent ? (
        <TableTitleContainer $direction={isMobile ? 'column' : 'row'}>
          <TableTitle>{title}</TableTitle>
          {tooltipComponent || null}
        </TableTitleContainer>
      ) : null}
      {hasSelect && selected && (
        <SelectedContainer $gap={gap}>
          {selected?.length > 0 && selectedComponent}
        </SelectedContainer>
      )}
    </>
  );
};

const SelectedContainer = styled.div<{ $gap: string }>`
  margin-top: ${({ $gap }) => $gap};
`;

export default EnhancedTableTooltip;
