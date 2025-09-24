'use client';

import React, { useCallback, useState } from 'react';
import { ReactFlow, Controls, Background, useNodesState, useEdgesState, addEdge, NodeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { Node, Edge, Connection, OnConnect } from '@xyflow/react';
import { Video } from '@/services/videoService';

import './style.css';
import VideoNode from './VideoNode';

// Extend the Window interface to include flowPlatformDebug
declare global {
  interface Window {
    flowPlatformDebug?: {
      getVideos: () => Video[];
      getStats: () => unknown;
      getNodes: () => Node[];
      getEdges: () => Edge[];
    };
  }
}

interface VideoNodeData {
  label: string;
  videoId: string;
  videoName: string;
  videoProperties: Video['properties'];
  createdAt: string;
  campaigns: string[];
  type: string;
  orientation: string;
  duration: number;
  format: string;
  size: number;
  videoHeight: number;
  videoWidth: number;
}

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

// Definindo tipos de nós customizados
const nodeTypes = {
  video: VideoNode,
};

interface FlowPlataformProps {
  onVideoDropped?: () => void;
}

const FlowPlataform = ({ onVideoDropped }: FlowPlataformProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [flowVideos, setFlowVideos] = useState<Video[]>([]); 

  const onConnect: OnConnect = useCallback(
    (params: Connection) => setEdges((eds: Edge[]) => addEdge(params, eds)),
    [setEdges]
  );

  // Função para verificar se vídeo já existe no flow
  const isVideoInFlow = (videoId: string): boolean => {
    return flowVideos.some(video => video.id === videoId);
  };


  const handleNodesChange = useCallback((changes: NodeChange<Node>[]) => {

    const removedNodes = changes.filter(change => change.type === 'remove');
    
    if (removedNodes.length > 0) {
      const removedVideoIds = removedNodes
        .map(change => {
          const node = nodes.find(n => n.id === change.id);
          return node?.type === 'video' ? ((node.data as unknown) as VideoNodeData)?.videoId : null;
        })
        .filter(Boolean);
      
      if (removedVideoIds.length > 0) {
        setFlowVideos(prev => prev.filter(video => !removedVideoIds.includes(video.id)));
      }
    }

    onNodesChange(changes);
  }, [nodes, onNodesChange, setFlowVideos]);


  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation(); // Evita bubbling que causa múltiplas chamadas
    event.dataTransfer.dropEffect = 'copy';
    
    // Só atualiza estado se não estiver já em dragging
    if (!isDraggingOver) {
      setIsDraggingOver(true);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation(); // Evita bubbling
    setIsDraggingOver(false);

    let data = event.dataTransfer.getData('application/json');
    if (!data) {
      data = event.dataTransfer.getData('text/plain');
    }
    
    if (!data) {
      console.warn('Nenhum dado encontrado no drop');
      return;
    }
    
    try {
      const payload = JSON.parse(data);
      
      // Validação mais rigorosa do payload
      if (!payload || !payload.id || !payload.type) {
        console.warn('Payload inválido - deve conter id e type:', payload);
        return;
      }

      if (isVideoInFlow(payload.id)) {
        console.warn('Vídeo já existe no flow:', payload.id);
        return;
      }
      
      const bounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      
      // Cria nó conforme o tipo
      if (payload.type === 'video') {
        // Validação específica para vídeos
        if (!payload.properties) {
          console.warn('Propriedades do vídeo são obrigatórias:', payload);
          return;
        }

        const newVideoData: Video = {
          id: payload.id,
          name: payload.name || 'Vídeo sem nome',
          createdAt: payload.createdAt || new Date().toISOString(),
          properties: {
            size: payload.properties.size || 0,
            format: payload.properties.format || '',
            duration: payload.properties.duration || 0,
            orientation: payload.properties.orientation || 'Landscape',
            videoHeight: payload.properties.videoHeight || 0,
            videoWidth: payload.properties.videoWidth || 0,
          },
          campaigns: payload.campaigns || [],
        };

        const newNode = {
          id: `video-${payload.id}-${Date.now()}`,
          type: 'video',
          position,
          data: {
            label: newVideoData.name,
            videoId: newVideoData.id,
            videoName: newVideoData.name,
            videoProperties: newVideoData.properties,
            createdAt: newVideoData.createdAt,
            campaigns: newVideoData.campaigns,
            type: 'video',
            // Propriedades específicas para o VideoNode
            orientation: newVideoData.properties.orientation,
            duration: newVideoData.properties.duration,
            format: newVideoData.properties.format,
            size: newVideoData.properties.size,
            videoHeight: newVideoData.properties.videoHeight,
            videoWidth: newVideoData.properties.videoWidth,
          },
        };
        
        // Adiciona o vídeo ao estado do flow
        setFlowVideos(prev => [...prev, newVideoData]);
        setNodes((nds) => [...nds, newNode]);
        
        console.log('Vídeo adicionado ao flow com sucesso:', {
          nodeId: newNode.id,
          videoData: newVideoData,
          flowStats: getFlowStats()
        });

        // Notifica que um vídeo foi dropado com sucesso (fecha menu)
        if (onVideoDropped) {
          onVideoDropped();
        }
      } else {
        // Suporte futuro para outros tipos (imagem, texto, etc)
        const newNode = {
          id: `item-${payload.id || Date.now()}`,
          type: 'default',
          position,
          data: {
            label: payload.name || 'Item',
            type: payload.type,
            ...payload,
          },
        };
        
        setNodes((nds) => [...nds, newNode]);
        console.log('Nó genérico criado:', newNode);
      }
    } catch (error) {
      console.error('Erro ao processar drop:', error);
    }
  };

  // Função para obter vídeos atualmente no flow
  const getFlowVideos = useCallback((): Video[] => {
    return flowVideos;
  }, [flowVideos]);

  // Função para obter estatísticas do flow
  const getFlowStats = useCallback(() => {
    return {
      nodeCount: nodes.length,
      edgeCount: edges.length,
      videoCount: flowVideos.length,
    };
  }, [nodes.length, edges.length, flowVideos.length]);

  // Adiciona funcionalidade para debug e monitoramento
  React.useEffect(() => {
    // Expor funções para debug no console
    window.flowPlatformDebug = {
      getVideos: () => getFlowVideos(),
      getStats: () => getFlowStats(),
      getNodes: () => nodes,
      getEdges: () => edges
    };
  }, [getFlowVideos, getFlowStats, nodes, edges]);

  const handleDragLeave = (event: React.DragEvent) => {

    const rect = event.currentTarget.getBoundingClientRect();
    const isInsideArea = (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
    
    if (!isInsideArea) {
      setIsDraggingOver(false);
    }
  };

  return (
    <section
      style={{ width: '100vw', height: '60dvh', position: 'relative' }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <Background
          gap={16}
          size={2}
          color="#353AA4"
        />
      </ReactFlow>
      {isDraggingOver && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(53,58,164,0.10)',
          zIndex: 10, // Reduzido de 1000 para 10
          pointerEvents: 'none', // CRÍTICO: não intercepta eventos
          transition: 'opacity 150ms ease-in-out',
        }} />
      )}
    </section>
  );
};

export default FlowPlataform;
