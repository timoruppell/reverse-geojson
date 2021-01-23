const fs = require('fs');
const borderJson = require('./russia-border.json');
// const borderJson = require('./antarctica-border.json');
// const borderJson = require('./china-border.json');
// const borderJson = require('./finland-border.json');
// const borderJson = require('./countries.json');

function reverse (c) {
    c[0] = c[0] - 180;
    c[1] = -c[1];
}

borderJson.features.forEach(f => {
    f.properties = {};
    if (f.geometry.type === "Polygon") {
        f.geometry.coordinates[0].forEach(reverse);
    }
    if (f.geometry.type === "MultiPolygon") {
        f.geometry.coordinates.forEach(a => a[0].forEach(reverse));
    }
});

fs.writeFile('russia-reversed.json', JSON.stringify(borderJson, null, 4), function (err) {
  if (err) return console.log(err);
  console.log('Wrote russia-reversed.json');
});
