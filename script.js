//your code here
const images = ['img1','img2','img3','img4','img5'];
const container = document.getElementById('image-container');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const message = document.getElementById('h');
const result = document.getElementById('para');

let selected = [];

// Randomize images with one duplicate
function shuffleImages() {
  let imgs = [...images];
  const duplicateIndex = Math.floor(Math.random() * imgs.length);
  imgs.push(imgs[duplicateIndex]); // add duplicate
  // Shuffle array
  for (let i = imgs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imgs[i], imgs[j]] = [imgs[j], imgs[i]];
  }
  return imgs;
}

// Render images on page
function renderImages() {
  container.innerHTML = '';
  const shuffled = shuffleImages();
  shuffled.forEach((imgClass, idx) => {
    const img = document.createElement('img');
    img.className = imgClass;
    img.dataset.id = imgClass; // store for comparison
    container.appendChild(img);
  });
}

// Reset selections
function resetSelections() {
  selected = [];
  result.textContent = '';
  verifyBtn.style.display = 'none';
  resetBtn.style.display = 'none';
  document.querySelectorAll('img').forEach(img => img.classList.remove('selected'));
}

// Handle clicks on images
container.addEventListener('click', (e) => {
  if (e.target.tagName !== 'IMG') return;

  const img = e.target;
  if (selected.includes(img)) return; // prevent selecting same image twice

  selected.push(img);
  img.classList.add('selected');

  if (selected.length >= 1) resetBtn.style.display = 'inline-block';
  if (selected.length === 2) verifyBtn.style.display = 'inline-block';
  if (selected.length > 2) verifyBtn.style.display = 'none';
});

// Reset button
resetBtn.addEventListener('click', () => {
  resetSelections();
});

// Verify button
verifyBtn.addEventListener('click', () => {
  if (selected.length !== 2) return;

  if (selected[0].dataset.id === selected[1].dataset.id) {
    result.textContent = 'You are a human. Congratulations!';
  } else {
    result.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = 'none';
});
 
// Initial load
renderImages();

