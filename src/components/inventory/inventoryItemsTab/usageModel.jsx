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
import { useTheme } from "@mui/material/styles";
import { getPieChartOptions } from "./chartOptions";
import { getLineChartOptions } from "./chartOptions";

const UsageModal = ({ layout, onClose, item }) => {
  const theme = useTheme();

  return (
    <Modal open={!!layout} onClose={onClose}>
      <ModalDialog
        layout={layout}
        sx={{
          border: "none",
          boxShadow: "none",
          backgroundColor: theme.palette.base,
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "10%",
            color: theme.palette.text,
          }}
        >
          Usage for {item.itemName}
        </DialogTitle>
        <ModalClose />
        <DialogContent>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                height: "50%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HighchartsReact
                highcharts={Highcharts}
                options={getLineChartOptions(item, false)}
              />
            </Box>
            <Box
              sx={{
                height: "50%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HighchartsReact
                highcharts={Highcharts}
                options={getPieChartOptions(item)}
              />
            </Box>
          </Box>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default UsageModal;
