"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/joy";
import { Container, ChevronRight, ChevronDown } from "lucide-react";
import InventoryItemsTab from "@/components/inventory/inventoryItemsTab";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const Inventory = () => {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');
    const [selectedTab, setSelectedTab] = useState(tab || "inventoryItems");
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const closeTimeoutRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        if (tab) {
            setSelectedTab(tab);
        }
    }, [tab]);

    const handleMenuOpen = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
        if (menuRef.current) {
            setAnchorEl(menuRef.current);
            setMenuOpen(true);
        }
    };

    const handleMenuClose = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setMenuOpen(false);
            setAnchorEl(null);
        }, 300);
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        setMenuOpen(false);
        setAnchorEl(null);
    };

    const menuItems = [
        { value: "inventoryItems", label: "items" },
        { value: "pendingOrders", label: "pending orders" }
    ];

    return (
        <Box sx={{ height: "fit-content", width: "100vw", padding: 8, paddingTop: 3, display: 'flex', flexDirection: 'column', overflow: "scroll" }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    marginBottom: 3,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", fontWeight: "800", gap: 1, cursor: "default" }}>
                    <Container
                        color="#222b38"
                        size={"4vh"}
                    />
                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: {
                                xs: 24,
                                sm: 28,
                                md: 32,
                                lg: 38,
                            },
                            color: "#222b38",
                            transition: "opacity 0.2s ease",
                            display: {
                                xs: "none",
                                md: "block",
                            },
                        }}
                    >
                        Inventory
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 1,
                        padding: 0,
                    }}
                >
                    <ChevronRight
                        color="#808080"
                        strokeWidth={3}
                        size={20}
                    />
                </Box>
                <Box
                    ref={menuRef}
                    onMouseEnter={handleMenuOpen}
                    onMouseLeave={handleMenuClose}
                    sx={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginTop: 0.5,
                    }}
                >
                    <IconButton
                        sx={{
                            backgroundColor: "transparent",
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                            display: "flex",
                            alignItems: "center",
                            padding: 0,
                            justifyContent: "left",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#808080",
                                fontSize: {
                                    xs: 20,
                                    md: 28,
                                },
                            }}
                        >
                            {selectedTab === "inventoryItems" ? "inventory items" : "pending orders"}
                        </Typography>
                        <ChevronDown
                            color="#808080"
                            strokeWidth={3}
                            size={20}
                            style={{
                                marginTop: 5,
                            }}
                        />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={handleMenuClose}
                        onMouseEnter={() => clearTimeout(closeTimeoutRef.current)}
                        onMouseLeave={handleMenuClose}
                        sx={{
                            width: {
                                xs: "fit-content",
                                md: "20vw"
                            },
                            display: "flex",
                        }}
                    >
                        {menuItems.filter(item => item.value !== selectedTab).map(item => (
                            <MenuItem key={item.value} onClick={() => handleTabChange(item.value)}>
                                <Link href={`/inventory?tab=${item.value}`} passHref>
                                    <Typography sx={{
                                        color: "#808080",
                                        fontSize: "20px",
                                        fontWeight: "600",
                                    }}>{item.label}</Typography>
                                </Link>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box>
            <Box sx={{ transition: "opacity 0.5s ease", opacity: selectedTab === "inventoryItems" ? 1 : 0 }}>
                {selectedTab === "inventoryItems" && <InventoryItemsTab />}
                {selectedTab === "pendingOrders" && <Box>Pending Orders</Box>}
            </Box>
        </Box>
    );
};

export default Inventory;