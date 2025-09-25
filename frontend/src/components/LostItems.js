import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import './LostItems.css'


function LostItems() {
    const [items, setItems] = useState([]);
    const [selectedItem, getSelectedItem] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/items');
        setItems(response.data);
      } catch (error) {
        console.error('Failed to fetch items!', error);
      }
    };

    const handleOnDelete = (item) => {
        axios.delete('http://localhost:3001/items/delete/'+item.item_id)
        .then(response => {
          if (response.status === 200) {
            window.location.reload(false);
          } else {
            console.log('falhooooooou')
          }
          console.log(response.data);
        }).catch(error => {
          console.error(error);
        });
    }
    
    const handleOnEdit = (item) => {
        navigate('/item-checkout', { state: { item } });
    }

    return (
        <div className='lost-items'>
            <h2>Itens Perdidos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Item Perdido</th>
                        <th>Descrição</th>
                        <th>Local</th>
                        <th>Data de Resgistro</th>
                        <th>Editar</th>
                        <th>Remover</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.item_id}>
                            <td>{item.item_name}</td>
                            <td>{item.item_description}</td>
                            <td>{item.location_found}</td>
                            <td>{item.registration_date}</td>
                            <td><button onClick={() => handleOnEdit(item)}>Editar</button></td>
                            <td><button onClick={() => handleOnDelete(item)}>Deletar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LostItems;
