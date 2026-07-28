const c = require('fs').readFileSync('src/components/communication/ExecutiveCommView.tsx', 'utf8');
let open = false;
let line = 1;
for(let i=0; i<c.length; i++) {
  if (c[i] === '\n') line++;
  if (c[i] === '`') {
    open = !open;
    console.log('backtick on line ' + line + ' (open: ' + open + ')');
  }
}
if (open) console.log('ERROR: Unterminated template literal!');
