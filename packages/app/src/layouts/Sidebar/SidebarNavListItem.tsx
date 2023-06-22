import styled from '@emotion/styled';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { Collapse, ListItemButton, ListItemProps, ListItemText } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface ItemProps {
  activeclassname?: string;
  onClick?: () => void;
  to?: string;
  component?: typeof Link;
  depth: number;
}

const Item = styled(ListItemButton)<ItemProps>`
  padding-top: ${(props) => (props as any).theme.spacing(props.depth && props.depth > 0 ? 1 : 2)};
  padding-bottom: ${(props) =>
    (props as any).theme.spacing(props.depth && props.depth > 0 ? 1 : 2)};
  padding-left: ${(props) =>
    (props as any).theme.spacing(props.depth && props.depth > 0 ? 5.5 : 3)};
  padding-right: ${(props) => (props as any).theme.spacing(props.depth && props.depth > 0 ? 1 : 2)};
  color: #fff;
  svg {
    color: #fff;
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
  &.${(props) => props.activeclassname} {
    background-color: #30425a;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 6px;
    padding-left: ${(props) =>
      (props as any).theme.spacing(props.depth && props.depth > 0 ? 4.5 : 2)};
    span {
      color: #fff;
    }
  }
`;

interface TitleInterface {
  depth: number;
}

const Title = styled(ListItemText)<TitleInterface>`
  margin: 0;
  span {
    font-size: 14px;
    padding: 0 ${(props) => (props as any).theme.spacing(2)};
  }
`;

interface SidebarNavListItemProps extends ListItemProps {
  className?: string;
  depth: number;
  pathname?: string;
  icon?: React.FC<any>;
  open?: boolean;
  title: string;
}

const SidebarNavListItem = ({
  title,
  pathname: href,
  depth = 0,
  children,
  icon: Icon,
  open: openProp = false,
}: SidebarNavListItemProps) => {
  const { pathname } = useRouter();

  const [open, setOpen] = React.useState(openProp);

  const handleToggle = () => {
    setOpen((state) => !state);
  };

  if (children) {
    return (
      <>
        <Item depth={depth} onClick={handleToggle}>
          {Icon && <Icon />}
          <Title depth={depth}>{title}</Title>
          {open ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
        </Item>
        <Collapse in={open}>{children}</Collapse>
      </>
    );
  }

  if (href) {
    return (
      <Link href={href} passHref>
        <Item depth={depth} className={pathname == href ? 'active' : ''} activeclassname="active">
          {Icon && <Icon />}
          <Title depth={depth}>{title}</Title>
        </Item>
      </Link>
    );
  }

  return null;
};

export default SidebarNavListItem;
