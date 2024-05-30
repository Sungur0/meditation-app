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
  { id: 1, name: 'Breathing', subId: 1, img: require('../assets/fullimage/full.jpg'), },
  { id: 2, name: 'Breach and wond', subId: 1, img: require('../assets/fullimage/program.jpg'), },
  { id: 3, name: 'Breach and hand', subId: 1, img: require('../assets/fullimage/program.jpg'), },
  { id: 4, name: 'Body Scan', subId: 2, img: require('../assets/fullimage/program.jpg'), },
  { id: 5, name: 'Breathing with the body', subId: 2, img: require('../assets/fullimage/program.jpg'), },
  { id: 6, name: 'Deep relaxation', subId: 3, img: require('../assets/fullimage/program.jpg'), }
]

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ categories, subcategory, programs });

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);