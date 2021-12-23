import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemons: string[] = [];

  constructor() {
    const storagePokemons = localStorage.getItem('pokemons');
    if (!storagePokemons) return;
    this.pokemons = JSON.parse(storagePokemons);

    this.removePokemon(10);
  }

  storePokemonList() {
    localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
  }

  addPokemon(name: string) {
    this.pokemons.push(name);
    this.storePokemonList();
  }

  removePokemon(index: number) {
    this.pokemons.splice(index, 1);
    this.storePokemonList();
  }

  removePokemonByName(name: string | undefined) {
    if (!name) {
      throw new Error('Pokemon Name should be set');
    }
    const pokemonIndex = this.pokemons.indexOf(name);
    this.removePokemon(pokemonIndex);
  }

  getNextPokemonName(currentPokemonName: string | undefined) {
    if (!currentPokemonName) throw new Error('Can\'t find Pokemon');
    const pokemonIndex = this.pokemons.indexOf(currentPokemonName);
    return this.pokemons[pokemonIndex + 1];
  }

  getPreviousPokemonName(currentPokemonName: string | undefined) {
    if (!currentPokemonName) throw new Error('Can\'t find Pokemon');
    const pokemonIndex = this.pokemons.indexOf(currentPokemonName);
    return this.pokemons[pokemonIndex - 1];
  }
}
