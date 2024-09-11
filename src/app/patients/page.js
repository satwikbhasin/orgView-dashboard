"use client";

import React from "react";
import { Box, Typography } from "@mui/joy";
import PatientsTable from "@/components/patients/patientsTable";
import SearchFilter from "@/components/patients/searchFilter";

const Patients = () => {
    return (
        <Box sx={{ height: "h-screen", width: "100vw", padding: 5 }}>
            <Typography fontSize={30} fontWeight={800} marginBottom={3}>Patients</Typography>
            <PatientsTable />
        </Box>
    );
};

export default Patients;