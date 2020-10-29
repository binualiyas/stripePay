var express = require('express');
var router = express.Router();

const PUBLISHABLE_KEY="pk_test_51HeuDKFnAGuoj6RD7p7BE95i870UkmuEQMBfTq9J6ArDOdJcrbyxdkMLCkJokPGtDLWXYe2qNzyGmxb9JWsUT6ay00bdf8ArPU"
const SECRET_KEY="sk_test_51HeuDKFnAGuoj6RDBahCuXi4DZRkk2MXil2p1TLyYERLNNHzn9GrNfBzpYlGAsmcbxDPHGeT5QdM09CPbKZsgacp003ujHmDo8"

const stripe=require('stripe')(SECRET_KEY)




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Home', { key: PUBLISHABLE_KEY });
});

router.post('/payment',(req,res)=>{
  stripe.customers.create({
    email:req.body.stripeEmail,
    source:req.body.stripeToken,
    name:'Binu Aliyas',
    address:{
      line1:'3890 Avenue Barclay',
      postal_code:'H3S1K7',
      city:'Montreal',
      state:'Quebec',
      country:'Canada'
    }
  })
  .then((customer)=>{
    return stripe.charges.create({
      amount:7000,
      description:'Web development product',
      currency:'USD',
      customer:customer.id
    })
  })
  .then((err,charge)=>{
    console.log(charge)
    res.send('Payment Success')
  })
  .catch((err)=>{
    res.send(err)
  })

})

module.exports = router;
