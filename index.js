const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

const inputDir = './images';
const outputDir = './output';

fs.ensureDirSync(outputDir);

const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.tiff', '.bmp'];

const convertToWebP = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Converted: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Failed to convert ${inputPath}:`, error);
  }
};

const processImages = async () => {
  try {
    const files = await fs.readdir(inputDir);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);

      if (supportedExtensions.includes(ext)) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, `${baseName}.webp`);
        await convertToWebP(inputPath, outputPath);
      } else {
        console.log(`Skipped (unsupported format): ${file}`);
      }
    }

    console.log('Conversion complete.');
  } catch (error) {
    console.error('Error processing images:', error);
  }
};

processImages();
