import { HistoryPlaysCreate } from './historyPlaysCreate.dto';

interface HistoryPlays extends HistoryPlaysCreate {
  STATUS?: string;
}

export type HistoryPlaysUpdate = Partial<HistoryPlays>;
