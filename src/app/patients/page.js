"use client";

import React from "react";
import { Box, Typography, IconButton } from "@mui/joy";
import { ArrowDownToLine } from "lucide-react";
import PatientsTable from "@/components/patients/patientsTable";

const Patients = () => {
    return (
        <Box sx={{ height: "85vh", width: "100vw", padding: 3 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 3,
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
            <PatientsTable />
        </Box>
    );
};

export default Patients;