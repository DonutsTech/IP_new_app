export const formatMetricValue = (value: number, type: 'number' | 'percentage', prefix?: string): string => {
  if (type === 'percentage') {
    return `${Math.round(value)}%`;
  }


  if (value >= 1000000) {
    const formattedValue = (value / 1000000).toFixed(1);
    return `${formattedValue}M${prefix || ''}`;
  }
  if (value >= 1000) {
    const formattedValue = (value / 1000).toFixed(0);
    return `${formattedValue}K${prefix || ''}`;
  }

  return `${value.toLocaleString('pt-BR')}${prefix || ''}`;
};