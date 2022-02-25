const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const router = require('./app_server/routes/index')
const hbs = require("handlebars")
const res = require('express/lib/response')
//const { options } = require('./app_server/routes/index')

app.use('/', router)



// parse application/x-www-form-urlencoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())



// parse application/json
app.use(bodyParser.json())


app.engine('hbs', exphbs.engine({
    defaultLayout:'main',
    extname:'.hbs',
    helpers:{
        error404(){
            function getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
            }
            var randomGrid = parseInt(getRandomArbitrary(20, 50))
            //console.log(randomGrid);
            var fourOhFours=""
            for(i=0;i<randomGrid;i++){
                var still = 0;
                var rotate = 1;
                var shrink = 2;
                var dynamicDiv = parseInt(getRandomArbitrary(0,3))
                if(still==dynamicDiv){
                    fourOhFours+="<div class='still'>404</div>"
                }else if(rotate==dynamicDiv){
                    fourOhFours+="<div class = 'rotate'>404</div>"
                }
                else{
                    fourOhFours+="<div class='shrink'>404</div>"
                }
                
            }
            return new hbs.SafeString(fourOhFours)
    },buildTable(gridSize){
    },tableBuilder(gridSize){
        console.log("inside the helpy");
            
            var mytable=""
            //console.log("Selected :"+gridSize)
            mytable+="<table style='width:100%; height:50%;'><tbody>";
            for (var i=0; i<gridSize; i++){
                mytable+="<tr>";
                //console.log("table row");
                for(var o=0;o<gridSize; o++){
                    var color = ((1<<24)*Math.random()|0).toString(16);
                    //console.log("table data");
                    mytable+="<td style='background-color:#"+color+"'>"+color+"<br/><span style='color:#fff;'>"+color+"</span></td>";
                }
                mytable+= "</tr>";
            }
            mytable+="</tbody></table>";
            console.log(mytable);
            return new hbs.SafeString(mytable)
        }
    }
}))
app.set('view engine', 'hbs')

app.use(function(req,res){
    res.status(404).render('badPage.hbs');
});


app.listen(3000, ()=>{
    console.log("Connected on  Port 3000")
})