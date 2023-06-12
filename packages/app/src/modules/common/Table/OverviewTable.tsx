import {
  Box,
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

interface IProps<TData> {
  name?: string;
  data: TData;
  rows: IObjectTableRow[];
  margin?: string;
}

const OverviewTable = <TData extends Record<string, any>>({
  name,
  rows,
  data,
  margin = '0',
}: IProps<TData>) => {
  return (
    <Box margin={margin}>
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
