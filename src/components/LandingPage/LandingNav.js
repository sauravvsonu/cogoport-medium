import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import {Typography, Box, MenuItem, IconButton, Badge, Avatar} from '@mui/material'
// import MenuIcon from "@mui/icons-material/Menu";

const LandingNav = () => {
  return (
    <div>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography variant="h6">
              Sparkle
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
             
              <MenuItem>
                {/* <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <PublishOutlinedIcon />
                </IconButton> */}
                <p>Publish</p>
              </MenuItem>
              {/* <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {/* <AccountCircle /> */}
                <Avatar
                  alt="Remy Sharp"
                  src="https://lh3.googleusercontent.com/ogw/AGvuzYa-K4hwbt0dCtx1nkQmPzHK1__HTIkDHfGLwleL=s32-c-mo"
                />
              </IconButton>
            </Box>
            {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box> */}
          </Toolbar>
        </AppBar>
    </div>
  )
}

export default LandingNav   