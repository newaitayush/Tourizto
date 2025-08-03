/**
 * Local Indore attraction images with proper attribution
 *
 * This file contains paths to local images of Indore attractions
 * along with proper attribution information.
 */

// Use public folder images
const rajwadaImg = '/images/RajwadaPalace.jpg';
const lalbaghImg = '/images/Lal-Bagh-Palace.jpg';
const krishnapuraImg = '/images/krishnapurachhatri.jpg';
const centralMuseumImg = '/images/Central-Museum.jpg';
const gandhiHallImg = '/images/Gandhi-Hall.jpg';
const annapurnaImg = '/images/Annapurna-Temple.jpg';
const kanchMandirImg = '/images/KanchMandir.jpg';
const gomatgiriImg = '/images/Gomatgiri.jpg';
const sarafaImg = '/images/sarafa.jpg';
const chappanDukanImg = '/images/ChappanDukan.jpg';
const patalpaniImg = '/images/PatalpaniWaterfalls.jpg';
const tinchaImg = '/images/Tincha.jpg';
const ralamandalImg = '/images/Ralamandalwildlifesanctuary.jpg';
const badaGanpatiImg = '/images/BadaGanpati.jpg';
const pipliyapalaImg = '/images/PipliyapalaRegionalPark.jpg';
const crescentWaterParkImg = '/images/CrescentWaterPark.jpg';
const janapavHillImg = '/images/JanapavHill.jpg';
const kamlaNehruZooImg = '/images/KamlaNehruPraniSangrahalay.jpg';
const mayankWaterfallImg = '/images/MayankWaterfall.jpg';
const safariParkImg = '/images/SafariPark.jpg';
const shellCityParkImg = '/images/ShellCityPark.jpg';
const ranjeetHanumanImg = '/images/RanjeetHanuman.jpg';
const khajranaGaneshTempleImg = '/images/KhajranaGaneshTemple.jpg';

const imageData = {
  // Historical places
  rajwadaPalace: {
    main: rajwadaImg,
    gallery: [rajwadaImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Rajwada Palace - Historical 7-story palace in Indore'
  },
  lalbaghPalace: {
    main: lalbaghImg,
    gallery: [lalbaghImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Lal Bagh Palace - European style palace with Italian marble'
  },
  krishnapuraChhatris: {
    main: krishnapuraImg,
    gallery: [krishnapuraImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Krishnapura Chhatris - Cenotaphs of the Holkar rulers'
  },
  centralMuseum: {
    main: centralMuseumImg,
    gallery: [centralMuseumImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Central Museum - Historical artifacts and exhibits in Indore'
  },
  gandhiHall: {
    main: gandhiHallImg,
    gallery: [gandhiHallImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Mahatma Gandhi Hall - Indo-Gothic building with clock tower in Indore'
  },
  whiteChurch: {
    main: centralMuseumImg, // Using Central Museum as fallback
    gallery: [centralMuseumImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Indore White Church - Colonial-era Protestant church with Gothic architecture'
  },

  // Religious places
  annapurnaTemple: {
    main: annapurnaImg,
    gallery: [annapurnaImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Annapurna Temple - Sacred Hindu temple dedicated to the goddess of food'
  },
  kanchMandir: {
    main: kanchMandirImg,
    gallery: [kanchMandirImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Kanch Mandir - Jain temple made entirely of glass and mirrors'
  },
  gomatgiri: {
    main: gomatgiriImg,
    gallery: [gomatgiriImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Gomatgiri - Jain pilgrimage site with a 21-foot statue of Gomateshwara'
  },

  // Food places
  sarafa: {
    main: sarafaImg,
    gallery: [sarafaImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Sarafa Bazaar - Famous night food market in Indore'
  },
  chappanDukan: {
    main: chappanDukanImg,
    gallery: [chappanDukanImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Chappan Dukan - 56 shops offering various street foods and snacks'
  },

  // Nature places
  patalpani: {
    main: patalpaniImg,
    gallery: [patalpaniImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Patalpani Waterfall - 300-foot waterfall near Indore'
  },
  tincha: {
    main: tinchaImg,
    gallery: [tinchaImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Tincha Falls - Beautiful waterfall surrounded by lush greenery'
  },
  ralamandal: {
    main: ralamandalImg,
    gallery: [ralamandalImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Ralamandal Wildlife Sanctuary - Oldest sanctuary in Madhya Pradesh'
  },

  // Additional places
  badaGanpati: {
    main: badaGanpatiImg,
    gallery: [badaGanpatiImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Bada Ganpati Temple - Home to one of the largest Ganesh idols in the world'
  },
  pipliyapala: {
    main: pipliyapalaImg,
    gallery: [pipliyapalaImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Pipliyapala Regional Park - Beautiful urban park with a large lake'
  },
  crescentWaterPark: {
    main: crescentWaterParkImg,
    gallery: [crescentWaterParkImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Crescent Water Park - Popular water park in Indore'
  },
  janapavHill: {
    main: janapavHillImg,
    gallery: [janapavHillImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Janapav Hill - Sacred hill with panoramic views'
  },
  kamlaNehruZoo: {
    main: kamlaNehruZooImg,
    gallery: [kamlaNehruZooImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Kamla Nehru Prani Sangrahalay - Indore Zoo with various wildlife species'
  },
  mayankWaterfall: {
    main: mayankWaterfallImg,
    gallery: [mayankWaterfallImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Mayank Waterfall - Beautiful waterfall near Indore'
  },
  safariPark: {
    main: safariParkImg,
    gallery: [safariParkImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Safari Park - Wildlife safari experience in Indore'
  },
  shellCityPark: {
    main: shellCityParkImg,
    gallery: [shellCityParkImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Shell City Park - Recreational park in Indore'
  },
  ranjeetHanuman: {
    main: ranjeetHanumanImg,
    gallery: [ranjeetHanumanImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Ranjeet Hanuman Temple - Famous temple in Indore'
  },

  // Additional places with local images
  khajranaGaneshTemple: {
    main: khajranaGaneshTempleImg,
    gallery: [khajranaGaneshTempleImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Khajrana Ganesh Temple - Famous temple dedicated to Lord Ganesha in Indore'
  },
  choralDam: {
    main: pipliyapalaImg, // Using similar image as fallback
    gallery: [pipliyapalaImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Choral Dam - Picturesque dam and reservoir near Indore'
  },
  devguradiaTemple: {
    main: badaGanpatiImg, // Using similar image as fallback
    gallery: [badaGanpatiImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Devguradia Temple - Ancient temple complex on a hilltop in Indore'
  },
  chappanDukaanFoodStreet: {
    main: chappanDukanImg,
    gallery: [chappanDukanImg],
    attribution: 'Photo by Indore Tourism',
    alt: 'Chhappan Dukaan - Famous food street with 56 shops in Indore'
  }
};

export default imageData;
