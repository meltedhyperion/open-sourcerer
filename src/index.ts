import express from 'express';
import configs from './configs';


(async ()=>{
    const app = express();
    
    app.get('/', (req, res)=>{
        res.send('Hello World');
    })

    const port = configs.PORT
    app.listen(port, ()=>{
        console.log('Server is running on port 3000');
    })
})()