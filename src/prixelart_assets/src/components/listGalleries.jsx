import React, { useState, forwardRef } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";

import service from "../pages/service";

function ListGalleries({
  galleries,
  navigate,
  setGalleries,
  setDetails,
  details,
  username,
  getGalleryImage,
}) {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [severity, setSeverity] = useState(undefined);
  const [isLoading, setIsLoading] = useState(undefined);

  return (
    <Grid container spacing={1} style={{ maxWidth: 1000, margin: "auto" }}>
      {galleries?.length === 0 ? (
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          No galleries
        </div>
      ) : (
        galleries?.map((item, index) => (
          <Grid key={index} item xs={12} sm={4} md={4} lg={4} xl={3}>
            <Card>
              <CardMedia
                onClick={() =>
                  navigate(`/gallery/${item.id}/posts/${username}`)
                }
                component="img"
                height="180"
                image={getGalleryImage(item.id)}
                alt="image"
              />
              <CardContent>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                  </Box>
                  <Box style={{ marginLeft: "auto" }}>
                    <IconButton
                      color="primary"
                      onClick={async () => {
                        setIsLoading(item.id);
                        await service.removeGallery(item.id);
                        setIsSnackbarOpen(true);
                        setSeverity("success");
                        setMessage("gallery deleted successfully");

                        setIsLoading(undefined);
                        setGalleries(
                          galleries.filter((galery) => galery.id !== item.id)
                        );
                        const newData = { ...details };
                        newData.galleriesQty =
                          parseInt(newData.galleriesQty) - 1;
                        setDetails(newData);
                      }}
                    >
                      {isLoading === item.id ? (
                        <CircularProgress size={32} />
                      ) : (
                        <DeleteIcon />
                      )}
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleCloseSnackbar}
        open={isSnackbarOpen}
        TransitionComponent={SlideTransition}
        style={{ display: isSnackbarOpen ? "flex" : "none" }}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </Grid>
  );
}

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

function handleCloseSnackbar(event, reason) {
  if (reason === "clickaway") {
    return;
  }
  setIsSnackbarOpen(false);
}

export default ListGalleries;
