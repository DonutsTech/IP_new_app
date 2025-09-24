
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import { faArrowUpFromBracket, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { videoDBService } from '../../../../../services/videoDBService';
import { useState } from 'react';
import classNames from 'classnames';


interface InputVideoProps {
  onVideoAdded?: () => void;
  videoCount?: number;
  videoLimit?: number;
}

const InputVideo = ({ onVideoAdded, videoCount = 0, videoLimit = 4 }: InputVideoProps) => {
  const [msg, setMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoCount >= videoLimit) {
      setMsg('Limite de vídeos atingido. Exclua um vídeo para adicionar outro.');
      return;
    }
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);

    const url = URL.createObjectURL(file);
    const videoElement = document.createElement('video');
    videoElement.preload = 'metadata';
    videoElement.src = url;

    videoElement.onloadedmetadata = async () => {
      const duration = videoElement.duration;
      const videoHeight = videoElement.videoHeight;
      const videoWidth = videoElement.videoWidth;
      let orientation = 'Landscape';
      if (videoHeight > videoWidth) orientation = 'Portrait';
      else if (videoHeight < videoWidth) orientation = 'Landscape';
      else if (videoHeight === videoWidth) orientation = 'Square';

      const videoFile = {
        id: crypto.randomUUID(),
        name: file.name,
        file,
        createdAt: new Date().toISOString(),
        properties: {
          size: file.size,
          format: file.type,
          duration,
          orientation,
          videoHeight,
          videoWidth,
        },
        campaigns: [],
      };

  await videoDBService.addVideo(videoFile);
  setLoading(false);
  URL.revokeObjectURL(url);
  setMsg('');
  if (onVideoAdded) onVideoAdded();
    };
  };

  return (
    <div 
      className={classNames({
        [styles.inputVideo] : true,
        [styles.inputVideo_disabled]: loading || videoCount >= videoLimit,
      })}
    >
      {loading && (
        <div className={styles.inputVideo_spinner}>
          <FontAwesomeIcon icon={faSpinner} spin className={styles.inputVideo_spinnerIcon} />
          <span className={styles.inputVideo_spinnerText}>Enviando vídeo...</span>
        </div>
      )}
      <FontAwesomeIcon 
        icon={faArrowUpFromBracket} 
        className={styles.inputVideo_icon}
      />
      <p className={styles.inputVideo_text}>Clique ou arraste o arquivo</p>
      <input 
        type="file" 
        accept="video/*" 
        title='Clique ou arraste o arquivo'
        className={styles.inputVideo_input}
        onChange={handleFileChange}
        disabled={loading || videoCount >= videoLimit}
      />
      {msg !== '' && <p className={styles.inputVideo_msg}>{msg}</p>}
    </div>
  )
};

export default InputVideo;