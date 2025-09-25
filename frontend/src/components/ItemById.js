function ItemById() {

  const getItemById = async (itemId) => {
    try {
      const response = await axios.get(`http://localhost:3001/items/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch item!', error);
      throw error;
    }
  };

}
