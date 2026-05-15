export const GA_MEASUREMENT_ID = "G-MT7Q83RKKX";

export const pageview = (url) => {
  if (!window.gtag) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};
