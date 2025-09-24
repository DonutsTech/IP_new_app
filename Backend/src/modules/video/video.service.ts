import { Prisma, Video } from '@prisma/client';
import ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';
import { createVideoDTO } from './interface/createVideo.dto';
import prismaClient from '../../prisma';
import { AppError } from '../../erros';

const ffprobeAsync = promisify(ffmpeg.ffprobe);

class VideoService {
  async createVideo(userId: string, file: Express.Multer.File) {
    const metadata = (await ffprobeAsync(file.path)) as ffmpeg.FfprobeData;

    if (!metadata || !metadata.format || !metadata.streams) {
      throw new Error('Não foi possível extrair os metadados do vídeo');
    }

    const stream = metadata.streams.find((s) => s.codec_type === 'video');

    if (!stream) {
      throw new Error('Não foi possível encontrar a stream de vídeo');
    }

    const videoCreate: createVideoDTO = {
      NAME: file.originalname,
      SIZE: file.size,
      FORMAT: file.mimetype.split('/')[1],
      DURATION: Math.floor(Number(metadata.format.duration) || 0),
      ORIENTATION:
        stream.width && stream.height
          ? stream.width > stream.height
            ? 'landscape'
            : stream.width < stream.height
              ? 'portrait'
              : 'square'
          : 'landscape',
      HEIGHT: stream.height || 0,
      WIDTH: stream.width || 0,
    };

    const video = await this.create({
      ...videoCreate,
      URL: `/uploads/videos/${file.filename}`,
      USER: { connect: { ID: userId } },
    });

    return video;
  }

  async create(data: Prisma.VideoCreateInput): Promise<Video> {
    try {
      return await prismaClient.video.create({
        data,
      });
    } catch (error) {
      throw new AppError('Erro ao criar vídeo', 500);
    }
  }

  async video(videoWhereUniqueInput: Prisma.VideoWhereUniqueInput): Promise<Video | null> {
    return await prismaClient.video.findUnique({
      where: videoWhereUniqueInput,
    });
  }

  async videos(params: Prisma.VideoFindManyArgs): Promise<Video[]> {
    try {
      const videos = await prismaClient.video.findMany(params);
      return videos;
    } catch (error) {
      throw new AppError('Erro ao buscar vídeos', 500);
    }
  }

  async videosByUser(userId: string): Promise<Video[]> {
    try {
      const videos = await this.videos({
        where: {
          USER_ID: userId,
        },
        orderBy: {
          CREATED_AT: 'desc',
        },
      });
      return videos;
    } catch (error) {
      throw new AppError('Erro ao buscar vídeos do usuário', 500);
    }
  }

  async videoCountByUser(userId: string): Promise<number> {
    try {
      const count = await prismaClient.video.count({
        where: {
          USER_ID: userId,
        },
      });
      return count;
    } catch (error) {
      throw new AppError('Erro ao buscar contagem de vídeos do usuário', 500);
    }
  }

  async update(id: string, data: Prisma.VideoUpdateInput): Promise<Video> {
    try {
      const video = await prismaClient.video.update({
        where: { ID: id },
        data,
      });
      return video;
    } catch (error) {
      throw new AppError('Erro ao atualizar vídeo', 500);
    }
  }

  async existsID(id: string): Promise<boolean> {
    try {
      const video = await prismaClient.video.findUnique({
        where: { ID: id },
      });

      if (!video) {
        throw new AppError('Vídeo não encontrado', 404);
      }

      return true;
    } catch (error) {
      throw new AppError('Erro ao verificar vídeo', 500);
    }
  }

  async updateVideo(id: string, data: { NAME: string }) {
    try {
      await this.existsID(id);

      const video = await this.update(id, data);

      return video;
    } catch (error) {
      throw error;
    }
  }

  async videoById(id: string): Promise<Video> {
    try {
      await this.existsID(id);

      const video = await this.video({ ID: id });

      if (!video) {
        throw new AppError('Vídeo não encontrado', 404);
      }

      return video;
    } catch (error) {
      throw error;
    }
  }
}

export const videoService = new VideoService();
