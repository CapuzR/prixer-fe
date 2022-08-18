import React from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

import { service } from "../service";
import { fromHex } from "../utlis";
const ListCollections = ({ collections, isMobile }) => {
  const listNFT = async (id) => {
    try {
      const result = await service._listNFT(id);
    } catch (err) {
      console.log(err);
      console.log("[ERR IN LIST NFT]");
    }
  };

  const getNFTByIndex = async (id, index) => {
    try {
      const result = await service._getNFTByIndex(id, index);
    } catch (err) {
      console.log(err);
      console.log("[ERR IN GET NFT BY INDEX]");
    }
  };
  const navigate = useNavigate();
  // mintNFT(collection.principal, {
  //   payload: {
  //     Payload: [...new Uint8Array(fromHex("01AE"))],
  //   },
  //   contentType: "Aqui va el contentType",
  //   owner: [],
  //   properties: [
  //     {
  //       name: "Property name",
  //       value: { Int: 5 },
  //       immutable: true,
  //     },
  //   ],
  //   isPrivate: false,
  // })

  return (
    <>
      <Grid container spacing={!isMobile && 1}>
        {collections?.length === 0 ? (
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            No collections
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
            >{`Mint ggrnado working hours`}</Typography>
          </div>
        )}
        {collections?.map((collection, index) => (
          <Grid
            key={index}
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={4}
            item
            style={{ paddingTop: isMobile && 8 }}
          >
            <Card
              onClick={() => navigate(`/collection/${collection.principal}`)}
            >
              <CardMedia
                component="img"
                height="180"
                image={
                  "https://images.unsplash.com/photo-1653287606739-087b7e6a0843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NDEzNTk4Mg&ixlib=rb-1.2.1&q=80&w=1080"
                }
                alt="image"
              />
              <CardContent>
                <Box style={{ textAlign: "center" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {collection.name}
                  </Typography>
                </Box>
                <Box style={{ textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    style={{ color: "rgb(131 129 129)" }}
                  >
                    {collection.symbol}
                  </Typography>
                </Box>
                <Box style={{ display: "flex", marginTop: 18 }}>
                  <Box style={{ width: "33.33%", textAlign: "center" }}>
                    <Box style={{ fontWeight: 900, color: "rgb(26 208 184)" }}>
                      Volume
                    </Box>
                    <Box>{collection.supply}</Box>
                  </Box>
                  <Box style={{ width: "33.33%", textAlign: "center" }}>
                    <Box style={{ fontWeight: 900, color: "rgb(26 208 184)" }}>
                      Listings
                    </Box>
                    <Box>22</Box>
                  </Box>
                  <Box style={{ width: "33.33%", textAlign: "center" }}>
                    <Box style={{ fontWeight: 900, color: "rgb(26 208 184)" }}>
                      Floor Price
                    </Box>
                    <Box>15.00</Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ListCollections;
