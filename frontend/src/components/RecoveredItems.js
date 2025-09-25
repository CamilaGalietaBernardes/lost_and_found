import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import './RecoveredItems.css';

function RecoveredItems() {
    const [selectedItem, getSelectedItem] = useState(null);
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/items/recovered/report');
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
        <div className='recovered-items'>
            <h2>Itens Recuperados</h2>
            <table>
                <thead>
                    <tr>
                        <th>Item Perdido</th>
                        <th>Descrição</th>
                        <th>Local</th>
                        <th>Data de Resgistro</th>
                        <th>Nome do Dono</th>
                        <th>Data de Entrega</th>
                        <th>Editar</th>
                        <th>Remover</th>
                    </tr>
                </thead>
                <tbody>
                    {items.filter((item) => item.recovery_date !== null).map((item) => (
                        <tr key={item.item_id}>
                            <td>{item.item_name}</td>
                            <td>{item.item_description}</td>
                            <td>{item.location_found}</td>
                            <td>{item.registration_date}</td>
                            <td>{item.recovered_by}</td>
                            <td>{item.recovery_date }</td>
                            <td><button onClick={() => handleOnEdit(item)}>Editar</button></td>
                            <td><button onClick={() => handleOnDelete(item)}>Deletar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecoveredItems;
