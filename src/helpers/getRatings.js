/**
 * Get the total rating
 *
 * @returns {Number} rate
 * @param {Array} Ratings
 */
const ratings = Ratings => {
  let prev = 0;
  if (!Ratings) return;
  Ratings.map(({ rate }) => {
    prev += rate;
    return prev;
  });
  return (prev / Ratings.length).toPrecision(2) || 0;
};

export default ratings;
