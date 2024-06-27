const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const ffmpegBinary = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegBinary.path);

const mergeFiles = (videoPath, audioPath, outputPath, start,end) => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .outputOptions('-c copy')
      // .seekInput(start)               // Seek to start position in seconds
      // .inputOptions(`-to ${end}`)     // Set duration to trim in seconds
      .save(outputPath)
      .on('end', () => {
        fs.unlinkSync(videoPath);
        fs.unlinkSync(audioPath);
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

const trimVideo = (mergedPath, start, end, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(mergedPath)
      .outputOptions([
        '-ss', start,
        '-to', end,
        '-c', 'copy'
      ])
      .save(outputPath)
      .on('end', () => {
        fs.unlinkSync(mergedPath);
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}


module.exports = {
  mergeFiles,
  trimVideo
};


