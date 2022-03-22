import React, { useState } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CameraIcon from "@mui/icons-material/Camera";

function PaperProfile({
  mobileBreakpoint,
  isShowToolsInfo,
  currentProfile,
  currentTools,
  setIsShowToolsInfo,
  deleteProfile,
  avatar,
  handleClick,
  anchorEl,
  setAnchorEl,
  open,
  navigate,
}) {
  const [isFollow, setIsFollow] = useState(false);
  return (
    <Paper
      elevation={3}
      style={{
        marginTop: -30,
        marginLeft: !mobileBreakpoint ? 16 : "auto",
        marginRight: !mobileBreakpoint ? 16 : "auto",
        padding: 8,
        maxWidth: mobileBreakpoint && 600,
      }}
    >
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Box style={{ marginRight: "12px" }}>
          {!isShowToolsInfo && (
            <Avatar src={avatar && avatar} style={{ width: 48, height: 48 }} />
          )}
        </Box>
        <Box>
          <Box>
            <Typography variant="body1">
              {isShowToolsInfo ? (
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <CameraAltIcon fontFamily="small" color="primary" />{" "}
                  {`${currentTools?.camera?.name}`}
                </Box>
              ) : (
                `${currentProfile.givenName[0]} ${currentProfile.familyName[0]}`
              )}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">
              {isShowToolsInfo ? (
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <CameraIcon fontFamily="small" color="primary" />
                  {`${currentTools?.lens?.name}`}
                </Box>
              ) : (
                `${currentProfile.displayName[0]}`
              )}
            </Typography>
          </Box>
          {!isShowToolsInfo && (
            <Box>
              <Typography variant="body2">
                {`${currentProfile.about[0]}`}
              </Typography>
            </Box>
          )}
        </Box>
        <Box style={{ marginLeft: "auto" }}>
          <Box style={{ display: "flex" }}>
            <Box>
              <IconButton
                size="small"
                color="primary"
                onClick={() => setIsShowToolsInfo(!isShowToolsInfo)}
              >
                {isShowToolsInfo ? (
                  <AccountCircleIcon fontFamily="small" color="primary" />
                ) : (
                  <CameraAltIcon fontFamily="small" color="primary" />
                )}
              </IconButton>
            </Box>
            <Box>
              <IconButton
                size="small"
                color="primary"
                onClick={() => navigate("/main?page=profile&isEdit=true")}
              >
                <EditIcon fontFamily="small" color="primary" />
              </IconButton>
            </Box>
          </Box>
          <Box style={{ display: "flex", justifyContent: "end" }}>
            <IconButton
              size="small"
              color="primary"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreHorizIcon color="primary" fontFamily="small" />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                style={{ color: "red" }}
                onClick={() => deleteProfile()}
              >
                Delete profile
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
      <Box style={{ marginTop: 16, display: "flex", alignItems: "center" }}>
        <Box style={{ marginTop: 4 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setIsFollow(!isFollow)}
            style={{ textTransform: "capitalize" }}
          >
            {isFollow ? "unfollow" : "follow"}
          </Button>
        </Box>
        <Box style={{ marginLeft: "auto" }}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Box style={{ textAlign: "center", marginRight: 12 }}>
              <Box>
                <Typography variant="body1">2</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Post</Typography>
              </Box>
            </Box>
            <Box style={{ textAlign: "center", marginRight: 12 }}>
              <Box>
                <Typography variant="body1">1000</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Following</Typography>
              </Box>
            </Box>
            <Box style={{ textAlign: "center" }}>
              <Box>
                <Typography variant="body1">1000</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Followers</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default PaperProfile;
