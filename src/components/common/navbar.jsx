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
  Users,
  DollarSign,
  Package,
  Container,
  Mail,
  Calendar,
  ChartNoAxesCombined,
  Menu as MenuIcon,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const [menuAnchor, setMenuAnchor] = useState(null);

  const links = [
    { href: "/home", label: "Home", icon: <House size={18} /> },
    { href: "/patients", label: "Patients", icon: <Users size={18} /> },
    {
      href: "/financials",
      label: "Financials",
      icon: <DollarSign size={18} />,
    },
    { href: "/orders", label: "Orders", icon: <Package size={18} /> },
    {
      href: "/inventory?tab=stock",
      label: "Inventory",
      icon: <Container size={18} />,
    },
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

  const currentLink = links.find((link) =>
    pathName.startsWith(link.href.split("?")[0])
  );
  const currentIcon = currentLink?.icon || <MenuIcon size={24} />;
  const currentLabel = currentLink?.label || "Menu";

  return (
    <Box
      sx={{
        background:
          "linear-gradient(225deg, hsla(213, 17%, 35%, 1) 0%, hsla(216, 25%, 16%, 1) 81%, hsla(217, 36%, 12%, 1) 100%)",
        paddingLeft: 1,
        paddingRight: 2,
        paddingTop: 1,
        paddingBottom: 1,
        display: "flex",
        height: "8vh",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={() => window.location.replace("/")}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
            gap: 1,
          }}
        >
          <Image
            src="/syntra_logo.png"
            alt="Syntra Logo"
            width={35}
            height={35}
          />
          <Typography
            sx={{
              color: "#f2f0ef",
              fontSize: 20,
              fontWeight: 700,
              fontFamily: "'Kode Mono', monospace",
            }}
          >
            Syntra
          </Typography>
        </IconButton>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          gap: 0.5,
          position: "relative",
        }}
      >
        <ButtonGroup
          size="sm"
          variant="plain"
          orientation="horizontal"
          spacing={3}
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <Tooltip title={link.label} arrow>
                <IconButton
                  key={link.href}
                  sx={{
                    color: pathName.includes(link.href.split("?")[0])
                      ? "#000000"
                      : "#cccbca",
                    gap: 0.5,
                    padding: 0.9,
                    backgroundColor: pathName.includes(link.href.split("?")[0])
                      ? "#ffffff"
                      : "transparent",
                    transition: "background-color 0.6s ease, color 0.6s ease",
                    "&:hover": {
                      backgroundColor: pathName.includes(
                        link.href.split("?")[0]
                      )
                        ? "#ffffff"
                        : "rgba(255, 255, 255, 0.1)",
                      color: pathName.includes(link.href.split("?")[0])
                        ? "#000000"
                        : "#ffffff",
                    },
                    "@media (max-width: 1200px)": {
                      ".nav-label": {
                        display: "none",
                      },
                    },
                    "@media (min-width: 1200px)": {
                      ".nav-label": {
                        display: "inline",
                      },
                    },
                    fontSize: { xs: 16, md: 16 },
                  }}
                >
                  {link.icon}
                  <span className="nav-label">{link.label}</span>
                </IconButton>
              </Tooltip>
            </Link>
          ))}
        </ButtonGroup>
        <Box
          sx={{
            position: "absolute",
            bottom: 6,
            height: "2px",
            backgroundColor: "#ffffff",
            transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
          }}
        />
      </Box>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          gap: 0.5,
        }}
      >
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
      </Box>
    </Box>
  );
};

export default Navbar;
