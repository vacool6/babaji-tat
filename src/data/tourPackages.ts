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
  {
    id: "16",
    name: "Char Dham Yatra - Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80",
    duration: "10N / 11D",
    tourType: "Pilgrimage",
    features: ["Temple Circuit", "Guide", "Permits"],
    price: 48999,
    destination: "Haridwar",
    theme: ["Pilgrimage", "Spiritual"],
    location: "Uttarakhand, India",
    overview:
      "Complete the sacred Char Dham Yatra visiting Yamunotri, Gangotri, Kedarnath, and Badrinath - the four holiest Hindu pilgrimage sites in the Himalayas.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Haridwar",
        description: "Arrive in Haridwar. Check in. Evening Ganga Aarti at Har Ki Pauri.",
      },
      {
        day: 2,
        title: "Haridwar to Barkot",
        description: "Drive to Barkot via Mussoorie and Kempty Falls. Overnight at Barkot.",
      },
      {
        day: 3,
        title: "Yamunotri Darshan",
        description: "Drive to Janki Chatti. Trek/Palki to Yamunotri Temple. Return to Barkot.",
      },
      {
        day: 4,
        title: "Barkot to Uttarkashi",
        description: "Drive to Uttarkashi. Visit Vishwanath Temple. Overnight stay.",
      },
      {
        day: 5,
        title: "Gangotri Darshan",
        description: "Visit Gangotri Temple. Darshan and puja. Return to Uttarkashi.",
      },
      {
        day: 6,
        title: "Uttarkashi to Guptkashi",
        description: "Drive to Guptkashi via Tehri Dam. Check in and rest for next day trek.",
      },
      {
        day: 7,
        title: "Kedarnath Darshan",
        description: "Drive to Gaurikund. Trek/Helicopter to Kedarnath. Darshan. Return to Guptkashi.",
      },
      {
        day: 8,
        title: "Guptkashi to Badrinath",
        description: "Scenic drive to Badrinath. Evening temple visit. Overnight at Badrinath.",
      },
      {
        day: 9,
        title: "Badrinath Darshan & Mana Village",
        description: "Early morning darshan. Visit Mana village, Vyas Gufa, Bhim Pul. Drive to Rudraprayag.",
      },
      {
        day: 10,
        title: "Rudraprayag to Rishikesh",
        description: "Drive to Rishikesh. Visit Triveni Ghat. Evening aarti. Overnight stay.",
      },
      {
        day: 11,
        title: "Rishikesh & Departure",
        description: "Visit Ram Jhula, Laxman Jhula, Beatles Ashram. Transfer to Haridwar/Dehradun for departure.",
      },
    ],
    included: [
      "10 Nights Hotels/Guesthouses",
      "Daily Breakfast & Dinner",
      "AC Vehicle (as per road conditions)",
      "All Permits & Registrations",
      "Experienced Driver & Guide",
    ],
    excluded: [
      "Helicopter charges for Kedarnath",
      "Pony/Palki charges",
      "Temple donations",
      "Lunch",
      "Personal expenses",
    ],
  },
  {
    id: "17",
    name: "Tirupati Balaji Darshan",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    duration: "2N / 3D",
    tourType: "Pilgrimage",
    features: ["VIP Darshan", "Guide"],
    price: 13999,
    destination: "Tirupati",
    theme: ["Pilgrimage", "Spiritual"],
    location: "Andhra Pradesh, India",
    overview:
      "Seek blessings at Lord Venkateswara Temple, one of the richest and most visited temples in the world.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Tirupati",
        description: "Arrive at Tirupati. Check in. Evening visit to ISKCON Temple and local temples.",
      },
      {
        day: 2,
        title: "Tirumala Darshan",
        description: "Early morning VIP darshan at Tirumala Temple. Visit Akasa Ganga, Papavinasanam. Return to Tirupati.",
      },
      {
        day: 3,
        title: "Local Temples & Departure",
        description: "Visit Srikalahasti Temple, Kanipakam Vinayaka Temple. Transfer to station/airport.",
      },
    ],
    included: ["2 Nights Hotel", "Breakfast", "VIP Darshan Tickets", "Transfers", "Guide"],
    excluded: ["Lunch & Dinner", "Temple Donations", "Laddoo Prasadam", "Personal Expenses"],
  },
  {
    id: "18",
    name: "Shirdi Sai Baba Pilgrimage",
    image:
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80",
    duration: "2N / 3D",
    tourType: "Pilgrimage",
    features: ["Temple Stay Option", "Aarti"],
    price: 12999,
    destination: "Shirdi",
    theme: ["Pilgrimage", "Spiritual"],
    location: "Maharashtra, India",
    overview:
      "Divine pilgrimage to Shirdi Sai Baba Temple with darshan, aarti, and visits to associated holy sites.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Shirdi",
        description: "Check in. Visit Sai Baba Samadhi Mandir. Attend evening aarti. Dwarkamai darshan.",
      },
      {
        day: 2,
        title: "Shirdi Full Day",
        description: "Early morning darshan. Visit Chavadi, Lendi Baug, Gurusthan, Khandoba Temple. Shopping for religious items.",
      },
      {
        day: 3,
        title: "Shani Shingnapur & Departure",
        description: "Visit Shani Shingnapur Temple. Return to Shirdi. Final darshan and departure.",
      },
    ],
    included: ["2 Nights Hotel", "Breakfast", "Darshan Arrangements", "Transfers"],
    excluded: ["Lunch & Dinner", "Donations", "Shopping", "Personal Expenses"],
  },
  {
    id: "19",
    name: "Dwarka-Somnath Pilgrimage",
    image:
      "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80",
    duration: "4N / 5D",
    tourType: "Pilgrimage",
    features: ["Jyotirlinga", "Beach Temples"],
    price: 22999,
    destination: "Dwarka",
    theme: ["Pilgrimage", "Spiritual"],
    location: "Gujarat, India",
    overview:
      "Sacred journey to Dwarka (Lord Krishna's kingdom) and Somnath (first Jyotirlinga), covering important temples of Gujarat.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dwarka",
        description: "Arrive in Dwarka. Check in. Evening darshan at Dwarkadhish Temple. Gomti Ghat aarti.",
      },
      {
        day: 2,
        title: "Dwarka Temples",
        description: "Visit Nageshwar Jyotirlinga, Gopi Talav, Beyt Dwarka (by boat). Rukmini Temple.",
      },
      {
        day: 3,
        title: "Dwarka to Somnath",
        description: "Drive to Somnath via Porbandar. Visit Kirti Mandir. Check in at Somnath.",
      },
      {
        day: 4,
        title: "Somnath & Diu",
        description: "Morning darshan at Somnath Temple. Bhalka Tirth, Triveni Sangam. Day trip to Diu beaches.",
      },
      {
        day: 5,
        title: "Somnath Local & Departure",
        description: "Visit Prabhas Patan Museum. Last darshan and aarti. Transfer to Rajkot/Ahmedabad.",
      },
    ],
    included: ["4 Nights Hotels", "Breakfast", "Transfers", "Boat to Beyt Dwarka"],
    excluded: ["Lunch & Dinner", "Entry Fees", "Temple Donations", "Personal Expenses"],
  },
  {
    id: "20",
    name: "Ajmer Sharif Dargah Pilgrimage",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
    duration: "2N / 3D",
    tourType: "Pilgrimage",
    features: ["Sufi Shrine", "Pushkar"],
    price: 11999,
    destination: "Ajmer",
    theme: ["Pilgrimage", "Spiritual"],
    location: "Rajasthan, India",
    overview:
      "Spiritual journey to the famous Sufi shrine of Khwaja Moinuddin Chishti and holy Pushkar.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Ajmer",
        description: "Check in. Visit Ajmer Sharif Dargah for ziarat. Adhai Din Ka Jhonpra. Ana Sagar Lake.",
      },
      {
        day: 2,
        title: "Pushkar Excursion",
        description: "Drive to Pushkar. Visit Brahma Temple, Pushkar Lake (52 ghats). Savitri Temple. Camel ride.",
      },
      {
        day: 3,
        title: "Final Ziarat & Departure",
        description: "Morning ziarat at Dargah. Shopping at Naya Bazaar. Transfer to Jaipur/Ajmer station.",
      },
    ],
    included: ["2 Nights Hotel", "Breakfast", "Transfers", "Guide"],
    excluded: ["Lunch & Dinner", "Chadar/Flowers", "Donations", "Personal Expenses"],
  },
  {
    id: "21",
    name: "Mata Vaishno Devi Yatra",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    duration: "3N / 4D",
    tourType: "Pilgrimage",
    features: ["Trek/Helicopter Option", "Cave Temple"],
    price: 17999,
    destination: "Katra",
    theme: ["Pilgrimage", "Adventure"],
    location: "Jammu & Kashmir, India",
    overview:
      "Sacred pilgrimage to Mata Vaishno Devi cave temple, one of the holiest Hindu shrines in the Himalayas.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Jammu",
        description: "Arrive in Jammu. Drive to Katra. Check in. Rest and prepare for trek. Visit local market.",
      },
      {
        day: 2,
        title: "Vaishno Devi Darshan",
        description: "Early morning start trek (13km) or helicopter. Darshan at Bhawan. Bhairon Temple visit. Return to Katra.",
      },
      {
        day: 3,
        title: "Shivkhori Excursion",
        description: "Day trip to Shivkhori Cave Temple. Natural Shivling formation. Return to Katra.",
      },
      {
        day: 4,
        title: "Katra Temples & Departure",
        description: "Visit Baba Dhansar, Jhajjar Kotli. Transfer to Jammu for onward journey.",
      },
    ],
    included: ["3 Nights Hotels", "Breakfast & Dinner", "Transfers", "Yatra Registration"],
    excluded: ["Helicopter charges", "Pony/Palki", "Bhandara", "Personal Expenses"],
  },
  {
    id: "22",
    name: "Rameshwaram & Kanyakumari Pilgrimage",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    duration: "4N / 5D",
    tourType: "Pilgrimage",
    features: ["Jyotirlinga", "Southern Tip"],
    price: 20999,
    destination: "Rameshwaram",
    theme: ["Pilgrimage", "Coastal"],
    location: "Tamil Nadu, India",
    overview:
      "Divine journey to Rameshwaram (Jyotirlinga) and Kanyakumari (southernmost tip of India) with Madurai Meenakshi Temple.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Madurai",
        description: "Arrive in Madurai. Visit Meenakshi Amman Temple. Thirumalai Nayak Palace. Evening ceremony.",
      },
      {
        day: 2,
        title: "Madurai to Rameshwaram",
        description: "Drive to Rameshwaram. Check in. Pamban Bridge view. Evening temple visit.",
      },
      {
        day: 3,
        title: "Rameshwaram Darshan",
        description: "Early bath in Agni Theertham. 22 wells darshan. Ramanathaswamy Temple. Dhanushkodi excursion.",
      },
      {
        day: 4,
        title: "Rameshwaram to Kanyakumari",
        description: "Drive to Kanyakumari. Vivekananda Rock, Thiruvalluvar Statue. Sunset view at Triveni Sangam.",
      },
      {
        day: 5,
        title: "Kanyakumari & Departure",
        description: "Sunrise darshan. Kumari Amman Temple. Padmanabhapuram Palace. Transfer to Trivandrum.",
      },
    ],
    included: ["4 Nights Hotels", "Breakfast", "Transfers", "Ferry Tickets"],
    excluded: ["Lunch & Dinner", "Archana/Puja charges", "Entry Fees", "Personal Expenses"],
  },
];

export const getTourPackageById = (id: string): TourPackage | undefined => {
  return tourPackages.find((tour) => tour.id === id);
};
