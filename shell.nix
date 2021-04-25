{ pkgs ? import <nixpkgs> { } }:
let
  easy-ps = import (builtins.fetchGit {
    url = "https://github.com/toastal/easy-purescript-nix";
    ref = "purs-0.14.1";
    rev = "5dd6dd1fdad9a5f96d8574ef7160729b7a54f94f";
  }) { inherit pkgs; };
in
pkgs.mkShell {
  buildInputs = [
    easy-ps.purs-0_14_1
    easy-ps.spago
    easy-ps.pulp
    pkgs.nodejs-15_x
    pkgs.nodePackages.bower
  ];
  LC_ALL = "C.UTF-8"; # https://github.com/purescript/spago/issues/507
}
