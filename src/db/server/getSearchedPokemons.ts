export const getSearchedPokemons = async (searchPhrase?: string) => {
  const resp = await fetch(`/api/search?name=${searchPhrase}`);

  const fusedOptions = await resp.json();
  return fusedOptions;
};
