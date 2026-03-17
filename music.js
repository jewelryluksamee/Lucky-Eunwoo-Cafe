// 🎵 ใส่ YouTube Video ID ที่นี่ได้เลย — เพิ่ม/ลบ/เปลี่ยนได้ตามใจ
const SONG_IDS = [
'VqmICoje0Kc',
"-PQGsN_Xx9o",
"G1GHK3rjuNo",
"QOmClDj0TuQ",
"mGbTM_FEtWE",
"2YSZzXb2PZE",
"Tq5z6h_XMI4",
"scrB6fATyxU",
"u_auw5KyA_Q",
"Zt9kTHEyRME",
"r9NARyvF2qY",
"IjB-FYPSnO4",
"poPyPjhEm9E"
];



var ytPlayer;
var ytReady = false;
var currentSongIdx = -1;
var isPlaying = false;

// โหลด YouTube IFrame API
var ytTag = document.createElement('script');
ytTag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(ytTag);

function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('ytPlayer', {
    height: '1', width: '1',
    playerVars: { autoplay: 0, controls: 0, rel: 0, playsinline: 1 },
    events: {
      onReady: function() {
        ytReady = true;
        // ถ้า startMusic() ถูกเรียกก่อน API พร้อม ให้เริ่มเล่นทันที
        if (window._pendingPlay) {
          window._pendingPlay = false;
          _doPlay();
        }
      },
      onStateChange: function(e) {
        if (e.data === YT.PlayerState.ENDED) {
          playNextSong(); // เพลงจบ → เล่นเพลงถัดไป (สุ่มไม่ซ้ำ)
        }
        if (e.data === YT.PlayerState.PLAYING) {
          isPlaying = true;
          var btn = document.getElementById('musicBtn');
          if (btn) btn.textContent = '⏸ Pause';
        }
        if (e.data === YT.PlayerState.PAUSED) {
          isPlaying = false;
          var btn = document.getElementById('musicBtn');
          if (btn) btn.textContent = '▶ Play';
        }
      }
    }
  });
}

function getRandomIdx() {
  if (SONG_IDS.length === 1) return 0;
  var next;
  do { next = Math.floor(Math.random() * SONG_IDS.length); }
  while (next === currentSongIdx);
  return next;
}

function playNextSong() {
  currentSongIdx = getRandomIdx();
  if (ytReady && ytPlayer && ytPlayer.loadVideoById) {
    ytPlayer.loadVideoById(SONG_IDS[currentSongIdx]);
  }
}

function _doPlay() {
  currentSongIdx = getRandomIdx(); // สุ่มเพลงใหม่ทุกครั้งที่กด Enter
  if (ytPlayer && ytPlayer.loadVideoById) {
    ytPlayer.loadVideoById(SONG_IDS[currentSongIdx]);
  }
}

// เรียกจากปุ่ม "เข้าไปกันเลยย" — สุ่มเพลงใหม่ทุกครั้ง
function startMusic() {
  if (ytReady) {
    _doPlay();
  } else {
    window._pendingPlay = true; // รอ API พร้อมแล้วค่อยเล่น
  }
}

// ปุ่ม Play/Pause ใน music bar
function toggleMusic() {
  if (!ytPlayer || !ytReady) return;
  if (isPlaying) {
    ytPlayer.pauseVideo();
  } else {
    if (currentSongIdx === -1) {
      _doPlay();
    } else {
      ytPlayer.playVideo();
    }
  }
}
