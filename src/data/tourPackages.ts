export interface TourPackage {
  id: string;
  name: string;
  image: string;
  duration: string;
  tourType: string;
  features: string[];
  price: number;
  destination: string;
  theme: string[];
  overview: string;
  location: string;
  distance?: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  included: string[];
  excluded: string[];
}

export const tourPackages: TourPackage[] = [
  {
    id: "1",
    name: "Mesmerizing Nainital & Mukteshwar",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    duration: "3N / 4D",
    tourType: "Lake Tour",
    features: ["AC SUV"],
    price: 12499,
    destination: "Nainital",
    theme: ["Adventure", "Family"],
    location: "Uttarakhand, India",
    distance: "5-10 km",
    overview:
      "Experience the serene beauty of Nainital's pristine lakes and Mukteshwar's panoramic mountain views.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Nainital",
        description:
          "Arrive in Nainital and check into your hotel. Evening visit to Mall Road and Naini Lake for boating.",
      },
      {
        day: 2,
        title: "Nainital Sightseeing",
        description:
          "Visit Naina Devi Temple, Snow View Point, and Tiffin Top. Enjoy cable car ride and panoramic views.",
      },
      {
        day: 3,
        title: "Mukteshwar Excursion",
        description:
          "Drive to Mukteshwar and visit Mukteshwar Temple. Explore fruit orchards and enjoy nature walks.",
      },
      {
        day: 4,
        title: "Departure",
        description:
          "After breakfast, check out and depart with beautiful memories.",
      },
    ],
    included: [
      "3 Nights Accommodation",
      "Daily Breakfast & Dinner",
      "AC SUV Transfers",
      "All Sightseeing Tours",
    ],
    excluded: [
      "Lunch",
      "Entry Tickets",
      "Cable Car Tickets",
      "Personal Expenses",
    ],
  },
  {
    id: "2",
    name: "Golden Triangle Tour",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
    duration: "5N / 6D",
    tourType: "Cultural",
    features: ["Guide", "AC Vehicle"],
    price: 24999,
    destination: "Delhi",
    theme: ["Cultural", "Heritage"],
    location: "Delhi-Agra-Jaipur, India",
    overview:
      "Explore India's most iconic monuments including Taj Mahal, Red Fort, and Amber Palace in this classic Golden Triangle tour.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Delhi",
        description: "Airport pickup and check-in. Visit India Gate and Connaught Place in evening.",
      },
      {
        day: 2,
        title: "Delhi Sightseeing",
        description: "Explore Red Fort, Qutub Minar, Humayun's Tomb, and Lotus Temple.",
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description: "Drive to Agra. Visit Taj Mahal at sunset and Agra Fort.",
      },
      {
        day: 4,
        title: "Agra to Jaipur",
        description: "Morning Taj Mahal visit. Drive to Jaipur via Fatehpur Sikri.",
      },
      {
        day: 5,
        title: "Jaipur Sightseeing",
        description: "Visit Amber Fort, City Palace, Hawa Mahal, and Jantar Mantar.",
      },
      {
        day: 6,
        title: "Departure",
        description: "Transfer to Jaipur airport or continue to next destination.",
      },
    ],
    included: ["5 Nights Hotels", "Daily Breakfast", "AC Transfers", "Guide"],
    excluded: ["Lunch & Dinner", "Monument Entry Fees", "Personal Expenses"],
  },
  {
    id: "3",
    name: "Goa Beach Paradise",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    duration: "4N / 5D",
    tourType: "Beach",
    features: ["Beach Resort", "Water Sports"],
    price: 18999,
    destination: "Goa",
    theme: ["Beach", "Adventure"],
    location: "Goa, India",
    overview:
      "Relax on pristine beaches, enjoy water sports, explore Portuguese heritage, and experience Goa's vibrant nightlife.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Goa",
        description: "Airport/station pickup. Check into beach resort. Evening at Calangute Beach.",
      },
      {
        day: 2,
        title: "North Goa Tour",
        description: "Visit Baga, Anjuna, and Vagator beaches. Fort Aguada. Water sports activities.",
      },
      {
        day: 3,
        title: "South Goa Exploration",
        description: "Visit Colva, Palolem beaches. Basilica of Bom Jesus. Spice plantation tour.",
      },
      {
        day: 4,
        title: "Island & Cruise",
        description: "Dudhsagar Falls excursion. Evening sunset cruise on Mandovi River.",
      },
      {
        day: 5,
        title: "Departure",
        description: "Morning free for beach activities. Check out and transfer to airport.",
      },
    ],
    included: ["4 Nights Beach Resort", "Breakfast", "Transfers", "Cruise"],
    excluded: ["Lunch & Dinner", "Water Sports Charges", "Entry Fees"],
  },
  {
    id: "4",
    name: "Kerala Backwaters & Hill Stations",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    duration: "6N / 7D",
    tourType: "Nature",
    features: ["Houseboat", "Hill Resort"],
    price: 32999,
    destination: "Kochi",
    theme: ["Nature", "Relaxation"],
    location: "Kerala, India",
    overview:
      "Experience God's Own Country with serene backwaters, lush tea gardens, and misty hill stations of Munnar.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kochi",
        description: "Explore Fort Kochi, Chinese Fishing Nets, and Mattancherry Palace.",
      },
      {
        day: 2,
        title: "Kochi to Munnar",
        description: "Scenic drive to Munnar. Visit Cheeyappara and Valara waterfalls en route.",
      },
      {
        day: 3,
        title: "Munnar Sightseeing",
        description: "Explore tea gardens, Mattupetty Dam, Echo Point, and Eravikulam National Park.",
      },
      {
        day: 4,
        title: "Munnar to Thekkady",
        description: "Drive to Thekkady. Periyar Wildlife Sanctuary boat ride. Spice plantation visit.",
      },
      {
        day: 5,
        title: "Thekkady to Alleppey",
        description: "Drive to Alleppey. Check into traditional houseboat for backwater cruise.",
      },
      {
        day: 6,
        title: "Alleppey to Kovalam",
        description: "Drive to Kovalam beach. Relax at the beach resort.",
      },
      {
        day: 7,
        title: "Departure",
        description: "Morning at beach. Transfer to Trivandrum airport.",
      },
    ],
    included: ["6 Nights Stay", "Houseboat Stay", "All Meals on Houseboat", "Transfers"],
    excluded: ["Lunch at Hotels", "Entry Fees", "Personal Expenses"],
  },
  {
    id: "5",
    name: "Rajasthan Royal Heritage",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
    duration: "7N / 8D",
    tourType: "Heritage",
    features: ["Heritage Hotels", "Guide"],
    price: 38999,
    destination: "Jaipur",
    theme: ["Heritage", "Cultural"],
    location: "Rajasthan, India",
    overview:
      "Discover the royal grandeur of Rajasthan with magnificent forts, palaces, and desert landscapes.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Jaipur",
        description: "Check into heritage hotel. Evening at Chokhi Dhani for cultural experience.",
      },
      {
        day: 2,
        title: "Jaipur Sightseeing",
        description: "Amber Fort, City Palace, Hawa Mahal, Jantar Mantar, and Jal Mahal.",
      },
      {
        day: 3,
        title: "Jaipur to Pushkar",
        description: "Drive to Pushkar. Visit Brahma Temple and Pushkar Lake. Camel ride.",
      },
      {
        day: 4,
        title: "Pushkar to Jodhpur",
        description: "Drive to Jodhpur. Visit Mehrangarh Fort and Jaswant Thada.",
      },
      {
        day: 5,
        title: "Jodhpur to Jaisalmer",
        description: "Drive to Jaisalmer. Evening at Gadisar Lake.",
      },
      {
        day: 6,
        title: "Jaisalmer Exploration",
        description: "Fort, Havelis, and Desert Safari. Night stay in desert camp.",
      },
      {
        day: 7,
        title: "Jaisalmer to Udaipur",
        description: "Long scenic drive to Udaipur. Evening boat ride on Lake Pichola.",
      },
      {
        day: 8,
        title: "Udaipur & Departure",
        description: "City Palace, Jagdish Temple. Transfer to airport.",
      },
    ],
    included: ["7 Nights Heritage Hotels", "Breakfast", "Transfers", "Desert Safari"],
    excluded: ["Lunch & Dinner", "Entry Fees", "Personal Expenses"],
  },
  {
    id: "6",
    name: "Manali Honeymoon Special",
    image:
      "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80",
    duration: "4N / 5D",
    tourType: "Honeymoon",
    features: ["Romantic", "Adventure"],
    price: 22999,
    destination: "Manali",
    theme: ["Romantic", "Adventure"],
    location: "Himachal Pradesh, India",
    overview:
      "Perfect romantic getaway in the lap of Himalayas with snow activities, scenic valleys, and cozy stays.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Manali",
        description: "Airport/station pickup. Check into romantic resort. Evening at Mall Road.",
      },
      {
        day: 2,
        title: "Solang Valley Adventure",
        description: "Visit Solang Valley for paragliding, zorbing. Hadimba Temple. Evening bonfire.",
      },
      {
        day: 3,
        title: "Rohtang Pass Excursion",
        description: "Full day trip to Rohtang Pass (subject to permit). Snow activities and photography.",
      },
      {
        day: 4,
        title: "Manali Local Tour",
        description: "Vashisht hot springs, Tibetan Monastery, Old Manali. Couple spa session.",
      },
      {
        day: 5,
        title: "Departure",
        description: "Leisurely breakfast. Check out and transfer to airport with memories.",
      },
    ],
    included: ["4 Nights Romantic Resort", "Breakfast & Dinner", "Transfers", "Honeymoon Decor"],
    excluded: ["Lunch", "Adventure Activities", "Rohtang Permit", "Entry Fees"],
  },
  {
    id: "7",
    name: "Shimla-Kullu-Manali Circuit",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    duration: "6N / 7D",
    tourType: "Hill Station",
    features: ["Multiple Destinations"],
    price: 28999,
    destination: "Shimla",
    theme: ["Family", "Adventure"],
    location: "Himachal Pradesh, India",
    overview:
      "Complete Himachal experience covering colonial charm of Shimla, apple orchards of Kullu, and adventure hub Manali.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Shimla",
        description: "Check in. Evening at Mall Road and Ridge. Christ Church visit.",
      },
      {
        day: 2,
        title: "Shimla Sightseeing",
        description: "Kufri, Jakhoo Temple, Viceregal Lodge, and Scandal Point.",
      },
      {
        day: 3,
        title: "Shimla to Kullu",
        description: "Scenic drive to Kullu Valley. Visit Kullu Shawl factories and temples.",
      },
      {
        day: 4,
        title: "Kullu to Manali",
        description: "Check into Manali hotel. Visit Hadimba Temple and Mall Road.",
      },
      {
        day: 5,
        title: "Solang Valley",
        description: "Full day at Solang for adventure activities and sightseeing.",
      },
      {
        day: 6,
        title: "Manali Local Tour",
        description: "Rohtang Pass or local sightseeing. Shopping time.",
      },
      {
        day: 7,
        title: "Departure",
        description: "Drive back to Chandigarh/Delhi for onward journey.",
      },
    ],
    included: ["6 Nights Hotels", "Breakfast", "Transfers", "Sightseeing"],
    excluded: ["Lunch & Dinner", "Activities", "Permits", "Entry Fees"],
  },
  {
    id: "8",
    name: "Varanasi Spiritual Journey",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
    duration: "3N / 4D",
    tourType: "Spiritual",
    features: ["Guide", "Boat Ride"],
    price: 14999,
    destination: "Varanasi",
    theme: ["Pilgrimage", "Cultural"],
    location: "Uttar Pradesh, India",
    overview:
      "Experience the spiritual essence of India's oldest living city with Ganga Aarti, temple visits, and ancient traditions.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Varanasi",
        description: "Check in. Evening Ganga Aarti at Dashashwamedh Ghat. Boat ride.",
      },
      {
        day: 2,
        title: "Varanasi Temples",
        description: "Early morning boat ride. Kashi Vishwanath, Sankat Mochan, Durga Temple visits.",
      },
      {
        day: 3,
        title: "Sarnath Excursion",
        description: "Visit Sarnath Buddhist site. Explore museums and stupas. Evening aarti.",
      },
      {
        day: 4,
        title: "Departure",
        description: "Morning walk through ghats. Breakfast and transfer to airport/station.",
      },
    ],
    included: ["3 Nights Hotel", "Breakfast", "Boat Rides", "Guide"],
    excluded: ["Lunch & Dinner", "Donations", "Personal Expenses"],
  },
  {
    id: "9",
    name: "Andaman Beach Escape",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    duration: "5N / 6D",
    tourType: "Beach & Islands",
    features: ["Ferry", "Snorkeling"],
    price: 35999,
    destination: "Port Blair",
    theme: ["Beach", "Adventure"],
    location: "Andaman & Nicobar, India",
    overview:
      "Discover pristine beaches, crystal clear waters, water sports, and colonial history of Andaman Islands.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Port Blair",
        description: "Airport pickup. Cellular Jail visit. Evening Light & Sound Show.",
      },
      {
        day: 2,
        title: "Port Blair to Havelock",
        description: "Ferry to Havelock. Check in. Visit Radhanagar Beach (Asia's best beach).",
      },
      {
        day: 3,
        title: "Havelock Exploration",
        description: "Elephant Beach visit. Snorkeling and water sports. Beach relaxation.",
      },
      {
        day: 4,
        title: "Havelock to Neil Island",
        description: "Ferry to Neil Island. Bharatpur Beach, Natural Bridge, Laxmanpur Beach.",
      },
      {
        day: 5,
        title: "Neil to Port Blair",
        description: "Return ferry. Visit Corbyn's Cove Beach. Shopping at Aberdeen Bazaar.",
      },
      {
        day: 6,
        title: "Departure",
        description: "Ross Island & North Bay (optional). Transfer to airport.",
      },
    ],
    included: ["5 Nights Hotels", "Breakfast", "Ferry Tickets", "Transfers"],
    excluded: ["Lunch & Dinner", "Entry Permits", "Water Sports", "Scuba Diving"],
  },
  {
    id: "10",
    name: "Leh-Ladakh Adventure",
    image:
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80",
    duration: "7N / 8D",
    tourType: "Adventure",
    features: ["High Altitude", "Monasteries"],
    price: 42999,
    destination: "Leh",
    theme: ["Adventure", "Nature"],
    location: "Ladakh, India",
    overview:
      "Ultimate adventure to the land of high passes with stunning landscapes, ancient monasteries, and Pangong Lake.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Leh",
        description: "Acclimatization day. Rest at hotel. Evening walk at Leh Market.",
      },
      {
        day: 2,
        title: "Leh Local Sightseeing",
        description: "Shanti Stupa, Leh Palace, Hall of Fame, Magnetic Hill.",
      },
      {
        day: 3,
        title: "Leh to Nubra Valley",
        description: "Drive via Khardung La (highest motorable road). Hunder Sand Dunes. Camel ride.",
      },
      {
        day: 4,
        title: "Nubra Valley",
        description: "Visit Diskit Monastery, Maitreya Buddha. Turtuk village (optional).",
      },
      {
        day: 5,
        title: "Nubra to Pangong",
        description: "Drive to Pangong Lake via Shyok route. Sunset at lake.",
      },
      {
        day: 6,
        title: "Pangong to Leh",
        description: "Sunrise at lake. Return to Leh via Chang La pass.",
      },
      {
        day: 7,
        title: "Monastery Circuit",
        description: "Hemis, Thiksey, and Shey monasteries. Evening free.",
      },
      {
        day: 8,
        title: "Departure",
        description: "Transfer to Leh airport with lifetime memories.",
      },
    ],
    included: ["7 Nights Hotels/Camps", "Breakfast & Dinner", "SUV Transfers", "Permits"],
    excluded: ["Lunch", "Inner Line Permits", "Personal Expenses"],
  },
  {
    id: "11",
    name: "Mysore-Ooty Heritage Tour",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
    duration: "5N / 6D",
    tourType: "Heritage & Nature",
    features: ["Palace", "Hill Station"],
    price: 21999,
    destination: "Mysore",
    theme: ["Heritage", "Nature"],
    location: "Karnataka-Tamil Nadu, India",
    overview:
      "Explore royal heritage of Mysore and scenic beauty of Ooty, the Queen of Hill Stations.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bangalore",
        description: "Drive to Mysore. Check in. Evening at Brindavan Gardens.",
      },
      {
        day: 2,
        title: "Mysore Sightseeing",
        description: "Mysore Palace, Chamundi Hills, St. Philomena's Church, Mysore Zoo.",
      },
      {
        day: 3,
        title: "Mysore to Ooty",
        description: "Scenic drive to Ooty. Visit Pykara Lake and Waterfalls en route.",
      },
      {
        day: 4,
        title: "Ooty Exploration",
        description: "Botanical Gardens, Ooty Lake, Rose Garden, Doddabetta Peak.",
      },
      {
        day: 5,
        title: "Coonoor Day Trip",
        description: "Toy train ride. Sim's Park, Lamb's Rock, Dolphin's Nose viewpoint.",
      },
      {
        day: 6,
        title: "Departure",
        description: "Morning tea garden visit. Drive back to Bangalore/Coimbatore.",
      },
    ],
    included: ["5 Nights Hotels", "Breakfast", "Transfers", "Toy Train"],
    excluded: ["Lunch & Dinner", "Entry Fees", "Personal Expenses"],
  },
  {
    id: "12",
    name: "Darjeeling-Gangtok Himalayan Escape",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    duration: "6N / 7D",
    tourType: "Hill Station",
    features: ["Toy Train", "Mountain Views"],
    price: 26999,
    destination: "Darjeeling",
    theme: ["Nature", "Adventure"],
    location: "West Bengal-Sikkim, India",
    overview:
      "Experience the charm of Darjeeling's tea gardens and Kanchenjunga views combined with Gangtok's Buddhist culture.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bagdogra/NJP",
        description: "Drive to Darjeeling. Check in. Evening at Mall Road.",
      },
      {
        day: 2,
        title: "Darjeeling Sightseeing",
        description: "Tiger Hill sunrise, Batasia Loop, Ghoom Monastery, Tea Garden, Toy Train ride.",
      },
      {
        day: 3,
        title: "Darjeeling Local",
        description: "Zoo, Himalayan Mountaineering Institute, Peace Pagoda, Ropeway.",
      },
      {
        day: 4,
        title: "Darjeeling to Gangtok",
        description: "Scenic drive to Gangtok. Check in. Evening MG Marg walk.",
      },
      {
        day: 5,
        title: "Gangtok City Tour",
        description: "Rumtek Monastery, Enchey Monastery, Flower Exhibition, Handicraft Center.",
      },
      {
        day: 6,
        title: "Tsomgo Lake & Baba Mandir",
        description: "Excursion to Tsomgo Lake. Baba Harbhajan Singh Temple. Yak ride.",
      },
      {
        day: 7,
        title: "Departure",
        description: "Drive back to Bagdogra/NJP for onward journey.",
      },
    ],
    included: ["6 Nights Hotels", "Breakfast", "Transfers", "Permits"],
    excluded: ["Lunch & Dinner", "Toy Train Tickets", "Ropeway", "Entry Fees"],
  },
  {
    id: "13",
    name: "Amritsar Golden Temple Pilgrimage",
    image:
      "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&q=80",
    duration: "2N / 3D",
    tourType: "Pilgrimage",
    features: ["Guide", "Wagah Border"],
    price: 11999,
    destination: "Amritsar",
    theme: ["Pilgrimage", "Heritage"],
    location: "Punjab, India",
    overview:
      "Spiritual journey to the Golden Temple with Wagah Border ceremony and historical Jallianwala Bagh.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Amritsar",
        description: "Check in. Visit Golden Temple. Evening ceremony. Langar (community kitchen).",
      },
      {
        day: 2,
        title: "Amritsar Sightseeing",
        description: "Jallianwala Bagh, Partition Museum. Afternoon Wagah Border ceremony.",
      },
      {
        day: 3,
        title: "Departure",
        description: "Morning Golden Temple visit. Shopping at Hall Bazaar. Transfer to station/airport.",
      },
    ],
    included: ["2 Nights Hotel", "Breakfast", "Transfers", "Guide"],
    excluded: ["Lunch & Dinner", "Personal Expenses"],
  },
  {
    id: "14",
    name: "Coorg Coffee Land Retreat",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    duration: "3N / 4D",
    tourType: "Nature",
    features: ["Coffee Plantation", "Waterfalls"],
    price: 16999,
    destination: "Coorg",
    theme: ["Nature", "Relaxation"],
    location: "Karnataka, India",
    overview:
      "Escape to the Scotland of India with lush coffee plantations, misty hills, and cascading waterfalls.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Coorg",
        description: "Bangalore/Mysore pickup. Check into coffee estate. Evening plantation walk.",
      },
      {
        day: 2,
        title: "Coorg Sightseeing",
        description: "Abbey Falls, Raja's Seat, Omkareshwara Temple, Madikeri Fort.",
      },
      {
        day: 3,
        title: "Talacauvery & Golden Temple",
        description: "Visit Talacauvery (Cauvery origin), Bhagamandala, Golden Temple (Bylakuppe).",
      },
      {
        day: 4,
        title: "Departure",
        description: "Coffee plantation tour. Breakfast and departure to Bangalore/Mysore.",
      },
    ],
    included: ["3 Nights Estate Stay", "All Meals", "Transfers", "Plantation Tour"],
    excluded: ["Entry Fees", "Personal Expenses"],
  },
  {
    id: "15",
    name: "Rann of Kutch White Desert",
    image:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
    duration: "3N / 4D",
    tourType: "Desert",
    features: ["Tent Stay", "Cultural"],
    price: 19999,
    destination: "Bhuj",
    theme: ["Cultural", "Nature"],
    location: "Gujarat, India",
    overview:
      "Experience the magical white desert during Rann Utsav with cultural performances, handicrafts, and full moon nights.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bhuj",
        description: "Check into tent resort. Visit Rann Utsav festival. Cultural programs.",
      },
      {
        day: 2,
        title: "White Rann",
        description: "Sunrise at White Rann. Visit Kala Dungar (Black Hill). Evening cultural show.",
      },
      {
        day: 3,
        title: "Village Tour",
        description: "Handicraft villages - Bhujodi, Nirona, Ludia. Watch artisans at work.",
      },
      {
        day: 4,
        title: "Departure",
        description: "Morning at leisure. Transfer to Bhuj airport/station.",
      },
    ],
    included: ["3 Nights Tent Stay", "All Meals", "Transfers", "Festival Entry"],
    excluded: ["Activities", "Shopping", "Personal Expenses"],
  },
];

export const getTourPackageById = (id: string): TourPackage | undefined => {
  return tourPackages.find((tour) => tour.id === id);
};
