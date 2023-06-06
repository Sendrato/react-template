import React from 'react';

import SidebarNavList from './SidebarNavList';
import { SidebarItemsType } from './types';

interface SidebarNavSectionProps {
  className?: Element;
  component?: React.ElementType;
  pages: SidebarItemsType[];
}

const SidebarNavSection = ({
  pages,
  component: Component = 'nav',
  ...rest
}: SidebarNavSectionProps) => {
  return (
    <Component {...rest}>
      <SidebarNavList pages={pages} depth={0} />
    </Component>
  );
};

export default SidebarNavSection;
