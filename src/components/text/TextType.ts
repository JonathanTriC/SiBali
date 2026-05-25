export type FontSize = '2xs' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';

export type FontWeight = 'light' | 'regular' | 'bold';

export type Text = `${FontWeight}-${FontSize}`;

export type TextMap<T> = { [K in Text]: T };
