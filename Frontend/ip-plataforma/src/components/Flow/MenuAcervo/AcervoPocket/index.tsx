
import { useEffect, useState } from 'react';
import InputVideo from './InputVideo';
import styles from './styles.module.scss';
import { Video } from '@/services/videoService';
import { videoDBService } from '@/services/videoDBService';
import ListVideos from './ListVideos';


const AcervoPocket = () => {
  // const [videos, setVideos] = useState<Video[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);

  
  const fetchVideos = async () => {
    const result = await videoDBService.getAllVideos();
    setVideos(result);
  };

  useEffect(() => {
    fetchVideos();
  }, []);


  const videoLimit = 20;

  return (
    <div className={styles.container}>
      <InputVideo 
        onVideoAdded={fetchVideos} 
        videoCount={videos.length}
        videoLimit={videoLimit}
      />
      <div className={styles.container_videosQt}>
        <p>
          {videos.length} / {videoLimit} de vídeos
        </p>
      </div>
      <ListVideos videos={videos} setVideos={setVideos} />
    </div>
  )
};

export default AcervoPocket;