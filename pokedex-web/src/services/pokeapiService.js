import axios from 'axios';

const baseUrl = 'https://pokeapi.co/api/v2/';

export async function getAllPkmn(gen) {
  if (!gen) {
    gen = 1;
  }
  try {
    const resposta = await axios.get(`${baseUrl}generation/${gen}`);
    const pokemons = resposta.data.pokemon_species;

    // Mapear os Pokemons para obter seus detalhes e tipos
    const pokemonListPromises = pokemons.map(async (pokemon) => {
      const detailsResponse = await axios.get(`${baseUrl}pokemon/${extractPokemonIdFromUrl(pokemon.url)}`);
      const details = detailsResponse.data;
      return {
        id: details.id,
        name: details.name,
        types: details.types.map((typeObj) => typeObj.type.name).join(' / '),
      };
    });

    // Aguardar todas as chamadas assíncronas para obter os detalhes dos Pokemons
    const pokemonList = await Promise.all(pokemonListPromises);

    // Ordenar a lista de Pokemons por ID
    pokemonList.sort((a, b) => a.id - b.id);

    //console.log(pokemonList);
    return pokemonList;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function extractPokemonIdFromUrl(url) {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2]);
}

export async function getByNamePKMN(nome) {
  try {
    const resposta = await axios.get(`${baseUrl}pokemon/${nome}`);
    return resposta.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPkmnDetails(id){
    try {
        const resposta = await axios.get(`${baseUrl}pokemon/${id}`);
        const data = resposta.data
        const pokemonDetalhes = {
          nome: data.name,
          imagem: data.sprites.other['official-artwork'].front_default, // Use as aspas simples para acessar a propriedade com hífen
          tipos: data.types,
          habilidades: data.abilities,
          stats: data.stats,
          ataques: data.moves,
        }
        console.log(data.moves.version_group_details)
        return pokemonDetalhes;
      } catch (error) {
        console.error(error);
        return null;
      }
}

