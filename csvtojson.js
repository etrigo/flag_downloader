const csv = require('csvtojson');
const fileWriter = require('./fileWriter.js')

// let input = 'countryFlags.csv'
// let output = './countryFlags.json'


const csvToJson = (input, output) => {
  return new Promise(async (resolve, reject) => {
    const data = { converted: false }
    const object = {}
    await csv()
    .fromFile('./countryFlags.csv')
    .then((jsonObj) => {
      // console.log(jsonObj)
      object.countries = jsonObj
    })

    
    // let json = csvToJson.getJsonFromCsv(input);
    // for (let i = 0; i < json.length; i++) {
    //   object.cases.push(json[i]);
    // }
    // console.log(object.cases[0])
    // console.log(object.cases.length)

    // console.log(object)

    await fileWriter(object, 'countryFlags.json', 'countryFlags_temp.json', 'countryFlags_backup.json').then(() => {
      console.log("input written")
    }).catch(e => {
      reject(e)
    })

    // csvToJson.generateJsonFileFromCsv(json, output);
    data.converted = true
    if (data.converted) {
      resolve(true)
    } else {
      reject(false)
    }
  })
}
csvToJson()