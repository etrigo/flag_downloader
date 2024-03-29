const fs = require('fs');
const download = require('download');

const getFlags = async () => {
  // return new Promise(async (resolve, reject) => {
  const data = JSON.parse(fs.readFileSync('./countryFlags.json'))
  // console.log(data);
  for (country in data.countries) {
    let flags = [
      {
        url: data.countries[country].flag,
        filename: `${data.countries[country].tag.toLowerCase()}_flag.png`,
        filetag: 'flag'
      },
      {
        url: data.countries[country].flag_square,
        filename: `${data.countries[country].tag.toLowerCase()}_flag_square.png`,
        filetag: 'flag_square'
      },
      {
        url: data.countries[country].flag_round,
        filename: `${data.countries[country].tag.toLowerCase()}_flag_round.png`,
        filetag: 'flag_round'
      }
    ]
    for (flag in flags) {
      // console.log(flags[flag].filetag);
      if (flags[flag].filetag == 'flag') {
        await (async () => {
          fs.writeFileSync(`./img/flags/${flags[flag].filename}`, await download(flags[flag].url));
          data.written = true
        })();
      } else if (flags[flag].filetag == 'flag_round') {
        await (async () => {
          fs.writeFileSync(`./img/flags_round/${flags[flag].filename}`, await download(flags[flag].url));
          data.written = true
        })();
      } else if (flags[flag].filetag == 'flag_square') {
        await (async () => {
          fs.writeFileSync(`./img/flags_square/${flags[flag].filename}`, await download(flags[flag].url));
          data.written = true
        })();
      }
    }
  }

  // const data = {written: false}
  // await (async () => {
  //   fs.writeFileSync('./img/flags/WHO-COVID-19-global-data.csv', await download('https://covid19.who.int/WHO-COVID-19-global-data.csv'));
  //   data.written = true
  // })();
  // if (data.written) {
  //   resolve(true)
  // } else {
  //   reject(false)
  // }
  // })
}

getFlags()