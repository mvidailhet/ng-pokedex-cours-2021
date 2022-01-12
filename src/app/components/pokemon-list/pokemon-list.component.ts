import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { delay } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import { Pokemon, PokemonService, PokemonTypeEnum } from "src/app/services/pokemon.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "app-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.scss"],
})
export class PokemonListComponent implements OnInit {
  pokemonName = "";
  pokemonType?: PokemonTypeEnum;
  currentAddTimeout: any;
  pokemons: Pokemon[] = [];
  error: string | undefined;
  isLoading = true;
  pokemonTypeEnum = PokemonTypeEnum;

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
    if (!this.pokemonService.canAddPokemon(this.pokemonName, this.pokemonType)) return;
    if (!this.pokemonType) return;
    this.sendPokemonToApi(this.pokemonName, this.pokemonType);
    this.pokemonName = "";
  }

  sendPokemonToApi(name: string, type: PokemonTypeEnum) {
    this.api.postPokemon(name, type).subscribe(() => {
      this.toastService.show('Pokémon added', `Pokémon ${name} has been added`);
      this.fetchPokemons();
    });
  }

  fetchPokemons() {

    this.api.fetchPokemons().pipe(delay(2000)).subscribe((pokemons: Pokemon[]) => {
      this.pokemons = [...pokemons];
      this.pokemonService.pokemons = this.pokemons;
      this.isLoading = false;
    }, (error) => {
      //console.error(error);
      this.error = error.message; 
      this.isLoading = false;
    });
  }
}
