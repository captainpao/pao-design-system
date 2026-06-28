import { getPageRange } from '../src/components/pao-pagination/pao-pagination.utils';

describe('getPageRange', () => {
  const r = (totalPages: number, current: number, siblingCount = 1) =>
    getPageRange({ totalPages, current, siblingCount });

  it('returns empty for <= 0 pages', () => { expect(r(0, 1)).toEqual([]); });
  it('returns single page', () => { expect(r(1, 1)).toEqual([1]); });
  it('lists all pages when no truncation needed', () => { expect(r(5, 3)).toEqual([1, 2, 3, 4, 5]); });
  it('truncates the end when current is near start', () => {
    expect(r(10, 2)).toEqual([1, 2, 3, 'ellipsis', 10]);
  });
  it('truncates the start when current is near end', () => {
    expect(r(10, 9)).toEqual([1, 'ellipsis', 8, 9, 10]);
  });
  it('truncates both sides when current is in the middle', () => {
    expect(r(10, 5)).toEqual([1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]);
  });
  it('respects siblingCount', () => {
    expect(r(10, 5, 2)).toEqual([1, 'ellipsis', 3, 4, 5, 6, 7, 'ellipsis', 10]);
  });
});
