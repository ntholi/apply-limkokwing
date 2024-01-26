export const Faculties = [
  {
    code: 'FAID',
    tag: 'Architecture',
    name: 'Faculty of Architecture and Interior Design',
  },
  {
    code: 'FBS',
    tag: 'Business',
    name: 'Faculty of Business and Globalisation	Programs',
  },
  {
    code: 'FCO',
    tag: 'Communication',
    name: 'Faculty of Communication and Media	Programs',
  },
  {
    code: 'FCTH',
    tag: 'Tourism',
    name: 'Faculty of Creativity in Tourism & Hospitality	Programs',
  },
  {
    code: 'FDSI',
    tag: 'Design',
    name: 'Faculty of Design and Innovation	Programs',
  },
  {
    code: 'FFLD',
    tag: 'Fashion',
    name: 'Faculty of Fashion and Lifestyle Design	Programs',
  },
  {
    code: 'FINT',
    tag: 'Information Technology',
    name: 'Faculty of Information & Communication Technology	Programs',
  },
] as const;

export type Faculty = (typeof Faculties)[number];
