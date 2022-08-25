export{}

// // import { EUI_CHARTS_THEME_DARK, EUI_CHARTS_THEME_LIGHT } from '@elastic/eui/dist/eui_charts_theme';
// import { createContext, useContext } from 'react';
// import { $Values } from 'utility-types';

// import { Theme, LIGHT_THEME, DARK_THEME } from '@elastic/charts';
// // import { mergePartial } from '@elastic/charts/src/utils/common';


// /**
//  * Available themes
//  * @internal
//  */
// export const ThemeId = Object.freeze({
//   Light: 'light' as const,
//   Dark: 'dark' as const,
//   EUILight: 'eui-light' as const,
//   EUIDark: 'eui-dark' as const,
// });
// /** @internal */
// export type ThemeId = $Values<typeof ThemeId>;

// const ThemeContext = createContext<ThemeId>(ThemeId.Light);
// const BackgroundContext = createContext<string | undefined>(undefined);

// export const ThemeIdProvider = ThemeContext.Provider;
// export const BackgroundIdProvider = BackgroundContext.Provider;

// const themeMap = {
//   [ThemeId.Light]: LIGHT_THEME,
//   [ThemeId.Dark]: DARK_THEME,
// };

// export const useBaseTheme = (): Theme => {
//   const themeId = useContext(ThemeContext);
//   const theme = themeMap[themeId] ?? LIGHT_THEME;

//   return mergePartial(theme, {
//     // eui chart theme has no margin for some reason. This is just for consistency.
//     chartMargins: 5,
//     background: { color: "#FFFFFF" },
//   });
// };