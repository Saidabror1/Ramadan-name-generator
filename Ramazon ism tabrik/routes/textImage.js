const { Router } = require('express')
var Jimp = require('jimp');

const router = Router()

router.get('/', (req, res)=>{
  try {
    res.render('index')
  } catch (err) {
    console.log(err)
  }

})

router.post('/', async (req, res)=>{
  try {
    let imgRaw = 'public/raw/ramadan.jpg';

    let imgActive = 'public/active/ramadan.jpg';
    let imgExported = `public/export/image.jpg`;

    let textData = {
      text: `${req.body.name}`.toUpperCase(),
      maxWidth: 606,
      maxHeight: 400,
      placementX: 10,
      placementY: 330
    };

    const clone = await Jimp.read(imgRaw)
    await clone.clone().write(imgActive)

    const active = await Jimp.read(imgActive)
    
    const font = await Jimp.loadFont('./public/fonts/aAwalRamadhan.ttf.fnt')

    const image = await active.print(font, textData.placementX, textData.placementY, {
      text: textData.text,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    }, textData.maxWidth)

    await image.quality(100).write(imgExported)

    res.redirect('/success')
  } catch (err) {
    console.log(err)
  }
})

router.get('/success', (req, res)=>{
  try {
    res.render('success')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router