import {
  Box,
  BoxProps,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material';

import { LabelCell, MediumCell, TableBorderRow } from '../styled-mui';
import { EnhancedTableCell } from './EnhancedTableCell';
import { IBodyCell } from './types';

export interface IObjectTableRow extends IBodyCell {
  label: string;
}

interface IProps<TData> extends BoxProps {
  name?: string;
  data: TData;
  rows: IObjectTableRow[];
}

const OverviewTable = <TData extends Record<string, any>>({
  name,
  rows,
  data,
  ...rest
}: IProps<TData>) => {
  return (
    <Box {...rest}>
      {name && (
        <Typography variant="body1" fontWeight={700}>
          {name}
        </Typography>
      )}
      <TableContainer>
        <Table>
          <TableBody>
            {rows.map(({ label, key, type, baseHref, component, onClick }) =>
              data[key] ? (
                <TableBorderRow key={label}>
                  <LabelCell>{label}</LabelCell>
                  <MediumCell>
                    <EnhancedTableCell
                      value={data[key]}
                      type={type}
                      onClick={onClick}
                      component={component}
                      baseHref={baseHref}
                    />
                  </MediumCell>
                </TableBorderRow>
              ) : null,
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OverviewTable;
