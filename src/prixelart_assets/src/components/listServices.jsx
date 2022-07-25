import React from "react";
import * as React from "react";

import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ListServices = ({ services = [1, 2, 3, 4], isMobile }) => {
  return (
    <>
      <Grid container spacing={!isMobile && 1}>
        {services?.length === 0 ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            No services
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Typography
              onClick={(event) => console.log(event)}
              variant="h6"
              className="mint-hl"
              style={{ textDecoration: "underline" }}
            >{`Mint ggranado working hours`}</Typography>
          </div>
        )}
        {services.map((service, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={4}
            style={{ paddingTop: isMobile && 8 }}
          >
            <Card>
              <CardMedia
                // onClick={() =>
                //   navigate(`/gallery/${item.id}/posts/${username}`)
                // }
                component="img"
                height="180"
                image={
                  "https://images.unsplash.com/photo-1653287606739-087b7e6a0843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NDEzNTk4Mg&ixlib=rb-1.2.1&q=80&w=1080"
                }
                alt="image"
              />
              <CardContent>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    Titulo
                  </Typography>
                  <Box style={{ marginLeft: "auto" }}>
                    <IconButton color="primary">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      //   onClick={() => setIsUpdateService(true)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box style={{ display: "flex", marginTop: 18 }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                  mollitia est aspernatur, necessitatibus dolore animi at
                  aliquid eos fugit recusandae, placeat cum odit laboriosam aut
                  repellat. Odit illum est soluta.
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ListServices;
