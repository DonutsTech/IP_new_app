export interface createVideoDTO {
  NAME: string;
  SIZE: number;
  FORMAT: string;
  DURATION: number;
  ORIENTATION: 'portrait' | 'landscape' | 'square';
  HEIGHT: number;
  WIDTH: number;
}
