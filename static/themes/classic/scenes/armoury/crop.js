
const PNGCrop = require('png-crop');

const config = [
    {width: 78, height: 158, top: 1, left: 1},
    {width: 78, height: 158, top: 1, left: 81},
    {width: 78, height: 158, top: 1, left: 161},
    {width: 78, height: 158, top: 1, left: 241},
    {width: 78, height: 158, top: 1, left: 321},
    {width: 78, height: 158, top: 1, left: 401},
    {width: 78, height: 158, top: 1, left: 561},
    {width: 78, height: 158, top: 161, left: 1},
    {width: 78, height: 158, top: 161, left: 81},
    {width: 78, height: 158, top: 161, left: 161},
    {width: 78, height: 158, top: 161, left: 241},
    {width: 78, height: 158, top: 161, left: 321},
    {width: 78, height: 158, top: 161, left: 401},
    {width: 78, height: 158, top: 161, left: 561},
    {width: 78, height: 158, top: 321, left: 1},
    {width: 78, height: 158, top: 321, left: 81},
    {width: 78, height: 158, top: 321, left: 161},
    {width: 78, height: 158, top: 321, left: 241},
    {width: 78, height: 158, top: 321, left: 321},
    {width: 78, height: 158, top: 321, left: 401},
    {width: 78, height: 158, top: 321, left: 561}
];

for(let i=0;i < config.length; i++)  {
    PNGCrop.crop('TROOP1.BMP.ARMITEMS.256.PNG', 'walk_' + i + '.png', config[i], function(err) {
        if (err) throw err;
        console.log('done!');
      });
}

