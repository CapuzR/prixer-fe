import React from "react";
import * as React from "react";

import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
} from "@mui/material";

const ListServices = ({ isMobile, services, _createInvoice, setIsOpen }) => {
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
                    {service.name.split("-")[1]}
                  </Typography>
                  <Box style={{ marginLeft: "auto" }}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() =>
                        Promise.resolve(_createInvoice())
                          .then(() => setIsOpen(true))
                          .catch(console.log)
                      }
                    >
                      Buy
                    </Button>
                  </Box>
                </Box>
                <Box style={{ display: "flex", marginTop: 18 }}>
                  {service.symbol}
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
