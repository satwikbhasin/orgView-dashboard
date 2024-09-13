"use client";

import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/joy";
import { Container } from "lucide-react";
import InventoryTab from "@/components/inventory/intentoryTab";

const Inventory = () => {
    const [selectedTab, setSelectedTab] = useState("inventory");

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
                    <Container
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
                            transition: "opacity 0.2s ease",
                        }}
                    >
                        Inventory
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "left", gap: 2, alignContent: "center" }}>
                    <Button
                        onClick={() => setSelectedTab("inventory")}
                        sx={{
                            backgroundColor: "transparent",
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                            padding: 0,
                        }}
                    >
                        <Typography sx={{
                            color: selectedTab === "inventory" ? "black" : "gray",
                            fontSize: selectedTab === "inventory" ? "22px" : "21px",
                            transition: "font-size 0.3s ease",
                        }}>Inventory Items</Typography>
                    </Button>
                    <Button
                        onClick={() => setSelectedTab("pendingOrders")}
                        sx={{
                            backgroundColor: "transparent",
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                            padding: 0,
                        }}
                    >
                        <Typography sx={{
                            color: selectedTab === "pendingOrders" ? "black" : "gray",
                            fontSize: selectedTab === "pendingOrders" ? "22px" : "21px",
                            transition: "font-size 0.3s ease",
                        }}>Pending Orders</Typography>
                    </Button>
                </Box>
            </Box>
            <Box sx={{ marginTop: 2, transition: "opacity 0.5s ease", opacity: selectedTab === "inventory" ? 1 : 0 }}>
                {selectedTab === "inventory" ? (
                    <InventoryTab />
                ) : (
                    <Box>
                        Pending Orders
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Inventory;