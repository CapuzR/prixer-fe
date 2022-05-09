import React from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Masonry from "@mui/lab/Masonry";

import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

function GalleryDetailList({ galleries, posts, navigate, galleryId }) {
  return (
    <Box>
      <Box style={{ padding: 16 }}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Typography
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              margiBottom: 8,
            }}
            variant="h4"
          >
            {galleries?.find((gallery) => gallery.id === galleryId)?.name}
          </Typography>

          <IconButton
            color="primary"
            onClick={() => navigate(-1)}
            style={{ marginLeft: "auto" }}
          >
            <ArrowCircleLeftOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
        {posts.length === 0 ? (
          <Box
            style={{
              marginTop: 32,
              display: "flex",
              justifyContent: "center",
            }}
          >
            No posts.
          </Box>
        ) : (
          <Masonry columns={3} spacing={0.2}>
            {posts?.map((item, index) => (
              <div key={index} onClick={() => navigate(`/post/${item.postId}`)}>
                <img
                  src={`${item.post.postBasics.asset}`}
                  srcSet={`${item.post.postBasics.asset}`}
                  alt={item.postId}
                  loading="lazy"
                  style={{
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,
                    display: "block",
                    width: "100%",
                  }}
                />
              </div>
            ))}
          </Masonry>
        )}
      </Box>
    </Box>
  );
}

export default GalleryDetailList;
