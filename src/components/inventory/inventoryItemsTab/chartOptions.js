import { useTheme } from '@mui/material/styles';

export const getLineChartOptions = (item, isSmallScreen) => {
    const theme = useTheme();

    return {
        chart: {
            type: "line",
            zoomType: "xy",
            backgroundColor: theme.palette.base,
            height: "100%",
            color: theme.palette.text,
        },
        title: {
            text: null,
        },
        xAxis: {
            categories: item.usage.months,
            labels: {
                style: {
                    fontSize: isSmallScreen ? "8px" : "10px",
                    color: theme.palette.text,
                },
            },
        },
        yAxis: {
            title: {
                text: null,
            },
            labels: {
                style: {
                    fontSize: isSmallScreen ? "8px" : "10px",
                    color: theme.palette.text,
                },
            },
            tickInterval: 2000,
        },
        series: [
            {
                name: "Units per Month",
                data: item.usage.data,
                color: theme.palette.accent,
            },
        ],
        plotOptions: {
            line: {
                marker: {
                    enabled: true,
                    fillColor: theme.palette.accent,
                },
            },
        },
        legend: {
            itemStyle: {
                color: theme.palette.text,
                "&:hover": {
                    color: theme.palette.accent,
                },
            },
        },
    };
};

export const getPieChartOptions = (item) => {
    const theme = useTheme();

    return {
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
};