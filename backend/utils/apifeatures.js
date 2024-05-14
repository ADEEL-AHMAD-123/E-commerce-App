const applyFilters = (filters) => {
  const filterCriteria = {};

  // Keyword search (partial match for product name)
  if (filters.keyword) {
    const keywordRegex = new RegExp(filters.keyword, 'i'); // Case-insensitive regex
    filterCriteria.name = { $regex: keywordRegex };
  }

  // Category search
  if (filters.category) {
    filterCriteria.category = filters.category;
  }

  // Dynamic function to apply gte/lte filters
  const applyRangeFilter = (field, value) => {
    if (value && value.gte && value.lte) {
      const gte = parseFloat(value.gte);
      const lte = parseFloat(value.lte);
      if (!isNaN(gte) && !isNaN(lte)) {
        filterCriteria[field] = { $gte: gte, $lte: lte };
      }
    }
  };

  // Price filter
  applyRangeFilter('price', filters.price);

  // Rating filter
  applyRangeFilter('rating', filters.rating);

  // Add more filters as needed

  return filterCriteria;
};

const getPagination = (page, limit) => {
  const parsedPage = parseInt(page, 10) || 1;
  const parsedLimit = parseInt(limit, 10) || 10;
  const skip = (parsedPage - 1) * parsedLimit;

  return { page: parsedPage, limit: parsedLimit, skip };
};

module.exports = { applyFilters, getPagination };
