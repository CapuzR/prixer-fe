import React, { useState, useEffect, forwardRef } from "react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
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

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const toolbarHeight = 68;
  const theme = useTheme();
  const mobileBreakpoint = useMediaQuery(theme.breakpoints.up("md"));
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [editProfileScreen, setEditProfileScreen] = useState(
    consts.UPDATE_ARTIST_SCREEN_USER
  );
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

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    async function init() {
      if (!localStorage.getItem("wallet")) navigate("/login");
      setIsLoading(true);
      if (params.username === localStorage.getItem("username")) {
        await Promise.all([
          service.getArtistByUsername(params.username),
          service.getArtistDetailsByUsername(params.username),
          service.getGalleriesByArtist(params.username),
        ])
          .then(([artistProfile, detailsProfile, galleries]) => {
            setGalleries(galleries.ok);
            const parseArtistProfile = service.parseArtist(artistProfile);
            setArtist(parseArtistProfile);
            setDetails(detailsProfile.ok);
            setIsGuest(false);
            setIsLoading(false);
            console.log(details);
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
  console.log(details);

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Navbar onLogout={onLogout} toolbarHeight={toolbarHeight} />
      <Box style={{ paddingTop: toolbarHeight }}>
        {isEditProfile ? (
          <Box style={{ padding: 16 }}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h4">
                {isEditProfile ? "Profile" : "Your cameras & lenses"}
              </Typography>

              <IconButton
                color="primary"
                onClick={() => setIsEditProfile(false)}
                style={{ marginLeft: "auto" }}
              >
                <ArrowCircleLeftOutlinedIcon fontSize="large" />
              </IconButton>
            </Box>
            {editProfileScreen === consts.UPDATE_ARTIST_SCREEN_USER ? (
              <ProfileForm
                avatar={artist?.avatar}
                // handleChange={handleChange}
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
            <Box style={{ marginTop: 12 }}>
              <Button
                variant="outlined"
                disabled={isLoading}
                onClick={async () => {
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
                      ["location", { Text: location }],
                      ["email", { Text: email }],
                      ["phone", { Text: phone }],
                      ["about", { Text: about }],
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
                    thumbnail:
                      "https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg",
                  });
                }}
              >
                Update
              </Button>
            </Box>
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
                height: 100,
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1643041447984-ff891bdf0815?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NTM4NTM1NA&ixlib=rb-1.2.1&q=80&w=1080')",
                backgroundSize: "cover",
              }}
            />
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
                    setIsLoading(true);
                    setAnchorElActionMenuProfile(null);
                    setOpenActionMenuProfile(false);
                    await service.deleteArtist();
                    navigate("/login");
                    setIsLoading(false);
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
                  Art
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
                  Gallery
                </Button>
              </Box>
            </Box>
            <Box style={{ padding: 16, paddingBottom: 72 }}>
              {isLoading ? (
                <Box style={{ marginTop: 32, textAlign: "center" }}>
                  <CircularProgress />
                </Box>
              ) : profileScreen === consts.PROFILE_SCREEN_ART ? (
                <ListArts
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
                  galleries={galleries}
                  navigate={navigate}
                  setGalleries={setGalleries}
                  setDetails={setDetails}
                  details={details}
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
                  }}
                >
                  Create Art
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchorElActionMenu(null);
                    setOpenActionMenu(false);
                  }}
                >
                  Create Gallery
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
}

export default Profile;
