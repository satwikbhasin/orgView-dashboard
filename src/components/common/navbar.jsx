"use client";

import React, { useState } from "react";
import { Box, ButtonGroup, IconButton, Typography, Switch } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import {
  House,
  Users,
  DollarSign,
  Package,
  Container,
  Mail,
  Calendar,
  ChartNoAxesCombined,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useColorScheme } from "@mui/joy/styles";
import { useTheme } from "@mui/material/styles";

export default function Navbar() {
  const { mode, setMode } = useColorScheme();
  const theme = useTheme();

  const handleThemeSwitch = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  const pathName = usePathname();
  const router = useRouter();
  const [collapsedNav, setCollapsedNav] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:601px) and (max-width:960px)"
  );

  const iconSize = isSmallScreen ? 12 : isMediumScreen ? 12 : 14;

  const menuLinks = [
    {
      href: "/home",
      label: "Home",
      icon: <House size={iconSize} strokeWidth={2.5} />,
    },
    {
      href: "/patients",
      label: "Patients",
      icon: <Users size={iconSize} strokeWidth={2.5} />,
    },
    {
      href: "/financials",
      label: "Financials",
      icon: <DollarSign size={iconSize} strokeWidth={2.5} />,
    },
    {
      href: "/orders",
      label: "Orders",
      icon: <Package size={iconSize} strokeWidth={2.5} />,
    },
    {
      href: "/inventory?tab=inventoryItems",
      label: "Inventory",
      icon: <Container size={iconSize} strokeWidth={2.5} />,
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: <ChartNoAxesCombined size={iconSize} strokeWidth={2.5} />,
    },
    {
      href: "/mail",
      label: "Mail",
      icon: <Mail size={iconSize} strokeWidth={2.5} />,
    },
    {
      href: "/appointments",
      label: "Appointments",
      icon: <Calendar size={iconSize} strokeWidth={2.5} />,
    },
  ];

  const supportLinks = [
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings size={iconSize} strokeWidth={2.5} />,
    },
  ];

  return (
    <Box
      sx={{
        background: theme.palette.navbar.base,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
        width: { xs: "15vw", md: collapsedNav ? "8vw" : "20vw" },
        position: "sticky",
        borderRight: `1px solid ${theme.palette.border}`,
        transition: "width 0.2s ease",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "10%",
          width: "100%",
          paddingRight: { sm: 0, md: collapsedNav ? 0 : 1 },
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={() => router.replace("/")}
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.transparent,
            },
            gap: 1,
          }}
        >
          <Image
            src="/syntra_logo.png"
            alt="Syntra Logo"
            width={25}
            height={25}
          />
          {!collapsedNav && (
            <Typography
              className="nav-label"
              sx={{
                color: theme.palette.logo,
                fontSize: {
                  xs: 12,
                  md: 16,
                  lg: 20,
                },
                fontWeight: 300,
                display: { xs: "none", md: "inline" },
              }}
            >
              S Y N T R A
            </Typography>
          )}
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          padding: {
            xs: 2,
            md: 3,
          },
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 50,
            paddingLeft: 1,
            fontSize: { xs: 8, md: 10, lg: 12 },
            display: { xs: "none", md: collapsedNav ? "none" : "block" },
            cursor: "default",
            color: theme.palette.navbar.tab.regular.text,
          }}
        >
          MENU
        </Typography>
        <ButtonGroup
          size="sm"
          variant="plain"
          orientation="vertical"
          spacing={1.5}
        >
          {menuLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <IconButton
                key={link.href}
                sx={{
                  width: "100%",
                  gap: 2,
                  display: "flex",
                  justifyContent: {
                    xs: "center",
                    md: collapsedNav ? "center" : "flex-start",
                  },
                  padding: 1,
                  borderLeft: pathName.includes(link.href.split("?")[0])
                    ? `2.5px solid ${theme.palette.accent}`
                    : "2.5px solid transparent",
                  backgroundColor: {
                    xs: theme.palette.transparent,
                    md: pathName.includes(link.href.split("?")[0])
                      ? theme.palette.navbar.tab.selected.background
                      : theme.palette.transparent,
                  },
                  transition: "background-color 0.6s ease, color 0.6s ease",
                  "& .nav-label": {
                    color: pathName.includes(link.href.split("?")[0])
                      ? theme.palette.navbar.tab.selected.text
                      : theme.palette.navbar.tab.regular.text,
                  },
                  "& .nav-icon": {
                    color: pathName.includes(link.href.split("?")[0])
                      ? theme.palette.accent
                      : theme.palette.navbar.tab.regular.text,
                  },
                  "&:hover": {
                    backgroundColor: pathName.includes(link.href.split("?")[0])
                      ? theme.palette.navbar.tab.selected.hover.background
                      : theme.palette.transparent,
                    "& .nav-label": {
                      color: pathName.includes(link.href.split("?")[0])
                        ? theme.palette.navbar.tab.selected.hover.text
                        : theme.palette.navbar.tab.regular.hover.text,
                    },
                    "& .nav-icon": {
                      color: pathName.includes(link.href.split("?")[0])
                        ? theme.palette.accent
                        : theme.palette.navbar.tab.regular.hover.text,
                    },
                  },
                  borderRadius: 1,
                  fontSize: { xs: 8, md: 10, lg: 12 },
                }}
              >
                <Box className="nav-icon">{link.icon}</Box>
                {!collapsedNav && (
                  <Box
                    className="nav-label"
                    sx={{
                      fontWeight: pathName.includes(link.href.split("?")[0])
                        ? 500
                        : 200,
                      display: { xs: "none", md: "inline" },
                    }}
                  >
                    {link.label}
                  </Box>
                )}
              </IconButton>
            </Link>
          ))}
        </ButtonGroup>
      </Box>
      <Box
        sx={{
          width: "100%",
          borderBottom: `1px solid ${theme.palette.border}`,
          marginY: 0,
        }}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          padding: {
            xs: 2,
            md: 3,
          },
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 50,
            paddingLeft: 1,
            fontSize: { xs: 8, md: 10, lg: 12 },
            display: { xs: "none", md: collapsedNav ? "none" : "block" },
            cursor: "default",
            color: theme.palette.navbar.tab.regular.text,
          }}
        >
          SUPPORT
        </Typography>
        <ButtonGroup
          size="sm"
          variant="plain"
          orientation="vertical"
          spacing={1.5}
        >
          {supportLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <IconButton
                key={link.href}
                sx={{
                  width: "100%",
                  gap: 2,
                  display: "flex",
                  justifyContent: {
                    xs: "center",
                    md: collapsedNav ? "center" : "flex-start",
                  },
                  padding: 1,
                  borderLeft: pathName.includes(link.href.split("?")[0])
                    ? `2.5px solid ${theme.palette.accent}`
                    : "none",
                  backgroundColor: {
                    xs: theme.palette.transparent,
                    md: pathName.includes(link.href.split("?")[0])
                      ? theme.palette.navbar.tab.selected.background
                      : theme.palette.transparent,
                  },
                  transition: "background-color 0.6s ease, color 0.6s ease",
                  "& .nav-label": {
                    color: pathName.includes(link.href.split("?")[0])
                      ? theme.palette.navbar.tab.selected.text
                      : theme.palette.navbar.tab.regular.text,
                  },
                  "& .nav-icon": {
                    color: pathName.includes(link.href.split("?")[0])
                      ? theme.palette.accent
                      : theme.palette.navbar.tab.regular.text,
                  },
                  "&:hover": {
                    backgroundColor: pathName.includes(link.href.split("?")[0])
                      ? theme.palette.navbar.tab.selected.hover.background
                      : theme.palette.transparent,
                    "& .nav-label": {
                      color: pathName.includes(link.href.split("?")[0])
                        ? theme.palette.navbar.tab.selected.hover.text
                        : theme.palette.navbar.tab.regular.hover.text,
                    },
                    "& .nav-icon": {
                      color: pathName.includes(link.href.split("?")[0])
                        ? theme.palette.accent
                        : theme.palette.navbar.tab.regular.hover.text,
                    },
                  },
                  borderRadius: 1,
                  fontSize: { xs: 8, md: 10, lg: 12 },
                }}
              >
                <Box className="nav-icon">{link.icon}</Box>
                {!collapsedNav && (
                  <Box
                    className="nav-label"
                    sx={{
                      fontWeight: pathName.includes(link.href.split("?")[0])
                        ? 500
                        : 200,
                      display: { xs: "none", md: "inline" },
                    }}
                  >
                    {link.label}
                  </Box>
                )}
              </IconButton>
            </Link>
          ))}
          <IconButton
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xs: "center",
                md: collapsedNav ? "center" : "flex-start",
              },
              width: "100%",
              paddingLeft: 1.6,
              paddingRight: 1,
              gap: 2,
              transition: "all 1s ease",
              backgroundColor: theme.palette.navbar.themeButton.background,
              "&:hover": {
                backgroundColor: theme.palette.navbar.themeButton.background,
              },
            }}
            onClick={() => {
              setDarkMode(!darkMode);
              handleThemeSwitch();
            }}
          >
            <Box
              sx={{
                opacity: darkMode ? 1 : 0,
                transition: "opacity 1s ease",
                position: darkMode ? "relative" : "absolute",
              }}
            >
              <Moon
                color={theme.palette.accent}
                strokeWidth={3}
                size={iconSize}
              />
            </Box>

            <Box
              sx={{
                opacity: darkMode ? 0 : 1,
                transition: "opacity 1s ease",
                position: darkMode ? "absolute" : "relative",
              }}
            >
              <Sun
                color={theme.palette.accent}
                strokeWidth={3}
                size={iconSize}
              />
            </Box>

            <Typography
              sx={{
                fontSize: { xs: 8, md: 10, lg: 12 },
                display: { xs: "none", md: collapsedNav ? "none" : "block" },
                color: theme.palette.navbar.tab.selected.text,
                fontWeight: 600,
                transition: "all 1s ease",
              }}
            >
              {darkMode ? "Dark Mode" : "Light Mode"}
            </Typography>
          </IconButton>
        </ButtonGroup>
      </Box>
      <Box
        sx={{
          marginTop: "auto",
          marginBottom: 2,
          width: "100%",
          justifyContent: "center",
          display: { xs: "none", md: "flex" },
        }}
      >
        <IconButton
          onClick={() => setCollapsedNav(!collapsedNav)}
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.transparent,
            },
          }}
        >
          {collapsedNav ? (
            <ChevronRight
              strokeWidth={2.5}
              color={theme.palette.accent}
              size={24}
            />
          ) : (
            <ChevronLeft
              strokeWidth={2.5}
              color={theme.palette.accent}
              size={24}
            />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}
