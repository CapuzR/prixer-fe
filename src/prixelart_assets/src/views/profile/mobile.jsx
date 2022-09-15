import React, { useContext } from "react";
import * as React from "react";
import { Box } from "@mui/material";

import NavigationBar from "../../components/navigationBar";
import Navbar from "../../components/navbar";
import Banner from "../../components/banner";
import PaperProfile from "../../components/paperProfle";
import ProfileNavigationButtons from "../../components/profileNavigationButtons";
import SearchBar from "../../components/searchBar";
import ListPosts from "../../components/listPosts";
import consts from "../../consts";
import ListGalleries from "../../components/listGalleries";
import RegistryForm from "../../components/registryForm";
import ListServices from "../../components/listServices";
import ListCollections from "../../components/listCollections";

const MobileView = ({
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
  services,
  setIsOpen,
  _createInvoice,
}) => {
  return (
    <Box style={{ height: "calc(100vh - 60px)" }}>
      <Navbar onLogout={onLogout} />
      <Box style={{ marginTop: 60, paddingBottom: 60 }}>
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
            <Box style={{ padding: 8 }}>
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
                <ListCollections
                  isMobile={isMobile}
                  collections={artist.collections}
                />
              ) : (
                <ListServices
                  isMobile={isMobile}
                  services={services}
                  setIsOpen={setIsOpen}
                  _createInvoice={_createInvoice}
                />
              )}
            </Box>
          </>
        )}
      </Box>
      <NavigationBar username={username} />
    </Box>
  );
};

export default MobileView;
