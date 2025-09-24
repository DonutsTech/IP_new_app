import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, path.resolve(__dirname, '../../uploads/images'));
    } else if (file.mimetype.startsWith('video/')) {
      cb(null, path.resolve(__dirname, '../../uploads/videos'));
    } else {
      cb(new Error('Tipo de arquivo não suportado'), '');
    }
  },
  filename: (req, file, cb) => {
    const now = new Date();
    const dateString = now.toISOString().replace(/[-:T]/g, '').slice(0, 15);
    const time = now.getTime();
    cb(null, `${dateString}${time}.mp4`);
  },
});

const allImageTypes = ['image/jpeg', 'image/png', 'image/heic'];
const allVideoTypes = ['video/mp4'];

export const imageUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (allImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Somente imagens JPG, PNG ou HEIC são permitidas'));
    }
  },
});

export const videoUpload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (allVideoTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Somente vídeos MP4 são permitidos'));
    }
  },
});
