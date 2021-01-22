const fs = require('fs');
const borderJson = require('./border.json');

function reverse (c) {
    c[0] = Number(Number(c[0] - 180).toFixed(4));
    c[1] = -c[1];
}

borderJson.features.forEach(f => {
    f.properties = {};
    if (f.type === "Polygon") {
        f.geometry.coordinates[0].forEach(reverse);
    }
    if (f.type === "MultiPolygon") {
        f.geometry.coordinates.forEach(a => a[0].forEach(reversed));
    }
});

fs.writeFile('reversed.json', JSON.stringify(borderJson, null, 4), function (err) {
  if (err) return console.log(err);
  console.log('Wrote reversed.json');
});