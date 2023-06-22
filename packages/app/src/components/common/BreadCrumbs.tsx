import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Breadcrumbs } from '@mui/material';
import { memo } from 'react';
import styled from 'styled-components';

const BreadCrumbs = memo(({ breadcrumbs }: { breadcrumbs: JSX.Element[] }) => {
  return (
    <BreadcrumbsStyled separator={<KeyboardArrowRightIcon />} aria-label="breadcrumb">
      {breadcrumbs}
    </BreadcrumbsStyled>
  );
});

BreadCrumbs.displayName = 'BreadCrumbs';

const BreadcrumbsStyled = styled(Breadcrumbs)`
  cursor: pointer;
  margin: 1rem 0;
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export default BreadCrumbs;
