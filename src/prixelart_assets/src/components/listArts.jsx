import React from "react";
import * as React from "react";
import Masonry from "@mui/lab/Masonry";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

function ListArts({ arts, navigate, setOpen }) {
  return (
    <Masonry columns={3} spacing={0.2}>
      {arts?.map((item, index) => (
        <div key={index}>
          <img
            onClick={() => navigate("/main?page=profile&image=" + item.id)}
            src={`${item.image}`}
            srcSet={`${item.image}`}
            alt={item.id}
            loading="lazy"
            style={{
              display: "block",
              width: "100%",
            }}
          />
          <div
            style={{
              backgroundColor: "#2D2D2D",
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              height: 40,
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              color: "white",
            }}
          >
            <IconButton
              style={{ color: "white" }}
              onClick={() => setOpen(true)}
            >
              <HeartBrokenIcon />
            </IconButton>

            <IconButton style={{ color: "white" }}>
              <FavoriteBorderIcon />
            </IconButton>
          </div>
        </div>
      ))}
    </Masonry>
  );
}

export default ListArts;
