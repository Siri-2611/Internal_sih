import { LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'santhali',
    name: 'Santhali',
    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ (Santali)',
    script: 'Ol Chiki',
    scriptNative: 'ᱚᱞ ᱪᱤᱠᱤ',
    status: 'active',
    dialect: 'Standard Mayurbhanj / Santhal Pargana',
    region: 'Jharkhand, Odisha, West Bengal, Assam'
  },
  {
    code: 'ho',
    name: 'Ho',
    nativeName: 'ᱦᱳ (Ho)',
    script: 'Warang Citi / Ol Chiki',
    scriptNative: 'ᱣᱟᱨᱟᱝ ᱪᱤᱛᱤ',
    status: 'coming_soon',
    dialect: 'Kolhan / Singhbhum',
    region: 'Jharkhand (West Singhbhum), Odisha (Mayurbhanj)'
  },
  {
    code: 'mundari',
    name: 'Mundari',
    nativeName: 'ᱢᱩᱱᱰᱟᱹᱨᱤ (Mundari)',
    script: 'Mundari Bani / Devanagari',
    scriptNative: 'ᱢᱩᱱᱰᱟᱹᱨᱤ ᱵᱟᱹᱱᱤ',
    status: 'coming_soon',
    dialect: 'Hasada / Naguri',
    region: 'Jharkhand (Khunti, Ranchi), Odisha'
  }
];
