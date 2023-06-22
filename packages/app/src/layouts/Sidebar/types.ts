import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type SidebarItemsType = {
  pathname?: string;
  title: string;
  icon?: React.FC<any> | (OverridableComponent<SvgIconTypeMap<any, 'svg'>> & { muiName: string });
  children?: SidebarItemsType[];
  access: string[];
};
