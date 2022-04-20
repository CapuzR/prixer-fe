import React from "react";
import * as React from "react";
import Masonry from "@mui/lab/Masonry";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

function ListArts({ arts, navigate, setOpen }) {
  return (
    <Masonry columns={3} spacing={0.2}>
      {arts?.map((item, index) => (
        <div key={index}>
          <img
            onClick={() => navigate("/profile?image=" + index)}
            src={`${item.img}?w=162&auto=format`}
            srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
            alt={index}
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
              alignItems: "center",
              color: "white",
            }}
          >
            <IconButton style={{ color: "white" }} size="small">
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" style={{ color: "white" }}>
              <ModeCommentOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      ))}
    </Masonry>
  );
}

export default ListArts;
