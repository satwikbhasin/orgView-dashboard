"use client";

import React from "react";
import { Box } from "@mui/joy";
import Titlebar from "@/components/common/titlebar";


const Analytics = () => {
    return (
        <Box sx={{ height: "100vh", width: "100vw", display: 'flex', flexDirection: 'column', overflow: "scroll", backgroundColor: "#fafafa" }}>
            <Titlebar title="Analytics" />
        </Box>
    );
};

export default Analytics;