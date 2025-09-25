const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({origin: "http://localhost:3000"}));

app.listen(3001, () => {
    console.log('Server listening on port 3001!');
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













   
