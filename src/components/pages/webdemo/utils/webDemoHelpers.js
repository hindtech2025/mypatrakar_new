export const getContrastColor = (hexColor) => {
  if (!hexColor) return "#000000";

  const hex = hexColor.replace("#", "");

  // Handle short hex format
  const fullHex = hex.length === 3 
    ? hex.split('').map(char => char + char).join('')
    : hex;

  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  // Relative luminance formula (WCAG)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Dark bg → white text | Light bg → black text
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

export const formatUrl = (url) => {
  if (!url) return "";
  let formatted = url.trim();
  if (!/^https?:\/\//i.test(formatted)) {
    formatted = `https://${formatted}`;
  }
  return formatted;
};

export const socialInputs = [
  {
    id: "fb_link",
    icon: "Facebook",
    placeholder: "Facebook URL",
    color: "text-[#1877F2]",
  },
  {
    id: "twitter_link",
    icon: "Twitter",
    placeholder: "Twitter URL",
    color: "text-[#1DA1F2]",
  },
  {
    id: "youtube_link",
    icon: "Youtube",
    placeholder: "YouTube Channel",
    color: "text-[#FF0000]",
  },
  {
    id: "telegram_link",
    icon: "SendHorizontal",
    placeholder: "Telegram Handle",
    color: "text-[#229ED9]",
  },
  {
    id: "insta_link",
    icon: "Instagram",
    placeholder: "Instagram Handle",
    color: "text-[#E4405F] hover:text-[#D6294E]",
  },
];

export const typographyPersonalities = [
  { name: "Classic News", family: "'Georgia', serif" },
  { name: "Modern Digital", family: "'Inter', sans-serif" },
  { name: "Editorial", family: "'Playfair Display', serif" },
  { name: "Minimalist", family: "'Helvetica Neue', sans-serif" },
  { name: "Tech Journal", family: "'Roboto Mono', monospace" },
  { name: "Royal", family: "'Baskerville', serif" },
  { name: "Corporate", family: "'Montserrat', sans-serif" },
  { name: "Compact", family: "'Roboto Condensed', sans-serif" },
  { name: "Traditional", family: "'Times New Roman', serif" },
  { name: "Artistic", family: "'Cormorant Garamond', serif" },
];