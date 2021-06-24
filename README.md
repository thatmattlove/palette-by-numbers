<div align="center">
    <br/>
    <h3>Palette by Numbers</h3>
    <br/>

[![Tests](https://img.shields.io/github/workflow/status/thatmattlove/palette-by-numbers/Tests?label=Tests&style=for-the-badge)](https://github.com/thatmattlove/site/actions?query=workflow%3A%Tests%22)

[![npm](https://img.shields.io/npm/v/palette-by-numbers?style=for-the-badge)](https://npmjs.com/package/palette-by-numbers)

</div>

Palette by Numbers is a collection of utilities to streamline the process of creating color palettes for design systems such as [Chakra UI](https://chakra-ui.com) and [Tailwind CSS](https://tailwindcss.com). When adding custom theme colors to these amazing projects, it's usually required to supply an object such as:

```js
const mySpecialColor = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  700: '#334155',
  800: '#1E293B',
  900: '#0F172A',
};
```

While it's not necessarily difficult to use various color generation tools to generate a palette based on a single base color, it can be tedious, especially if you are supplying multiple custom colors. Palette by Numbers, while not perfect, is intended to make that process easier. If we're being honest, this is just code I end up copying and pasting for reuse on each project, which is a bit silly.

## Installation

```bash
# Using yarn
yarn add palette-by-numbers

# Using npm
npm install palette-by-numbers
```

## Usage

### Chakra UI

Create a utility function to extend the default Chakra UI theme:

```js
import { extendTheme } from '@chakra-ui/react';
import { generatePalette } from 'palette-by-numbers';

export function createCustomTheme() {
  const colors = {
    primary: generatePalette('#61988E'),
    secondary: generatePalette('#493843'),
  };
  return extendTheme({ colors });
}
// In the above example, 'primary' would evaluate to:
// {
//   '50': 'hsla(170, 55%, 95%, 1)',
//   '100': 'hsla(169, 38%, 85%, 1)',
//   '200': 'hsla(169, 30%, 75%, 1)',
//   '300': 'hsla(169, 26%, 65%, 1)',
//   '400': 'hsla(169, 22%, 55%, 1)',
//   '500': '#61988E',
//   '600': 'hsla(169, 26%, 35%, 1)',
//   '700': 'hsla(169, 30%, 25%, 1)',
//   '800': 'hsla(169, 38%, 15%, 1)',
//   '900': 'hsla(170, 55%, 5%, 1)'
// }
```

Pass the theme prop to `<ChakraProvider />`:

```js
import { Box, ChakraProvider } from '@chakra-ui/react';
import { createCustomTheme } from './util';

export const App = () => {
  const theme = createCustomTheme();
  // In practice, you could wrap this with useMemo().
  return (
    <ChakraProvider theme={theme}>
      <YourComponent />
    </ChakraProvider>
  );
};

const YourComponent = () => {
  return <Box color="primary.300">I have a special color</Box>;
};
```

### Tailwind CSS

While I have not personally tested this with Tailwind, according to their [docs](https://tailwindcss.com/docs/theme#extending-the-default-theme), it should go something like this:

```js
// tailwind.config.js
const { generatePalette } = require('palette-by-numbers');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: generatePalette('#61988E'),
        secondary: generatePalette('#493843'),
      },
    },
  },
};
```

By default, the midpoint, i.e. `500`, is set to the original color passed. You can override this by passing an object as the second argument with the `originalAtMidpoint` set to `false`. For example:

```js
const theme = generatePalette('#61988E', { originalAtMidpoint: false });
// This will generate:
// {
//   '50': 'hsla(170, 55%, 95%, 1)',
//   '100': 'hsla(169, 38%, 85%, 1)',
//   '200': 'hsla(169, 30%, 75%, 1)',
//   '300': 'hsla(169, 26%, 65%, 1)',
//   '400': 'hsla(169, 22%, 55%, 1)',
//   '500': 'hsla(169, 22%, 45%, 1)',
//   '600': 'hsla(169, 26%, 35%, 1)',
//   '700': 'hsla(169, 30%, 25%, 1)',
//   '800': 'hsla(169, 38%, 15%, 1)',
//   '900': 'hsla(170, 55%, 5%, 1)'
// }
```

### Fonts

Also included is a font-family utility, which combines any passed font family with standard system fonts as fallbacks. For example:

```js
import { extendTheme } from '@chakra-ui/react';
import { generateFontFamily } from 'palette-by-numbers';

export function createFontFamilies() {
  const fonts = {
    body: generateFontFamily('sans-serif', 'Open Sans'),
    mono: generateFontFamily('mono', 'Fira Code'),
    heading: generateFontFamily('serif', 'Merriweather'),
  };
  // Will generate:
  // {
  //   body: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  //   mono: '"Fira Code", SFMono-Regular, Melno, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  //   heading: 'Merriweather, Garamond, "Palatino Linotype", "Book Antiqua", Palatino, "Times New Roman", Times, serif',
  // }
  return extendTheme({ fonts });
}
```
