export const COLOR_LEVELS = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50] as const;

export type ColorLevel = (typeof COLOR_LEVELS)[number];

export interface ColorFamilySource {
  name: string;
  hue: number;
  saturation?: number;
}

export interface AppColor {
  family: string;
  level: ColorLevel;
  hex: string;
}

export interface ColorFamilyPalette {
  family: string;
  colors: AppColor[];
}

const COLOR_FAMILIES: ColorFamilySource[] = [
  { name: "Vermelho", hue: 0 },
  { name: "Coral", hue: 12 },
  { name: "Laranja", hue: 27 },
  { name: "Âmbar", hue: 42 },
  { name: "Amarelo", hue: 55 },
  { name: "Lima", hue: 78 },
  { name: "Verde", hue: 115 },
  { name: "Esmeralda", hue: 145 },
  { name: "Turquesa", hue: 168 },
  { name: "Ciano", hue: 188 },
  { name: "Azul-céu", hue: 202 },
  { name: "Azul", hue: 220 },
  { name: "Índigo", hue: 240 },
  { name: "Violeta", hue: 262 },
  { name: "Roxo", hue: 282 },
  { name: "Magenta", hue: 310 },
  { name: "Rosa", hue: 332 },
  { name: "Marrom", hue: 24, saturation: 42 },
  { name: "Oliva", hue: 64, saturation: 38 },
  { name: "Cinza", hue: 215, saturation: 4 },
];

const COLOR_LIGHTNESS = [13, 20, 28, 36, 44, 53, 63, 73, 83, 92] as const;
const COLOR_SATURATION = [86, 84, 82, 80, 78, 76, 72, 68, 62, 54] as const;

const hslToHex = (h: number, s: number, l: number) => {
  const saturation = s / 100;
  const lightness = l / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lightness - chroma / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = chroma;
    g = x;
  } else if (h < 120) {
    r = x;
    g = chroma;
  } else if (h < 180) {
    g = chroma;
    b = x;
  } else if (h < 240) {
    g = x;
    b = chroma;
  } else if (h < 300) {
    r = x;
    b = chroma;
  } else {
    r = chroma;
    b = x;
  }

  return [r, g, b]
    .map((value) => Math.round((value + m) * 255).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()
    .replace(/^/, "#");
};

export const professionalColorPalette: AppColor[] = COLOR_FAMILIES.flatMap((family) =>
  COLOR_LEVELS.map((level, index) => ({
    family: family.name,
    level,
    hex: hslToHex(
      family.hue,
      family.saturation ?? COLOR_SATURATION[index],
      COLOR_LIGHTNESS[index]
    ),
  }))
);

export const professionalColorFamilies: ColorFamilyPalette[] = COLOR_FAMILIES.map((family) => ({
  family: family.name,
  colors: professionalColorPalette.filter((color) => color.family === family.name),
}));

export const colorByHex = new Map(professionalColorPalette.map((color) => [color.hex, color]));
