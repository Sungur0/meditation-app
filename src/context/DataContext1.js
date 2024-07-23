import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const DataContext1 = createContext();

export const useData1 = () => {
    return useContext(DataContext1);
};
export const DataProvider1 = ({ children }) => {
    const [data, setData] = useState({ articles: [], programs: [], programCats: [] });

    const fetchData = async () => {
        try {
            const [articlesResponse, programsResponse,programCatsResponse] = await Promise.all([
                axios.get('https://lafagency.com/meditation/admin/Api/getarticles',),
                axios.get('https://lafagency.com/meditation/admin/Api/getprograms',),
                axios.get('https://lafagency.com/meditation/admin/Api/getprogramcats',),


            ]);

            setData({
                articles: articlesResponse.data,
                programs: programsResponse.data,
                programCats: programCatsResponse.data,

            });
        } catch (error) {
            console.error('Veri getirilemedi:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DataContext1.Provider value={data}>
            {children}
        </DataContext1.Provider>
    );
};

export const useData = () => useContext(DataContext1);
