import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_HASH } from '../constant'

const DataContext1 = createContext();

export const useData1 = () => {
    return useContext(DataContext1);
};
export const DataProvider1 = ({ children }) => {
    const [data, setData] = useState({ articles: [], });

    const fetchData = async () => {
        try {
            const [articlesResponse,] = await Promise.all([
                axios.get('https://lafagency.com/meditation/admin/Api/getarticles',),

            ]);

            setData({
                articles: articlesResponse.data,

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
