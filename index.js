const express = require('express')
const app = express()
const port = 3000
const sharp = require('sharp')

var imgPath = "img/cocukadam.jpg";

app.get('/img/:width/:height', (req, res) => {
    sharp(imgPath)
        .rotate()
        .resize(parseInt(req.params.width), parseInt(req.params.height))
        .png()
        .toBuffer()
        .then(data => {
            var img = Buffer.from(data, 'base64');
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': img.length
            });

            res.end(img);
        })
        .catch(err => { res.send(err) });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))