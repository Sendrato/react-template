import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, IconButton } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';
import { getFormattedTableTimestamp } from 'utils';

import Popover from './Popover';
import { TCellType } from './types';

interface IProps {
  value: any;
  type?: TCellType;
  baseHref?: string;
  component?: ReactElement;
  onClick?: (value: any) => any;
}

export const EnhancedTableCell = ({
  value,
  type,
  baseHref = '',
  component = <></>,
  onClick,
}: IProps) => {
  const router = useRouter();

  const view = cloneElement(component, { ...component.props, value });

  switch (type) {
    case 'text':
      return <>{value}</>;
    case 'link':
      return (
        <>
          <Link href={baseHref + value}>{typeof value === 'string' && value}</Link>
        </>
      );
    case 'timestamp':
      return <>{getFormattedTableTimestamp(value)}</>;

    case 'details':
      const hasValue = Array.isArray(value) ? value?.length > 0 : !!value;

      return (
        <>
          {hasValue && (
            <Box>
              <IconButton
                onClick={() => (onClick ? onClick(value) : router.push(baseHref + value))}
                aria-label="details"
                size="large"
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          )}
        </>
      );

    case 'component': {
      return <>{view}</>;
    }

    case 'popover': {
      return <Popover onClick={() => onClick && onClick(value)}>{component}</Popover>;
    }

    default:
      return <>{value}</>;
  }
};
