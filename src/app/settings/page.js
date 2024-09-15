"use client";

import React from "react";
import {
    Typography, Box,
} from "@mui/joy";


const Settings = () => {

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
                            Settings
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Settings;