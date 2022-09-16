import React, { useEffect, useState } from "react";
import * as React from "react";

import {
  Box,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { service } from "../service";
import consts from "../consts";

const PaperProfile = ({
  artist,
  postsDetails,
  params,
  username,
  handleFollowers,
  handleUpdateProfile,

  setIsOpenWH,
}) => {
  const [openMenu, setOpenMenu] = useState();
  const [anchorElActionMenu, setAnchorElActionMenu] = useState(null);

  return (
    <Paper
      elevation={2}
      style={{
        marginTop: -30,
        marginLeft: "auto",
        marginRight: "auto",
        padding: 8,
        maxWidth: 600,
        width: "90%",
        // margin: "auto",
      }}
    >
      <Box style={{ display: "flex" }}>
        <Box style={{ marginRight: "12px" }}>
          <Avatar
            src={
              params === username
                ? artist.avatar
                : artist.principal
                ? service.getUrl(
                    consts.ASSET_CANISTER_ID_ARTIST,
                    `A${artist?.principal?.toText()}`
                  )
                : ""
            }
            style={{ width: 92, height: 92 }}
          />
        </Box>
        <Box>
          <Box
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography variant="body1">{`${artist?.fullName}`}</Typography>
          </Box>
          <Box
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography variant="body2">{`${artist?.username}`}</Typography>
          </Box>
          <Box
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography variant="body2">{`${artist?.about}`}</Typography>
          </Box>
        </Box>
        <Box style={{ marginLeft: "auto" }}>
          {artist.WHCanister && (
            <IconButton
              color="primary"
              id="basic-button-profile"
              onClick={(event) => setIsOpenWH(true)}
            >
              <LocalGroceryStoreIcon />
            </IconButton>
          )}

          {params === username ? (
            <IconButton
              color="primary"
              id="basic-button-profile"
              aria-controls={openMenu ? "basic-menu-profile" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={(event) => {
                setOpenMenu(true);
                setAnchorElActionMenu(event.currentTarget);
              }}
            >
              <MoreHorizIcon />
            </IconButton>
          ) : (
            <Button
              onClick={() => handleFollowers(postsDetails)}
              variant="outlined"
              style={{
                borderRadius: 15,
                textTransform: "capitalized",
                minWidth: 70,
              }}
              size="small"
            >
              {postsDetails.followedByCaller ? "Unfollow" : "Follow"}
            </Button>
          )}
          <Menu
            id="basic-menu-profile"
            anchorEl={anchorElActionMenu}
            open={openMenu}
            onClose={() => {
              setAnchorElActionMenu(null);
              setOpenMenu(false);
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button-profile",
            }}
          >
            <MenuItem onClick={() => handleUpdateProfile(true)}>
              <ListItemIcon>
                <EditIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText> Edit profile</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIsSettingsOpen(true);
                setAnchorElActionMenuProfile(null);
                setOpenActionMenuProfile(false);
              }}
            >
              <ListItemIcon>
                <SettingsIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText> Settings</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box
        style={{
          marginTop: 8,
          display: "flex",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            textAlign: "center",
            width: "25%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Box
            style={{
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: 14,
            }}
          >
            Posts
          </Box>
          <Box
            style={{
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {parseInt(postsDetails?.postsQty)}
          </Box>
        </Box>
        <Box
          style={{
            textAlign: "center",
            width: "25%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Box
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: 14,
            }}
          >
            Galleries
          </Box>
          <Box
            style={{
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {parseInt(postsDetails?.galleriesQty)}
          </Box>
        </Box>
        <Box
          style={{
            textAlign: "center",
            width: "25%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          onClick={() => {
            setViewDialogFollowers("followers");
            setOpenDialogFollowers(true);
          }}
        >
          <Box
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: 14,
            }}
          >
            Followers
            {/* {isLoadingFollows ? <CircularProgress size={24} /> : "Followers"} */}
          </Box>
          <Box
            style={{
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {parseInt(postsDetails?.followersQty)}
          </Box>
        </Box>
        <Box
          style={{
            textAlign: "center",
            width: "25%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          onClick={() => {
            setViewDialogFollowers("followings");
            setOpenDialogFollowers(true);
          }}
        >
          <Box
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: 14,
            }}
          >
            Following
          </Box>
          <Box
            style={{
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {parseInt(postsDetails?.followsQty)}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default PaperProfile;
