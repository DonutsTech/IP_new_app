import React, { useContext, useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import FlowStatsContext from '@/context/FlowStatsContext';

interface FlowStatsContextType {
  nodeCount: number;
  setNodeCount: (count: number) => void;
  // add other properties if needed
}

import styles from './styles.module.scss';

interface VideoNodeData {
  label: string;
  videoId: string;
  videoName: string;
  videoProperties?: {
    size: number;
    format: string;
    duration: number;
    orientation: string;
    videoHeight: number;
    videoWidth: number;
    videoUrl?: string; // URL do vídeo, se disponível
  };
  createdAt?: string;
  campaigns?: string[];
  type: string;
  orientation?: string;
  duration?: number;
  format?: string;
  size?: number;
  videoHeight?: number;
  videoWidth?: number;
  videoUrl?: string; // URL do vídeo, se disponível
  file?: File; // Objeto File, se disponível
}

interface VideoNodeProps {
  data: VideoNodeData;
  isConnectable: boolean;
}

const VideoNode: React.FC<VideoNodeProps> = ({ data, isConnectable }) => {



  return (
    <div className={styles.videoNode}>
      {/* Sempre mostra o Handle de entrada (direita) */}
      <Handle
        type="target"
        position={Position.Right}
        isConnectable={isConnectable}
        className={styles.handle}
      />

      <div className={styles.videoNode_header}>
        <p className={styles.videoNode_title}>
          {data.videoName.replace(/\.[^/.]+$/, '')
            .replace(/[\/_\.-]+/g, ' ')
            .replace(/[^\p{L}\p{N}\s]/gu, '') || data.label}
        </p>
        {data.videoUrl && (
          <video
            width={data.videoProperties?.videoWidth ? Math.min(108, data.videoProperties.videoWidth) : 108}
            height={data.videoProperties?.videoHeight ? Math.min(192, data.videoProperties.videoHeight) : 192}
            loop
            muted
            autoPlay
            playsInline
            className={styles.videoNode_video}
          >
            <source src={data.videoProperties?.videoUrl} type={data.format || 'video/mp4'} />
          </video>
        )}
      </div>

      {/* Se NÃO for o primeiro nó, mostra o Handle de saída (embaixo) */}
      { (
        <Handle
          type="source"
          position={Position.Left}
          isConnectable={isConnectable}
          className={styles.handle}
        />
      )}
    </div>
  );
};

export default VideoNode;