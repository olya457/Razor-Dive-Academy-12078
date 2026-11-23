export function layoutMetrics(width: number, fontScale = 1, wide = false) {
  const padding = width < 360 ? 12 : 20;
  const contentWidth = Math.max(
    0,
    Math.min(width, wide ? 1080 : 760) - padding * 2,
  );
  const cardMinimum = 280 * Math.max(1, fontScale);
  return {
    padding,
    contentWidth,
    columns: Math.max(
      1,
      Math.min(3, Math.floor((contentWidth + 16) / (cardMinimum + 16))),
    ),
    compact: width < 360 || fontScale >= 1.5,
  };
}
export function gridItemWidth(width: number, columns: number) {
  return Math.max(0, (width - (columns - 1) * 16) / columns);
}

export const floatingNavigation = { height: 68, bottom: 20, side: 16 };
export const usesSideNavigation = (width: number, height: number) =>
  width >= 900 || (width >= 600 && width > height);
