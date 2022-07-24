import React from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Masonry from "@mui/lab/Masonry";
import consts from "../consts/index";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import service from "../pages_old/service";

function GalleryDetailList({ galleries, posts, navigate, galleryId }) {
  return (
    <Box>
      <Box style={{ padding: 16 }}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="primary"
            onClick={() => navigate(-1)}
            style={{ position: "absolute" }}
          >
            <ArrowBackIcon fontSize="medium" />
          </IconButton>
          <Typography
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              margiBottom: 8,
              width: "100%",
              textAlign: "center",
            }}
            variant="h6"
          >
            {galleries?.find((gallery) => gallery.id === galleryId)?.name}
          </Typography>
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
                  src={service.getUrl(
                    consts.ASSET_CANISTER_ID_SOCIALS,
                    `${item.postId}`
                  )}
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
