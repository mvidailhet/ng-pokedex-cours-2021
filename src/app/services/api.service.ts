import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Pokemon, PokemonTypeEnum } from "./pokemon.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  apiUrl =
    "https://ng-pokedex-2021-mitch-default-rtdb.europe-west1.firebasedatabase.app";

  constructor(private http: HttpClient) {}

  postPokemon(name: string, type: PokemonTypeEnum): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/pokemons.json`, { name, type });
  }

  deletePokemon(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/pokemons/${id}.json`);
  }

  fetchPokemons(): Observable<Pokemon[]> {
    let pokemons: Pokemon[] = [];
    return this.http.get(`${this.apiUrl}/pokemons.json`).pipe(
      map((pokemonsObject) => {
        Object.entries(pokemonsObject).forEach(([key, pokemon]) => {
          pokemons.push({
            ...pokemon,
            id: key,
          });
        });
        return pokemons;
      })
    );
  }
}
