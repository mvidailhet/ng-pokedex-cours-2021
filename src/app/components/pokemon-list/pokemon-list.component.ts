import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PokemonService } from "src/app/services/pokemon.service";

export interface Pokemon {
  id?: string;
  name: string;
}

@Component({
  selector: "app-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.scss"],
})
export class PokemonListComponent implements OnInit {
  pokemonName = "";
  currentAddTimeout: any;
  pokemons: Pokemon[] = [];

  apiUrl =
    "https://ng-pokedex-2021-mitch-default-rtdb.europe-west1.firebasedatabase.app";

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private http: HttpClient
  ) {
    //this.pokemons = this.pokemonService.pokemons;
  }

  ngOnInit(): void {
    this.fetchPokemons();
  }

  generateBackgroundColor() {
    return this.pokemons.length > 5 ? "#6200EE" : "#3700b3";
  }

  addPokemon() {
    const pokemonAdded = this.pokemonService.addPokemon(this.pokemonName);
    if (!pokemonAdded) return;
    this.sendPokemonToApi(this.pokemonName);
    this.pokemonName = "";
  }

  sendPokemonToApi(name: string) {
    this.http
      .post(`${this.apiUrl}/pokemons.json`, { name })
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchPokemons() {
    this.http.get(`${this.apiUrl}/pokemons.json`).subscribe((pokemonsObject) => {
      Object.entries(pokemonsObject).forEach(([key, pokemon]) => {
        this.pokemons.push({
          ...pokemon,
          id: key,
        });
      });
      console.log(pokemonsObject);
      console.log(this.pokemons);
    });
  }

  removePokemon(index: number) {
    this.pokemonService.removePokemon(index);
  }
}
