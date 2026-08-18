Google Maps API Key:
Visit: https://console.cloud.google.com/

Create/Select Project: Create new or select existing project

Enable These 4 APIs (Go to "APIs & Services" → "Library"):

✅ Maps JavaScript API (for map display)
✅ Places API (for location search/autocomplete)
✅ Geocoding API (for address lookups)
✅ Distance Matrix API (for accurate distance calculation)
Create API Key:

Go to "APIs & Services" → "Credentials"
Click "Create Credentials" → "API Key"
Copy the generated key
Secure Your Key (Important!):

Click on the API key to edit
Application restrictions: Select "HTTP referrers"
Add: localhost:\* (for development) and your production domain
API restrictions: Select "Restrict key" and choose the 4 APIs above
Add to Your Project:

Open .env file
Replace YOUR_GOOGLE_MAPS_API_KEY_HERE with your actual API key
Features Now Available:
✅ Interactive Google Maps with draggable markers
✅ Location search with autocomplete (India-focused)
✅ Click on map to select location
✅ Reverse geocoding (get address from coordinates)
✅ Accurate road distance calculation using Distance Matrix API
✅ Travel duration estimates
✅ Full address display with confirm button
Once you add the API key, the location picker will work perfectly with accurate distances and precise mapping!

Google gives you $200 free credit every month. This covers:

28,000+ map loads per month (FREE)
40,000+ geocoding requests (FREE)
40,000+ distance calculations (FREE)
You just need to add a credit card to enable billing, but you won't be charged unless you exceed $200/month (which is unlikely for a small to medium website).

What to do:
Go to: https://console.cloud.google.com/billing
Click "Link a billing account"
Add your credit card
Done! You get $200 free credit every month
💡 Tip: Set a budget alert at $10 so you'll be notified if you ever start approaching the limit (which rarely happens for most websites).

For your taxi booking site, you'll likely use only $5-20/month worth of API calls, which is completely FREE with the $200 credit!

To see your Google Maps API credits:

Go to: https://console.cloud.google.com/billing
Select your billing account
Click "Reports" in the left sidebar
You'll see your usage and remaining credits
OR

Go to: https://console.cloud.google.com/google/maps-apis/credits
This shows your $200 monthly credit specifically for Maps
To see API usage:

Go to: https://console.cloud.google.com/apis/dashboard
Click on any API (Maps JavaScript API, Places API, etc.)
View requests and costs
