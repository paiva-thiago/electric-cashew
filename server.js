
const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', (req, res)=> {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/timestamp/:date_string?', (req,res) => {
  let param = req.params.date_string
  try {
    if((undefined!==param) && (param.indexOf('-') < 1)){
      param=parseInt(param)
    }
    let dtDate = new Date()
    if(param !== undefined){
      dtDate = new Date(param)
    }
    let data = {
      "unix":dtDate.getTime(),
      "utc":dtDate.toUTCString()
    }
    res.json(data)
  }catch(e){
    res.json( {"error" : "Invalid Date" } )
  }
})


// listen for requests :)
const listener = app.listen(process.env.PORT, ()=> {
  console.log('Your app is listening on port ' + listener.address().port);
});
