const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log('Server listening on port 3000!', {port});
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const itemsRoutes = require('./src/routes/itemsRoutes');
app.use(itemsRoutes);   

























// app.post('/itens/recoveredItens/:id', (req, res) => {
//     const item = req.params.id;

//     persistence.recovered_items.create({
//         item_id: item,
//         recoveredBy: req.body.recoveredBy,
//         recoveryDate: req.body.recoveryDate

//     }).then(() => {
//         res.json(item);
        
//     }).catch((erro) => {
//         console.error('Falha ao cadastrar item!', erro);
//     });
// });













   
