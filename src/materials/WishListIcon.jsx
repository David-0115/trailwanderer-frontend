import React, { useState } from "react";
import { Box, Chip } from '@mui/material'
import AddLocationOutlinedIcon from '@mui/icons-material/AddLocationOutlined';
import WrongLocationOutlinedIcon from '@mui/icons-material/WrongLocationOutlined';



const WishListIcon = ({ onList, trailId, wishlistAdd, wishlistRemove }) => {
    const [isOnWishList, setIsOnWishList] = useState(onList);

    const handleClick = () => {
        isOnWishList ? wishlistRemove(trailId) : wishlistAdd(trailId)
        setIsOnWishList(!isOnWishList)
    }

    return (

        <Box sx={{ m: .5 }}>

            {isOnWishList
                ? <Chip
                    size="small"
                    label="Remove from Wishlist"
                    variant="filled"
                    onClick={handleClick}
                    icon={<WrongLocationOutlinedIcon />}
                    color="error"
                />
                : <Chip
                    size="small"
                    label="Add to Wishlist"
                    variant="filled"
                    onClick={handleClick}
                    icon={<AddLocationOutlinedIcon />}
                    color="primary"
                />

            }
        </Box>
    )
}

export default WishListIcon;