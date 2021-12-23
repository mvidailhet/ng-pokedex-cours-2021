import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PokemonService } from "src/app/services/pokemon.service";
import { DB_CONNECTION_URL } from "src/connect";

@Component({
  selector: "app-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.scss"],
})
export class PokemonListComponent implements OnInit {
  pokemonName = "";
  currentAddTimeout: any;
  pokemons!: string[];

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private http: HttpClient
  ) {
    this.pokemons = this.pokemonService.pokemons;
  }

  ngOnInit(): void {}

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
    this.http.post(
      DB_CONNECTION_URL,
      { name }
    ).subscribe((responseData) => {
      console.log(responseData);
    });
  }

  removePokemon(index: number) {
    this.pokemonService.removePokemon(index);
  }
}
