/**
 * Extrai propriedades do vídeo a partir de um arquivo File usando HTMLVideoElement.
 * Retorna uma Promise com as propriedades preenchidas.
 */
export function extractVideoProperties(file: File): Promise<Video['properties']> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const videoElement = document.createElement('video');
    videoElement.preload = 'metadata';
    videoElement.src = url;
    videoElement.onloadedmetadata = () => {
      const duration = videoElement.duration;
      const videoHeight = videoElement.videoHeight;
      const videoWidth = videoElement.videoWidth;
      let orientation: string;
      if (videoHeight > videoWidth) orientation = 'portrait';
      else if (videoHeight < videoWidth) orientation = 'landscape';
      else orientation = 'square';
      resolve({
        size: file.size,
        format: file.type,
        duration,
        orientation,
        videoHeight,
        videoWidth,
      });
      URL.revokeObjectURL(url);
    };
    videoElement.onerror = () => {
      reject(new Error('Não foi possível extrair propriedades do vídeo.'));
      URL.revokeObjectURL(url);
    };
  });
}
export type Video = {
  id: string;
  name: string;
  createdAt: string;
  properties: {
    size: number;
    format: string;
    duration: number;
    orientation: string;
    videoHeight: number;
    videoWidth: number;
  };
  campaigns: string[];
  // Removido campo 'order' do tipo Video.
};

export class VideoService {

  static getAll(videos: Video[]): Video[] {
    return [...videos];
  }

  static getById(videos: Video[], videoId: string): Video | undefined {
    return videos.find(v => v.id === videoId);
  }

  static updateName(videos: Video[], videoId: string, newName: string): Video[] {
    return videos.map(v => v.id === videoId ? { ...v, name: newName } : v);
  }

  // Removido método updateOrder pois não há mais campo 'order'.

  static createVideo(videos: Video[], name: string, properties: Video['properties'], campaigns: string[]): Video[] {
    const newVideo: Video = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
      properties,
      campaigns
    };
    return [...videos, newVideo];
  }

  static renameVideo(videos: Video[], videoId: string, newName: string): Video[] {
    return videos.map(v => v.id === videoId ? { ...v, name: newName } : v);
  }

  static deleteVideo(videos: Video[], videoId: string): Video[] {
    return videos.filter(v => v.id !== videoId);
  }

  static updateProperties(videos: Video[], videoId: string, properties: Partial<Video['properties']>): Video[] {
    return videos.map(v => v.id === videoId ? { ...v, properties: { ...v.properties, ...properties } } : v);
  }

  static updateCampaigns(videos: Video[], videoId: string, campaigns: string[]): Video[] {
    return videos.map(v => v.id === videoId ? { ...v, campaigns } : v);
  }
}

export interface VideoFile {
  id: string;
  name: string;
  file: File;
  createdAt?: string;
  properties?: unknown;
  campaigns?: string[];
}

export function convertVideoFileToVideo(vf: VideoFile): Video {
  return {
    id: vf.id,
    name: vf.name,
  // Removido campo 'order' da conversão de VideoFile para Video.
    createdAt: vf.createdAt ?? new Date().toISOString(),
    properties: {
      size: vf.file.size,
      format: vf.file.type,
      duration: 0, 
      orientation: 'landscape', 
      videoHeight: 0, 
      videoWidth: 0 
    },
    campaigns: vf.campaigns ?? []
  };
}
