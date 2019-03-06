const excerpt = (string = "") =>
  string
    .trim()
    .replace(/\s+/g, "_")
    .replace(/\W+/g, "");

module.exports = excerpt;
