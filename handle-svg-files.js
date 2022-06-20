const fs = require('fs');
const { parse, stringify } = require('svgson');

const paths = [];
const fileLength = fs.readdirSync('./svg').length;
let index = 0;

function getExtension(filename) {
  return filename.split('.').pop();
}

fs.readdirSync('./svg').forEach((fileName) => {
  index++;
  const fileType = getExtension(fileName);

  if (fileType !== 'svg') {
    return;
  }

  const contents = fs.readFileSync(`./svg/${fileName}`, 'utf-8');

  parse(contents, {
    svgo: false,
  }).then((result) => {
    paths.push({ ...result, title: fileName.split('.')[0] });
    if (index === fileLength) {
      const content = JSON.stringify(paths);
      setTimeout(() => {
        fs.writeFileSync('./svgs.json', content, 'utf8');
      });
    }
  });
});
