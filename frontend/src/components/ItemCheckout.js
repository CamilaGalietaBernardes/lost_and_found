import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ItemCheckout() {
  const location = useLocation();
  const selectedItem = location.state?.item;

  const [formulario, setForumulario] = useState({
    idItem: selectedItem.item_id,
    itemPerdido: selectedItem.item_name, 
    descricao: selectedItem.item_description, 
    local: selectedItem.location_found, 
    dataRegistro: selectedItem.registration_date
  });

  const { idItem, itemPerdido, descricao, local, dataRegistro, recuperadoPor, dataEntrega } = formulario;

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForumulario((prevState) => ({
      ...prevState, 
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
      e.preventDefault();

    const updatedItem = {
      item_id: formulario.idItem,
      item_name: formulario.itemPerdido, 
      item_description: formulario.descricao, 
      location_found: formulario.local, 
      registration_date: formulario.dataRegistro,
      recovered_by: formulario.recuperadoPor,
      recovery_date: formulario.dataEntrega
    };

    axios.put('http://localhost:3001/items/update/'+formulario.idItem, updatedItem)
      .then(response => {
        if (response.status === 200) {
          console.log('Item salvo com sucesso!');
        } else {
          console.log('falhooooooou')
        }
        console.log(response.data);
      }).catch(error => {
        console.error(error);
      });
    };

   return (
        <div className = "item-checkout">
          <h2>Finalizar Item Perdido</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="itemPerdido">Nome do Item:</label>
              <input type = "text" 
                id = "itemPerdido" 
                name = "itemPerdido" 
                value = {itemPerdido} 
                onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="descricao">Descrição:</label>
              <input type="text" id="descricao" name="descricao" value={descricao} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="local">Local:</label>
              <input type="text" id="local" name="local" value={local} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="dataRegistro">Data de Registro:</label>
              <input type="text" id="dataRegistro" name="dataRegistro" value={dataRegistro} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="recuperadoPor">Recuperado por:</label>
              <input type="text" id="recuperadoPor" name="recuperadoPor" value={recuperadoPor} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="dataEntrega">Data de recuperação:</label>
              <input type="text" id="dataEntrega" name="dataEntrega" value={dataEntrega} onChange={handleChange} />
            </div>
            <button className="submit-btn" type="submit">Salvar</button>
          </form>
        </div>   
    );
}

export default ItemCheckout;