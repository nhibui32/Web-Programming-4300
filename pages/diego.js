// "Surprise me!" button
const messages = [
  "Gotta go fast! ",
  "Smokey says woof! ",
  "Oshawott used Water Gun! ",
  "Now playing: something new from SoundCloud ",
  "Chicago was a good trip! "
];

document.getElementById("surpriseBtn").addEventListener("click", function () {
  const pick = messages[Math.floor(Math.random() * messages.length)];
  document.getElementById("surpriseText").textContent = pick;
});
