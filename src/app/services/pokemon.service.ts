import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

export interface Pokemon {
  id?: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemons: Pokemon[] = [];

  constructor(private toastService: ToastService) {

  }

  storePokemonList() {
    localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
  }

  canAddPokemon(name: string): boolean {
    if (!name) return false;
    if (this.findPokemonByName(name)) return false;
    return true;
  }

  findPokemonByName(name: string) {
    return this.pokemons.find(pokemon => pokemon.name === name);
  }

  findPokemonIndexByName(name: string) {
    return this.pokemons.findIndex(pokemon => pokemon.name === name);
  }

  removePokemon(index: number) {
    this.pokemons.splice(index, 1);
    this.storePokemonList();
  }

  removePokemonByName(name: string | undefined) {
    if (!name) {
      throw new Error('Pokemon Name should be set');
    }
    const pokemonIndex = this.findPokemonIndexByName(name);
    this.removePokemon(pokemonIndex);
    this.toastService.show('Pokémon removed', `Pokémon ${name} has been removed`);

  }

  getNextPokemonName(currentPokemonName: string | undefined): string {
    if (!currentPokemonName) throw new Error('Can\'t find Pokemon');
    const pokemonIndex = this.findPokemonIndexByName(currentPokemonName);
    return this.pokemons[pokemonIndex + 1].name;
  }

  getPreviousPokemonName(currentPokemonName: string | undefined): string {
    if (!currentPokemonName) throw new Error('Can\'t find Pokemon');
    const pokemonIndex = this.findPokemonIndexByName(currentPokemonName);
    return this.pokemons[pokemonIndex - 1].name;
  }
}
