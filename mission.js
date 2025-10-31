// // mission.js
 const missions = require('./mission.json');

// missions.forEach(m => {
//   console.log(`🚀 ${m.name} (${m.year}) by ${m.agency} et sont objectif : ${m.objectif}`);
// });




  //  filter dyal mission  b ajonce nasa
const esaMissions = missions.filter(m => m.agency.includes('ESA'));

console.log("🚀 Missions de la NASA:");
nasaMissions.forEach(m => console.log(`- ${m.name} (${m.year})`));





