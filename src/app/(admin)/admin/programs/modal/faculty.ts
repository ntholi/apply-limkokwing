export const Faculties = [
  { code: 'FAID', name: 'Faculty of Architecture and Interior Design' },
  { code: 'FBS', name: 'Faculty of Business and Globalisation	Programs' },
  { code: 'FCO', name: 'Faculty of Communication and Media	Programs' },
  {
    code: 'FCTH',
    name: 'Faculty of Creativity in Tourism & Hospitality	Programs',
  },
  { code: 'FDSI', name: 'Faculty of Design and Innovation	Programs' },
  { code: 'FFLD', name: 'Faculty of Fashion and Lifestyle Design	Programs' },
  {
    code: 'FINT',
    name: 'Faculty of Information & Communication Technology	Programs',
  },
] as const;

export type Faculty = (typeof Faculties)[number];
