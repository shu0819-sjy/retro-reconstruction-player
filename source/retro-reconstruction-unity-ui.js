import {
  gui_button,
  gui_label,
  init_unity_academy_2d,
  instantiate_empty,
  instantiate_sprite,
  set_position,
  set_rotation_euler,
  set_scale,
  set_update
} from 'unity_academy';

const posterUrl = 'https://shu0819-sjy.github.io/retro-reconstruction-player/gpt6-poster-reference.png';
const rootObject = instantiate_empty();
const posterObject = instantiate_sprite(posterUrl);
let activePage = 'POSTER';
let statusText = 'READY / UI CORE ONLINE';
let posterAngle = 0;

// 功能：切换 UI 页面；入参为页面名称；返回值无，未知页面时回到 POSTER。
function openPage(pageName) {
  const validPage = pageName === 'POSTER' || pageName === 'INTRO' || pageName === 'PLAYER' || pageName === 'LIBRARY';
  activePage = validPage ? pageName : 'POSTER';
}

// 功能：更新播放器状态文字；入参为新的状态文本；返回值无。
function setStatus(nextStatus) {
  statusText = nextStatus;
}

// 功能：绘制顶部导航；入参为当前 Unity GameObject；返回值无。
function drawNavigation(gameObject) {
  gui_label('<size=24><color=#D8F36B>RETRO RECONSTRUCTION PLAYER</color></size>', 44, 28);
  gui_label('<color=#8D998E>UNITY ACADEMY UI / SOURCE NATIVE</color>', 46, 62);
  gui_button('POSTER', 44, 96, 128, 42, () => openPage('POSTER'));
  gui_button('INTRO', 180, 96, 128, 42, () => openPage('INTRO'));
  gui_button('PLAYER', 316, 96, 128, 42, () => openPage('PLAYER'));
  gui_button('LIBRARY', 452, 96, 128, 42, () => openPage('LIBRARY'));
  gui_label('<color=#738075>' + statusText + '</color>', 920, 46);
}

// 功能：绘制海报首页；入参为当前 Unity GameObject；返回值无。
function drawPoster(gameObject) {
  set_position(posterObject, 640, 390, 4);
  set_scale(posterObject, 0.52, 0.52, 1);
  posterAngle = posterAngle + 0.08;
  set_rotation_euler(posterObject, 0, posterAngle, 0);
  gui_label('<size=48><b>Retro</b></size>', 730, 190);
  gui_label('<size=48><b>Reconstruction</b></size>', 730, 245);
  gui_label('<size=48><b>Player</b></size>', 730, 300);
  gui_label('<color=#D0D7CE>从一张 GTA6 海报进入你的复古音乐选择器。</color>', 730, 366);
  gui_button('<b>进入 INTRO</b>', 730, 420, 190, 54, () => openPage('INTRO'));
  gui_button('选择歌曲', 932, 420, 150, 54, () => openPage('LIBRARY'));
  gui_label('<color=#8D998E>POSTER / 3D CARD / VISUAL UI</color>', 730, 500);
}

// 功能：绘制介绍页；入参为当前 Unity GameObject；返回值无。
function drawIntro(gameObject) {
  gui_label('<size=42><b>INTRO</b></size>', 90, 190);
  gui_label('<size=26><color=#D8F36B>ORIGINAL AUDIO WORKSPACE</color></size>', 90, 260);
  gui_label('海报、曲库、播放器和动态视觉现在由 Unity Academy UI 渲染。', 90, 320);
  gui_label('页面顺序：POSTER → INTRO → PLAYER → LIBRARY', 90, 360);
  gui_button('进入 PLAYER', 90, 430, 190, 54, () => openPage('PLAYER'));
  gui_button('返回 POSTER', 292, 430, 190, 54, () => openPage('POSTER'));
}

// 功能：绘制播放器页；入参为当前 Unity GameObject；返回值无。
function drawPlayer(gameObject) {
  gui_label('<size=42><b>PLAYER</b></size>', 90, 190);
  gui_label('<size=30><color=#D8F36B>Never Gonna Give You Up</color></size>', 90, 260);
  gui_label('WEB AUDIO / UNITY UI BRIDGE / 50 SEC LOOPER', 90, 305);
  gui_button('播放', 90, 370, 140, 54, () => setStatus('PLAY REQUESTED / AUDIO CONTROL READY'));
  gui_button('停止', 244, 370, 140, 54, () => setStatus('STOP REQUESTED / AUDIO CONTROL READY'));
  gui_button('返回 INTRO', 90, 460, 190, 54, () => openPage('INTRO'));
  gui_label('<color=#8D998E>光谱图和歌曲播放由另一个音频模块负责。</color>', 90, 550);
}

// 功能：绘制曲库页；入参为当前 Unity GameObject；返回值无。
function drawLibrary(gameObject) {
  gui_label('<size=42><b>LIBRARY</b></size>', 90, 190);
  gui_label('<color=#D8F36B>SELECT A TRACK</color>', 90, 250);
  gui_button('Never Gonna Give You Up', 90, 300, 390, 54, () => setStatus('TRACK SELECTED / NEVER GONNA GIVE YOU UP'));
  gui_button('Retro Night Drive', 90, 370, 390, 54, () => setStatus('TRACK SELECTED / RETRO NIGHT DRIVE'));
  gui_button('进入 PLAYER', 90, 470, 190, 54, () => openPage('PLAYER'));
  gui_button('返回 POSTER', 292, 470, 190, 54, () => openPage('POSTER'));
}

// 功能：每帧重绘 Unity Academy UI；入参为根 GameObject；返回值无。
function renderUi(gameObject) {
  drawNavigation(gameObject);
  if (activePage === 'POSTER') {
    drawPoster(gameObject);
  } else if (activePage === 'INTRO') {
    drawIntro(gameObject);
  } else if (activePage === 'PLAYER') {
    drawPlayer(gameObject);
  } else {
    drawLibrary(gameObject);
  }
}

init_unity_academy_2d();
set_update(rootObject, renderUi);
