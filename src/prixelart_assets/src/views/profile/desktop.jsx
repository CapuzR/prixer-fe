import React, { useState } from "react";
import * as React from "react";
import { Box, Paper } from "@mui/material";

import Navbar from "../../components/navbar";

import Sidebar from "../../components/sidebar";
import Banner from "../../components/banner";
import PaperProfile from "../../components/paperProfle";
import ProfileNavigationButtons from "../../components/profileNavigationButtons";
import SearchBar from "../../components/searchBar";
import consts from "../../consts";
import ListGalleries from "../../components/listGalleries";
import ListPosts from "../../components/listPosts";
import ActionButton from "../../components/actionButton";
import RegistryForm from "../../components/registryForm";
import ListServices from "../../components/listServices";
import ListCollections from "../../components/listCollections";

const DesktopView = ({
  window,
  onLogout,
  artist,
  banner,
  isMobile,
  handleScreen,
  screen,
  username,
  postsDetails,
  handleSearch,
  search,
  getGalleryImage,
  galleries,
  handleSidebar,
  isOpenSidebar,
  fullName,
  params,
  handleFollowers,
  deleteGallery,
  showPostDetails,
  addLike,
  removeLike,
  handleLikePost,
  handleUpdateProfile,
  isUpdateProfile,
  updateArtist,
  showGalleryDetails,
  setBanner,
}) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box style={{ height: "calc(100vh - 60px)" }}>
      <Navbar onLogout={onLogout} />
      <Sidebar
        drawerwidth={isOpenSidebar ? 240 : 80}
        container={container}
        isOpenSideMenu={isOpenSidebar}
        handleSidebar={handleSidebar}
        username={username}
        fullName={fullName}
      />
      <Box
        style={{
          paddingTop: isUpdateProfile ? 60 : 60,
          paddingBottom: 60,
        }}
      >
        {isUpdateProfile ? (
          <Box
            style={{
              maxWidth: 1000,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <RegistryForm
              isMobile={isMobile}
              createArtist={console.log}
              isUpdate={true}
              handleUpdateProfile={handleUpdateProfile}
              updateUsername={artist.username}
              updateDisplayName={artist.displayName}
              updateGivenName={artist.firstName}
              updateEmail={artist.email}
              updateFamilyName={artist.lastName}
              updateLocation={artist.location}
              updateAbout={artist.about}
              updatePhone={artist.phone}
              updateArtType={artist.artType}
              updateAvatar={artist.avatar}
              updateCameras={() => artist.cameras.map((camera) => camera.Text)}
              updateLens={() => artist.lens.map((lens) => lens.Text)}
              updateArtist={updateArtist}
            />
          </Box>
        ) : (
          <>
            <Box
              style={{
                maxWidth: 1000,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Paper
                elevation={3}
                style={{
                  marginTop: 48,
                  borderRadius: 10,

                  minHeight: "calc(100vh - 150px)",
                }}
              >
                <Banner
                  banner={banner}
                  updateArtist={updateArtist}
                  artist={artist}
                  setBanner={setBanner}
                />
                <PaperProfile
                  artist={artist}
                  isMobile={isMobile}
                  postsDetails={postsDetails}
                  params={params}
                  username={username}
                  handleFollowers={handleFollowers}
                  handleUpdateProfile={handleUpdateProfile}
                />
                <Box style={{ padding: 8 }}>
                  <ProfileNavigationButtons
                    isMobile={isMobile}
                    handleScreen={handleScreen}
                    screen={screen}
                  />
                </Box>
                <Box style={{ padding: 8 }}>
                  {screen === consts.PROFILE_SCREEN_ART && (
                    <SearchBar search={search} handleSearch={handleSearch} />
                  )}
                </Box>
                <Box style={{ padding: 8, paddingBottom: 72 }}>
                  {screen === consts.PROFILE_SCREEN_ART ? (
                    postsDetails && (
                      <ListPosts
                        search={search}
                        showPostDetails={showPostDetails}
                        addLike={addLike}
                        removeLike={removeLike}
                        handleLikePost={handleLikePost}
                        posts={
                          postsDetails
                            ? postsDetails.postsRead
                              ? postsDetails.postsRead[0]
                              : []
                            : []
                        }
                      />
                    )
                  ) : screen === consts.PROFILE_SCREEN_GALLERIES ? (
                    <ListGalleries
                      getGalleryImage={getGalleryImage}
                      galleries={galleries}
                      deleteGallery={deleteGallery}
                      showGalleryDetails={showGalleryDetails}
                    />
                  ) : screen === consts.PROFILE_SCREEN_COLLECTIONS ? (
                    <ListCollections isMobile={isMobile} />
                  ) : (
                    <ListServices isMobile={isMobile} />
                  )}
                </Box>
              </Paper>
            </Box>
          </>
        )}
      </Box>
      <ActionButton />
    </Box>
  );
};

export default DesktopView;
