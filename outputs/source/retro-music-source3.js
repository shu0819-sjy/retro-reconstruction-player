// Retro Reconstruction Player 的 Source §3 音乐核心。
// 使用 Source Academy 的 Source §3 运行，并在界面中加载 SOUNDS 库。

const bpm = 113;
const stepSeconds = 60 / bpm / 2;
const melody = [72, 72, 76, 79, 79, 76, 72, 67, 69, 69, 72, 76, 76, 72, 69, 67];

// 功能：把 MIDI 音高转换成频率；入参为 MIDI 数字；返回频率；非法数字会返回 0。
function midiToFrequency(midiNumber) {
  if (midiNumber < 0) {
    return 0;
  } else {
    return 440 * math_pow(2, (midiNumber - 69) / 12);
  }
}

// 功能：把音符数组转换为播放事件；入参为 MIDI 数组；返回 [开始时间, 频率, 时长] 数组。
function buildEvents(notes) {
  const events = [];
  let index = 0;
  for (index = 0; index < array_length(notes); index = index + 1) {
    events[index] = [index * stepSeconds, midiToFrequency(notes[index]), stepSeconds];
  }
  return events;
}

// 功能：计算轨道总时长；入参为音符数组；返回秒数；空数组返回 0。
function trackDuration(notes) {
  return array_length(notes) * stepSeconds;
}

display(trackDuration(melody), '轨道总时长');
display(buildEvents(melody), 'Source 音乐事件');
