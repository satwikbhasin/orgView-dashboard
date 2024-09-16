"use client";

import React from "react";
import {
  Box,
  Modal,
  ModalDialog,
  ModalClose,
  DialogTitle,
  DialogContent,
} from "@mui/joy";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const UsageModal = ({ layout, onClose, item, chartOptions }) => {
  return (
    <Modal open={!!layout} onClose={onClose}>
      <ModalDialog
        layout={layout}
        sx={{
          border: "none",
          boxShadow: "none",
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "10%",
            color: "black",
          }}
        >
          Usage for {item.itemName}
        </DialogTitle>
        <ModalClose />
        <DialogContent>
          <Box
            sx={{
              height: "80vh",
              width: "50vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </Box>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default UsageModal;