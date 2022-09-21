const express = require('express');
const app = express();
const PORT = 3000;
const fetch = require('node-fetch')
const connection = require('./db')
// const bodyParser = require('body-parser')
const Apis = connection.models.Apis;

const renameKeys = (obj, oldKey, newKey) => {
    obj[newKey] = obj[oldKey]
    delete obj[oldKey]
};

const renameForecastKeys = (obj, oldKey, newKey, subKey)=>{

}

app.use(express.json())

app.get('/', async (req, res) => {

    const type = req.body.type;
    const data = await Apis.findOne({ type: type });
    const url = `${data.url}?key=${data.apikey}&q=${req.body.city ? req.body.city : data.city}&aqi=${req.body.aqi ? req.body.aqi : data.aqi}`;
    const fetch_data = await fetch(url)
    const response = await fetch_data.json();
    
    if (response.error) {
        res.json({ message: response.error.message, status: 'fail' })
    } else {
        var parentKey = req.body.parentKey;
        var mainKey = req.body.mainKey
        var subKey = req.body.subKey
        const mapData = req.body.map
        var combinatedKey = subKey==''?mainKey:`${mainKey}[${subKey}]`;
        if(type == 'current'){
            for(k in mapData){
                renameKeys(response[combinatedKey], k, mapData[k]);
            }
        }else if(type == 'forecast'){
            if(subKey!=''){
                var subObject = response[parentKey][mainKey].find(x=>{return x.astro});
                for(k in mapData){
                    renameKeys(subObject, k, mapData[k]);
                }
            }else{
                for(k in mapData){
                    renameKeys(response[combinatedKey], k, mapData[k]);
                }
            }
        }
    
        res.json({ message: response, status: 'success'})
    }
})


app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));





// const apis = new Apis({
//     url: 'http://api.weatherapi.com/v1/current.json',
//     type: 'current',
//     apikey: '9dd58dc0c1f14491b49123427221909',
//     city: 'Bangalore',
//     days: 1,
//     aqi: 'no',
//     alert: 'no'
// })
// const saveData = await apis.save()
// res.json(saveData);


