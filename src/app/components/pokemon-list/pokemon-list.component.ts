import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { Pokemon, PokemonService } from "src/app/services/pokemon.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "app-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.scss"],
})
export class PokemonListComponent implements OnInit {
  pokemonName = "";
  currentAddTimeout: any;
  pokemons: Pokemon[] = [];
  error: string | undefined;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private api: ApiService,
    private toastService: ToastService,
  ) {
    this.pokemons = this.pokemonService.pokemons;
  }

  ngOnInit(): void {
    this.fetchPokemons();
  }

  generateBackgroundColor() {
    return this.pokemons.length > 5 ? "#6200EE" : "#3700b3";
  }

  addPokemon() {
    if (!this.pokemonService.canAddPokemon(this.pokemonName)) return;
    this.sendPokemonToApi(this.pokemonName);
    this.pokemonName = "";
  }

  sendPokemonToApi(name: string) {
    this.api.postPokemon(name).subscribe(() => {
      this.toastService.show('Pokémon added', `Pokémon ${name} has been added`);
      this.fetchPokemons();
    });
  }

  fetchPokemons() {
    this.api.fetchPokemons().subscribe((pokemons: Pokemon[]) => {
      this.pokemons = [...pokemons];
      this.pokemonService.pokemons = this.pokemons;
    }, (error) => {
      //console.error(error);
      this.error = error.message; 
    });
  }
}
