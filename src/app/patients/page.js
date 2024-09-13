"use client";

import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/joy";
import { ArrowDownToLine, Users } from "lucide-react";
import FilterBar from "@/components/patients/filterBar";
import PatientsTable from "@/components/patients/patientsTable";
import { Menu, MenuItem } from "@mui/material";

const Patients = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [patientName, setPatientName] = useState("");
    const [selectedPayer, setSelectedPayer] = useState("any");
    const [anchorEl, setAnchorEl] = useState(null);

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

    return (
        <Box sx={{ height: "fit-content", width: "100vw", padding: 8, paddingBottom: 2, paddingTop: 3 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 5,
                    padding: 0,
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", fontWeight: "800", gap: 1, cursor: "default" }}>
                    <Users
                        color="#222b38"
                        size={"10%"}
                    />
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 24,
                                sm: 28,
                                md: 32,
                                lg: 38,
                            },
                            color: "#222b38",
                        }}
                    >
                        Patients
                    </Typography>
                </Box>
                <Box>
                    <IconButton
                        onClick={handleMenuOpen}
                        sx={{
                            gap: 1,
                            padding: 1,
                            fontWeight: 600,
                            height: "fit-content",
                            color: "#ffffff",
                            backgroundColor: "#222b38",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            "&:hover": {
                                color: "#ffffff",
                                backgroundColor: "#333e4c",
                            },
                        }}
                    >
                        <ArrowDownToLine />
                        <Box
                            sx={{
                                display: {
                                    xs: "none",
                                    md: "block",
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: 12,
                                        sm: 14,
                                        md: 16,
                                        lg: 18,
                                    },
                                    color: "#ffffff",
                                }}
                            >
                                Export
                            </Typography>
                        </Box>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        sx={{
                            marginTop: "3px",
                            "& .MuiPaper-root": {
                                width: "200px",
                                backgroundColor: "#222b38",
                                color: "#ffffff",
                                borderRadius: "5px",
                            },
                        }}
                    >
                        <MenuItem
                            onClick={handleMenuClose}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#333e4c",
                                },
                            }}
                        >
                            PDF
                        </MenuItem>
                        <MenuItem
                            onClick={handleMenuClose}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#333e4c",
                                },
                            }}
                        >
                            Excel
                        </MenuItem>
                        <MenuItem
                            onClick={handleMenuClose}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#333e4c",
                                },
                            }}
                        >
                            CSV
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
            <Box sx={{ height: "fit-content", marginBottom: 2 }}>
                <FilterBar
                    onPatientNameChange={handlePatientNameChange}
                    onPayerChange={handlePayerChange}
                />
            </Box>
            <Box
                sx={{
                    height: "fit-content",
                    width: "100%",
                    transition: "opacity 0.5s ease"
                }}
            >
                <PatientsTable
                    patientName={patientName}
                    selectedPayer={selectedPayer}
                />
            </Box>
        </Box>
    );
};

export default Patients;