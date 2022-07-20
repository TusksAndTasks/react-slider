import Slider from './Slider';

export function App() {
  const slides = [
    {
      img: 'https://trikky.ru/wp-content/blogs.dir/1/files/2020/06/10/d9b97b5646fbb691e29947a921049a1d.jpg',
      text: 'bottom text 1',
    },
    {
      img: 'https://bantza.raah.fi/junk/dragdiv/random/random-shots-2.jpg',
      text: 'bottom text 2',
    },
    {
      img: 'https://otus.ru/journal/wp-content/uploads/2020/12/Screenshot_2.jpg',
      text: 'bottom text 3',
    },
    {
      img: 'https://i1.photo.2gis.com/images/profile/30258560047630262_0794.jpg',
      text: 'bottom text 4',
    },
    {
      img: 'https://upload.wikimedia.org/wikipedia/ru/thumb/4/4e/Daft_Punk_Random_Access_Memories_Cover_Art.jpg/240px-Daft_Punk_Random_Access_Memories_Cover_Art.jpg',
      text: 'bottom text 5',
    },
  ];

  return (
    <Slider
      slides={slides}
      loop={true}
      navs={true}
      pags={true}
      auto={true}
      stopMouseHover={true}
      delay={3}
    />
  );
}
