import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// List of images to download
const imagesToDownload = [
  {
    name: 'BadaGanpati.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Bada_Ganpati_Temple%2C_Indore.jpg/1200px-Bada_Ganpati_Temple%2C_Indore.jpg'
  },
  {
    name: 'PipliyapalaRegionalPark.jpg',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/e0/c3/c9/choral-dam.jpg?w=1200&h=-1&s=1'
  },
  {
    name: 'KhajranaGaneshTemple.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Khajrana_Ganesh_Temple.jpg/1200px-Khajrana_Ganesh_Temple.jpg'
  },
  {
    name: 'DevguradiaTemple.jpg',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/cb/f2/a5/devguradia-shiva-mandir.jpg?w=1200&h=-1&s=1'
  },
  {
    name: 'ChoralDam.jpg',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/e0/c3/c9/choral-dam.jpg?w=1200&h=-1&s=1'
  }
];

// Function to download an image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        console.log(`Redirecting to: ${response.headers.location}`);
        downloadImage(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
        return;
      }

      // Check if the response is successful
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      // Create a write stream to save the image
      const fileStream = fs.createWriteStream(path.join(imagesDir, filename));

      // Pipe the response to the file
      response.pipe(fileStream);

      // Handle errors
      fileStream.on('error', (err) => {
        reject(err);
      });

      // Resolve when the file is saved
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  console.log('Starting image downloads...');

  for (const image of imagesToDownload) {
    try {
      await downloadImage(image.url, image.name);
    } catch (error) {
      console.error(`Error downloading ${image.name}: ${error.message}`);
    }
  }

  console.log('All downloads completed!');
}

// Run the download function
downloadAllImages();
