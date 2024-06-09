export const Search = (coins: string[], searchTerm: string) => {
  const SearchTerm = searchTerm.toLowerCase().trim();
  const filteredCoins: string[] = coins.filter((coin) =>
    coin.toLowerCase().includes(SearchTerm)
  );
  return filteredCoins;
};
