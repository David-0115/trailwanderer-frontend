import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3D4B2D', // Forest Green
            contrastText: '#FFFFFF', // White text for contrast
        },
        secondary: {
            main: '#87CEEB', // Sky Blue
            contrastText: '#333333', // Charcoal Black text for contrast
        },
        error: {
            main: '#FF4500', // Sunset Orange
            contrastText: '#FFFFFF', // White text for contrast
        },
        warning: {
            main: '#FFD700', // Meadow Yellow
            contrastText: '#333333', // Charcoal Black text for contrast
        },
        info: {
            main: '#708090', // Mountain Grey
            contrastText: '#FFFFFF', // White text for contrast
        },
        success: {
            main: '#8B4513', // Earth Brown
            contrastText: '#FFFFFF', // White text for contrast
        },
        background: {
            default: '#F5F5DC', // Cream White
            paper: '#FFFFFF', // Standard white for paper background
        },
        text: {
            primary: '#333333', // Charcoal Black
            secondary: '#708090', // Mountain Grey for secondary text
        },
    },
});

export default theme;