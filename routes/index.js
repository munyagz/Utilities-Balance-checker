require('dotenv').config()
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');



/* GET home page. */
router.get('/', (req, res, next)=> {

  let params = {
    "amount":process.env.Amount,
    "term:":process.env.Term,
    "currency_id":"KSH",
    "jp_receipt_number":"KSH",
    "number_of_tokens":1,
    "meter_number":process.env.MeterNo,
    "payment_type":3,
    "who_paid":process.env.PaidBy
  }
  let resp = ''
  let err =''

  fetch(process.env.Endpoint, {
        method: 'post',
        body:    JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json =>{

    let resMessage = json.message
    let patt1 = /\(([^)]+)\)/g;
    let result = patt1.exec(resMessage)[1].split('KES')[1]
    resp = `Your KPLC Float Balance is: Ksh. ${result}`
    res.render('index', { title: 'KPLC' ,data: resp });
    console.log(resp)
    })
    .catch(error => {
      err =  `An Error occurred: ${error}` 
      res.render('index', { title: 'KPLC' , error: err});
      console.log(error)
    });

});



module.exports = router;
