// Chuyển HEX sang RGB format
export const hexToRGB = (hex: string) => {
  const color = hex.replaceAll(/#/, '');
  const r = Number.parseInt(color.substring(0, 2), 16);
  const g = Number.parseInt(color.substring(2, 2), 16);
  const b = Number.parseInt(color.substring(4, 2), 16);
  return `${r}, ${g}, ${b}`;
};

// Tính màu text có contrast tốt (accessibility)
export const getContrastColor = (hex: string) => {
  const color = hex.replaceAll(/#/, '');
  const r = Number.parseInt(color.substring(0, 2), 16);
  const g = Number.parseInt(color.substring(2, 2), 16);
  const b = Number.parseInt(color.substring(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#FFFFFF';
};
