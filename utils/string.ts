export const formatSlug = (slug: string) => {
  if (!slug) return "";
  return slug.split("-").join(" ").toUpperCase();
};
