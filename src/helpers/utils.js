export const rage = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start);
};
