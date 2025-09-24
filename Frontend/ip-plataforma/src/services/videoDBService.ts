import { Video } from './videoService';

const DB_NAME = 'VideoDB';
const STORE_NAME = 'videos';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const videoDBService = {
  async addVideo(video: Video, order?: number): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const videoWithOrder = order !== undefined ? { ...video, order } : video;
      tx.objectStore(STORE_NAME).add(videoWithOrder);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  },

  async getAllVideos(): Promise<Video[]> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => {
        const videos = request.result as (Video & { order?: number })[];
        // Ordena pelo campo 'order', se existir
        videos.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        resolve(videos);
      };
      request.onerror = () => reject(request.error);
    });
  },

  async getVideoById(id: string): Promise<Video | undefined> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result as Video | undefined);
      request.onerror = () => reject(request.error);
    });
  },

  async updateVideo(video: Video): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(video);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  },

  async deleteVideo(id: string): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  },

  async updateVideosOrder(videos: Video[]): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      // Limpa todos os vídeos
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => {
        // Adiciona os vídeos na nova ordem, com campo 'order'
        videos.forEach((video, idx) => {
          store.add({ ...video, order: idx });
        });
      };
      clearRequest.onerror = () => reject(clearRequest.error);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  },
};
