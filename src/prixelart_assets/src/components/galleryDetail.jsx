import React from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Masonry from "@mui/lab/Masonry";

import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

function GalleryDetail({ searchParams, galleries, arts, navigate }) {
  return (
    <Box>
      <Box style={{ padding: 16 }}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Typography
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            variant="h4"
          >{`${
            galleries.find(
              (gallery) => gallery.id === searchParams.get("gallery")
            )?.info?.name
          }`}</Typography>

          <IconButton
            color="primary"
            onClick={() => navigate("/main?page=profile")}
            style={{ marginLeft: "auto" }}
          >
            <ArrowCircleLeftOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
        <Masonry columns={3} spacing={0.2}>
          {arts?.map(
            (item, index) =>
              item.info.artBasics.artGalleries[0] ===
                searchParams.get("gallery") && (
                <div
                  key={index}
                  onClick={() =>
                    navigate("/main?page=profile&image=" + item.id)
                  }
                >
                  <img
                    src={`${item.image}`}
                    srcSet={`${item.image}`}
                    alt={item.id}
                    loading="lazy"
                    style={{
                      borderBottomLeftRadius: 4,
                      borderBottomRightRadius: 4,
                      display: "block",
                      width: "100%",
                    }}
                  />
                </div>
              )
          )}
        </Masonry>
      </Box>
    </Box>
  );
}

export default GalleryDetail;
