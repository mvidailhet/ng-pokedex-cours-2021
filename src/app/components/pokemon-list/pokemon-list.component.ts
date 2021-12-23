import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PokemonService } from "src/app/services/pokemon.service";

@Component({
  selector: "app-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.scss"],
})
export class PokemonListComponent implements OnInit {
  @ViewChild("nameInput") nameInputElementRef: ElementRef | undefined;
  addButtonClicked = false;
  removeButtonClicked = false;
  pokemonName = "";
  currentAddTimeout: any;
  pokemons!: string[];

  constructor(private pokemonService: PokemonService, private router: Router) {
    this.pokemons = this.pokemonService.pokemons;
  }

  ngOnInit(): void {}

  generateBackgroundColor() {
    return this.pokemons.length > 5 ? "#6200EE" : "#3700b3";
  }

  addPokemon() {
    if (this.currentAddTimeout) return;

    const pokemonAdded = this.pokemonService.addPokemon(this.pokemonName);

    if (!pokemonAdded) return;

    this.pokemonName = '';
    this.removeButtonClicked = false;
    this.addButtonClicked = true;

    this.currentAddTimeout = setTimeout(() => {
      this.addButtonClicked = false;
      this.currentAddTimeout = null;
    }, 2000);
  }

  removePokemon(index: number) {
    this.removeButtonClicked = true;
    this.addButtonClicked = false;
    this.pokemonService.removePokemon(index);
  }
}
