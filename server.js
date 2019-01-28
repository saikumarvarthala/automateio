const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
var db;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Remember to change YOUR_USERNAME and YOUR_PASSWORD to your username and password! 
// MongoClient.connect('mongodb://root:root12@ds149344.mlab.com:49344/basicexpress', (err, database) => {
//   if (err) return console.log(err)
//   db = database;
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
// })

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))



var Dictionary = require("oxford-dictionary");
var config = {
    app_id : "e2ad1469",
    app_key : "a65d8b4a99cc7919a807c1630e2e0de8",
    source_lang : "en"
};
var dict = new Dictionary(config);


  app.get('/particular/:word/:type',async function(req,res){
    if(req.params.type=='definition'){
      var dic=await dict.definitions(req.params.word);
      res.json(dic)
    }
    if(req.params.type=='synonym'){
      var dic=await dict.synonyms(req.params.word);
      res.json(dic)
    }
    if(req.params.type=='antonym'){
      var dic=await dict.antonyms(req.params.word);
      res.json(dic)
    }
    if(req.params.type=='example'){
      var dic=await dict.examples(req.params.word);
      res.json(dic)
    }
  })
  
  app.get('/all/:word',async function(req, res) {
    var definition  = await dict.definitions(req.params.word);
    var antonym     = await dict.antonyms(req.params.word);
    var synonym     = await dict.synonyms(req.params.word);
    var example     = await dict.examples(req.params.word);
    var obj={
        defintion: definition.results,
        antonyms : antonym.results,
        synonyms : synonym.results,
        example  : example.results
    }
    res.json(obj);
  })

  app.get('/word/of/the/day',async function(req, res) {
    var obj={
        "discriminating":"showing or indicating careful judgment and discernment",
        "superb"	    : "surpassingly good",
        "compunction"	: "a feeling of deep regret, usually for some misdeed",
        "ashen"	        : "pale from illness or emotion",
        "prevail"	    : "be larger in number, quantity, power, status or importance",
        "ellipsis"      : "omission or suppression of parts of words or sentences",
        "pharisaical"	: "excessively or hypocritically pious",
        "cohere"	    : "cause to form a united, orderly, and consistent whole",
        "opulence"	    : "wealth as evidenced by sumptuous living",
        "conserve"	    : "keep in safety and protect from harm, loss, or destruction",
        "quadrennium"	: "a period of four years",
        "privy"	        : "informed about something secret or not generally known",
        "conifer"	    : "a type of tree or shrub bearing cones",
        "specify"	    : "be particular about",
        "icon"	        : "a visual representation produced on a surface",
        "forecast"	    : "a prediction about how something will develop",
        "intervening"	: "occurring or falling between events or points in time",
        "import"	    : "bring in from abroad",
        "reduce"	    : "make smaller",
        "taint"	        : "place under suspicion or cast doubt upon",
        "inventory"	    : "a detailed list of all the items in stock",
        "contrived"	    : "showing effects of planning or manipulation",
        "laud"	        : "praise, glorify, or honor",
        "tensile"	    : "of or relating to physical stress or strain",
        "embark"	    : "go on board",
        "vagary"	    : "an unexpected and inexplicable change in something",
        "fanciful"	    : "indulging in or influenced by the imagination",
        "feral"	        : "wild and menacing",
        "scour"	        : "rub hard or scrub",
        "exodus"	    : "a journey by a group to escape from a hostile environment",
        "expurgate"	    : "edit by omitting or modifying parts considered indelicate",
        "reassure"	    : "cause to feel confident",
        "appurtenance"	: "equipment consisting of miscellaneous articles",
        "thereby"	    : "by that means or because of that",
        "lackluster"	: "lacking brilliance or vitality",
        "astral"	    : "being or relating to or resembling or emanating from stars",
        "gather"	    : "assemble or get together",
        "chastise"	    : "censure severely",
        "predecessor"	: "one who precedes you in time",
        "lethal"	    : "of an instrument of certain death"
        }
    // Random Key
    var random=Math.floor(Math.random()*Object.keys(obj).length)
    res.json(Object.keys(obj)[random]+":"+obj[Object.keys(obj)[random]])
})

