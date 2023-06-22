import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { List } from '@mui/material';
import useMedia from 'hooks/use-media';
import React from 'react';
import ReactPerfectScrollbar from 'react-perfect-scrollbar';

import SidebarNavSection from './SidebarNavSection';
import { SidebarItemsType } from './types';

const baseScrollbar = () => css`
  background-color: #1e293b;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  flex-grow: 1;
`;

const Scrollbar = styled.div`
  ${baseScrollbar}
`;

const PerfectScrollbar = styled(ReactPerfectScrollbar)`
  ${baseScrollbar}
`;

const Items = styled.div`
  padding-top: ${(props) => (props as any).theme.spacing(2.5)};
  padding-bottom: ${(props) => (props as any).theme.spacing(2.5)};
`;

interface SidebarNavProps {
  items: {
    title: string;
    pages: SidebarItemsType[];
  }[];
}

const SidebarNav = ({ items }: SidebarNavProps) => {
  const { isMd } = useMedia();
  const ScrollbarComponent = isMd ? PerfectScrollbar : Scrollbar;

  return (
    <ScrollbarComponent>
      <List disablePadding>
        <Items>
          {items &&
            items.map((item) => (
              <SidebarNavSection component="div" key={item.title} pages={item.pages} />
            ))}
        </Items>
      </List>
    </ScrollbarComponent>
  );
};

export default SidebarNav;
