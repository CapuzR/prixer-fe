import React from "react";
import * as React from "react";

import CircularProgress from "@mui/material/CircularProgress";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import service from "../pages/service";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import consts from "../consts/index";

function PaperProfile({
  mobileBreakpoint,
  isLoading,
  artist,
  handleOpenActionMenuProfile,
  openActionMenuProfile,
  isGuest,
  setViewDialogFollowers,
  details,
  handleFollowers,
  isLoadingFollows,
  setOpenDialogFollowers,
}) {
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
      {isLoading ? (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 150,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box style={{ display: "flex" }}>
            <Box style={{ marginRight: "12px" }}>
              <Avatar
                src={service.getUrl(
                  consts.ASSET_CANISTER_ID_ARTIST,
                  `A${artist?.principal.toText()}`
                )}
                style={{ width: 92, height: 92 }}
              />
            </Box>
            <Box
              style={{
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
                }}
              >
                <Typography
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  variant="body1"
                >{`${artist?.fullName}`}</Typography>
              </Box>
              <Box
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  variant="body2"
                >{`${artist?.displayName}`}</Typography>
              </Box>
              <Box
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography
                  variant="body2"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >{`${artist?.about}`}</Typography>
              </Box>
            </Box>
            <Box style={{ marginLeft: "auto" }}>
              {!isGuest ? (
                <IconButton
                  color="primary"
                  id="basic-button-profile"
                  aria-controls={
                    openActionMenuProfile ? "basic-menu-profile" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={openActionMenuProfile ? "true" : undefined}
                  onClick={handleOpenActionMenuProfile}
                >
                  <MoreHorizIcon />
                </IconButton>
              ) : (
                <Button
                  onClick={() => handleFollowers(details)}
                  variant="outlined"
                  style={{
                    borderRadius: 15,
                    textTransform: "capitalized",
                    minWidth: 70,
                  }}
                  size="small"
                >
                  {isLoadingFollows ? (
                    <CircularProgress size={24} />
                  ) : details.followedByCaller ? (
                    "Unfollow"
                  ) : (
                    "Follow"
                  )}
                </Button>
              )}
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
                {parseInt(details?.postsQty)}
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
                {parseInt(details?.galleriesQty)}
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
                {isLoadingFollows ? (
                  <CircularProgress size={24} />
                ) : (
                  "Followers"
                )}
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
                {!isLoadingFollows && parseInt(details?.followersQty)}
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
                {parseInt(details?.followsQty)}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
}

export default PaperProfile;
