// Retro Reconstruction Player 的 Source §3 多轨音乐核心。
// 可直接粘贴到 Source Academy，选择 Source §3 后点击 Run。

const bpm = 113;
const stepSeconds = 60 / bpm / 2;
const stepsPerBar = 16;
const barCount = 8;

const melodyPattern = [72, 72, 76, 79, 79, 76, 72, 67, 69, 69, 72, 76, 76, 72, 69, 67];
const bassPattern = [36, 36, 43, 43, 31, 31, 38, 38, 36, 36, 43, 43, 31, 31, 38, 38];
const kickPattern = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0];
const snarePattern = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0];
const hatPattern = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// 功能：把 MIDI 音高转换成频率；入参为 MIDI 数字；返回赫兹值；负数返回 0。
function midiToFrequency(midiNumber) {
  if (midiNumber < 0) {
    return 0;
  } else {
    return 440 * math_pow(2, (midiNumber - 69) / 12);
  }
}

// 功能：创建一个播放事件；入参为时间、MIDI 音高、时长和力度；返回事件数组。
function makeEvent(startTime, midiNumber, duration, velocity) {
  return [startTime, midiNumber, midiToFrequency(midiNumber), duration, velocity];
}

// 功能：按循环次数生成旋律或低音轨；入参为模式、循环次数、时长和力度；返回事件数组。
function buildNoteTrack(pattern, cycles, duration, velocity) {
  const events = [];
  let eventIndex = 0;
  let cycleIndex = 0;
  let stepIndex = 0;
  for (cycleIndex = 0; cycleIndex < cycles; cycleIndex = cycleIndex + 1) {
    for (stepIndex = 0; stepIndex < array_length(pattern); stepIndex = stepIndex + 1) {
      const midiNumber = pattern[stepIndex];
      const startTime = (cycleIndex * stepsPerBar + stepIndex) * stepSeconds;
      events[eventIndex] = makeEvent(startTime, midiNumber, duration, velocity);
      eventIndex = eventIndex + 1;
    }
  }
  return events;
}

// 功能：按开关模式生成鼓点轨；入参为模式、循环次数、MIDI 音高和力度；返回事件数组。
function buildDrumTrack(pattern, cycles, midiNumber, velocity) {
  const events = [];
  let eventIndex = 0;
  let cycleIndex = 0;
  let stepIndex = 0;
  for (cycleIndex = 0; cycleIndex < cycles; cycleIndex = cycleIndex + 1) {
    for (stepIndex = 0; stepIndex < array_length(pattern); stepIndex = stepIndex + 1) {
      if (pattern[stepIndex] === 1) {
        const startTime = (cycleIndex * stepsPerBar + stepIndex) * stepSeconds;
        events[eventIndex] = makeEvent(startTime, midiNumber, stepSeconds / 2, velocity);
        eventIndex = eventIndex + 1;
      }
    }
  }
  return events;
}

// 功能：合并两条事件轨；入参为两条数组；返回新数组；不会修改原数组。
function mergeTracks(firstTrack, secondTrack) {
  const merged = [];
  let index = 0;
  for (index = 0; index < array_length(firstTrack); index = index + 1) {
    merged[index] = firstTrack[index];
  }
  for (index = 0; index < array_length(secondTrack); index = index + 1) {
    merged[array_length(firstTrack) + index] = secondTrack[index];
  }
  return merged;
}

// 功能：统计事件数量；入参为事件数组；返回数量；空数组返回 0。
function eventCount(track) {
  return array_length(track);
}

// 功能：计算歌曲总时长；入参为小节数；返回秒数。
function songDuration(numberOfBars) {
  return numberOfBars * stepsPerBar * stepSeconds;
}

const melodyTrack = buildNoteTrack(melodyPattern, barCount, stepSeconds * 0.86, 0.82);
const bassTrack = buildNoteTrack(bassPattern, barCount, stepSeconds * 0.92, 0.72);
const kickTrack = buildDrumTrack(kickPattern, barCount, 36, 0.95);
const snareTrack = buildDrumTrack(snarePattern, barCount, 38, 0.75);
const hatTrack = buildDrumTrack(hatPattern, barCount, 42, 0.42);
const percussionTrack = mergeTracks(kickTrack, mergeTracks(snareTrack, hatTrack));
const allTracks = mergeTracks(melodyTrack, mergeTracks(bassTrack, percussionTrack));

display(songDuration(barCount), '歌曲总时长');
display(eventCount(melodyTrack), '主旋律事件数');
display(eventCount(bassTrack), '低音事件数');
display(eventCount(percussionTrack), '鼓点事件数');
display(allTracks, '全部音乐事件');
