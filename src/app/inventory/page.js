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
        <Box sx={{ height: "100vh", width: "100vw", display: 'flex', flexDirection: 'column', overflow: "scroll", backgroundColor: "#fafafa" }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                cursor: "default",
                justifyContent: "space-between",
                height: "10vh",
                padding: 2,
                backgroundColor: "#fafafa",
                // borderBottom: "1px solid #e0e0e0",
            }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: "600",
                    cursor: "default",
                }}>
                    <Container
                        color="#707070"
                        size={"3vh"}
                        strokeWidth={3}
                    />
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 20,
                                sm: 22,
                                md: 24,
                            },
                            color: "grey",
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
                                color: "#1c69fb",
                                fontWeight: 600,
                                fontSize: {
                                    xs: 20,
                                    sm: 16,
                                    md: 18,
                                },
                            }}
                        >
                            {selectedTab === "inventoryItems" ? "inventory items" : "pending orders"}
                        </Typography>
                        <ChevronDown
                            color="#1c69fb"
                            strokeWidth={3}
                            size={20}
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
                                        fontSize: {
                                            xs: 20,
                                            sm: 16,
                                            md: 18,
                                        },
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
        </Box >
    );
};

export default Inventory;