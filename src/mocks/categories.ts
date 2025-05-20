export type CampaignCategory = {
  id: string;
  label: string;
};

export const categories: CampaignCategory[] = [
  { id: 'water', label: 'Water' },
  { id: 'environment', label: 'Environment' },
  { id: 'education', label: 'Education' },
  { id: 'food', label: 'Food' },
  { id: 'health', label: 'Health' },
  { id: 'emergency', label: 'Emergency' },
];
