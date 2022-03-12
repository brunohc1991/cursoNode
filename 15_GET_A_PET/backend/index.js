const express = require('express');
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes');
const PetRoutes = require('./routes/PetRoutes');

const app = express()
const port = 5000

//config json
app.use(express.json())

//solve cors
app.use(cors({
    credentials:true, origin: "http://localhost:3000"
}));

//pubic folder for images
app.use(express.static('public'));

//routes
app.use('/users', UserRoutes);
app.use('/pets', PetRoutes);


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))