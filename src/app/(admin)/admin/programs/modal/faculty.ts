export const Faculties = [
  { code: 'FAID', name: 'Faculty of Architecture and Interior Design' },
  { code: 'FBS', name: 'Faculty of Business and Globalisation	Programs' },
  { code: 'FCM', name: 'Faculty of Creative Multimedia	Programs' },
  { code: 'FCO', name: 'Faculty of Communication and Media	Programs' },
  {
    code: 'FCTH',
    name: 'Faculty of Creativity in Tourism & Hospitality	Programs',
  },
  { code: 'FDSI', name: 'Faculty of Design and Innovation	Programs' },
  { code: 'FFLD', name: 'Faculty of Fashion and Lifestyle Design	Programs' },
  { code: 'FFTB', name: 'Faculty of Film, Television & Broadcasting	Programs' },
  {
    code: 'FINT',
    name: 'Faculty of Information & Communication Technology	Programs',
  },
  { code: 'FMS', name: 'Faculty of Music and Sound	Programs' },
] as const;

export type Faculty = (typeof Faculties)[number];
