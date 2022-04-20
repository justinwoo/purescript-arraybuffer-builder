{-
-}
{ name = "arraybuffer-builder"
, dependencies =
  [ "arraybuffer"
  , "arraybuffer-types"
  , "effect"
  , "float32"
  , "maybe"
  , "prelude"
  , "tailrec"
  , "transformers"
  , "uint"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs" ]
, license = "MIT"
, repository = "https://github.com/jamesdbrock/purescript-arraybuffer-builder"
}
