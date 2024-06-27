const fs = require('fs');

const generateFileName = () => {
  const timestamp = Date.now();
  return `video_${timestamp}`;
};

const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const deleteDir = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true });
    console.log(`Deleted directory: ${dirPath}`);
  }
};

module.exports = {
  generateFileName,
  createDir,
  deleteDir,
};
