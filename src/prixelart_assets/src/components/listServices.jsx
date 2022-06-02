import React from "react";
import * as React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
function ListServices({ services = [0, 1, 2, 3, 4], artist }) {
  return (
    <>
      <Grid container spacing={1} style={{ maxWidth: 1000, margin: "auto" }}>
        {services?.length === 0 ? (
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            No services
          </div>
        ) : (
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <Typography
              onClick={(event) => console.log(event)}
              variant="h6"
              className="mint-hl"
              style={{ textDecoration: "underline" }}
            >{`Mint ${artist.username} working hours`}</Typography>
          </div>
        )}
        {services.map((service, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={12} xl={6}>
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
                  <IconButton color="primary" style={{ marginLeft: "auto" }}>
                    <MoreHorizIcon />
                  </IconButton>
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
}

export default ListServices;
