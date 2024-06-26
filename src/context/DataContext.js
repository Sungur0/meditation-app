import React, { createContext, useContext, useState } from 'react';

const categories = [
  { id: 1, name: 'Happiness', desc: 'Feeling of joy and contentment', shortDesc: 'Feeling of joy and contentment', image: require('../assets/images/happiness.jpg'), fullImg: require('../assets/fullimage/fullhappiness.jpg'), },
  { id: 2, name: 'Health', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,', shortDesc: 'State of physical and mental well-being', image: require('../assets/images/health.jpg'), fullImg: require('../assets/fullimage/fullhealth.jpg'), },
  { id: 3, name: 'Wise', desc: 'Ability to think and act using knowledge, experience, understanding, common sense, and insight', shortDesc: 'Ability to think and act using knowledge, experience, understanding, common sense, and insight', image: require('../assets/images/wise.jpg'), fullImg: require('../assets/fullimage/fullwise.jpg'), },
  { id: 4, name: 'Cab', desc: 'Ability to think and act using knowledge, experience, understanding, common sense, and insight', shortDesc: 'Ability to think and act using knowledge, experience, understanding, common sense, and insight', image: require('../assets/images/card.jpg'), fullImg: require('../assets/fullimage/fullcab.jpg'), },
  { id: 5, name: 'Cab', desc: 'Ability to think and act using knowledge, experience, understanding, common sense, and insight', shortDesc: 'Wise', image: require('../assets/images/card.jpg'), fullImg: require('../assets/fullimage/fullcab.jpg'), },
];

const subcategory = [
  { id: 1, name: 'Breath', mainId: 2 },
  { id: 2, name: 'Bond with the body', mainId: 2 },
  { id: 3, name: 'Sleep', mainId: 2 }
]

const programs = [
  { id: 1, name: 'Breathing', subId: 1, img: require('../assets/fullimage/full.jpg'), sound: require('../assets/sounds/audiomass.mp3'), },
  { id: 2, name: 'Breach and wond', subId: 1, img: require('../assets/fullimage/program.jpg'), sound: require('../assets/sounds/audiomas.mp3'), },
  { id: 3, name: 'Breach and hand', subId: 1, img: require('../assets/fullimage/program.jpg'), sound: require('../assets/sounds/audiomass.mp3'), },
  { id: 4, name: 'Body Scan', subId: 2, img: require('../assets/fullimage/program.jpg'), sound: require('../assets/sounds/audiomass.mp3'), },
  { id: 5, name: 'Breathing with the body', subId: 2, img: require('../assets/fullimage/program.jpg'), sound: require('../assets/sounds/audiomass.mp3'), },
  { id: 6, name: 'Deep relaxation', subId: 3, img: require('../assets/fullimage/program.jpg'), sound: require('../assets/sounds/audiomass.mp3'), }
]

const articles = [
  {
    id: 1, img: require('../assets/fullimage/ways.jpg'), name: '5 Simple Ways to Relax', desc: 'Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “Its not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real As Cicero would put it, “Um, not so fast The placeholder text, beginning with the line “Lorem ipsum dolor sit amet, consectetur adipiscing elit”, looks like Latin because in its youth, centuries ago, it was Latin. Richard McClintock, a Latin scholar from Hampden-Sydney College, is credited with discovering the source behind the ubiquitous filler text. In seeing a sample of lorem ipsum, his interest was piqued by consectetur—a genuine, albeit rare, Latin word. Consulting a Latin dictionary led McClintock to a passage from De Finibus Bonorum et Malorum (“On the Extremes of Good and Evil”), a first-century B.C. text from the Roman philosopher Cicero. In particular, the garbled words of lorem ipsum bear an unmistakable resemblance to sections 1.10.32-33 of Cicero"s work, with the most notable passage excerpted below:'
  },
  {
    id: 2, img: require('../assets/fullimage/program.jpg'),topLocation: 1, name: 'How Long Should You Meditate', desc: 'Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “Its not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real As Cicero would put it, “Um, not so fast The placeholder text, beginning with the line “Lorem ipsum dolor sit amet, consectetur adipiscing elit”, looks like Latin because in its youth, centuries ago, it was Latin. Richard McClintock, a Latin scholar from Hampden-Sydney College, is credited with discovering the source behind the ubiquitous filler text. In seeing a sample of lorem ipsum, his interest was piqued by consectetur—a genuine, albeit rare, Latin word. Consulting a Latin dictionary led McClintock to a passage from De Finibus Bonorum et Malorum (“On the Extremes of Good and Evil”), a first-century B.C. text from the Roman philosopher Cicero. In particular, the garbled words of lorem ipsum bear an unmistakable resemblance to sections 1.10.32-33 of Cicero"s work, with the most notable passage excerpted below:'
  },
  {
    id: 3, img: require('../assets/fullimage/blog.jpg'), topLocation: 1, name: 'How meditation could change the brain', desc: 'Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “Its not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real As Cicero would put it, “Um, not so fast The placeholder text, beginning with the line “Lorem ipsum dolor sit amet, consectetur adipiscing elit”, looks like Latin because in its youth, centuries ago, it was Latin. Richard McClintock, a Latin scholar from Hampden-Sydney College, is credited with discovering the source behind the ubiquitous filler text. In seeing a sample of lorem ipsum, his interest was piqued by consectetur—a genuine, albeit rare, Latin word. Consulting a Latin dictionary led McClintock to a passage from De Finibus Bonorum et Malorum (“On the Extremes of Good and Evil”), a first-century B.C. text from the Roman philosopher Cicero. In particular, the garbled words of lorem ipsum bear an unmistakable resemblance to sections 1.10.32-33 of Cicero"s work, with the most notable passage excerpted below:'
  },
]


const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ categories, subcategory, programs, articles, });

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);