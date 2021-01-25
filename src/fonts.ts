import type { FontList, FontFamily } from './types';

/**
 * Type guard to ensure a passed font family is supported.
 *
 * @param font Font Family
 */
function isFontFamily(font: string): font is FontFamily {
  return ['monospace', 'sans-serif', 'serif'].includes(font);
}

const FontFamilyError = new Error(
  "The first argument should be 'monospace', 'sans-serif', or 'serif'.",
);

const sansSerifFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Helvetica',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
] as FontList;

const serifFonts = [
  'Garamond',
  '"Palatino Linotype"',
  '"Book Antiqua"',
  'Palatino',
  '"Times New Roman"',
  'Times',
  'serif',
] as FontList;

const monospaceFonts = [
  'SFMono-Regular',
  'Melno',
  'Monaco',
  'Consolas',
  '"Liberation Mono"',
  '"Courier New"',
  'monospace',
] as FontList;

/**
 * Create a font-family string usable in CSS. Merges input fonts with generic system fonts.
 *
 * @param family Serif, Sans-Serif, Monospace
 * @param font Font to merge with system fonts.
 * @param fonts Additional fonts to merge with system fonts.
 */
export function generateFontFamily(family: FontFamily, font: string, ...fonts: string[]): string {
  const cleanedFonts = [font, ...fonts].map(f => {
    f = f.replace(/"/g, '');
    if (f.includes(' ')) {
      f = `"${f}"`;
    }
    return f.trim();
  });

  if (!isFontFamily(family.toLowerCase())) {
    throw FontFamilyError;
  }

  switch (family.toLowerCase()) {
    case 'monospace':
      return [...cleanedFonts, ...monospaceFonts].join(', ');
    case 'sans-serif':
      return [...cleanedFonts, ...sansSerifFonts].join(', ');
    case 'serif':
      return [...cleanedFonts, ...serifFonts].join(', ');
    default:
      throw FontFamilyError;
  }
}
