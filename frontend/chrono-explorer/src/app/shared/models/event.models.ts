export interface HistoricalEvent {
    id: number;
    title: string;
    description: string;
    date: string; // format ISO : 'YYYY-MM-DD'
    location?: string;
    imageUrl?: string;
  }
  