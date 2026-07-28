const fs = require('fs');
let c = fs.readFileSync('src/components/career/CareerPlannerView.tsx', 'utf8');
c = c.replace(/\\`/g, '`');
c = c.replace(/\\\${/g, '${');
fs.writeFileSync('src/components/career/CareerPlannerView.tsx', c);
