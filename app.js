const express = require("express")
const cors = require("cors")
const jwt = require('jsonwebtoken');

const { registerAkun, loginAkun } = require("./models/registerModels");
const { getSecretKey } = require("./utils");
const { getAllUser } = require("./models/userModels");

const app = express()
const PORT = process.env.PORT || 3000;
const SECRET_KEY = getSecretKey()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world')
})

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({status: false, message: 'Token is undefined'});

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({status: false, message: 'Invalid Token'});
        req.user = user;
        next();
    });
};

app.get('/users', authenticateToken, async (req, res) => {
    try {
        const process = await getAllUser()
        console.log({process});

        if(process.status == 200) {
            res.status(200).json({status: true, message: 'Berhasil mengambil data user', data:process.data})
        } else {
            res.status(404).json({status: false, message: process.message})
        }
    } catch (error) {
        res.status(500).json({status: false, message: 'Error'})
    }
})

app.post('/login', async (req, res) => {
    const data = req.body
    try {
        const process = await loginAkun(data)
        if(process) {
            const {email} = data
            const token = jwt.sign({ email }, SECRET_KEY);

            const dataUser = {
                id: process.id,
                time: process.created_at,
                username: process.username,
                email: process.email
            }

            res.status(201).json({status: true, message: 'Login Berhasil', data: dataUser, token})
        } else {
            res.status(201).json({status: false, message: 'Login gagal'})
        }
    } catch (error) {
        res.status(500).json({status: false, message: 'Error'})
    }
})

app.post('/register', async (req, res) => {
    const data = req.body
    try {
        const process = await registerAkun(data)
        if(process.status == 201) {
            res.status(201).json({status: true, message: 'Register Berhasil'})
        } else {
            res.status(201).json({status: false, message: process.message})
        }
    } catch (error) {
        res.status(500).json({status: false, message: 'Error'})
    }
})

// app.get('/users', async (req, res) => {
//     try {
//         const process = await getAllUser()
//         console.log({process});

//         if(process.status == 200) {
//             res.status(200).json({status: true, message: 'Berhasil mengambil data user', data:process.data})
//         } else {
//             res.status(404).json({status: false, message: process.message})
//         }
//     } catch (error) {
//         res.status(500).json({status: false, message: 'Error'})
//     }
// })



app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
})