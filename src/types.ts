export type IterIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type FontList = string[];

export type FontFamily = 'body' | 'heading' | 'mono';

export type ColorIndex = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type Palette = {
  [idz in ColorIndex]: string;
};
