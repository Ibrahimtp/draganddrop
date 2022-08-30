var express = require('express');
var router = express.Router();
let axios = require('axios') ;

/* GET users listing. */
router.get('/', function(req, res) {

  let  isLoggedIn = req.session.userid ;
  let  surat =  req.query.surat ;
  let suratIndex = surat.split(' ')[0] ;
  let  startFrom =( req.query.from -1 );
  let endAt = (req.query.end -1) ;
  let variant = req.query.variant ;
  let personalizedVerses = [] ;
  let selectedSuratInfo = {id:0,
    name: '',
    transliteration: '',
    translation: '',
    type: '',
    total_verses: 6}

  console.log('end@ '+ variant)

  if(endAt) {

    axios(`https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/en/${suratIndex}.json`).then((surat)=>{
      let wholeSurat = surat.data;

      for (let i = Number(startFrom);i <= Number(endAt) ;i++) {
        personalizedVerses.push(wholeSurat.verses[i])
      }

      selectedSuratInfo.id = wholeSurat.id ;
      selectedSuratInfo.name = wholeSurat.name ;
      selectedSuratInfo.transliteration = wholeSurat.transliteration ;
      selectedSuratInfo.translation = wholeSurat.transliteration ;
      selectedSuratInfo.type = wholeSurat.type ;
      selectedSuratInfo.total_verses = wholeSurat.total_verses ;
      selectedSuratInfo.variant = variant ;
      selectedSuratInfo.from = startFrom ;
      selectedSuratInfo.end = endAt ;
      
      console.log(personalizedVerses)
      console.log(selectedSuratInfo)

     res.render('personalized',{accessWebsite:'Sign Out',href:'signout',neededVerseRange:personalizedVerses,suratInfo:selectedSuratInfo})
    // console.log(wholeSurat)


    // res.send('jfj')
    
    }).catch((e)=>{
      res.send(e)
    })
   
  }

  else {

    if(isLoggedIn) {
      res.render('configure',{configureMessage:true,accessWebsite: 'Sign Out',href:'signout'})
        return
    }
  
    else {
      res.render('configure',{configureMessage:true,accessWebsite: 'Sign In',href:'signin'})
    }
  



  }
 
});

module.exports = router; 





