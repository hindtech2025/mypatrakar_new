export const useFormLogic = (formData, setFormData) => {
  const normalizeDomain = (raw) => {
    if (!raw) return "";
    let stripped = raw.replace(/^https?:\/\//i, "").replace(/^www\./i, "");
    stripped = stripped.toLowerCase();
    return `https://www.${stripped}`;
  };

  return {
    normalizeDomain,
  };
};