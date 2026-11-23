import {
  gridItemWidth,
  layoutMetrics,
  usesSideNavigation,
} from '../src/utils/layout';
import { resources } from '../src/data/resources';
test.each([320, 360, 375, 600, 744, 900, 1080, 1400])(
  'keeps grid inside the viewport at %i points',
  width => {
    const metrics = layoutMetrics(width, 1, true);
    const item = gridItemWidth(metrics.contentWidth, metrics.columns);
    expect(item * metrics.columns + (metrics.columns - 1) * 16).toBeCloseTo(
      metrics.contentWidth,
    );
    expect(metrics.contentWidth + metrics.padding * 2).toBeLessThanOrEqual(
      width,
    );
    expect(item).toBeGreaterThanOrEqual(260);
  },
);
test('reflows between compact and unfolded windows and respects large text', () => {
  expect(layoutMetrics(320, 1, true).columns).toBe(1);
  expect(layoutMetrics(744, 1, true).columns).toBe(2);
  expect(layoutMetrics(1080, 1, true).columns).toBe(3);
  expect(layoutMetrics(744, 2, true).columns).toBe(1);
  expect(layoutMetrics(320, 2).compact).toBe(true);
});
test('learning resources have unique IDs and use HTTPS publisher or video links', () => {
  expect(new Set(resources.map(item => item.id)).size).toBe(resources.length);
  expect(resources.filter(item => item.kind === 'Video')).toHaveLength(2);
  resources.forEach(item => {
    const url = new URL(item.url);
    expect(url.protocol).toBe('https:');
    expect([
      'www.padi.com',
      'dan.org',
      'world.dan.org',
      'www.youtube.com',
    ]).toContain(url.hostname);
  });
});

test('switches to a side rail on wide short windows without requiring 900 points', () => {
  expect(usesSideNavigation(669, 446)).toBe(true);
  expect(usesSideNavigation(760, 360)).toBe(true);
  expect(usesSideNavigation(600, 280)).toBe(true);
  expect(usesSideNavigation(402, 800)).toBe(false);
  expect(usesSideNavigation(466, 640)).toBe(false);
  expect(usesSideNavigation(669, 900)).toBe(false);
  expect(usesSideNavigation(950, 1100)).toBe(true);
});
