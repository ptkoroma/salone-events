// data.js — Sierra Leone Events seed data (plain JS, attaches to window)
(function () {
  // Category definitions. Hue is used for placeholder art + soft tinting;
  // the app's primary accent is driven separately by Tweaks.
  const CATEGORIES = {
    party:    { id: "party",    label: "Party & Nightlife",   short: "Party",      hue: 111 },
    culture:  { id: "culture",  label: "Culture & Festivals", short: "Culture",    hue: 152 },
    charity:  { id: "charity",  label: "Fundraiser",          short: "Fundraiser", hue: 18  },
    business: { id: "business", label: "Business & Networking",short: "Business",   hue: 212 },
    learn:    { id: "learn",    label: "Education & Workshops",short: "Education",  hue: 42  },
  };

  const EVENTS = [
    {
      id: "black-tie-affair",
      title: "NABS Promotions: Black Tie Affair",
      category: "party",
      date: "2027-05-30", startTime: "21:00", endTime: "03:00",
      venue: "Metro Points Hotel", city: "New Carrollton", country: "USA",
      address: "8500 Annapolis Road, New Carrollton, MD 20784.",
      organizer: "NABS Promotions", organizerType: "Party collective",
      price: 120, currency: "$",
      going: 214, capacity: 400, featured: true,
      tags: ["Fine Dining", "Unforgettable Vibes.", "Live band", "18+"],
      blurb: "A night of sophistication, fine dining, and unforgettable vibes. Dress to impress and prepare to indulge in an atmosphere curated for excellence.",
      about: "NABS PROMOTIONS - THE BLACK TIE AFFAIR is an exclusive event that promises an unforgettable night of sophistication, fine dining, and unforgettable vibes. Dress to impress and prepare to indulge in an atmosphere curated for excellence. Join us for an evening where elegance meets entertainment, creating memories that will last a lifetime.",
    },
    {
      id: "heritage-day-dc",
      title: "Sierra Leone Heritage Day",
      category: "culture",
      date: "2026-07-04", startTime: "12:00", endTime: "20:00",
      venue: "Malcolm X Park", city: "Washington", country: "United States",
      address: "Meridian Hill Park, 16th St NW, Washington, DC",
      organizer: "DC Salone Community Assoc.", organizerType: "Community group",
      price: 0, currency: "$",
      going: 532, capacity: 1200, featured: true,
      tags: ["Family friendly", "Food", "Dance", "Free"],
      blurb: "An open-air day of country cloth, drumming, masquerade and a Krio storytelling stage.",
      about: "Our biggest gathering of the year. Devil masquerade processions, a country-cloth fashion showcase, a children's drumming circle, and food stalls from across the District. Bring a blanket and your whole family — this one's free and open to all.",
    },
    {
      id: "clean-water-bo",
      title: "Clean Water for Bo — Charity Gala",
      category: "charity",
      date: "2026-06-27", startTime: "18:30", endTime: "23:00",
      venue: "The Bingham", city: "London", country: "United Kingdom",
      address: "61-63 Petersham Rd, Richmond TW10",
      organizer: "WaterRoots Foundation", organizerType: "Registered charity",
      price: 75, currency: "£",
      going: 96, capacity: 180, featured: false,
      tags: ["Black tie", "Auction", "Dinner"],
      blurb: "A black-tie dinner and silent auction funding three boreholes in the Bo District.",
      about: "Join us for a seated dinner, a live auction hosted by a guest MC, and stories from the field. Every ticket funds clean-water access for a family in the Bo District. Tables of ten available for sponsors.",
    },
    {
      id: "salone-tech-mixer",
      title: "Salone Tech & Founders Mixer",
      category: "business",
      date: "2026-06-19", startTime: "18:00", endTime: "21:00",
      venue: "Impact Hub Freetown", city: "Freetown", country: "Sierra Leone",
      address: "15 Rawdon St, Freetown",
      organizer: "Salone Builders Network", organizerType: "Professional network",
      price: 0, currency: "Le",
      going: 73, capacity: 120, featured: false,
      tags: ["Networking", "Startups", "Drinks"],
      blurb: "Founders, engineers and investors building for the Salone market — open bar and lightning intros.",
      about: "A relaxed evening for the people building Sierra Leone's tech scene. We open with two-minute lightning intros from anyone hiring or raising, then it's open networking. Whether you're shipping fintech in Freetown or coding from the diaspora, come through.",
    },
    {
      id: "krio-storytelling",
      title: "Krio Storytelling & Language Workshop",
      category: "learn",
      date: "2026-06-21", startTime: "14:00", endTime: "16:30",
      venue: "Birmingham Central Library", city: "Birmingham", country: "United Kingdom",
      address: "Centenary Square, Broad St, Birmingham B1",
      organizer: "Mama Salone Cultural Trust", organizerType: "Cultural trust",
      price: 8, currency: "£",
      going: 41, capacity: 60, featured: false,
      tags: ["All ages", "Language", "Hands-on"],
      blurb: "Learn everyday Krio through proverbs, Anansi tales and song — for heritage learners of any level.",
      about: "A warm, hands-on session for anyone wanting to reconnect with Krio — whether you grew up hearing it or are starting fresh. We'll work through greetings, market phrases and a classic Anansi story, then close with a sing-along. Children welcome with a guardian.",
    },
    {
      id: "afrobeats-block-party",
      title: "Salone Summer Block Party",
      category: "party",
      date: "2026-08-15", startTime: "14:00", endTime: "22:00",
      venue: "Druid Hill Park", city: "Baltimore", country: "United States",
      address: "900 Druid Park Lake Dr, Baltimore, MD",
      organizer: "East Coast Salone Union", organizerType: "Community group",
      price: 12, currency: "$",
      going: 318, capacity: 800, featured: false,
      tags: ["Outdoor", "Family friendly", "Food trucks"],
      blurb: "A daytime block party with Afrobeats, a Salone food village and a kids' zone.",
      about: "Grills going, sound system up, and a food village serving everything from akara to pepper soup. Live DJs all afternoon, a dance competition with cash prizes, and a supervised kids' zone so the parents can wind down.",
    },
    {
      id: "women-in-business-brunch",
      title: "Women in Salone Business Brunch",
      category: "business",
      date: "2026-07-12", startTime: "11:00", endTime: "14:00",
      venue: "The Ivy Spinningfields", city: "Manchester", country: "United Kingdom",
      address: "18-22 The Avenue, Spinningfields, Manchester M3",
      organizer: "Salone Women Mean Business", organizerType: "Professional network",
      price: 45, currency: "£",
      going: 58, capacity: 90, featured: false,
      tags: ["Brunch", "Panel", "Networking"],
      blurb: "A panel brunch with founders and execs of Sierra Leonean heritage, plus structured networking.",
      about: "Three founders share the unfiltered version of their journey, followed by table-based networking matched to your industry. A relaxed, generous room built for real connections — not business-card collecting.",
    },
    {
      id: "diaspora-investment-forum",
      title: "Diaspora Investment Forum 2026",
      category: "business",
      date: "2026-09-05", startTime: "09:00", endTime: "17:00",
      venue: "Toronto Reference Library", city: "Toronto", country: "Canada",
      address: "789 Yonge St, Toronto, ON",
      organizer: "Salone Diaspora Network", organizerType: "Professional network",
      price: 35, currency: "$",
      going: 142, capacity: 300, featured: false,
      tags: ["Conference", "Investing", "Property"],
      blurb: "A full-day forum on investing back home — real estate, agriculture and SME funding.",
      about: "Practical sessions on moving capital home responsibly: land and title, agriculture co-ops, diaspora bonds and SME funding. Bring questions — every session ends with open Q&A and there's a deal-room hour after lunch.",
    },
    {
      id: "akara-cookoff",
      title: "Salone Kitchen: Akara & Jollof Class",
      category: "learn",
      date: "2026-06-28", startTime: "15:00", endTime: "18:00",
      venue: "Atlanta Community Kitchen", city: "Atlanta", country: "United States",
      address: "675 Ponce De Leon Ave NE, Atlanta, GA",
      organizer: "Auntie Kadi's Table", organizerType: "Culinary host",
      price: 30, currency: "$",
      going: 38, capacity: 40, featured: false,
      tags: ["Hands-on", "Food", "Recipes to keep"],
      blurb: "Cook akara and a proper Salone jollof from scratch — eat together, leave with the recipes.",
      about: "Auntie Kadi walks you through frying perfect akara and building a smoky party jollof. You'll cook in pairs, sit down to eat as a group, and take home a printed recipe card. Aprons and ingredients provided.",
    },
    {
      id: "film-night-freetown",
      title: "Salone Stories: Film & Q&A Night",
      category: "culture",
      date: "2026-07-25", startTime: "18:00", endTime: "21:30",
      venue: "British Council Freetown", city: "Freetown", country: "Sierra Leone",
      address: "Tower Hill, Freetown",
      organizer: "Freetown Film Circle", organizerType: "Arts collective",
      price: 0, currency: "Le",
      going: 64, capacity: 150, featured: false,
      tags: ["Screening", "Q&A", "Free"],
      blurb: "A screening of new Sierra Leonean short films, with a director Q&A and after-party.",
      about: "Five new shorts from emerging Salone filmmakers, followed by a panel Q&A with the directors. Stay for the courtyard after-party with light food and music. Free, but seats are limited — RSVP to guarantee a spot.",
    },
    {
      id: "scholarship-fundraiser",
      title: "Scholarship Fund Comedy Night",
      category: "charity",
      date: "2026-08-01", startTime: "19:30", endTime: "23:00",
      venue: "Hackney Empire", city: "London", country: "United Kingdom",
      address: "291 Mare St, London E8",
      organizer: "Salone Scholars Fund", organizerType: "Registered charity",
      price: 22, currency: "£",
      going: 187, capacity: 500, featured: false,
      tags: ["Comedy", "Live", "Fundraiser"],
      blurb: "A line-up of diaspora comedians raising money for university scholarships back home.",
      about: "An evening of stand-up from some of the funniest voices in the diaspora, all donating their time. Proceeds send three students to university in Sierra Leone next year. Bar open, doors at 7.",
    },
    {
      id: "gumbe-fusion-toronto",
      title: "Gumbe Fusion: Live Session",
      category: "party",
      date: "2026-09-19", startTime: "20:00", endTime: "01:00",
      venue: "The Drake Underground", city: "Toronto", country: "Canada",
      address: "1150 Queen St W, Toronto, ON",
      organizer: "Salone Sounds Collective", organizerType: "Party collective",
      price: 25, currency: "$",
      going: 88, capacity: 220, featured: false,
      tags: ["Live band", "Gumbe", "19+"],
      blurb: "A live band reimagining Gumbe with jazz and highlife — intimate basement session.",
      about: "An eight-piece band reworks classic Gumbe rhythms with jazz horns and highlife guitar. Seated early, dancing late. A rare chance to hear this sound played live outside Freetown.",
    },
    {
      id: "seaa-metro-dc-summer-bazaar-2026",
      title: "St. Edward's Alumni Metro DC Chapter — Summer Bazaar 2026",
      category: "culture",
      date: "2026-07-25", startTime: "13:00", endTime: "01:00",
      venue: "The Conway Grand Hall", city: "Hyattsville", country: "United States",
      address: "6201 Belcrest Rd, Hyattsville, MD 20782",
      organizer: "St. Edward's Alumni Association (Metro DC Chapter)", organizerType: "Alumni association",
      price: 0, currency: "$",
      going: 0, capacity: 0, featured: false,
      tags: ["Alumni", "Bazaar", "Metro DC", "Summer"],
      blurb: "St. Edward's Alumni Association (Metro DC Chapter) Summer Bazaar is a vibrant evening of fellowship, culture, food, music, and community spirit.",
      about: "St. Edward's Alumni Association (Metro DC Chapter) Summer Bazaar is a vibrant evening of fellowship, culture, food, music, and community spirit. Join fellow alumni and friends at The Conway Grand Hall for an unforgettable night celebrating shared roots and lasting bonds.",
    },
  ];

  // ---- helpers ----
  function parseDate(ev) {
    const [y, m, d] = ev.date.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  function fmtPrice(ev) {
    return ev.price === 0 ? "Free" : ev.currency + ev.price;
  }
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const MON_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  function fmtDateLong(ev) {
    const dt = parseDate(ev);
    return DOW[dt.getDay()] + ", " + MONTHS[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();
  }
  function fmtTime(t) {
    const [h, m] = t.split(":").map(Number);
    const ap = h >= 12 ? "pm" : "am";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return m === 0 ? h12 + ap : h12 + ":" + String(m).padStart(2, "0") + ap;
  }

  window.SLE = {
    CATEGORIES, EVENTS,
    parseDate, fmtPrice, fmtDateLong, fmtTime,
    MONTHS, MON_ABBR, DOW,
  };
})();
