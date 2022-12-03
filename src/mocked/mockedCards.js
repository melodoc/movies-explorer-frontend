export const cards = [
  {
    src: 'https://pm1.narvii.com/7283/db4336ada8dadfd88c83ed5111304b5f0d6eafa0r1-728-1097v2_hq.jpg',
    label: '33 слова о дизайне',
    duration: '77',
    isSaved: true
  },
  {
    src: 'https://img.freepik.com/free-photo/pink-sky-background-with-crescent-moon_53876-129048.jpg?w=2000',
    label: 'Бег это свобода',
    duration: '77'
  },
  {
    src: 'https://klike.net/uploads/posts/2020-11/1605600161_25.jpg',
    label: 'Gimme Danger: История Игги и The Stooges',
    duration: '77'
  }
];

export const mockedCards = new Array(5)
  .fill(null)
  .map(() => [...cards])
  .flat();

export const savedCards = [
  {
    src: 'https://images.unsplash.com/photo-1536195892759-c8a3c8e1945e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YWVzdGhldGljfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    label: '33 слова о дизайне',
    duration: '77',
    hasDeleteBtn: true
  },
  {
    src: 'https://i.pinimg.com/originals/8e/7b/d1/8e7bd1e34701413a5abf933fba6e74f7.jpg',
    label: 'Бег это свобода',
    duration: '77',
    hasDeleteBtn: true
  },
  {
    src: 'https://im.vsco.co/aws-us-west-2/1a20b9/185642745/603d1a847671d648da000001/vsco603d1a8369928.jpg?w=480',
    label: 'Gimme Danger: История Игги и The Stooges',
    duration: '77',
    hasDeleteBtn: true
  }
];
