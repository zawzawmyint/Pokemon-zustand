import "./App.css";
import create from "zustand";
import { useEffect } from "react";

const POKEMON_URL =
  "https://gist.githubusercontent.com/jherr/23ae3f96cf5ac341c98cd9aa164d2fe3/raw/0658aeff401d196dece7ec6fe6c726c6adc1cc00/gistfile1.txt";
// create a zustand
const useStore = create((set) => ({
  filter: "",
  pokemons: [],
  setFilter: (filter) =>
    set((state) => ({
      ...state,
      filter,
    })),
  setPokemons: (pokemons) =>
    set((state) => ({
      ...state,
      pokemons,
    })),
}));

const FilterInput = () => {
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);
  return <input value={filter} onChange={(e) => setFilter(e.target.value)} />;
};

const PokemonTable = () => {
  const pokemons = useStore((state) => state.pokemons);
  const filter = useStore((state) => state.filter);
  return (
    <table width="100%">
      <tbody>
        {pokemons
          .filter(({ name: { english } }) =>
            english.toLowerCase().includes(filter.toLowerCase())
          )
          .map(({ id, name: { english }, type }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{english}</td>
              <td>{type.join(", ")}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

function App() {
  const filter = useStore((state) => state.fil);
  const setPokemons = useStore((state) => state.setPokemons);
  const pokemons = useStore((state) => state.pokemons);

  useEffect(() => {
    fetch(POKEMON_URL)
      .then((res) => res.json())
      .then((data) => setPokemons(data));
  });

  return (
    <div className="App">
      <FilterInput />
      <PokemonTable />
    </div>
  );
}

export default App;
