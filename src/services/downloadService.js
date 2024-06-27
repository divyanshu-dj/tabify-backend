const path = require('path');
const ytdl = require('youtube-dl-exec').exec;
const { mergeFiles, trimVideo } = require('./ffmpegService');
const { generateFileName, createDir, deleteDir } = require('./fileService');

const vidDir = process.env.VIDEO_DIR || path.join(__dirname, '../../videos');

const downloadAndTrimVideo = async (url, start, end) => {
  createDir(vidDir);
  const videoFilename = generateFileName() + "-video.mp4";
  const audioFilename = generateFileName() + "-audio.m4a";
  const videoPath = path.join(vidDir, videoFilename);
  const audioPath = path.join(vidDir, audioFilename);
  
  try {
    // Download video and audio separately to preserve quality as yt uses DASH format
    await Promise.all([
      ytdl(url, {
        format: 'bestvideo[ext=mp4]',
        output: videoPath,
        range: { start, end}
      }),
      ytdl(url, {
        format: 'bestaudio[ext=m4a]',
        output: audioPath,
        range: {start, end}
      })
    ]);
    
    const mergedPath = path.join(vidDir, 'merged_video.mp4');
    await mergeFiles(videoPath, audioPath, mergedPath, start, end);
  
    const trimmedPath = path.join(vidDir, 'trimmed_video.mp4');
    await trimVideo(mergedPath, start, end, trimmedPath);
  
    setTimeout(() => {
      deleteDir(vidDir);
    }, 60 * 10 * 1000); // 10 minutes in milliseconds
  
    return trimmedPath;
  } catch (error) {
    console.error('Error occurred during video download and trim:', error);
    throw new Error('Failed to process the video');
  }
};

module.exports = downloadAndTrimVideo;
