import React from "react";
import * as React from "react";

import {
  Box,
  IconButton,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ListGalleries = ({
  galleries = [],
  getGalleryImage,
  deleteGallery,
  showGalleryDetails,
}) => {
  return (
    <Grid container spacing={1}>
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
                onClick={() => showGalleryDetails(item.id)}
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
                      onClick={() => deleteGallery(item.id)}
                    >
                      {/* {isLoading === item.id ? (
                        <CircularProgress size={32} />
                      ) : ( */}
                      <DeleteIcon />
                      {/* )} */}
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
    </Grid>
  );
};

export default ListGalleries;
