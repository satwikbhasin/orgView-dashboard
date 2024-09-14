"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/joy";
import { ArrowDownToLine, Users } from "lucide-react";
import FilterBar from "@/components/patients/filterBar";
import PatientsTable from "@/components/patients/patientsTable";

const Patients = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [patientName, setPatientName] = useState("");
    const [selectedPayer, setSelectedPayer] = useState("any");
    const [anchorEl, setAnchorEl] = useState(null);
    const menuRef = useRef(null);

    const handlePatientNameChange = (patientName) => {
        console.log(patientName);
        setPatientName(patientName);
        setCurrentPage(1);
    };

    const handlePayerChange = (payer) => {
        setSelectedPayer(payer);
        setCurrentPage(1);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

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
                        Patients
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
                            fontSize: {
                                xs: 10,
                                sm: 12,
                                md: 14,
                            },
                            fontWeight: 700,
                            color: "#1c69fb",
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
                            fontSize: {
                                xs: 10,
                                md: 12,
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
                                fontSize: {
                                    xs: 10,
                                    md: 12,
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
                                fontSize: {
                                    xs: 10,
                                    md: 12,
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
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    padding: { xs: 0, sm: 1 },
                    height: "90vh",
                    overflow: "scroll",
                    backgroundColor: "#fafafa",
                }}
            >
                <Box sx={{ display: "flex", flex: 1 }}>
                    <FilterBar
                        onPatientNameChange={handlePatientNameChange}
                        onPayerChange={handlePayerChange}
                    />
                </Box>
                <Box sx={{ display: "flex", flex: 10 }}>
                    <PatientsTable
                        patientName={patientName}
                        selectedPayer={selectedPayer}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Patients;