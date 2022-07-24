import React, { useEffect, useState } from "react";
import * as React from "react";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import service from "../pages_old/service";

function DialogFollowers({
  open,
  setOpen,
  artist,
  viewDialogFollowers,
  setViewDialogFollowers,
  navigate,
}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(async () => {
    setIsLoading(true);
    if (viewDialogFollowers === "followers") {
      const followers = await service.getFollowersByArtist(artist.username);
      setData(followers.ok);
    } else {
      const followings = await service.getArtistFollows(artist.username);
      setData(followings.ok);
    }
    setIsLoading(false);
  }, [viewDialogFollowers]);
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`${artist?.displayName}`}
      </DialogTitle>
      <DialogContent>
        <Box style={{ display: "flex" }}>
          <Box style={{ width: "50%", marginRight: "16px" }}>
            <Button
              style={{
                textTransform: "capitalize",
                background: viewDialogFollowers !== "followers" && "white",
                color: viewDialogFollowers !== "followers" && "#000000",
              }}
              onClick={() => setViewDialogFollowers("followers")}
              variant="contained"
              fullWidth
            >
              Followers
            </Button>
          </Box>
          <Box style={{ width: "50%" }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setViewDialogFollowers("following")}
              style={{
                textTransform: "capitalize",
                background: viewDialogFollowers === "followers" && "white",
                color: viewDialogFollowers === "followers" && "#000000",
              }}
            >
              Following
            </Button>
          </Box>
        </Box>
        {isLoading ? (
          <Box style={{ marginTop: 32, textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          data.map((user, index) => (
            <Box
              style={{
                marginTop: 12,
                display: "flex",
                padding: 8,
                alignItems: "center",
                marginBottom: 12,
              }}
              key={index}
            >
              <Box
                style={{
                  marginRight: 6,
                }}
                onClick={() => navigate(`/u/${user.artistUsername}`)}
              >
                <Avatar
                  src={`http://localhost:8000/A${user.artistPrincipal.toText()}?canisterId=rno2w-sqaaa-aaaaa-aaacq-cai`}
                />
              </Box>
              <Box
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                onClick={() => navigate(`/u/${user.artistUsername}`)}
              >
                <Box>
                  <Typography
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      marginRight: 6,
                      textOverflow: "ellipsis",
                    }}
                    variant="body1"
                  >
                    {user.artistUsername}
                  </Typography>
                </Box>
                {/* <Box>
                <Typography variant="body2">Rcapuz123</Typography>
              </Box> */}
              </Box>
              <Box style={{ marginLeft: "auto" }}>
                {user.artistUsername !== localStorage.getItem("username") && (
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ fontSize: 10 }}
                    onClick={() => {
                      const newData = [...data];
                      newData[index].followedByCaller =
                        !newData[index].followedByCaller;
                      setData(newData);

                      if (!user.followedByCaller) {
                        service.removeFollow(user.artistUsername);
                      } else {
                        service.addFollow(user.artistUsername);
                      }
                    }}
                  >
                    {user.followedByCaller ? "Unfollow" : "Follow"}
                  </Button>
                )}
              </Box>
            </Box>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogFollowers;
