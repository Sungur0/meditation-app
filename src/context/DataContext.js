import React, { createContext, useContext, useState } from 'react';

const categories = [
  { id: 1, name: 'Happiness', desc: 'Feeling of joy and contentment', shortDesc: 'Joyful' , image:require('../assets/images/happiness.jpg'), fullImg:require('../assets/fullimage/fullhappiness.jpg'), },
  { id: 2, name: 'Health', desc: 'State of physical and mental well-being', shortDesc: 'Healthy' , image:require('../assets/images/health.jpg'), fullImg:require('../assets/fullimage/fullhealth.jpg'),},
  { id: 3, name: 'Wise', desc: 'Ability to think and act using knowledge, experience, understanding, common sense, and insight', shortDesc: 'Wise' , image:require('../assets/images/wise.jpg'), fullImg:require('../assets/fullimage/fullwise.jpg'),},
  { id: 4, name: 'Cab', desc: 'Ability to think and act using knowledge, experience, understanding, common sense, and insight', shortDesc: 'Wise' , image:require('../assets/images/card.jpg'), fullImg:require('../assets/fullimage/fullcab.jpg'),},
  { id: 5, name: 'Cab', desc: 'Ability to think and act using knowledge, experience, understanding, common sense, and insight', shortDesc: 'Wise' , image:require('../assets/images/card.jpg'), fullImg:require('../assets/fullimage/fullcab.jpg'),},
  { id: 6, name: 'Cab', desc: 'Ability to think and act using knowledge, experience, understanding, common sense, and insight', shortDesc: 'Wise' , image:require('../assets/images/card.jpg'), fullImg:require('../assets/fullimage/fullcab.jpg'),},
  { id: 7, name: 'Cab', desc: 'Ability to think and act using knowledge, experience, understanding, common sense, and insight', shortDesc: 'Wise' , image:require('../assets/images/card.jpg'), fullImg:require('../assets/fullimage/fullcab.jpg'),},

];

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(categories);

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);