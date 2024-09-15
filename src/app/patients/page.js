"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/joy";
import { ArrowDownToLine, Users } from "lucide-react";
import FilterBar from "@/components/patients/filterBar";
import PatientsTable from "@/components/patients/patientsTable";
import Titlebar from "@/components/common/titlebar";

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
            <Titlebar title="Patients" />
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