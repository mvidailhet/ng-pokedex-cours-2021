import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
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

  constructor(private toastService: ToastService, private api: ApiService) {

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

  findPokemonIdByName(name: string) {
    const pokemon = this.findPokemonByName(name);
    console.log(this.pokemons);
    return pokemon?.id;
  }

  removePokemonByName(name: string | undefined) {
    if (!name) {
      throw new Error('Pokemon Name should be set');
    }
    const pokemonId = this.findPokemonIdByName(name);
    console.log(pokemonId);
    if (!pokemonId) return;
    this.api.deletePokemon(pokemonId).subscribe(() => {
      this.toastService.show('Pokémon removed', `Pokémon ${name} has been removed`);
    });
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
