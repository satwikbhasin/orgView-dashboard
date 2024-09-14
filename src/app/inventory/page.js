"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/joy";
import { Container, ArrowDownToLine } from "lucide-react";
import InventoryItemsTab from "@/components/inventory/inventoryItemsTab";
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

const Inventory = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tab = searchParams.get('tab');
    const [selectedTab, setSelectedTab] = useState(tab || "inventoryItems");
    const [underlineStyle, setUnderlineStyle] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const tabsRef = useRef([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        if (tab) {
            setSelectedTab(tab);
        }
    }, [tab]);

    useEffect(() => {
        const activeTab = tabsRef.current.find(ref => ref && ref.getAttribute('data-value') === selectedTab);
        if (activeTab) {
            setUnderlineStyle({
                left: activeTab.offsetLeft,
                width: activeTab.offsetWidth,
            });
        }
    }, [selectedTab]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(contentRef.current.scrollTop > 0);
        };

        const contentElement = contentRef.current;
        contentElement.addEventListener('scroll', handleScroll);

        console.log('contentElement', contentElement);
        return () => {
            contentElement.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleTabChange = (tab) => {
        router.push(`?tab=${tab}`);
        setSelectedTab(tab);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const tabs = [
        { value: "inventoryItems", label: "Items" },
        { value: "pendingOrders", label: "Pending orders" }
    ];

    return (
        <Box ref={contentRef} sx={{ height: "100vh", width: "100vw", display: 'flex', flexDirection: 'column', overflow: "scroll", backgroundColor: "#fafafa" }}>
            <Box sx={{
                background: isScrolled
                    && "rgba( 250, 250, 250, 0.1 )",
                backdropFilter: isScrolled ? "blur(4.5px)" : "none",
                borderBottom: isScrolled ? "1px solid #dedede2" : "none",
                position: "sticky",
                top: 0,
                zIndex: 1,
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    cursor: "default",
                    height: "10vh",
                    justifyContent: "space-between",
                    padding: 2,
                }}>
                    <Box sx={{
                        display: "flex", alignItems: "center", gap: 1,
                    }}>
                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: {
                                    xs: 20,
                                    sm: 24,
                                    md: 28,
                                },
                                color: "black",
                            }}
                        >
                            Inventory
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton
                            onClick={handleMenuOpen}
                            size="small"
                            sx={{
                                gap: 0.5,
                                height: "100%",
                                width: "100%",
                                padding: 1,
                                backgroundColor: "transparent",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": {
                                    backgroundColor: "#EDEDED",
                                    color: "#1c69fb",
                                },
                                fontWeight: 700,
                                color: "#1c69fb",
                                fontSize: {
                                    xs: 10,
                                    sm: 12,
                                    md: 14,
                                },
                            }}
                        >
                            <ArrowDownToLine strokeWidth={2.5} color="#1c69fb" size={"2.5vh"} />
                            <Box
                                sx={{
                                    display: {
                                        xs: "none",
                                        md: "block",
                                    },
                                }}
                            >
                                Export
                            </Box>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            variant="menu"
                            size="sm"
                            sx={{
                                "& .MuiPaper-root": {
                                    backgroundColor: "#ffffff",
                                    color: "black",
                                    borderRadius: "5px",
                                },
                            }}
                        >
                            <MenuItem
                                onClick={handleMenuClose}
                                sx={{
                                    "&:hover": {
                                        color: "#1c69fb",
                                        fontWeight: 600,
                                        backgroundColor: "#f1f5ff",
                                    },
                                }}
                            >
                                PDF
                            </MenuItem>
                            <MenuItem
                                onClick={handleMenuClose}
                                sx={{
                                    "&:hover": {
                                        color: "#1c69fb",
                                        fontWeight: 600,
                                        backgroundColor: "#f1f5ff",
                                    },
                                }}
                            >
                                Excel
                            </MenuItem>
                            <MenuItem
                                onClick={handleMenuClose}
                                sx={{
                                    "&:hover": {
                                        color: "#1c69fb",
                                        fontWeight: 600,
                                        backgroundColor: "#f1f5ff",
                                    },
                                }}
                            >
                                CSV
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex", alignItems: "center", justifyContent: "flex-start", padding: 2, paddingTop: 0, paddingBottom: 3, paddingLeft: 3, gap: 2, position: 'relative'
                    }}
                >
                    {tabs.map((tab, index) => (
                        <Link key={tab.value} href={`?tab=${tab.value}`} passHref>
                            <Typography
                                ref={el => tabsRef.current[index] = el}
                                data-value={tab.value}
                                sx={{
                                    color: selectedTab === tab.value ? "#1c69fb" : "grey",
                                    fontWeight: 400,
                                    fontSize: {
                                        xs: 10,
                                        sm: 12,
                                        md: 14,
                                    },
                                    textDecoration: "none",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleTabChange(tab.value)}
                            >
                                {tab.label}
                            </Typography>
                        </Link>
                    ))}
                    <Box
                        sx={{
                            marginTop: 5,
                            position: 'absolute',
                            height: '2px',
                            backgroundColor: '#1c69fb',
                            transition: 'left 0.3s ease, width 0.3s ease',
                            ...underlineStyle,
                        }}
                    />
                </Box>
            </Box>

            <Box sx={{ transition: "opacity 0.5s ease" }}>
                {selectedTab === "inventoryItems" && <InventoryItemsTab />}
                {selectedTab === "pendingOrders" && <Box>Pending Orders</Box>}
            </Box>
        </Box >
    );
};

export default Inventory;