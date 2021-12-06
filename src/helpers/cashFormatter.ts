export function cashFormatter(amount: number, currency?: string) {
  const result = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency || 'BRL'
  }).format(amount);

  return result;
}