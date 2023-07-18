import axios from 'axios';

const baseUrl = 'https://pokeapi.co/api/v2/';

export async function getAllPKMN() {
  try {
    const resposta = await axios.get(`${baseUrl}pokemon?limit=151`);
    return resposta.data.results;
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

