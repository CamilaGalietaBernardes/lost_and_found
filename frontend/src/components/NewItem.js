import React, { useState } from 'react';
import axios from 'axios';
import './NewItem.css';

function NewItem() {

  const [formulario, setForumulario] = useState({
    itemPerdido: '', 
    descricao: '', 
    local: '', 
    dataRegistro: ''
  });

  const { itemPerdido, descricao, local, dataRegistro } = formulario;

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForumulario((prevState) => ({
      ...prevState, 
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
      e.preventDefault();

    const newItem = {
      item_name: formulario.itemPerdido, 
      item_description: formulario.descricao, 
      location_found: formulario.local, 
      registration_date: formulario.dataRegistro
    };

    axios.post('http://localhost:3001/items/new', newItem)
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
        <div className = "new-item">
          <h2>Cadastro de Item Perdido</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="itemPerdido">Item Perdido:</label>
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
            <button className="submit-btn" type="submit">Salvar</button>
          </form>
        </div>
      );
}

export default NewItem;