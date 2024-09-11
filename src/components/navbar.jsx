"use client";

import React, { useState } from "react";
import {
  Box,
  ButtonGroup,
  IconButton,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  ListItemDecorator,
  ListItemContent,
} from "@mui/joy";
import {
  House,
  User,
  DollarSign,
  ShoppingCart,
  Box as BoxIcon,
  Mail,
  Calendar,
  ChartNoAxesCombined,
  Menu as MenuIcon,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useMediaQuery from "@mui/system/useMediaQuery";

const Navbar = () => {
  const pathName = usePathname();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:1200px)");

  const links = [
    { href: "/home", label: "Home", icon: <House size={18} /> },
    { href: "/patients", label: "Patients", icon: <User size={18} /> },
    {
      href: "/financials",
      label: "Financials",
      icon: <DollarSign size={16} />,
    },
    { href: "/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
    { href: "/inventory", label: "Inventory", icon: <BoxIcon size={18} /> },
    { href: "/mail", label: "Mail", icon: <Mail size={18} /> },
    {
      href: "/appointments",
      label: "Appointments",
      icon: <Calendar size={18} />,
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: <ChartNoAxesCombined size={18} />,
    },
  ];

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const currentLink = links.find((link) => link.href === pathName);
  const currentIcon = currentLink?.icon || <MenuIcon size={24} />;
  const currentLabel = currentLink?.label || "Menu";

  return (
    <Box
      sx={{
        background:
          "linear-gradient(225deg, hsla(213, 17%, 35%, 1) 0%, hsla(216, 25%, 16%, 1) 81%, hsla(217, 36%, 12%, 1) 100%)",
        paddingLeft: 0,
        paddingRight: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <IconButton
          onClick={() => window.location.replace("/")}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Image
            src="/syntra_logo.png"
            alt="Syntra Logo"
            width={50}
            height={50}
          />
          <Typography variant="h1" sx={{ color: "#f2f0ef" }}>
            Syntra
          </Typography>
        </IconButton>
      </Box>
      {isSmallScreen ? (
        <>
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              color: "#cccbca",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
              },
              gap: 0.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            {currentIcon}
            <Typography variant="body1" sx={{ color: "#cccbca" }}>
              {currentLabel}
            </Typography>
            <ChevronDown size={18} />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            {links.map((link) => (
              <MenuItem
                key={link.href}
                onClick={handleMenuClose}
                sx={{
                  backgroundColor:
                    pathName === link.href
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  fontWeight: pathName === link.href ? "bold" : "normal",
                }}
              >
                <Link
                  href={link.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <ListItemDecorator>{link.icon}</ListItemDecorator>
                  <ListItemContent>{link.label}</ListItemContent>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <ButtonGroup
          size="sm"
          variant="plain"
          orientation="horizontal"
          spacing={3}
          sx={{
            overflow: "scroll",
          }}
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <Tooltip title={link.label} arrow>
                <IconButton
                  key={link.href}
                  sx={{
                    color: pathName === link.href ? "#000000" : "#cccbca",
                    gap: 0.5,
                    padding: 1,
                    backgroundColor:
                      pathName === link.href ? "#ffffff" : "transparent",
                    "&:hover": {
                      backgroundColor:
                        pathName !== link.href
                          ? "rgba(255, 255, 255, 0.1)"
                          : "#ffffff",
                      color: pathName !== link.href ? "#ffffff" : "#000000",
                    },
                  }}
                >
                  {link.icon}
                  {!isMediumScreen && link.label}
                </IconButton>
              </Tooltip>
            </Link>
          ))}
        </ButtonGroup>
      )}
    </Box>
  );
};

export default Navbar;
