"use client";

import React, { useState } from "react";
import { Box } from "@mui/joy";
import PendingOrdersTable from "./PendingOrdersTable";
import OrderTrackingMap from "@/components/inventory/orderTrackingMap";
import { useMediaQuery } from "@mui/material";

const PendingOrdersTab = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:960px)");

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    if (isSmallScreen) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "85vh",
        padding: 3,
        gap: 2,
      }}
    >
      <PendingOrdersTable
        selectedOrder={selectedOrder}
        setSelectedOrder={handleOrderSelect}
      />
      {selectedOrder && !isSmallScreen && <OrderTrackingMap selectedOrder={selectedOrder} />}
      {isSmallScreen && (
        <OrderTrackingMap
          selectedOrder={selectedOrder}
          open={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
};

export default PendingOrdersTab;