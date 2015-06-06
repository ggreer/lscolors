/* global document */
"use strict";

/* LSCOLORS.js
 * Created by Geoff Greer 7/31/2006
 */

// I hate global variables, but these are necessary
var currentColorIndex = 0;
var indexLength = 22;
var colors = ["e", "x", "f", "x", "c", "x", "d", "x", "b", "x", "e", "g", "e", "d", "a", "b", "a", "g", "a", "c", "a", "d"];
var divIDs = ["directory", "system_link", "socket", "pipe", "executable", "block_special", "char_special", "exe_setuid", "exe_setgid", "dir_writeothers_sticky", "dir_writeothers_nosticky"];


//Returns true if a letter is upper case
function isBold(index) {
  if (colors[index] === colors[index].toUpperCase()) {
    return true;
  } else {
    return false;
  }
}

//Translates a BSD color code to the CSS color value to use for its display
function translateColor(color) {
  if (color === "a") {
    return "black";
  } else if (color === "b") {
    return "red";
  } else if (color === "c") {
    return "green";
  } else if (color === "d") {
    return "brown";
  } else if (color === "e") {
    return "blue";
  } else if (color === "f") {
    return "magenta";
  } else if (color === "g") {
    return "cyan";
  } else if (color === "h") {
    return "#cccccc";
  } else if (color === "x") {
    return "";
  }
}

function translateColorToLinux(colorString) {
  var color = "";
  var linuxColorString = "";

  for (var i = 0; i < colorString.length; i++) {
    color = colorString.charAt(i);

    switch (i) {
      case 0:
        linuxColorString += "di="; //directory
      break;
      case 2:
        linuxColorString += "ln="; //symlink
      break;
      case 4:
        linuxColorString += "so="; //socket
      break;
      case 6:
        linuxColorString += "pi="; //pipe
      break;
      case 8:
        linuxColorString += "ex="; //executable
      break;
      case 10:
        linuxColorString += "bd="; //block device
      break;
      case 12:
        linuxColorString += "cd="; //character device
      break;
      case 14:
        linuxColorString += "su="; //setuid
      break;
      case 16:
        linuxColorString += "sg="; //setgid
      break;
      case 18:
        linuxColorString += "tw="; //other writable sticky
      break;
      case 20:
        linuxColorString += "ow="; //other writable non-sticky
      break;
    }

    // Linux LS_COLORS has different codes for foreground/background colors :/
    if (i % 2 === 0) {
      // If bold, add bold thingy
      if (color === color.toUpperCase()) {
        linuxColorString += "1;";
        color = color.toLowerCase();
      }

      if (color === "x") {
        linuxColorString += "0";    //default
      } else if (color === "a") {
        linuxColorString += "30";   //black        
      } else if (color === "b") {
        linuxColorString += "31";   //red
      } else if (color === "c") {
        linuxColorString += "32";   //green
      } else if (color === "d") {
        linuxColorString += "33";   //orange/brown
      } else if (color === "e") {
        linuxColorString += "34";   //blue
      } else if (color === "f") {
        linuxColorString += "35";   //magenta
      } else if (color === "g") {
        linuxColorString += "36";   //cyan
      } else if (color === "h") {
        linuxColorString += "37";   //grey
      }
    } else {

      // If bold, add bold thingy
      if (color === color.toUpperCase()) {
        linuxColorString += ";1";
        color = color.toLowerCase();
      }

      if (color !== "x") {
        linuxColorString += ";";
      }

      if (color === "x") {
        // default backgound: add nothing to the string
      } else if (color === "a") {
        linuxColorString += "40";   //black background
      } else if (color === "b") {
        linuxColorString += "41";   //red background
      } else if (color === "c") {
        linuxColorString += "42";   //green background
      } else if (color === "d") {
        linuxColorString += "43";   //orange/brown background
      } else if (color === "e") {
        linuxColorString += "44";   //blue background
      } else if (color === "f") {
        linuxColorString += "45";   //magenta background
      } else if (color === "g") {
        linuxColorString += "46";   //cyan background
      } else if (color === "h") {
        linuxColorString += "47";   //grey background
      }
      if ((i + 1) < colorString.length) {
        linuxColorString += ":";
      }
    }
  }

  return linuxColorString;
}

//Updates the preview ls. (basically sets a bunch of attributes on various spans)
function makePreview() {
  var color;
  var backgroundColor;
  var divColor;
  var divBackground;
  var divFontWeight;
  var colorCode;
  var i = 0;

  var colorString = document.getElementById("colorStringBSD").value;

  var colorStringLinux = translateColorToLinux(colorString);
  document.getElementById("colorStringLinux").value = colorStringLinux;

  for (i = 0; i < indexLength; i++) {
    colors[i] = colorString.charAt(i);
  }

  for (i = 0; i < indexLength; i += 2) {
    divFontWeight = document.getElementById(divIDs[i / 2]);

    if (isBold(i)) {
      divFontWeight.style.fontWeight = "bold";
    } else {
      divFontWeight.style.fontWeight = "normal";
    }

    color = translateColor(colors[i].toLowerCase());
    divColor = document.getElementById(divIDs[i / 2]);
    divColor.style.color = color;

    backgroundColor = translateColor(colors[i + 1].toLowerCase());
    divBackground = document.getElementById(divIDs[i / 2]);
    divBackground.style.backgroundColor = backgroundColor;
  }
}

//Updates the string in the input box
function updateColorString() {
  var colorString = "";

  for (var i = 0; i < indexLength; i++) {
    colorString = colorString + colors[i];
  }

  document.getElementById("colorStringBSD").value = colorString;

  var colorStringLinux = translateColorToLinux(colorString);
  document.getElementById("colorStringLinux").value = colorStringLinux;

  makePreview();
}

//Update the "Bold" check boxes and keep track of which type of file we're changing
function updateColorIndex() {
  currentColorIndex = document.getElementById("currentColorIndex").value * 2;

  if (isBold(currentColorIndex)) {
    document.getElementById("isForegroundBold").checked = true;
  } else {
    document.getElementById("isForegroundBold").checked = false;
  }

  if (isBold(currentColorIndex + 1)) {
    document.getElementById("isBackgroundBold").checked = true;
  } else {
    document.getElementById("isBackgroundBold").checked = false;
  }
}

//Change the color of a fore or background. This is called by the little color boxes in the html file.
function changeColor(color, isBackground) {
  if (isBold(currentColorIndex + isBackground)) {
    colors[currentColorIndex + isBackground] = color.toUpperCase();
  } else {
    colors[currentColorIndex + isBackground] = color;
  }
  updateColorString();
}

function BoldText(isBackground) {
  colors[currentColorIndex + isBackground] = colors[currentColorIndex + isBackground].toUpperCase();
  updateColorString();
}

function unBoldText(isBackground) {
  colors[currentColorIndex + isBackground] = colors[currentColorIndex + isBackground].toLowerCase();
  updateColorString();
}
