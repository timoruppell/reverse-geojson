const fs = require('fs');
const borderJson = require('./border.json');

borderJson.features.forEach(f => {
    f.properties = {};
    f.geometry.coordinates[0].forEach(c => {
        c[0] = Number(Number(c[0] - 180).toFixed(4));
        c[1] = -c[1];
    });
});

fs.writeFile('reversed.json', JSON.stringify(borderJson, null, 4), function (err) {
  if (err) return console.log(err);
  console.log('Wrote reversed.json');
});