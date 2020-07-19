const fs = require('fs');

// 1. Backup av senaste körning
// 2. Skriv scrapad data i tempfil
// 3. Skriv över tempfil till ordinarie fil
// 4. Backup av ordinarie fil (igen)

module.exports = (data, origin, temp, backup) => {
  return new Promise((resolve, reject) => {
    // fs.copyFileSync(origin, backup, (err) => {
    //   if (err) reject(false);
    //   console.log('source was copied to destination');
    // })
    
    fs.writeFileSync(temp, JSON.stringify(data, null, "\t"), function (err) {
      if (err) reject(false);
      console.log("file writen")
    })
  
    fs.copyFileSync(temp, origin, (err) => {
      if (err) reject(false);
      console.log('Rename complete!');
    });
  
    fs.copyFileSync(origin, backup, (err) => {
      if (err) reject(false);
      console.log('source was copied to destination');
    })
    resolve(true)
  })
}