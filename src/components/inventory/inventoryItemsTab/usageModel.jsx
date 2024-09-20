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

const UsageModal = ({ layout, onClose, item, chartOptions }) => {
  const theme = useTheme();
  const pieChartOptions = {
    chart: {
      type: "pie",
      backgroundColor: theme.palette.base,
      height: "80%",
    },
    title: {
      text: null,
    },
    series: [
      {
        name: "Usage",
        colorByPoint: true,
        data: item.usage.data.map((value, index) => ({
          name: item.usage.months[index],
          y: value,
        })),
      },
    ],
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
  };

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
              flexDirection:{
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
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
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
                options={pieChartOptions}
              />
            </Box>
          </Box>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default UsageModal;
