'use client';

import { forwardRef } from "react";
import Link, { LinkProps } from "next/link";
import { ListItemButton, ListItemButtonProps } from "@mui/material";

type Props = ListItemButtonProps & LinkProps & {
  onClick?: () => void;
};

const NavLink = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const {
    href,
    replace,
    scroll,
    shallow,
    prefetch,
    locale,
    onClick,
    ...rest
  } = props;

  return (
    <ListItemButton
      ref={ref}
      component={Link}
      href={href}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      locale={locale}
      onClick={onClick}
      {...rest}
    />
  );
});

NavLink.displayName = "NavLink";
export default NavLink;