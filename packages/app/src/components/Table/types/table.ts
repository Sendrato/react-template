import { ReactElement } from 'react';

export type TCellType = 'text' | 'link' | 'timestamp' | 'details' | 'component' | 'popover';
export type TCellPosition = 'center' | 'right' | 'left';

export interface IHeaderCell {
  label: string;
  id: string;
  align?: TCellPosition;
}

export interface IBodyCell {
  key: string;
  type?: TCellType;
  baseHref?: string;
  onClick?: (value: any) => void;
  component?: ReactElement;
}

export interface ITableDataKeys {
  key: string;
  type?: TCellType;
  label: string;
  baseHref?: string;
  component?: ReactElement;
  onClick?: (value: any) => void;
  align?: TCellPosition;
}
