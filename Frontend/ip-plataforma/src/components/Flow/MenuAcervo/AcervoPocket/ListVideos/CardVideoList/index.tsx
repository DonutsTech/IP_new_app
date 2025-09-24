
import { Video } from '@/services/videoService';
import { useSortable } from '@dnd-kit/sortable';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { videoDBService } from '@/services/videoDBService';
import { useEffect, useState } from 'react';

interface CardVideoListProps {
  video: Video & { file?: File };
  onDelete?: () => void;
}

const CardVideoList = ({ video, onDelete }: CardVideoListProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
  } = useSortable({ id: video.id });

  const [videoUrl, setVideoUrl] = useState<string>('');


  useEffect(() => {
    if (video.file) {
      const url = URL.createObjectURL(video.file);
      setVideoUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [video.file]);


  // Função para drag externo (HTML5)
  const handleDragStart = (e: React.DragEvent<HTMLVideoElement | HTMLDivElement>) => {
    console.log('🚀 DragStart iniciado no CardVideoList!'); //remover


    e.stopPropagation();
    const dragImage = document.createElement('canvas');
    const ctx = dragImage.getContext('2d');

    if (ctx) {
      dragImage.width = 80;
      dragImage.height = 80;

      ctx.fillStyle = 'rgba(91, 113, 185, 0.9)';
      ctx.fillRect(0, 0, 80, 80);

      // Desenhar o frame do vídeo
      const videoElement = e.currentTarget;
      try {
        // Só desenha se for um elemento de vídeo
        if (videoElement instanceof HTMLVideoElement) {
          ctx.drawImage(videoElement, 10, 10, 80, 8);
        } else {
          // Fallback para outros elementos
          throw new Error('Não é um elemento de vídeo');
        }
      } catch {
        // Fallback se não conseguir desenhar o vídeo
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(10, 10, 10, 10);
        ctx.fillStyle = '#353AA4';
        ctx.textAlign = 'center';
        
      }

      // // Adicionar indicador de nome
      // ctx.fillStyle = 'white';
      // ctx.font = 'bold 10px Arial';
      // ctx.textAlign = 'center';
      // ctx.fillText(video.name.substring(0, 10) + (video.name.length > 15 ? '...' : ''), 60, 75);

      // // Configurar a imagem de drag
      // e.dataTransfer.setDragImage(dragImage, 60, 40);
    }

    const payload = {
      id: video.id,
      name: video.name,
      type: 'video',
      createdAt: video.createdAt,
      properties: {
        size: video.properties.size,
        format: video.properties.format,
        duration: video.properties.duration,
        orientation: video.properties.orientation,
        videoHeight: video.properties.videoHeight,
        videoWidth: video.properties.videoWidth,
        videoUrl: videoUrl,
      },
      campaigns: video.campaigns,
    };
    const json = JSON.stringify(payload);
    e.dataTransfer.setData('application/json', json);
    e.dataTransfer.setData('text/plain', json);
    e.dataTransfer.setData('source', 'acervo-pocket');

    console.log('DragStart externo com dados completos:', payload);
  };

  return (
    <div
      ref={setNodeRef}
      className={styles.card}
    >
      <div
        // style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 8 }}
      >
        {video.file && videoUrl && (
          <video
            width={64}
            height={64}
            loop
            muted
            autoPlay
            playsInline
            draggable
            className={styles.card_video}
            src={videoUrl}
            onDragStart={handleDragStart}
            {...attributes}
            {...listeners}
          />
        )}
      </div>
      <div className={styles.card_info}>
        <input
          type="text"
          className={styles.card_info_input}
          defaultValue={video.name
            .replace(/\.[^/.]+$/, '')
            .replace(/[\/._\-]+/g, ' ')
            .replace(/[^\p{L}\p{N}\s]/gu, '')
          }
          readOnly
          title="Clique para editar o nome do vídeo"
          onClick={(e) => {
            const input = e.target as HTMLInputElement;
            input.readOnly = false;
            input.focus();
            input.setSelectionRange(0, input.value.length);
          }}
          onBlur={async (e) => {
            const input = e.target as HTMLInputElement;
            const newName = input.value.trim();

            // Se o nome mudou, atualiza no banco de dados
            if (newName && newName !== video.name) {
              try {
                const updatedVideo = { ...video, name: newName };
                await videoDBService.updateVideo(updatedVideo);
                console.log('Nome do vídeo atualizado:', newName);
              } catch (error) {
                console.error('Erro ao atualizar nome do vídeo:', error);

                input.value = video.name;
              }
            } else if (!newName) {

              input.value = video.name;
            }

            input.readOnly = true;
            input.setSelectionRange(0, 0);
          }}
        />
        <span className={styles.card_info_orientation}>
          {video.properties.orientation}
        </span>
      </div>
      <button
        className={styles.card_btn}
        title='Excluir vídeo'
        onClick={async () => {
          await videoDBService.deleteVideo(video.id);
          if (onDelete) onDelete();
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} className={styles.card_btn_icon} />
      </button>
    </div >
  );
};

export default CardVideoList;