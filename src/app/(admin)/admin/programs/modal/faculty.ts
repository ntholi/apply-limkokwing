export const Faculties = [
  { code: 'FABE', name: 'Faculty of Architecture and Interior Design' },
  { code: 'FBMG', name: 'Faculty of Business and Globalisation	Programs' },
  { code: 'FCMB', name: 'Faculty of Communication, Media & Broadcasting' },
  {
    code: 'FCTH',
    name: 'Faculty of Creativity in Tourism & Hospitality	Programs',
  },
  { code: 'FDI', name: 'Faculty of Design and Innovation	Programs' },
  {
    code: 'FICT',
    name: 'Faculty of Information & Communication Technology	Programs',
  },
] as const;

export type Faculty = (typeof Faculties)[number];
