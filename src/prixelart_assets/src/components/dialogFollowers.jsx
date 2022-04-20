import React from "react";
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

function DialogFollowers({
  open,
  setOpen,
  currentProfile,
  isViewFollowing,
  setIsViewFollowing,
}) {
  const followers = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  const Following = [1, 2, 3];

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
        {`${currentProfile.displayName[0]}`}
      </DialogTitle>
      <DialogContent>
        <Box style={{ display: "flex" }}>
          <Box style={{ width: "50%", marginRight: "16px" }}>
            <Button
              style={{
                textTransform: "capitalize",
                background: isViewFollowing && "white",
                color: isViewFollowing && "#000000",
              }}
              onClick={() => setIsViewFollowing(false)}
              variant="contained"
              fullWidth
            >
              Following
            </Button>
          </Box>
          <Box style={{ width: "50%" }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setIsViewFollowing(true)}
              style={{
                textTransform: "capitalize",
                background: !isViewFollowing && "white",
                color: !isViewFollowing && "#000000",
              }}
            >
              Followers
            </Button>
          </Box>
        </Box>
        {isViewFollowing
          ? Following.map(() => (
              <Box
                style={{
                  marginTop: 12,
                  display: "flex",
                  padding: 8,
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Box
                  style={{
                    marginRight: 6,
                  }}
                >
                  <Avatar
                    src={
                      "https://images.unsplash.com/photo-1647008542808-f55d23281822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0ODYxNzAwMA&ixlib=rb-1.2.1&q=80&w=1080"
                    }
                  />
                </Box>
                <Box
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
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
                      Ricardo Capuz
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">Rcapuz123</Typography>
                  </Box>
                </Box>
                <Box style={{ marginLeft: "auto" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ fontSize: 10 }}
                  >
                    Followers
                  </Button>
                </Box>
              </Box>
            ))
          : followers.map(() => (
              <Box
                style={{
                  marginTop: 12,
                  display: "flex",
                  padding: 8,
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Box
                  style={{
                    marginRight: 6,
                  }}
                >
                  <Avatar
                    src={
                      "https://images.unsplash.com/photo-1647008542808-f55d23281822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0ODYxNzAwMA&ixlib=rb-1.2.1&q=80&w=1080"
                    }
                  />
                </Box>
                <Box
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
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
                      Ricardo Capuz
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">Rcapuz123</Typography>
                  </Box>
                </Box>
                <Box style={{ marginLeft: "auto" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ fontSize: 10 }}
                  >
                    Followers
                  </Button>
                </Box>
              </Box>
            ))}
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
