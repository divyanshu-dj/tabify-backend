import path from 'path';
import { mergeFiles, trimVideo} from './ffmpegService';
import { generateFileName, createDir, deleteDir} from './fileService';
import fs from 'fs';

const vidDir = process.env.VIDEO_DIR || path.join(__dirname, '../../videos');

const downloadAndTrimVideo = async (url, start, end) => {
  createDir(vidDir);
  const videoFilename = generateFileName() + ".mp4";
  const audioFilename = generateFileName() + ".mp4a";
  const videoPath = path.join( vidDir, videoFilename);
  const audioPath = path.join( vidDir, audioFilename);
  
};
