import {
  Component,
  HostListener,
  Input,
} from "@angular/core";
import { Router } from "@angular/router";
import { PokemonService } from "src/app/services/pokemon.service";

@Component({
  selector: "app-pokemon-item",
  templateUrl: "./pokemon-item.component.html",
  styleUrls: ["./pokemon-item.component.scss"],
})
export class PokemonItemComponent {
  @Input() name: string | undefined;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  @HostListener("click") click() {
    this.goToPokemon();
  }

  goToPokemon() {
    this.router.navigate(["/pokemon", this.name]);
  }

  remove($event: MouseEvent) {
    $event.stopPropagation();
    this.pokemonService.removePokemonByName(this.name);
  }
}
