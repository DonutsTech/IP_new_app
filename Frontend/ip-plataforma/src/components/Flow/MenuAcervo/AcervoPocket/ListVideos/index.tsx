
import styles from './styles.module.scss';
import { Video } from '@/services/videoService';
import { videoDBService } from '@/services/videoDBService';
import CardVideoList from './CardVideoList';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';




interface ListVideosProps {
  videos: Video[];
  setVideos: React.Dispatch<React.SetStateAction<Video[]>>;
}

const ListVideos = ({ videos, setVideos }: ListVideosProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    
    if (active.id !== over?.id) {
      const oldIndex = videos.findIndex(v => v.id === active.id);
      const newIndex = videos.findIndex(v => v.id === over?.id);
      const newVideos = arrayMove(videos, oldIndex, newIndex);
      
      // Atualizar o estado imediatamente para feedback visual
      setVideos(newVideos);
      
      try {
        // Persistir ordem no banco
        await videoDBService.updateVideosOrder(newVideos);
        console.log('Ordem dos vídeos atualizada com sucesso');
      } catch (error) {
        console.error('Erro ao atualizar ordem dos vídeos:', error);
        // Buscar novamente do banco em caso de erro
        const updatedVideos = await videoDBService.getAllVideos();
        setVideos(updatedVideos);
      }
    }
  }

  return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={videos.map(v => v.id)} 
          strategy={verticalListSortingStrategy}
        >
          <div className={styles.listVideos}>
            {videos.map((video) => (
              <CardVideoList
                video={video}
                key={video.id}
                onDelete={async () => {
                  const result = await videoDBService.getAllVideos();
                  setVideos(result);
                }}
              />
            ))}
          </div>
        </SortableContext>
        
        <DragOverlay>
          {activeId ? (
            <div className={styles.dragOverlay}>
              {(() => {
                const video = videos.find(v => v.id === activeId);
                return video ? (
                  <CardVideoList video={video} />
                ) : null;
              })()}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
  );
};

export default ListVideos;
