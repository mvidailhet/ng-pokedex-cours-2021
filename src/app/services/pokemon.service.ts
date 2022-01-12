import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ToastService } from './toast.service';

export enum PokemonTypeEnum {
  FIRE = "FIRE",
  GRASS = "GRASS",
  WATER = "WATER",
  POISON = "POISON",
}
export interface Pokemon {
  id?: string;
  name: string;
  type: PokemonTypeEnum;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemons: Pokemon[] = [];

  constructor(private toastService: ToastService, private api: ApiService) {
  }

  canAddPokemon(name: string, type: PokemonTypeEnum | undefined): boolean {
    if (!name || !type) return false;
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

  getNextPokemonName(currentPokemonName: string | undefined): string | undefined {
    if (!currentPokemonName) throw new Error('Can\'t find Pokemon');
    const pokemonIndex = this.findPokemonIndexByName(currentPokemonName);
    if (!this.pokemons[pokemonIndex + 1]) return;
    return this.pokemons[pokemonIndex + 1].name;
  }

  getPreviousPokemonName(currentPokemonName: string | undefined): string | undefined {
    if (!currentPokemonName) throw new Error('Can\'t find Pokemon');
    const pokemonIndex = this.findPokemonIndexByName(currentPokemonName);
    if (!this.pokemons[pokemonIndex - 1]) return;
    return this.pokemons[pokemonIndex - 1].name;
  }
}
