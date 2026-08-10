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
      "Experience the serene beauty of Nainital's pristine lakes and Mukteshwar's panoramic mountain views. This carefully curated package offers the perfect blend of natural beauty, adventure activities, and peaceful retreats. Witness stunning sunrises over the Himalayas and enjoy boating in the emerald waters of Naini Lake.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Nainital",
        description:
          "Arrive in Nainital and check into your hotel. Evening visit to Mall Road and Naini Lake for boating. Enjoy the local markets and street food.",
      },
      {
        day: 2,
        title: "Nainital Sightseeing",
        description:
          "Visit Naina Devi Temple, Snow View Point, and Tiffin Top. Enjoy cable car ride and panoramic views of the Himalayas. Evening free for leisure activities.",
      },
      {
        day: 3,
        title: "Mukteshwar Excursion",
        description:
          "Drive to Mukteshwar and visit Mukteshwar Temple. Explore fruit orchards and enjoy nature walks. Visit Chauli Ki Jali for stunning valley views.",
      },
      {
        day: 4,
        title: "Departure",
        description:
          "After breakfast, check out and depart for your onward journey with beautiful memories.",
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
    name: "Kainchi Dham Spiritual Journey",
    image:
      "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&q=80",
    duration: "2N / 3D",
    tourType: "Temple Visit",
    features: ["Guide"],
    price: 8999,
    destination: "Nainital",
    theme: ["Pilgrimage"],
    location: "Uttarakhand, India",
    distance: "3-5 km",
    overview:
      "Embark on a spiritual journey to the sacred Kainchi Dham Ashram, blessed by Neem Karoli Baba. This package offers a peaceful retreat with temple visits, meditation sessions, and spiritual discourses. Experience divine tranquility in the lap of the Himalayas.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Kainchi Dham Visit",
        description:
          "Arrive and visit Kainchi Dham Ashram. Attend evening aarti and meditation session. Experience the spiritual atmosphere and divine blessings.",
      },
      {
        day: 2,
        title: "Nainital Temples Tour",
        description:
          "Visit Naina Devi Temple, Hanuman Garhi, and other sacred sites. Participate in morning prayers and spiritual activities. Evening free for personal reflection.",
      },
      {
        day: 3,
        title: "Departure",
        description:
          "Morning visit to Kainchi Dham for final blessings. Check out and depart with spiritual peace and divine memories.",
      },
    ],
    included: [
      "2 Nights Accommodation",
      "Daily Breakfast & Dinner",
      "AC Vehicle Transfers",
      "Experienced Guide",
    ],
    excluded: ["Lunch", "Donations", "Personal Expenses"],
  },
  {
    id: "3",
    name: "Auli Winter Expedition",
    image:
      "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80",
    duration: "4 Days / 3 Nights",
    tourType: "Adventure",
    features: ["Uttarakhand, India", "5-20 km"],
    price: 18500,
    destination: "Auli",
    theme: ["Adventure", "Weekend"],
    location: "Uttarakhand, India",
    distance: "5-20 km",
    overview:
      "Experience the majestic tranquility of the Himalayas with our premium Auli expedition. Discover snow-capped peaks, serene valley views and winter adventures in one of India's premier skiing destinations. Our premium itinerary offers both adventure-seeking skiers and leisure enthusiasts pristine vistas and enriching accommodation, and let our expert guides lead you through a pristine and serene winter wonderland.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dehradun & Drive to Joshimath",
        description:
          "Begin your journey with a scenic drive from Dehradun to Joshimath. Witness the beautiful landscapes of Uttarakhand, including the confluence of rivers and lush green valleys. Check into your hotel and relax for the evening.",
      },
      {
        day: 2,
        title: "Auli Ropeway & Alpine Meadows",
        description:
          "Take the famous Auli ropeway, one of Asia's longest cable cars. Enjoy panoramic views of Nanda Devi and other Himalayan peaks. Explore the alpine meadows and enjoy skiing or snowboarding activities.",
      },
      {
        day: 3,
        title: "Gurso Bugyal Trek & Local Sightseeing",
        description:
          "Trek to Gurso Bugyal for spectacular 360-degree views of the Himalayas. Visit local temples and explore the charming hill town. Evening bonfire and cultural program at the resort.",
      },
      {
        day: 4,
        title: "Return Journey to Dehradun",
        description:
          "After breakfast, check out and drive back to Dehradun with beautiful memories of your Auli expedition. Drop at Dehradun railway station or airport.",
      },
    ],
    included: [
      "3 Nights Luxury Accommodation",
      "Daily Breakfast & Dinner",
      "Premium SUV Transfers (Dehradun to Auli)",
      "Guided Trek to Gurso Bugyal",
    ],
    excluded: [
      "Flight / Train Tickets",
      "Lunch",
      "Auli Ropeway Tickets (Pay direct)",
      "Skiing Equipment Rental",
    ],
  },
  {
    id: "4",
    name: "Jim Corbett Wildlife Safari",
    image:
      "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&q=80",
    duration: "2-3 Days",
    tourType: "Wildlife",
    features: ["Safari", "Guide"],
    price: 15999,
    destination: "Jim Corbett",
    theme: ["Adventure", "Family"],
    location: "Uttarakhand, India",
    distance: "10-15 km",
    overview:
      "Embark on an exciting wildlife adventure in India's oldest national park. Experience thrilling jungle safaris, spot majestic Bengal tigers, and immerse yourself in the rich biodiversity of the Himalayan foothills. Perfect for nature lovers and adventure enthusiasts.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Evening Safari",
        description:
          "Arrive at Jim Corbett and check into your resort. Evening safari in Dhikala or Bijrani zone. Enjoy the wilderness and spot various wildlife species.",
      },
      {
        day: 2,
        title: "Morning & Evening Safaris",
        description:
          "Early morning jungle safari for tiger spotting. Return to resort for breakfast and relaxation. Afternoon visit to Corbett Museum. Evening safari in different zone.",
      },
      {
        day: 3,
        title: "Departure",
        description:
          "Morning nature walk and bird watching. Check out after breakfast and depart with memorable wildlife experiences.",
      },
    ],
    included: [
      "2 Nights Resort Stay",
      "All Meals (Breakfast, Lunch, Dinner)",
      "3 Jungle Safaris",
      "Naturalist Guide",
    ],
    excluded: ["Safari Permit Fees", "Camera Charges", "Personal Expenses"],
  },
  {
    id: "5",
    name: "Mussoorie Hill Station Retreat",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
    duration: "2-3 Days",
    tourType: "Hill Station",
    features: ["Cable Car", "Guide"],
    price: 10999,
    destination: "Mukteshwar",
    theme: ["Family", "Weekend"],
    location: "Uttarakhand, India",
    distance: "5-8 km",
    overview:
      "Escape to the Queen of Hills for a perfect weekend getaway. Enjoy scenic cable car rides, visit colonial landmarks, stroll through Mall Road, and witness stunning Himalayan sunsets. Ideal for families and couples seeking a peaceful mountain retreat.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Mall Road",
        description:
          "Arrive in Mussoorie and check into your hotel. Evening walk on Mall Road, visit Gun Hill via cable car. Enjoy local shopping and street food.",
      },
      {
        day: 2,
        title: "Mussoorie Sightseeing",
        description:
          "Visit Kempty Falls, Lal Tibba, Camel's Back Road, and Company Garden. Explore colonial architecture and enjoy panoramic mountain views. Evening free for leisure.",
      },
      {
        day: 3,
        title: "Departure",
        description:
          "Morning visit to local attractions or shopping. Check out and depart with beautiful hill station memories.",
      },
    ],
    included: [
      "2 Nights Hotel Stay",
      "Daily Breakfast",
      "AC Vehicle for Transfers",
      "Sightseeing Tours",
    ],
    excluded: [
      "Lunch & Dinner",
      "Cable Car Tickets",
      "Entry Fees",
      "Personal Expenses",
    ],
  },
];

export const getTourPackageById = (id: string): TourPackage | undefined => {
  return tourPackages.find((tour) => tour.id === id);
};
