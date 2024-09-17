"use client";

import React, { useState } from "react";
import { Box, Modal } from "@mui/joy";
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
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
        gap: 2,
      }}
    >
      <PendingOrdersTable
        selectedOrder={selectedOrder}
        setSelectedOrder={handleOrderSelect}
      />
      {selectedOrder && !isSmallScreen && (
        <OrderTrackingMap selectedOrder={selectedOrder} />
      )}
      {isSmallScreen && (
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "90%",
            width: "90%",
            position: "absolute",
            top: "5%",
            left: "5%",
          }}
        >
          <OrderTrackingMap selectedOrder={selectedOrder} />
        </Modal>
      )}
    </Box>
  );
};

export default PendingOrdersTab;
