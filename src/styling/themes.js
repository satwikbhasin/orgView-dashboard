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
        disabled: "grey",
        navbar: {
            base: "#FFFFFF",
            border: "#DEDEDE",
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
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        logo: "#FFFFFF",
        accent: "#1C69FB",
        text: "#FFFFFF",
        transparent: "transparent",
        base: "#181818",
        disabled: "grey",
        navbar: {
            base: "#1A1A1A",
            border: "#707070",
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
        }
    },
}); 2

export { lightTheme, darkTheme };