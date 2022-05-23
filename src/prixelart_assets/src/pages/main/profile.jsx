import React, { useState, useEffect, forwardRef } from "react";
import * as React from "react";
import { readAndCompressImage } from "browser-image-resizer";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";

import consts from "../../consts/index";
import service from "../service";
import Navbar from "../../components/navbar";
import PaperProfile from "../../components/paperProfile";
import NavigationBar from "../../components/navigationBar";
import ProfileForm from "../../components/profileForm";
import ToolsForm from "../../components/toolsForm";
import HandleProfileForms from "../../components/handleProfileForms";
import ListArts from "../../components/listArts";
import DialogFollowers from "../../components/dialogFollowers";
import ListGalleries from "../../components/listGalleries";
import SearchBar from "../../components/searchBar";
import DialogConfirmDelete from "../../components/dialogConfirmDelete";

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const toolbarHeight = 68;
  const theme = useTheme();
  const mobileBreakpoint = useMediaQuery(theme.breakpoints.up("md"));
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [assetProfile, setAssetProfile] = useState();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [editProfileScreen, setEditProfileScreen] = useState(
    consts.UPDATE_ARTIST_SCREEN_USER
  );
  const [isUpdateBanner, setIsUpdateBanner] = useState(false);
  const [profileScreen, setProfileScreen] = useState(consts.PROFILE_SCREEN_ART);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [artist, setArtist] = useState(undefined);
  const [galleries, setGalleries] = useState([]);
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [anchorElActionMenu, setAnchorElActionMenu] = useState(null);
  const [openActionMenuProfile, setOpenActionMenuProfile] = useState(false);
  const [anchorElActionMenuProfile, setAnchorElActionMenuProfile] =
    useState(null);
  const [details, setDetails] = useState();
  const [isLoadingFollows, setIsLoadingFollows] = useState(false);

  const [isDialogFollowersOpen, setIsDialogFollowersOpen] = useState(false);
  const [viewDialogFollowers, setViewDialogFollowers] = useState("");
  const [search, setSearch] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [typeDelete, setTypeDelete] = useState("");

  ///FORM PROFILE
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [artType, setArtType] = useState("");
  const [isLoadingChangeBanner, setIsLoadingChangeBanner] = useState(false);
  const [imageProfile, setImageProfile] = useState(
    service.getUrl(
      consts.ASSET_CANISTER_ID_ARTIST,
      `A${JSON.parse(localStorage.getItem("_scApp")).principal}`
    )
  );

  ///FORM TOOLS
  const [tools] = useState([
    {
      id: 1,
      name: "Lente 1 de prueba",
      description: "Prueba description",
      category: "lens",
    },
    {
      id: 2,
      name: "Lente 2 de prueba",
      description: "Prueba description",
      category: "lens",
    },
    {
      id: 3,
      name: "Camera 1 de prueba",
      description: "Prueba description",
      category: "camera",
    },
    {
      id: 4,
      name: "Camera 2 de prueba",
      description: "Prueba description",
      category: "camera",
    },
  ]);
  const [camera, setCamera] = useState("");
  const [lens, setLens] = useState("");
  const [selectedCameras, setSelectedCameras] = useState([]);
  const [selectedLens, setSelectedLens] = useState([]);

  const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexForPhone = /^[0-9]*$/;
  const regexForName = /^[a-zA-Z\s]*$/;

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    async function init() {
      if (!localStorage.getItem("wallet")) navigate("/login");
      setIsLoading(true);
      if (params.username === localStorage.getItem("username")) {
        await Promise.all([
          service.getArtist(),
          service.getArtistDetailsByUsername(params.username),
          service.getGalleriesByArtist(params.username),
        ])
          .then(([artist, detailsProfile, galleries]) => {
            setGalleries(galleries.ok);
            const parseArtist = service.parseArtist(artist);
            setArtist(parseArtist);
            setDetails(detailsProfile.ok);
            setIsGuest(false);
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
      } else {
        await Promise.all([
          service.getArtistByUsername(params.username),
          service.getArtistDetailsByUsername(params.username),
          service.getGalleriesByArtist(params.username),
        ])
          .then(([artistProfile, detailsProfile, galleries]) => {
            const parseArtistProfile = service.parseArtist(artistProfile);
            setGalleries(galleries.ok);
            setArtist(parseArtistProfile);
            setDetails(detailsProfile.ok);
            setIsGuest(true);
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
      }
    }
    init();
  }, [params]);
  useEffect(() => {
    if (isEditProfile) {
      setUsername(artist.username);
      setDisplayName(artist.displayName);
      setGivenName(artist.firstName);
      setFamilyName(artist.lastName);
      setLocation(artist.location);
      setPhone(artist.phone);
      setArtType(artist.artType);
      setAbout(artist.about);
      setEmail(artist.email);
      const parseCameras = artist.cameras.map((camera) => camera.Text);
      const parseLens = artist.lens.map((lens) => lens.Text);
      setSelectedLens(parseLens);
      setSelectedCameras(parseCameras);
    }
  }, [isEditProfile]);

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Navbar onLogout={onLogout} toolbarHeight={toolbarHeight} />
      <Box style={{ paddingTop: toolbarHeight }}>
        {isLoading ? (
          <Box
            style={{ display: "flex", justifyContent: "center", marginTop: 32 }}
          >
            <CircularProgress />
          </Box>
        ) : isEditProfile ? (
          <Box style={{ padding: 16 }}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="primary"
                onClick={() => setIsEditProfile(false)}
              >
                <ArrowBackIcon fontSize="medium" />
              </IconButton>
              <Typography
                variant="h6"
                style={{ textAlign: "center", width: "-webkit-fill-available" }}
              >
                {isEditProfile ? "Profile" : "Your cameras & lenses"}
              </Typography>
              <Button
                onClick={() => {
                  if (
                    !regexForEmail.test(email) ||
                    !username ||
                    !displayName ||
                    !givenName ||
                    !familyName ||
                    !location ||
                    !email ||
                    !phone ||
                    !about ||
                    !artType ||
                    selectedCameras.length === 0 ||
                    selectedLens.length === 0
                  ) {
                    setIsSnackbarOpen(true);
                    setSeverity("error");
                    setMessage("please complete the form");
                  } else {
                    const parseCameras = selectedCameras.map((camera) => ({
                      Text: camera,
                    }));
                    const parseLens = selectedLens.map((lens) => ({
                      Text: lens,
                    }));
                    onUpdateArtist({
                      description: "Artista de prueba",
                      details: [
                        ["firstName", { Text: givenName }],
                        ["lastName", { Text: familyName }],
                        ["artType", { Text: artType }],
                        ["username", { Text: username }],
                        ["displayName", { Text: displayName }],
                        [
                          "avatarAsset",
                          { Vec: [{ Slice: assetProfile }, { True: null }] },
                        ],
                        ["bannerAsset", { Vec: [{ False: null }] }],
                        ["location", { Text: location }],
                        ["email", { Text: email }],
                        ["phone", { Text: phone }],
                        ["about", { Text: about }],
                        // ["canisterId", { Principal: artist.canisterId }],
                        // ["assetCanId", { Principal: artist.assetCanisterId }],
                        [
                          "cameras",
                          {
                            Vec: parseCameras,
                          },
                        ],
                        [
                          "lens",
                          {
                            Vec: parseLens,
                          },
                        ],
                      ],
                      frontend: [],
                      name: `${givenName} ${familyName}`,
                      principal_id: JSON.parse(localStorage.getItem("_scApp"))
                        .principal,

                      thumbnail: `http://localhost:8000/A${
                        JSON.parse(localStorage.getItem("_scApp")).principal
                      }?canisterId=rno2w-sqaaa-aaaaa-aaacq-cai`,
                    });
                  }
                }}
                style={{
                  marginLeft: "auto",
                  color: "#5DBB63",
                }}
              >
                Update
              </Button>
            </Box>
            {editProfileScreen === consts.UPDATE_ARTIST_SCREEN_USER ? (
              <ProfileForm
                avatar={artist?.avatar}
                imageProfile={imageProfile}
                handleChange={handleChangeAvatarProfile}
                username={username}
                setUsername={setUsername}
                displayName={displayName}
                setDisplayName={setDisplayName}
                givenName={givenName}
                setGivenName={setGivenName}
                familyName={familyName}
                setFamilyName={setFamilyName}
                location={location}
                setLocation={setLocation}
                about={about}
                setAbout={setAbout}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                artType={artType}
                setArtType={setArtType}
                isLoading={isLoading}
                regexForEmail={regexForEmail}
                regexForPhone={regexForPhone}
                regexForName={regexForName}
              />
            ) : (
              <ToolsForm
                camera={camera}
                setCamera={setCamera}
                lens={lens}
                setLens={setLens}
                tools={tools}
                selectedCameras={selectedCameras}
                addCameras={addCameras}
                setSelectedCameras={setSelectedCameras}
                selectedLens={selectedLens}
                addLens={addLens}
                setSelectedLens={setSelectedLens}
              />
            )}

            <HandleProfileForms
              isLoading={isLoading}
              editProfileScreen={editProfileScreen}
              handleView={setEditProfileScreen}
            />
          </Box>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                height: 100,

                backgroundImage: `url(${service.getUrl(
                  consts.ASSET_CANISTER_ID_ARTIST,
                  `B${artist?.principal.toText()}`
                )})`,
                backgroundSize: "cover",
                alignItems: "flex-start",
                padding: "8px",
              }}
            >
              {artist?.username === localStorage.getItem("username") &&
                !isLoading && (
                  <IconButton
                    disabled={isLoadingChangeBanner}
                    size="small"
                    style={{ marginLeft: "auto", backgroundColor: "#C5C5C5" }}
                    component="label"
                  >
                    {isLoadingChangeBanner ? (
                      <CircularProgress size={32} />
                    ) : (
                      <EditIcon fontSize="small" color="primary" />
                    )}
                    <input
                      type="file"
                      hidden
                      onChange={(event) => handleChangeBanner(event)}
                    />
                  </IconButton>
                )}
            </div>
            <Box>
              <PaperProfile
                handleOpenActionMenuProfile={handleOpenActionMenuProfile}
                openActionMenuProfile={openActionMenuProfile}
                mobileBreakpoint={mobileBreakpoint}
                isLoading={isLoading}
                artist={artist}
                isGuest={isGuest}
                service={service}
                details={details}
                handleFollowers={handleFollowers}
                isLoadingFollows={isLoadingFollows}
                setViewDialogFollowers={setViewDialogFollowers}
                setDetails={setDetails}
                setOpenDialogFollowers={setIsDialogFollowersOpen}
              />
              <Menu
                id="basic-menu-profile"
                anchorEl={anchorElActionMenuProfile}
                open={openActionMenuProfile}
                onClose={() => {
                  setAnchorElActionMenuProfile(null);
                  setOpenActionMenuProfile(false);
                }}
                MenuListProps={{
                  "aria-labelledby": "basic-button-profile",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorElActionMenuProfile(null);
                    setOpenActionMenuProfile(false);
                    setIsEditProfile(true);
                  }}
                >
                  Edit profile
                </MenuItem>
                <MenuItem
                  style={{ color: "red" }}
                  onClick={async () => {
                    setOpenDelete(true);
                    setTypeDelete("profile");
                  }}
                >
                  Delete profile
                </MenuItem>
              </Menu>
            </Box>
            <Box
              style={{
                marginTop: 16,
                display: "flex",
                marginLeft: !mobileBreakpoint ? 16 : "auto",
                marginRight: !mobileBreakpoint ? 16 : "auto",
                maxWidth: mobileBreakpoint && 750,
              }}
            >
              <Box style={{ width: "50%", marginRight: "16px" }}>
                <Button
                  disabled={isLoading}
                  style={{
                    textTransform: "capitalize",
                    background:
                      profileScreen !== consts.PROFILE_SCREEN_ART && "white",
                    color:
                      profileScreen !== consts.PROFILE_SCREEN_ART && "#000000",
                  }}
                  variant="contained"
                  fullWidth
                  onClick={() => setProfileScreen(consts.PROFILE_SCREEN_ART)}
                >
                  Posts
                </Button>
              </Box>
              <Box style={{ width: "50%" }}>
                <Button
                  disabled={isLoading}
                  variant="contained"
                  fullWidth
                  style={{
                    textTransform: "capitalize",
                    background:
                      profileScreen === consts.PROFILE_SCREEN_ART && "white",
                    color:
                      profileScreen === consts.PROFILE_SCREEN_ART && "#000000",
                  }}
                  onClick={() =>
                    setProfileScreen(consts.PROFILE_SCREEN_GALLERIES)
                  }
                >
                  Galleries
                </Button>
              </Box>
            </Box>
            {!isLoading && profileScreen === consts.PROFILE_SCREEN_ART && (
              <Box style={{ width: "100%", padding: 16 }}>
                <SearchBar search={search} setSearch={setSearch} />
              </Box>
            )}

            <Box style={{ padding: 16, paddingBottom: 72 }}>
              {isLoading ? (
                <Box style={{ marginTop: 32, textAlign: "center" }}></Box>
              ) : profileScreen === consts.PROFILE_SCREEN_ART ? (
                <ListArts
                  search={search}
                  navigate={navigate}
                  details={details}
                  artist={artist}
                  arts={
                    details
                      ? details.postsRead === null
                        ? []
                        : details.postsRead[0]
                      : []
                  }
                  setDetails={setDetails}
                />
              ) : (
                <ListGalleries
                  getGalleryImage={getGalleryImage}
                  galleries={galleries}
                  navigate={navigate}
                  setGalleries={setGalleries}
                  setDetails={setDetails}
                  details={details}
                  username={
                    params.username === localStorage.getItem("username")
                      ? localStorage.getItem("username")
                      : params.username
                  }
                />
              )}
            </Box>
          </>
        )}
      </Box>
      {!mobileBreakpoint
        ? !isEditProfile && (
            <NavigationBar
              openActionMenu={openActionMenu}
              setOpenActionMenu={setOpenActionMenu}
              hanleOpenActionMenu={hanleOpenActionMenu}
              setAnchorElActionMenu={setAnchorElActionMenu}
              anchorElActionMenu={anchorElActionMenu}
              navigate={navigate}
              params={params.username}
              setIsCreateArt={console.log}
              setIsCrateGallery={console.log}
            />
          )
        : !isEditProfile && (
            <>
              <Fab
                color="primary"
                id="basic-button"
                aria-controls={openActionMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openActionMenu ? "true" : undefined}
                onClick={hanleOpenActionMenu}
                style={{ position: "fixed", bottom: 16, right: 16 }}
              >
                <AddIcon />
              </Fab>
              <Menu
                id="basic-menu"
                anchorEl={anchorElActionMenu}
                open={openActionMenu}
                onClose={() => {
                  setAnchorElActionMenu(null);
                  setOpenActionMenu(false);
                }}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorElActionMenu(null);
                    setOpenActionMenu(false);
                    navigate("/addArt");
                  }}
                >
                  Add post
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchorElActionMenu(null);
                    setOpenActionMenu(false);
                    navigate("/addGallery");
                  }}
                >
                  Add gallery
                </MenuItem>
              </Menu>
            </>
          )}
      {isDialogFollowersOpen && (
        <DialogFollowers
          open={isDialogFollowersOpen}
          setOpen={setIsDialogFollowersOpen}
          artist={artist}
          viewDialogFollowers={viewDialogFollowers}
          setViewDialogFollowers={setViewDialogFollowers}
          navigate={navigate}
        />
      )}

      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleCloseSnackbar}
        open={isSnackbarOpen}
        TransitionComponent={SlideTransition}
        style={{ display: isSnackbarOpen ? "flex" : "none" }}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
      <DialogConfirmDelete
        open={openDelete}
        setOpen={setOpenDelete}
        type={typeDelete}
        onDelete={async () => {
          setIsLoading(true);
          setOpenDelete(false);
          setAnchorElActionMenuProfile(null);
          setOpenActionMenuProfile(false);
          await service.deleteArtist();
          navigate("/login");
          setIsLoading(false);
        }}
      />
    </div>
  );

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }

  function handleCloseSnackbar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  }

  function onLogout() {
    service.onSignOutStoic();
    localStorage.clear();
    navigate("/login");
  }

  function hanleOpenActionMenu(event) {
    setOpenActionMenu(true);
    setAnchorElActionMenu(event.currentTarget);
  }

  function handleOpenActionMenuProfile(event) {
    setOpenActionMenuProfile(true);
    setAnchorElActionMenuProfile(event.currentTarget);
  }

  function addCameras(id) {
    const tool = tools.find((tl) => tl.id === id);

    if (selectedCameras.find((tl) => tl === tool.name)) {
      setIsSnackbarOpen(true);
      setSeverity("error");
      setMessage("Item already exist");
    } else {
      setSelectedCameras([...selectedCameras, tool.name]);
    }
  }
  function addLens(id) {
    const tool = tools.find((tl) => tl.id === id);

    if (selectedLens.find((tl) => tl === tool.name)) {
      setIsSnackbarOpen(true);
      setSeverity("error");
      setMessage("Item already exist");
    } else {
      setSelectedLens([...selectedLens, tool.name]);
    }
  }

  async function onUpdateArtist(artist) {
    setIsLoading(true);
    setIsEditProfile(false);
    localStorage.setItem("username", username);
    await Promise.all([
      service.updateArtist(artist),
      service.relPrincipalWithUsername(username),
    ]).then(async () => {
      const artistBD = await service.getArtist();
      const parseArtist = service.parseArtist(artistBD);
      setArtist(parseArtist);
      setIsLoading(false);
    });
  }

  async function handleFollowers(details) {
    const newData = { ...details };
    newData.followedByCaller = !newData.followedByCaller;
    setDetails(newData);
    if (details.followedByCaller) {
      newData.followersQty = parseInt(newData.followersQty) - 1;
      setDetails(newData);
      await service.removeFollow(artist.username);
    } else {
      newData.followersQty = parseInt(newData.followersQty) + 1;
      setDetails(newData);
      await service.addFollow(artist.username);
    }
  }

  async function handleChangeBanner(event) {
    setIsLoadingChangeBanner(true);
    const file = event.target.files[0];

    let config = {
      quality: 1,
      maxWidth: 1000,
      maxHeight: 1000,
      autoRotate: true,
      debug: true,
    };

    let resizedImage = await readAndCompressImage(file, config);

    while (resizedImage.size > 25000) {
      config = {
        quality: 1,
        maxWidth: config.maxWidth - 50,
        maxHeight: config.maxWidth - 50,
        autoRotate: true,
        debug: true,
      };
      resizedImage = await readAndCompressImage(file, config);
    }

    const resizedString = await convertToBase64(file);
    const data = [...new Uint8Array(await resizedImage.arrayBuffer())];
    const parseCameras = artist.cameras.map((camera) => {
      return {
        Text: camera.Text,
      };
    });
    const parseLens = artist.lens.map((lens) => {
      return {
        Text: lens.Text,
      };
    });
    // console.log(parsedCameras);
    await service.updateArtist({
      description: "Artista de prueba",
      details: [
        ["firstName", { Text: artist.firstName }],
        ["lastName", { Text: artist.lastName }],
        ["artType", { Text: artist.artType }],
        ["username", { Text: artist.username }],
        ["displayName", { Text: artist.displayName }],
        // ["avatarAsset", { Vec: { False: null } }],
        ["bannerAsset", { Vec: [{ Slice: data }, { True: null }] }],
        // ["canisterId", { Principal: artist.canisterId }],
        // ["assetCanId", { Principal: artist.assetCanisterId }],
        ["location", { Text: artist.location }],
        ["email", { Text: artist.email }],
        ["phone", { Text: artist.phone }],
        ["about", { Text: artist.about }],
        [
          "cameras",
          {
            Vec: parseCameras,
          },
        ],
        [
          "lens",
          {
            Vec: parseLens,
          },
        ],
      ],
      thumbnail: service.getUrl(
        consts.ASSET_CANISTER_ID_ARTIST,
        `A${JSON.parse(localStorage.getItem("_scApp")).principal}`
      ),
      frontend: [],
      name: `${artist.fullName}`,
      principal_id: JSON.parse(localStorage.getItem("_scApp")).principal,
    });
    setIsUpdateBanner(false);
    setIsLoadingChangeBanner(false);
  }

  function convertToBase64(blob) {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  async function handleChangeAvatarProfile(e) {
    const file = event.target.files[0];

    let config = {
      quality: 1,
      maxWidth: 200,
      maxHeight: 200,
      autoRotate: true,
      debug: true,
    };

    let resizedImage = await readAndCompressImage(file, config);

    while (resizedImage.size > 25000) {
      config = {
        quality: 1,
        maxWidth: config.maxWidth - 50,
        maxHeight: config.maxWidth - 50,
        autoRotate: true,
        debug: true,
      };
      resizedImage = await readAndCompressImage(file, config);
    }

    const resizedString = await convertToBase64(file);
    const data = [...new Uint8Array(await resizedImage.arrayBuffer())];
    setImageProfile(resizedString);
    setAssetProfile(data);
  }

  function getGalleryImage(id) {
    const posts = details?.postsRead[0];
    let postBD;
    posts?.map((post) =>
      post?.post?.postBasics?.details?.map((detail) => {
        if (detail[1]?.Text === id) {
          postBD = post;
        }
      })
    );
    return postBD
      ? service.getUrl(consts.ASSET_CANISTER_ID_SOCIALS, `${postBD?.postId}`)
      : "https://images.unsplash.com/photo-1650797392850-8f787504247f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1MzI4Mjk4Nw&ixlib=rb-1.2.1&q=80&w=1080";
  }
}

export default Profile;
