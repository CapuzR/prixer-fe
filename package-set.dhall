let upstream = https://github.com/dfinity/vessel-package-set/releases/download/mo-0.6.21-20220215/package-set.dhall sha256:b46f30e811fe5085741be01e126629c2a55d4c3d6ebf49408fb3b4a98e37589b
let Package =
    { name : Text, version : Text, repo : Text, dependencies : List Text }

let
  -- This is where you can add your own packages to the package-set
  additions =
    [
      { 
        name = "io",
        repo = "https://github.com/aviate-labs/io.mo",
        version = "v0.3.0",
        dependencies = [ "base" ]
      },
      { 
        name = "rand",
        repo = "https://github.com/aviate-labs/rand.mo",
        version = "v0.2.2",
        dependencies = [ "base" ]
      },
      { 
        name = "array",
        repo = "https://github.com/aviate-labs/array.mo",
        version = "v0.2.0",
        dependencies = [ "base" ]
      },
       { 
        name = "crypto",
        repo = "https://github.com/aviate-labs/crypto.mo",
        version = "v0.2.0",
        dependencies = [ "base", "encoding" ]
      },
      { 
        name = "encoding",
        repo = "https://github.com/aviate-labs/encoding.mo",
        version = "v0.2.1",
        dependencies = ["base"]
      },
      {
        name = "uuid",
        repo = "https://github.com/aviate-labs/uuid.mo.git", 
        version = "v0.2.0", 
        dependencies = [ "base", "encoding", "io" ]
      },
      { name = "asset-storage"
      , repo = "https://github.com/aviate-labs/asset-storage.mo"
      , version = "asset-storage-0.7.0"
      , dependencies = [ "base" ]
      },
      { name = "sha"
      , repo = "https://github.com/aviate-labs/sha.mo"
      , version = "v0.1.1"
      , dependencies = [ "base", "encoding" ]
      }
    ] : List Package

let
  {- This is where you can override existing packages in the package-set

     For example, if you wanted to use version `v2.0.0` of the foo library:
     let overrides = [
         { name = "foo"
         , version = "v2.0.0"
         , repo = "https://github.com/bar/foo"
         , dependencies = [] : List Text
         }
     ]
  -}
  overrides =
    [] : List Package

in  upstream # additions # overrides
