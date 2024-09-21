'use client';

import React, { useState } from "react";
import { Box } from "@mui/joy";

import ContentBox from "@/components/common/contentBox";
import FilterBar from "@/components/patients/filterBar";
import PatientsTable from "@/components/patients/patientsTable";

const Patients = () => {
    const [state, setState] = useState({
        currentPage: 1,
        patientName: "",
        selectedPayer: "any"
    });

    const handleStateChange = (key, value) => {
        setState((prevState) => ({
            ...prevState,
            [key]: value,
            currentPage:
                key === "patientName" ||
                    key === "selectedPayer"
                    ? 1
                    : prevState.currentPage,
        }));
    };

    return (
        <ContentBox pageName="Patients">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    padding: { xs: 0, sm: 1 },
                    height: "90vh",
                    overflow: "scroll",
                    backgroundColor: "inherit",
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
        </ContentBox>
    );
};

export default Patients;