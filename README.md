# LSCOLORS Generator #

## To use ##

Go [here](http://geoff.greer.fm/lscolors/) or clone the repo and open index.html in your favorite browser. Pick the colors you like, then copy the LSCOLORS environment variable into your bashrc/profile/zshrc/whatever. Remember that it's LSCOLORS for BSD and LS_COLORS for Linux.

## Troubleshooting ##

If you don't see any colors at all, you might also need to run ls with certain parameters (ls -G on BSD, ls --color on Linux) or set an environment variable (export CLICOLOR=1).

If the colors in your terminal don't exactly match up with the preview, you probably have a fancy terminal theme.
