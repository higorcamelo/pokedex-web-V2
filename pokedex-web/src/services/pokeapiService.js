import axios from 'axios';

const baseUrl = 'https://pokeapi.co/api/v2/';

export async function getAllPKMN(gen) {
  if(!gen){
    gen = 1
  }
  try {
    const resposta = await axios.get(`${baseUrl}generation/${gen}`); //TODO: Fazer aqui um ajuste para exibir por geração
    console.log(resposta.data.pokemon_species)
    return resposta.data.pokemon_species;
  } catch (error) {
    console.error(error);
    return [];
  }
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

export async function getPKMNDetails(url){
    try {
        const resposta = await axios.get(url);
        return resposta.data;
      } catch (error) {
        console.error(error);
        return null;
      }
}

