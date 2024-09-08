import React, { useEffect, useState } from "react";
import { Box, Typography } from '@mui/material'

const MainCarousel = (props) => {
    const { imgArr, delay } = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const maxIndex = imgArr.length - 1;

    useEffect(() => {
        const loadNext = () => {
            setActiveIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
        };

        const intervalId = setInterval(loadNext, delay);

        return () => clearInterval(intervalId);
    }, [delay, maxIndex]);

    return (
        <Box
            sx={{
                position: 'relative',
                top: '2px',
                p: 1,
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                width: '100%',
                bgcolor: 'rgba(51, 51, 51, 0.75)',   //rgba(61, 75, 45, 0.75)
                borderRadius: '7px'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                    width: { xs: '95%', sm: '80%', md: '40%', lg: '35%' },
                    bgcolor: 'rgba(51, 51, 51, 0.75)',
                    height: { xs: '50px', sm: '25px' },
                    borderRadius: '7px',
                    zIndex: 1
                }}
            >
                <Typography sx={{ color: 'white' }}>{imgArr[activeIndex].tag}</Typography>
            </Box>
            <Box
                component="img"
                sx={{
                    height: '280px',
                    width: '100%',
                    borderRadius: '7px',
                    objectFit: 'cover',
                    objectPosition: 'center'
                }}
                src={imgArr[activeIndex].imgPath}
            />
        </Box>
    );
};

export default MainCarousel;
