import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemons: string[] = [];

  constructor(private toastService: ToastService) {
    const storagePokemons = localStorage.getItem('pokemons');
    if (!storagePokemons) return;
    this.pokemons = JSON.parse(storagePokemons);

    this.removePokemon(10);
  }

  storePokemonList() {
    localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
  }

  addPokemon(name: string): boolean {
    if (!name) return false;
    if (this.pokemons.includes(name)) return false;
    this.pokemons.push(name);
    this.toastService.show('Pokémon added', `Pokémon ${name} has been added`);

    this.storePokemonList();
    return true;
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
    this.toastService.show('Pokémon removed', `Pokémon ${name} has been removed`);

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
