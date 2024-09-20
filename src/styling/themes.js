"use client";
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        logo: "#1A1A1A",
        accent: "#1C69FB",
        text: "#000000",
        transparent: "transparent",
        base: "#FAFAFA",
        hover: "#F0F4F8",
        disabled: "grey",
        border: "#DEDEDE",
        status: {
            success: {
                text: "#104B0F",
                background: "#E2FBE3",
            },
            warning: {
                text: "#FF8300",
                background: "#F8F5E7",
            },
            error: {
                text: "#F7DDD4",
                background: "#AD3206",
            },
        },
        inventory: {
            status: {
                green: {
                    text: "#C0F1EF",
                    background: "#03625E",
                },
                yellow: {
                    text: "#F1E7C9",
                    background: "#BB900A",
                },
                red: {
                    text: "#F7DDD4",
                    background: "#AD3206",
                },
            },
            itemGlance: {
                header: {
                    background: "#F0F4F8",
                    text: "#707070",
                },
                orderButton: {
                    background: "#EDEDED",
                    hover: {
                        background: "#E4E3E3",
                    }
                }
            },
            pendingOrdersTab: {
                orderMapTrackingCard: {
                    background: "rgba( 213, 212, 212, 0.15)",
                    boxShadow: "transparent",
                },
            }
        },
        navbar: {
            base: "#FFFFFF",
            tab: {
                selected: {
                    text: "#1C69FB",
                    background: "#F1F5FF",
                    hover: {
                        text: "#1C69FB",
                        background: "#E3EBF9",
                    }
                },
                regular: {
                    text: '#707070',
                    hover: {
                        text: "#000000",
                    }
                },
            },
            themeButton: {
                background: "#EDEDED",
                hover: {
                    background: "#EDEDED",
                }
            },
        },
        titlebar: {
            base: "#FAFAFA",
            exportButton: {
                menu: {
                    background: "#FFFFFF",
                    hover: {
                        background: "#F1F5FF",
                    }
                },
                hover: {
                    background: "#EDEDED",
                }
            }
        },
        table: {
            header: {
                background: "#F0F4F8",
                text: "#707070",
            },
            cell: {
                background: "#FBFCFE",
                text: "#000000",
                hover: {
                    background: "#F0F4F8",
                }
            },
        },
    }
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        logo: "#FFFFFF",
        accent: "#1C69FB",
        text: "#FFFFFF",
        transparent: "transparent",
        base: "#181818",
        hover: "#232A2E",
        disabled: "grey",
        border: "#32383E",
        status: {
            success: {
                text: "#C0F1EF",
                background: "#03625E",
            },
            warning: {
                text: "#F1E7C9",
                background: "#BB900A",
            },
            error: {
                text: "#F7DDD4",
                background: "#AD3206",
            },
        },
        inventory: {
            status: {
                green: {
                    text: "#C0F1EF",
                    background: "#03625E",
                },
                yellow: {
                    text: "#F1E7C9",
                    background: "#BB900A",
                },
                red: {
                    text: "#F7DDD4",
                    background: "#AD3206",
                },
            },
            itemGlance: {
                header: {
                    background: "#0B0D0E",
                    text: "#FFFFFF",
                },
                orderButton: {
                    background: "#0B0D0E",
                    hover: {
                        background: "#232A2E",
                    }
                }
            },
            pendingOrdersTab: {
                orderMapTrackingCard: {
                    background: "rgba( 52, 52, 52, 0.30 )",
                    boxShadow: "transparent",
                },
            }
        },
        navbar: {
            base: "#0B0D0E",
            tab: {
                selected: {
                    text: "#FFFFFF",
                    background: "#252525",
                    hover: {
                        text: "#FFFFFF",
                        background: "#222222",
                    }
                },
                regular: {
                    text: '#707070',
                    hover: {
                        text: "#FFFFFF",
                    }
                },
            },
            themeButton: {
                background: "#252525",
                hover: {
                    background: "#1C1C1C",
                }
            },
        },
        titlebar: {
            base: "#181818",
            exportButton: {
                menu: {
                    background: "#1A1A1A",
                    hover: {
                        background: "#252525",
                    }
                },
                hover: {
                    background: "#252525",
                }
            }
        },
        table: {
            header: {
                background: "#0B0D0E",
                text: "#FFFFFF",
            },
            cell: {
                background: "#1A1A1A",
                text: "#FFFFFF",
                hover: {
                    background: "#232A2E",
                }
            },
        }
    },
});

export { lightTheme, darkTheme };