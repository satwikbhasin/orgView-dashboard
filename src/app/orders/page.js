"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    Typography, Box,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/joy";
import { ArrowDownToLine } from "lucide-react";


const Orders = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setAnchorEl(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ height: "100vh", width: "100vw", display: 'flex', flexDirection: 'column', overflow: "scroll", backgroundColor: "#fafafa" }}>
            <Box sx={{
                // background: isScrolled
                //     && "rgba( 250, 250, 250, 0.1 )",
                // backdropFilter: isScrolled ? "blur(4.5px)" : "none",
                // borderBottom: isScrolled ? "1px solid #dedede2" : "none",
                position: "sticky",
                top: 0,
                zIndex: 1,
                transition: "background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease",
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
                            Orders
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
                            ref={menuRef}
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
            </Box>
        </Box>
    );
};

export default Orders;