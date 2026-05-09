import nipplejs from "nipplejs";
import * as Blockly from "blockly";

const viewport = document.getElementById("viewport");
const ctx = viewport.getContext("2d");

const explorerList = document.getElementById("explorer-list");
const toolboxButtons = document.querySelectorAll(".toolbox-item");
const toolButtons = document.querySelectorAll(".tool-button");

const playBtn = document.getElementById("play-btn");
const stopBtn = document.getElementById("stop-btn");
const embedBtn = document.getElementById("embed-btn");
const saveBtn = document.getElementById("save-btn");

const propName = document.getElementById("prop-name");
const propX = document.getElementById("prop-x");
const propY = document.getElementById("prop-y");
const propW = document.getElementById("prop-w");
const propH = document.getElementById("prop-h");
const propColor = document.getElementById("prop-color");
const propAction = document.getElementById("prop-action");
const charImageUrlInput = document.getElementById("char-image-url");
const bgMusicFileInput = document.getElementById("bg-music-file");
const bgMusicUrlInput = document.getElementById("bg-music-url");
const bgImageUrlInput = document.getElementById("bg-image-url");
const npcActionSelect = document.getElementById("npc-action");
const npcTextInput = document.getElementById("npc-text");
const npcRangeInput = document.getElementById("npc-range");
const npcRespawnSelect = document.getElementById("npc-respawn");
const joystickContainer = document.getElementById("joystick-container");

const isTouchDevice =
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;

let joystickManager = null;

let objects = [];
let selectedId = null;
let currentTool = "select";
let playMode = false;

let player = null;
let lastFrameTime = 0;
let charImage = null;
let charImageReady = false;
let checkpoint = null;

/* Image cache for element images so multiple objects can reuse same Image instance.
   Each cache entry includes a ref count so object-URL blobs are not revoked while
   still in use by other objects. Entry shape: { img, ready, refs, blobUrl? } */
const elementImageCache = new Map(); // url -> { img, ready, refs }

let backgroundMusic = null;
let backgroundMusicUrl = null;

let bgImage = null;
let bgImageReady = false;
let bgImageUrl = null;

let cameraX = 0;
let cameraY = 0;

// map/world logical size (editable via Properties)
let worldWidth = 800;
