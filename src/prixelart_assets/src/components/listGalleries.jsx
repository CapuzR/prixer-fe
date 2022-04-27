import React, { useState } from "react";
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

import service from "../pages/service";

function ListGalleries({
  galleries,
  navigate,
  setGalleries,
  setDetails,
  details,
}) {
  const [isLoading, setIsLoading] = useState(undefined);
  return (
    <Grid container spacing={1}>
      {galleries?.map((item, index) => (
        <Grid key={index} item xs={12} sm={4} md={4} lg={4} xl={3}>
          <Card
          // onClick={() => navigate(`/main?page=profile&gallery=${item.id}`)}
          >
            <CardMedia
              component="img"
              height="180"
              image={
                item.image
                  ? item.image.image
                  : "https://images.unsplash.com/photo-1643310638896-b73dd89c4597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NTQwNjY0MA&ixlib=rb-1.2.1&q=80&w=1080"
              }
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
                      setIsLoading(undefined);
                      setGalleries(
                        galleries.filter((galery) => galery.id !== item.id)
                      );
                      const newData = { ...details };
                      newData.galleriesQty = newData.galleriesQty - 1;
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
      ))}
    </Grid>
  );
}

export default ListGalleries;
