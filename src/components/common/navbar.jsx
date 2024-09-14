"use client";

import React, { useState, useEffect } from "react";
import { Box, ButtonGroup, IconButton, Typography } from "@mui/joy";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const [collapsedNav, setCollapsedNav] = useState(false);

  const links = [
    { href: "/home", label: "Home", icon: <House size={18} strokeWidth={3} /> },
    {
      href: "/patients",
      label: "Patients",
      icon: <Users size={18} strokeWidth={3} />,
    },
    {
      href: "/financials",
      label: "Financials",
      icon: <DollarSign size={18} strokeWidth={3} />,
    },
    {
      href: "/orders",
      label: "Orders",
      icon: <Package size={18} strokeWidth={3} />,
    },
    {
      href: "/inventory?tab=inventoryItems",
      label: "Inventory",
      icon: <Container size={18} strokeWidth={3} />,
    },
    { href: "/mail", label: "Mail", icon: <Mail size={18} strokeWidth={3} /> },
    {
      href: "/appointments",
      label: "Appointments",
      icon: <Calendar size={18} strokeWidth={3} />,
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: <ChartNoAxesCombined size={18} strokeWidth={3} />,
    },
  ];

  return (
    <Box
      sx={{
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
        width: { xs: "15vw", md: collapsedNav ? "8vw" : "20vw" },
        position: "sticky",
        borderRight: "1px solid #dedede",
        transition: "width 0.2s ease",
        gap: 5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", height: "10%" }}>
        <IconButton
          onClick={() => window.location.replace("/")}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: { xs: "inline", md: collapsedNav ? "inline" : "none" },
            }}
          >
            <Image
              src="/syntra_logo.png"
              alt="Syntra Logo"
              width={30}
              height={30}
            />
          </Box>
          {!collapsedNav && (
            <Typography
              className="nav-label"
              sx={{
                color: "#1c69fb",
                fontSize: 26,
                fontWeight: 400,
                fontFamily: "'Kode Mono', monospace",
                display: { xs: "none", md: "inline" },
              }}
            >
              Syntra
            </Typography>
          )}
        </IconButton>
      </Box>
      <Box>
        <ButtonGroup
          size="sm"
          variant="plain"
          orientation="vertical"
          spacing={3}
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <IconButton
                key={link.href}
                sx={{
                  width: "100%",
                  color: pathName.includes(link.href.split("?")[0])
                    ? "#1c69fb"
                    : "#707070",
                  gap: 2,
                  padding: 0.9,
                  display: "flex",
                  justifyContent: "flex-start",
                  padding: 1,
                  borderLeft: pathName.includes(link.href.split("?")[0])
                    ? "4px solid #1c69fb"
                    : "4px solid transparent",

                  backgroundColor: pathName.includes(link.href.split("?")[0])
                    ? "#f1f5ff"
                    : "transparent",
                  transition: "background-color 0.6s ease, color 0.6s ease",
                  "&:hover": {
                    backgroundColor: pathName.includes(link.href.split("?")[0])
                      ? "#e3ebf9"
                      : "transparent",
                    color: pathName.includes(link.href.split("?")[0])
                      ? "#1c69fb"
                      : "black",
                  },
                  borderRadius: 4,
                  fontSize: { xs: 12, md: 12.5 },
                }}
              >
                {link.icon}
                {!collapsedNav && (
                  <Box
                    className="nav-label"
                    sx={{
                      fontWeight: 600,
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
          marginTop: "auto",
          marginBottom: 2,
          display: { xs: "none", md: "block" },
        }}
      >
        <IconButton
          onClick={() => setCollapsedNav(!collapsedNav)}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          {collapsedNav ? (
            <ChevronRight strokeWidth={2.5} color="#1c69fb" size={24} />
          ) : (
            <ChevronLeft strokeWidth={2.5} color="#1c69fb" size={24} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
