import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import './LocalReport.css'


function LocalReport() {
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/items/report/local');
        setItems(response.data);
      } catch (error) {
        console.error('Failed to fetch items!', error);
      }
    };

    return (
        <div className='lost-items'>
            <h2>Relatório por local</h2>
            <table>
                <thead>
                    <tr>
                        <th>Local</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.item_id}>
                            <td>{item.location_found}</td>
                            <td>{item.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LocalReport;
