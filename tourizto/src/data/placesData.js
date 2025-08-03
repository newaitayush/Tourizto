// Import image data
import imageData from './imageData';

// Placeholder images for places without authentic images yet
const placeholderHistorical = '/images/placeholder-historical.jpg';
const placeholderNature = '/images/placeholder-nature.jpg';
const placeholderFood = '/images/placeholder-food.jpg';
const placeholderReligious = '/images/placeholder-religious.jpg';

// Comprehensive list of Indore tourism places
const placesData = [
  // Original places
  {
    id: 1,
    name: "Rajwada Palace",
    description: "A historical 7-story palace from the Holkar dynasty, featuring a blend of Maratha and Mughal architecture.",
    longDescription: "Rajwada is a historical palace in Indore city. It was built by the Holkars of the Maratha Empire about two centuries ago. This seven-storied structure is located near the Chhatris and serves as a fine example of royal grandeur and architectural skills. The structure comprises two parts, the first one situated in the heart of the city and the second one standing in the old palace area. The new palace is a structure built with stone, featuring splendid domes and balconies.",
    price: 50,
    image: imageData.rajwadaPalace.main,
    imageData: imageData.rajwadaPalace,
    category: "historical",
    bestTime: "October to March",
    timeRequired: "1-2 hours",
    openingHours: "10:00 AM - 5:00 PM (Closed on Mondays)",
    howToReach: "Located in the heart of Indore city, Rajwada is easily accessible by auto-rickshaws, taxis, and local buses from any part of the city.",
    nearbyPlaces: ["Krishnapura Chhatris", "Kanch Mandir", "Sarafa Bazaar"],
    travelTips: [
      "Visit early morning to avoid crowds",
      "Photography is allowed but there might be a separate fee",
      "Wear comfortable footwear as there's a lot of walking",
      "Guided tours are available and recommended for historical insights"
    ],
    photoSpots: ["Main entrance gate", "Central courtyard", "Upper floors with city views"]
  },
  {
    id: 2,
    name: "Sarafa Bazaar",
    description: "Famous night food street that comes alive after 8 PM with delicious street food options.",
    longDescription: "Sarafa Bazaar is Indore's famous night food street that transforms from a jewelry market during the day to a bustling food paradise at night. This 300-year-old market is a must-visit for food lovers, offering a wide variety of local delicacies like Bhutte Ka Kees, Garadu, Poha, Jalebi, and much more. The market starts coming alive after 8 PM and stays open until 2 AM, making it a perfect place for late-night food cravings.",
    price: 0,
    image: imageData.sarafa.main,
    category: "food",
    bestTime: "8:00 PM - 12:00 AM",
    timeRequired: "2-3 hours",
    openingHours: "8:00 PM - 2:00 AM",
    howToReach: "Located in the old city area, near Rajwada Palace. Auto-rickshaws and taxis are readily available.",
    nearbyPlaces: ["Rajwada Palace", "Krishnapura Chhatris", "Khajuri Bazaar"],
    travelTips: [
      "Visit after 9 PM for the full experience",
      "Carry cash as most vendors don't accept cards",
      "Try the famous Indori Poha and Jalebi combination",
      "Be prepared for crowds, especially on weekends"
    ],
    photoSpots: ["Food stalls with colorful displays", "Street vendors in action", "Illuminated market area"]
  },
  {
    id: 3,
    name: "Patalpani Waterfall",
    description: "A beautiful 300-foot waterfall located 35km from Indore, perfect for nature lovers.",
    longDescription: "Patalpani Waterfall is a spectacular natural attraction located about 35 km from Indore city. The waterfall drops from a height of about 300 feet, creating a mesmerizing view especially during the monsoon season. The name 'Patalpani' comes from the belief that the depth of the water basin is so deep that it reaches 'Patal' (the underworld). Surrounded by lush greenery and hills, it's a perfect spot for nature lovers and photographers.",
    price: 0,
    image: imageData.patalpani.main,
    category: "nature",
    bestTime: "July to October (Monsoon season)",
    timeRequired: "3-4 hours",
    openingHours: "Open 24 hours (Best visited during daylight)",
    howToReach: "Located 35 km from Indore. You can hire a taxi or take a local train to Patalpani Railway Station and then walk to the waterfall.",
    nearbyPlaces: ["Kalakund", "Tincha Falls", "Mhow"],
    travelTips: [
      "Visit during monsoon for the best view, but be cautious as paths can be slippery",
      "Wear comfortable shoes suitable for trekking",
      "Carry water and snacks as there are limited facilities",
      "Swimming is not recommended due to strong currents"
    ],
    photoSpots: ["Viewing point at the top", "Railway bridge near the falls", "Surrounding forest area"]
  },
  {
    id: 4,
    name: "Lal Bagh Palace",
    description: "A magnificent palace built by the Holkar dynasty with European architectural style and beautiful gardens.",
    longDescription: "Lal Bagh Palace is one of the most spectacular buildings in Indore. It stands on the outskirts of the town, towards the southwest. It was built by Maharaja Shivaji Rao Holkar during 1886-1921. Spread over an area of 28 acres, this three-storey building has marked its presence among the historical buildings of Indore. Lal Bagh Palace once hosted many royal receptions and even today reflects the lifestyle and taste of the Holkar Rulers.",
    price: 100,
    image: imageData.lalbaghPalace.main,
    category: "historical",
    bestTime: "October to March",
    timeRequired: "2-3 hours",
    openingHours: "10:00 AM - 5:00 PM (Closed on Mondays)",
    howToReach: "Located about 5 km from the city center. Auto-rickshaws, taxis, and local buses are available.",
    nearbyPlaces: ["Mahatma Gandhi Hall", "Geeta Bhawan", "Kamla Nehru Park"],
    travelTips: [
      "Visit on weekdays to avoid crowds",
      "Photography is allowed but there might be a separate fee",
      "Guided tours are available and recommended",
      "Spend some time in the beautiful gardens surrounding the palace"
    ],
    photoSpots: ["Main entrance with gates", "Grand staircase", "Durbar Hall", "Palace gardens"]
  },
  {
    id: 5,
    name: "Chappan Dukan",
    description: "A popular food street with 56 shops offering a variety of cuisines and street food.",
    longDescription: "Chappan Dukan, literally meaning '56 shops', is a popular food street in Indore. As the name suggests, there are 56 shops selling various food items and delicacies. It's a paradise for food lovers with options ranging from traditional Indian street food to modern cuisines. Some of the must-try items include Johny Hot Dog's famous hot dogs, Vijay Chaat House's dahi vada, and Madhuram's sweets.",
    price: 0,
    image: imageData.chappanDukan.main,
    category: "food",
    bestTime: "Evening hours",
    timeRequired: "1-2 hours",
    openingHours: "11:00 AM - 11:00 PM",
    howToReach: "Located in New Palasia area, easily accessible by auto-rickshaws and taxis from any part of the city.",
    nearbyPlaces: ["Treasure Island Mall", "C21 Mall", "Gomatgiri"],
    travelTips: [
      "Visit in the evening for the best atmosphere",
      "Try the famous Johny Hot Dog",
      "Weekends can be very crowded",
      "Many shops offer seating areas for a comfortable dining experience"
    ],
    photoSpots: ["Food stalls with colorful displays", "Busy street view", "Variety of food items"]
  },
  {
    id: 6,
    name: "Central Museum (Indore Museum)",
    description: "Houses a collection of prehistoric artifacts, sculptures, coins, and manuscripts.",
    longDescription: "The Central Museum of Indore, also known as Indore Museum, is a treasure trove of historical artifacts. Established in 1929, the museum houses a rich collection of prehistoric artifacts, sculptures, coins, manuscripts, and other items of historical importance. The museum is divided into various sections including archaeology, anthropology, and art gallery, providing visitors with insights into the rich cultural heritage of the region.",
    price: 30,
    image: imageData.centralMuseum.main,
    category: "historical",
    bestTime: "Weekday mornings",
    timeRequired: "1-2 hours",
    openingHours: "10:00 AM - 5:00 PM (Closed on Mondays)",
    howToReach: "Located near GPO in the heart of the city, easily accessible by auto-rickshaws and taxis.",
    nearbyPlaces: ["Mahatma Gandhi Hall", "Nehru Park", "White Church"],
    travelTips: [
      "Visit on weekdays to avoid crowds",
      "Photography may be restricted in certain sections",
      "Guided tours are available",
      "Plan your visit in the morning for better lighting to view the exhibits"
    ],
    photoSpots: ["Museum building exterior", "Sculpture gallery", "Coin collection display"]
  },
  {
    id: 7,
    name: "Tincha Falls",
    description: "A scenic waterfall surrounded by lush greenery, perfect for a day trip.",
    longDescription: "Tincha Falls is a beautiful waterfall located about 25 km from Indore. Surrounded by lush greenery and hills, it's a perfect getaway from the hustle and bustle of the city. The waterfall is particularly spectacular during the monsoon season when it's in full flow. The area around the falls is ideal for picnics and nature walks, making it a popular weekend destination for locals and tourists alike.",
    price: 0,
    image: imageData.tincha.main,
    category: "nature",
    bestTime: "July to October (Monsoon season)",
    timeRequired: "3-4 hours",
    openingHours: "Open 24 hours (Best visited during daylight)",
    howToReach: "Located 25 km from Indore. You can hire a taxi or take a local bus to reach there.",
    nearbyPlaces: ["Patalpani Waterfall", "Mhow", "Choral Dam"],
    travelTips: [
      "Visit during monsoon for the best view",
      "Wear comfortable shoes suitable for trekking",
      "Carry water and snacks as there are limited facilities",
      "Be cautious as paths can be slippery during rainy season"
    ],
    photoSpots: ["Waterfall from viewing point", "Surrounding forest area", "Stream below the falls"]
  },
  {
    id: 8,
    name: "Annapurna Temple",
    description: "A beautiful temple dedicated to the goddess of food, featuring intricate architecture.",
    longDescription: "Annapurna Temple is one of the most revered temples in Indore, dedicated to Annapurna, the goddess of food. The temple is known for its beautiful architecture and peaceful atmosphere. The main sanctum houses the idol of Goddess Annapurna, and there are smaller shrines dedicated to other deities as well. The temple is particularly crowded during Navratri and other Hindu festivals when special prayers and ceremonies are conducted.",
    price: 0,
    image: imageData.annapurnaTemple.main,
    category: "religious",
    bestTime: "Early morning or evening",
    timeRequired: "1 hour",
    openingHours: "5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM",
    howToReach: "Located in the heart of the city, easily accessible by auto-rickshaws and taxis.",
    nearbyPlaces: ["Geeta Bhawan", "Kanch Mandir", "Bada Ganpati Temple"],
    travelTips: [
      "Visit during morning aarti for a spiritual experience",
      "Dress modestly as it's a religious place",
      "Remove shoes before entering the temple",
      "Try the prasad (holy food) offered at the temple"
    ],
    photoSpots: ["Temple entrance", "Main shrine", "Intricate carvings on walls"]
  },
  {
    id: 9,
    name: "Kanch Mandir",
    description: "A unique Jain temple made entirely of glass and mirrors with stunning reflective interiors.",
    longDescription: "Kanch Mandir, also known as the Glass Temple, is a unique Jain temple in Indore. Built in the early 20th century by Sir Seth Hukumchand Jain, the temple is famous for its intricate glasswork. The walls, ceilings, floors, and pillars are adorned with glass panels, mirrors, and mosaics, creating a mesmerizing effect. The temple houses idols of Jain Tirthankaras and beautiful paintings depicting scenes from Jain mythology.",
    price: 0,
    image: imageData.kanchMandir.main,
    category: "religious",
    bestTime: "Morning hours",
    timeRequired: "1 hour",
    openingHours: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    howToReach: "Located in the heart of the city, easily accessible by auto-rickshaws and taxis.",
    nearbyPlaces: ["Annapurna Temple", "Bada Ganpati Temple", "Rajwada Palace"],
    travelTips: [
      "Visit during morning hours for better lighting",
      "Photography may be restricted inside",
      "Remove shoes before entering",
      "Dress modestly as it's a religious place"
    ],
    photoSpots: ["Temple entrance", "Glass work on walls and ceilings", "Mirror mosaics"]
  },
  {
    id: 10,
    name: "Krishnapura Chhatris",
    description: "Cenotaphs of the Holkar rulers featuring stunning architecture and intricate stone carvings.",
    longDescription: "Krishnapura Chhatris are cenotaphs or memorials built in honor of the Holkar rulers of Indore. Located near the banks of the Khan River, these structures showcase a blend of Maratha, Mughal, and Rajput architectural styles. The chhatris are built on stone platforms and feature intricate carvings, beautiful domes, and pillars. The site is particularly beautiful during sunset when the structures are bathed in golden light.",
    price: 0,
    image: imageData.krishnapuraChhatris.main,
    category: "historical",
    bestTime: "Late afternoon (for sunset views)",
    timeRequired: "1-2 hours",
    openingHours: "8:00 AM - 6:00 PM",
    howToReach: "Located near Rajwada Palace, easily accessible by auto-rickshaws and taxis.",
    nearbyPlaces: ["Rajwada Palace", "Sarafa Bazaar", "Kanch Mandir"],
    travelTips: [
      "Visit during sunset for beautiful photography",
      "Wear comfortable shoes as there's a lot of walking",
      "Guided tours are available for historical insights",
      "The area is peaceful and good for meditation"
    ],
    photoSpots: ["Chhatris during sunset", "Intricate stone carvings", "Reflections in the nearby water body"]
  },
  {
    id: 11,
    name: "Gomatgiri",
    description: "A sacred Jain pilgrimage site featuring a 21-foot statue of Lord Gomateshwara.",
    longDescription: "Gomatgiri is a sacred Jain pilgrimage site located about 10 km from Indore. The main attraction is a 21-foot statue of Lord Gomateshwara (Bahubali), similar to the famous statue at Shravanabelagola but smaller in size. The site also houses a Jain temple with 24 miniature temples dedicated to the 24 Tirthankaras. Situated on a small hill, Gomatgiri offers panoramic views of the surrounding landscape.",
    price: 0,
    image: imageData.gomatgiri.main,
    category: "religious",
    bestTime: "Morning hours",
    timeRequired: "1-2 hours",
    openingHours: "6:00 AM - 8:00 PM",
    howToReach: "Located about 10 km from the city center. You can hire a taxi or auto-rickshaw to reach there.",
    nearbyPlaces: ["Ralamandal Wildlife Sanctuary", "Choral Dam", "Devguradia Temple"],
    travelTips: [
      "Visit early morning for a peaceful experience",
      "Dress modestly as it's a religious place",
      "Remove shoes before entering the temple area",
      "Carry water as facilities are limited"
    ],
    photoSpots: ["21-foot statue of Lord Gomateshwara", "Panoramic views from the hill", "Miniature temples"]
  },
  {
    id: 12,
    name: "Ralamandal Wildlife Sanctuary",
    description: "A small wildlife sanctuary offering nature trails, bird watching, and glimpses of local wildlife.",
    longDescription: "Ralamandal Wildlife Sanctuary is a small but beautiful wildlife reserve located about 15 km from Indore. Spread over an area of about 5 sq km, the sanctuary is home to various species of birds, deer, peacocks, and other wildlife. The sanctuary offers nature trails, bird watching opportunities, and a peaceful environment away from the city hustle. The highest point in the sanctuary provides panoramic views of the surrounding forests and the Narmada River valley.",
    price: 50,
    image: imageData.ralamandal.main,
    category: "nature",
    bestTime: "October to March",
    timeRequired: "2-3 hours",
    openingHours: "8:00 AM - 5:00 PM",
    howToReach: "Located about 15 km from the city center. You can hire a taxi or take a local bus to reach there.",
    nearbyPlaces: ["Gomatgiri", "Choral Dam", "Patalpani Waterfall"],
    travelTips: [
      "Visit early morning for better chances of wildlife sighting",
      "Wear comfortable shoes suitable for walking",
      "Carry binoculars for bird watching",
      "Maintain silence to not disturb the wildlife"
    ],
    photoSpots: ["Viewing point at the top", "Nature trails", "Bird watching spots"]
  },

  // Additional places
  {
    id: 13,
    name: "Mahatma Gandhi Hall",
    description: "An iconic Indo-Gothic building with a clock tower, formerly known as King Edward Hall.",
    longDescription: "Mahatma Gandhi Hall, formerly known as King Edward Hall, is one of the most iconic buildings in Indore. Built in 1904 during the British era, this Indo-Gothic structure features a beautiful clock tower and impressive architecture. The hall hosts various cultural events, exhibitions, and functions throughout the year. The building also houses a public library and a small museum showcasing the history of Indore.",
    price: 0,
    image: imageData.gandhiHall.main,
    imageData: imageData.gandhiHall,
    category: "historical",
    bestTime: "Any time of the year",
    timeRequired: "1 hour",
    openingHours: "10:00 AM - 6:00 PM (Closed on public holidays)",
    howToReach: "Located in the heart of the city near Regal Square, easily accessible by auto-rickshaws and taxis.",
    nearbyPlaces: ["Central Museum", "Nehru Park", "Treasure Island Mall"],
    travelTips: [
      "Check for any ongoing exhibitions or events",
      "The building is particularly beautiful when illuminated in the evening",
      "Combine your visit with nearby attractions like Central Museum",
      "Photography is allowed in most areas"
    ],
    photoSpots: ["Clock tower", "Main hall", "Front facade with steps"]
  },
  {
    id: 14,
    name: "Bada Ganpati Temple",
    description: "Home to one of the largest Ganesh idols in the world, standing at 25 feet.",
    longDescription: "Bada Ganpati Temple is one of the most revered religious sites in Indore, famous for housing one of the largest Ganesh idols in the world. The idol stands at an impressive height of 25 feet and was built in 1875. The temple attracts thousands of devotees, especially during Ganesh Chaturthi festival. The temple architecture is simple yet elegant, with a peaceful atmosphere that invites meditation and prayer.",
    price: 0,
    image: imageData.badaGanpati.main,
    imageData: imageData.badaGanpati,
    category: "religious",
    bestTime: "Early morning or during Ganesh Chaturthi",
    timeRequired: "30-45 minutes",
    openingHours: "5:00 AM - 11:00 PM",
    howToReach: "Located in the heart of the city, easily accessible by auto-rickshaws and taxis.",
    nearbyPlaces: ["Annapurna Temple", "Kanch Mandir", "Rajwada Palace"],
    travelTips: [
      "Visit early morning to avoid crowds",
      "Dress modestly as it's a religious place",
      "Remove shoes before entering",
      "Try to visit during aarti (prayer) time for a spiritual experience"
    ],
    photoSpots: ["Main Ganesh idol", "Temple entrance", "Prayer hall"]
  },
  {
    id: 15,
    name: "Khajrana Ganesh Temple",
    description: "A 288-year-old temple dedicated to Lord Ganesha, built by Rani Ahilyabai Holkar.",
    longDescription: "Khajrana Ganesh Temple is one of the most famous temples in Indore, dedicated to Lord Ganesha. Built in 1735 by Rani Ahilyabai Holkar, the temple houses a powerful idol of Lord Ganesha that is believed to fulfill the wishes of devotees. The temple sees a huge influx of visitors during Ganesh Chaturthi and Wednesdays, which are considered auspicious for Lord Ganesha. The temple complex has been renovated and expanded over the years while maintaining its spiritual essence.",
    price: 0,
    image: imageData.khajranaGaneshTemple.main,
    imageData: imageData.khajranaGaneshTemple,
    category: "religious",
    bestTime: "Early morning or during festivals",
    timeRequired: "1 hour",
    openingHours: "5:00 AM - 11:00 PM",
    howToReach: "Located in the Khajrana area, about 6 km from the city center. Auto-rickshaws and taxis are readily available.",
    nearbyPlaces: ["Meghdoot Garden", "Regional Park", "Pipliyapala Regional Park"],
    travelTips: [
      "Wednesdays are particularly crowded",
      "Early morning visits are recommended for a peaceful experience",
      "Dress modestly and remove shoes before entering",
      "Try the prasad (holy food) offered at the temple"
    ],
    photoSpots: ["Main shrine", "Temple dome", "Decorated entrance"]
  },
  {
    id: 16,
    name: "Pipliyapala Regional Park",
    description: "A beautiful urban park with a large lake, musical fountain, and boat rides.",
    longDescription: "Pipliyapala Regional Park is a beautiful urban park spread over 122 acres in Indore. The park features a large lake, musical fountain, boat rides, and well-maintained gardens. It's a perfect place for family outings, morning walks, and evening relaxation. The park also has a food court, children's play area, and an interpretation center showcasing the biodiversity of the region. The musical fountain show in the evening is a major attraction for visitors.",
    price: 30,
    image: imageData.pipliyapala.main,
    imageData: imageData.pipliyapala,
    category: "nature",
    bestTime: "Evening hours",
    timeRequired: "2-3 hours",
    openingHours: "6:00 AM - 8:00 PM",
    howToReach: "Located about 8 km from the city center on AB Road. Auto-rickshaws and taxis are available.",
    nearbyPlaces: ["Meghdoot Garden", "Khajrana Ganesh Temple", "Regional Park"],
    travelTips: [
      "Visit in the evening to enjoy the musical fountain show",
      "Boat rides are available at an additional cost",
      "Weekends can be crowded",
      "Carry water and snacks, though there are food stalls inside"
    ],
    photoSpots: ["Lake view", "Musical fountain", "Garden areas", "Sunset over the lake"]
  },
  {
    id: 17,
    name: "Choral Dam",
    description: "A picturesque dam and reservoir surrounded by hills, ideal for picnics and water sports.",
    longDescription: "Choral Dam is a scenic spot located about 25 km from Indore. Built on the Choral River, the dam and its reservoir are surrounded by hills and forests, creating a picturesque landscape. It's a popular weekend getaway for locals and tourists alike, offering activities like boating, water sports, and picnicking. The area around the dam is also good for short treks and nature walks, with several viewpoints offering panoramic vistas of the reservoir and surrounding hills.",
    price: 20,
    image: imageData.choralDam.main,
    imageData: imageData.choralDam,
    category: "nature",
    bestTime: "Monsoon and winter seasons",
    timeRequired: "Half day",
    openingHours: "8:00 AM - 6:00 PM",
    howToReach: "Located about 25 km from Indore. Hiring a taxi is the best option as public transport is limited.",
    nearbyPlaces: ["Patalpani Waterfall", "Tincha Falls", "Mhow"],
    travelTips: [
      "Visit during monsoon when the reservoir is full",
      "Carry food and water as facilities are limited",
      "Wear comfortable clothing and footwear",
      "Swimming is not recommended without proper safety measures"
    ],
    photoSpots: ["Dam viewpoint", "Reservoir panorama", "Surrounding hills", "Sunset over the water"]
  },
  {
    id: 18,
    name: "Indore White Church",
    description: "A beautiful colonial-era Protestant church with Gothic architecture and stained glass windows.",
    longDescription: "The Indore White Church, officially known as St. Ann's Church, is a beautiful Protestant church built during the colonial era. The church features Gothic architecture with pointed arches, ribbed vaults, and flying buttresses. The interior is adorned with beautiful stained glass windows depicting biblical scenes, and the peaceful atmosphere makes it a perfect place for reflection and prayer. The church is still active and holds regular services.",
    price: 0,
    image: imageData.centralMuseum.main, // Using another historical building image as a temporary substitute
    imageData: imageData.whiteChurch,
    category: "historical",
    bestTime: "Any time of the year",
    timeRequired: "30-45 minutes",
    openingHours: "7:00 AM - 7:00 PM (Closed during service times)",
    howToReach: "Located near GPO in the heart of the city, easily accessible by auto-rickshaws and taxis.",
    nearbyPlaces: ["Central Museum", "Mahatma Gandhi Hall", "Nehru Park"],
    travelTips: [
      "Respect the sanctity of the place",
      "Dress modestly",
      "Photography may be restricted during services",
      "Check service timings to avoid visiting during prayer times"
    ],
    photoSpots: ["Church facade", "Stained glass windows", "Interior architecture"]
  },
  {
    id: 19,
    name: "Devguradia Temple",
    description: "An ancient temple complex on a hilltop offering panoramic views of Indore city.",
    longDescription: "Devguradia Temple is an ancient temple complex located on a hilltop about 7 km from Indore city. The temple is dedicated to Lord Shiva and is believed to be over 300 years old. The complex houses several smaller shrines and offers panoramic views of Indore city and the surrounding landscape. The temple is particularly crowded during Mahashivratri festival when thousands of devotees climb the hill to offer prayers. The peaceful atmosphere and natural beauty make it a perfect place for spiritual seekers and nature lovers alike.",
    price: 0,
    image: imageData.devguradiaTemple.main,
    imageData: imageData.devguradiaTemple,
    category: "religious",
    bestTime: "Early morning or during Mahashivratri",
    timeRequired: "1-2 hours",
    openingHours: "6:00 AM - 8:00 PM",
    howToReach: "Located about 7 km from the city center. Auto-rickshaws and taxis are available, though the last part involves climbing steps.",
    nearbyPlaces: ["Gomatgiri", "Ralamandal Wildlife Sanctuary", "Choral Dam"],
    travelTips: [
      "Wear comfortable shoes as there are many steps to climb",
      "Visit early morning for a peaceful experience and better views",
      "Carry water as facilities are limited",
      "Dress modestly as it's a religious place"
    ],
    photoSpots: ["Temple complex", "City views from the top", "Sunrise/sunset panoramas"]
  },
  {
    id: 20,
    name: "Chhappan Dukaan Food Street",
    description: "A vibrant food street with 56 shops offering a variety of cuisines and street food.",
    longDescription: "Chhappan Dukaan (meaning 56 shops) is one of Indore's most famous food streets, located in New Palasia. As the name suggests, it originally had 56 shops offering a variety of food items, though the number has grown over the years. The street is a paradise for food lovers, offering everything from traditional Indori street food like poha-jalebi and kachori to modern cuisines. Some of the must-try items include Johny Hot Dog's famous hot dogs, Vijay Chaat House's dahi vada, and Madhuram's sweets. The street comes alive in the evenings with locals and tourists enjoying the culinary delights.",
    price: 0,
    image: imageData.chappanDukaanFoodStreet.main,
    imageData: imageData.chappanDukaanFoodStreet,
    category: "food",
    bestTime: "Evening hours",
    timeRequired: "1-2 hours",
    openingHours: "11:00 AM - 11:00 PM",
    howToReach: "Located in New Palasia area, easily accessible by auto-rickshaws and taxis from any part of the city.",
    nearbyPlaces: ["Treasure Island Mall", "C21 Mall", "Regional Park"],
    travelTips: [
      "Visit in the evening for the best atmosphere",
      "Try the famous Johny Hot Dog",
      "Weekends can be very crowded",
      "Many shops offer seating areas for a comfortable dining experience"
    ],
    photoSpots: ["Food stalls with colorful displays", "Busy street view", "Variety of food items"]
  }
];

export default placesData;
