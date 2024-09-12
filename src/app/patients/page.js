"use client";

import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/joy";
import { ArrowDownToLine, Filter, FilterX } from "lucide-react";
import { Slide } from "@mui/material";
import FilterBar from "@/components/patients/filterBar";
import PatientsTable from "@/components/patients/patientsTable";

const Patients = () => {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [patientName, setPatientName] = useState("");
    const [selectedPayer, setSelectedPayer] = useState("any");
    const [currentPage, setCurrentPage] = useState(1);

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const handlePatientNameChange = (patientName) => {
        console.log(patientName);
        setPatientName(patientName);
        setCurrentPage(1);
    };

    const handlePayerChange = (payer) => {
        setSelectedPayer(payer);
        setCurrentPage(1);
    };

    return (
        <Box sx={{ height: "94vh", width: "100vw", padding: 5 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 2,
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: 24,
                            sm: 28,
                            md: 32,
                            lg: 38,
                        },
                        fontWeight: 800,
                    }}
                >
                    Patients
                </Typography>

                <IconButton
                    sx={{
                        gap: 1,
                        fontWeight: 600,
                        padding: 1,
                        height: "10%",
                        color: "#ffffff",
                        backgroundColor: "#222b38",
                        fontSize: {
                            xs: 12,
                            sm: 14,
                            md: 16,
                            lg: 18,
                        },
                        display: "flex",
                        "&:hover": {
                            color: "#ffffff",
                            backgroundColor: "#333e4c",
                        },
                    }}
                >
                    <ArrowDownToLine size={24} />
                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                md: "block",
                            },
                        }}
                    >
                        Download PDF
                    </Box>
                </IconButton>
            </Box>
            <Box sx={{ display: "flex", position: "relative", gap: 5 }}>
                <Slide direction="right" in={isFilterVisible} mountOnEnter unmountOnExit timeout={0}>
                    <Box sx={{ width: "20vw", height: "80vh" }}>
                        <FilterBar
                            onPatientNameChange={handlePatientNameChange}
                            onPayerChange={handlePayerChange}
                            toggleFilterVisibility={toggleFilterVisibility}
                        />
                    </Box>
                </Slide>

                <Box
                    sx={{
                        height: "80vh",
                        width: isFilterVisible ? "80vw" : "100vw",
                    }}
                >
                    {!isFilterVisible && (
                        <IconButton
                            onClick={toggleFilterVisibility}
                            sx={{
                                gap: 1,
                                fontWeight: 600,
                                fontSize: {
                                    xs: 16,
                                    sm: 18,
                                },
                                padding: 0,
                                color: "#262F3C",
                                visibility: isFilterVisible ? "hidden" : "visible",
                                opacity: isFilterVisible ? 0 : 1,
                                "&:hover": {
                                    color: "#258bE6",
                                    backgroundColor: "transparent",
                                },
                            }}
                        >
                            <FilterX size={24} />
                            Filter
                        </IconButton>
                    )
                    }
                    <PatientsTable
                        patientName={patientName}
                        selectedPayer={selectedPayer}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Patients;