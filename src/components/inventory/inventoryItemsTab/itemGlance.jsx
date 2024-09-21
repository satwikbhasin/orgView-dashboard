"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Tooltip, Chip } from "@mui/joy";
import {
  X,
  CircleCheck,
  ShoppingBasket,
  PowerOff,
  Power,
  TrendingUp,
  Expand,
} from "lucide-react";
import { useMediaQuery } from "@mui/material";
import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import UsageModal from "@/components/inventory/inventoryItemsTab/usageModel";
import { useTheme } from "@mui/material/styles";
import { getPieChartOptions } from "./chartOptions";
import { getLineChartOptions } from "./chartOptions";

const ItemGlance = ({ item, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [isIntelligentOrderingEnabled, setIsIntelligentOrderingEnabled] =
    useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [layout, setLayout] = useState(undefined);
  const theme = useTheme();

  useEffect(() => {
    if (item) {
      setVisible(true);
    }
  }, [item]);

  useEffect(() => {
    if (orderPlaced) {
      const timer = setTimeout(() => {
        setOrderPlaced(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [orderPlaced]);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:601px) and (max-width:960px)"
  );

  const iconSize = isSmallScreen ? 10 : isMediumScreen ? 12 : 14;

  const handleExpandUsage = () => setLayout("center");

  const getStatus = (status) => {
    switch (status) {
      case "green":
        return {
          label: "Green",
          color: theme.palette.inventory.status.green.text,
          backgroundColor: theme.palette.inventory.status.green.background,
        };
      case "yellow":
        return {
          label: "Yellow",
          color: theme.palette.inventory.status.yellow.text,
          backgroundColor: theme.palette.inventory.status.yellow.background,
        };
      case "red":
        return {
          label: "Red",
          color: theme.palette.inventory.status.red.text,
          backgroundColor: theme.palette.inventory.status.red.background,
        };
      default:
        return {
          label: "Unknown",
          color: theme.palette.text,
          backgroundColor: theme.palette.transparent,
        };
    }
  };

  const status = getStatus(item.status);

  return (
    <Box
      sx={{
        height: "fit-content",
        width: "35%",
        border: `1px solid ${theme.palette.border}`,
        borderRadius: 0,
        left: visible ? "0%" : "30%",
        transition: "left 0.3s ease-in-out",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.base,
        position: "relative",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 1,
          backgroundColor: theme.palette.inventory.itemGlance.header,
          borderBottom: `1px solid ${theme.palette.border}`,
          height: "10%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            sx={{
              color: theme.palette.text,
              fontSize: {
                xs: "8px",
                md: "10px",
                lg: "12px",
              },
            }}
            fontWeight={600}
          >
            {item.itemName}
          </Typography>
          <Chip
            size="small"
            sx={{
              backgroundColor: status.backgroundColor,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              color: status.color,
              justifyContent: "center",
              height: "fit-content",
              width: "fit-content",
              paddingLeft: 1,
              paddingRight: 1,
            }}
          >
            <Typography fontSize={{ xs: 6, md: 7, lg: 9 }} color={status.color}>
              {status.label}
            </Typography>
          </Chip>
        </Box>
        <IconButton
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
        >
          <X color={theme.palette.accent} strokeWidth={3} size={iconSize} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          backgroundColor: theme.palette.base,
          height: "45%",
          flexDirection: "column",
          gap: 2,
          paddingLeft: 0.5,
          paddingRight: 0.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
            backgroundColor: theme.palette.base,
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 0.5,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <TrendingUp
              color={theme.palette.accent}
              strokeWidth={2.8}
              size={iconSize}
            />
            <Typography
              sx={{
                color: theme.palette.text,
                fontSize: {
                  xs: 7,
                  sm: 9,
                  md: 11,
                },
              }}
              fontWeight={600}
            >
              Usage
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            <IconButton onClick={handleExpandUsage}>
              <Expand
                color={theme.palette.accent}
                strokeWidth={2.8}
                size={iconSize}
              />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: theme.palette.base,
            height: "100%",
          }}
        >
          <HighchartsReact
            highcharts={Highcharts}
            options={getLineChartOptions(item, false)}
          />
        </Box>
      </Box>
      <Box
        sx={{
          borderBottom: `1px solid ${theme.palette.border}`,
          paddingLeft: 2,
          paddingRight: 2,
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          backgroundColor: theme.palette.base,
          flexDirection: "column",
          paddingLeft: 2,
          paddingRight: 2,
          gap: 1,
          marginBottom: 2,
        }}
      >
        <Box>
          <IconButton
            onClick={() => setOrderPlaced(true)}
            size="small"
            sx={{
              backgroundColor:
                theme.palette.inventory.itemGlance.orderButton.background,
              border: `1px solid ${theme.palette.border}`,
              color: theme.palette.accent,
              padding: 1,
              alignItems: "center",
              width: "fit-content",
              gap: 1,
              "&:hover": {
                backgroundColor:
                  theme.palette.inventory.itemGlance.orderButton.hover
                    .background,
                color: theme.palette.accent,
              },
              transition: "background-color 0.3s ease, color 0.3s",
            }}
          >
            {orderPlaced ? (
              <CircleCheck
                color={theme.palette.accent}
                strokeWidth={3}
                size={iconSize}
              />
            ) : (
              <ShoppingBasket
                color={theme.palette.accent}
                strokeWidth={3}
                size={iconSize}
              />
            )}
            {orderPlaced ? (
              <Typography fontWeight={700} fontSize={{ xs: 6, md: 8, lg: 10 }}>
                Ordered
              </Typography>
            ) : (
              <Typography fontWeight={700} fontSize={{ xs: 6, md: 8, lg: 10 }}>
                Order
              </Typography>
            )}
          </IconButton>
          <Typography
            sx={{
              color: theme.palette.disabled,
              fontSize: { xs: 6, md: 8, lg: 10 },
              mt: 0,
            }}
          >
            {orderPlaced ? "Ordered a few seconds ago" : "Ordered 17 days ago"}
          </Typography>
        </Box>
        <Tooltip
          size="sm"
          title="Enable/Disable auto-ordering for this item only"
        >
          <IconButton
            size="small"
            sx={{
              backgroundColor: isIntelligentOrderingEnabled
                ? "#E0F3F1"
                : "#dbd7d7",
              transition: "background-color 0.3s ease, color 0.3s",
              "&:hover": {
                background: isIntelligentOrderingEnabled
                  ? "#D2E6E4"
                  : "#dbced0",
              },
              "&:active": {
                background: isIntelligentOrderingEnabled
                  ? "#d7dbd8"
                  : "#dbd7d7",
              },
              alignItems: "center",
              gap: 1,
              width: "fit-content",
              padding: 1,
            }}
            onClick={() =>
              setIsIntelligentOrderingEnabled(!isIntelligentOrderingEnabled)
            }
          >
            {isIntelligentOrderingEnabled ? (
              <Power strokeWidth={2.8} size={iconSize} color="#019992" />
            ) : (
              <PowerOff strokeWidth={2.8} size={iconSize} color="#C04000" />
            )}
            <Typography
              fontWeight={700}
              sx={{
                color: isIntelligentOrderingEnabled ? "#019992" : "#C04000",
                transition: "color 1s ease",
                fontSize: { xs: 6, md: 8, lg: 10 },
              }}
            >
              Intelligent Ordering
            </Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <UsageModal
        layout={layout}
        onClose={() => setLayout(undefined)}
        item={item}
      />
    </Box>
  );
};

export default ItemGlance;
