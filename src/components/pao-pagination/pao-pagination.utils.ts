export type PageItem = number | 'ellipsis';

export function getPageRange(opts: {
  totalPages: number;
  current: number;
  siblingCount: number;
}): PageItem[] {
  const { totalPages, current, siblingCount } = opts;
  if (totalPages <= 0) return [];
  if (totalPages === 1) return [1];

  const left = Math.max(2, current - siblingCount);
  const right = Math.min(totalPages - 1, current + siblingCount);
  const items: PageItem[] = [1];

  if (left > 2) items.push('ellipsis');
  for (let p = left; p <= right; p++) items.push(p);
  if (right < totalPages - 1) items.push('ellipsis');

  items.push(totalPages);
  return items;
}
