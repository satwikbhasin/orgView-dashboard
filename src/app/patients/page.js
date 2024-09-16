'use client';

import React, { useState, useRef } from "react";
import { Box } from "@mui/joy";
import FilterBar from "@/components/patients/filterBar";
import PatientsTable from "@/components/patients/patientsTable";
import Titlebar from "@/components/common/titlebar";

const Patients = () => {
    const [state, setState] = useState({
        currentPage: 1,
        patientName: "",
        selectedPayer: "any"
    });

    const handleStateChange = (key, value) => {
        setState(prevState => ({
            ...prevState,
            [key]: value,
            currentPage: key === 'patientName' || key === 'selectedPayer' ? 1 : prevState.currentPage
        }));
    };

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
                        onPatientNameChange={(value) => handleStateChange('patientName', value)}
                        onPayerChange={(value) => handleStateChange('selectedPayer', value)}
                    />
                </Box>
                <Box sx={{ display: "flex", flex: 4 }}>
                    <PatientsTable
                        searchFilter={state}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Patients;