import React from "react";
import * as React from "react";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ search, setSearch }) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      id="input-with-icon-textfield"
      placeholder="search post..."
      size="small"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;
