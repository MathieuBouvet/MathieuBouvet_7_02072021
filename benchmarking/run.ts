import { Benchmark } from "benchmark";

import mainSearch from "../src/utils/mainSearch";
import { recipes } from "../src/data/recipes";

const suite = new Benchmark.Suite();

suite.add("Lots of matches in the description", () => mainSearch(recipes, "ajouter"));
suite.add("Lots of matches, mainly in ingredients", () => mainSearch(recipes, "sucre"));
suite.add("3 character search", () => mainSearch(recipes, "mie"));
suite.add("1 match from the title", () => mainSearch(recipes, "sandwich"));
suite.add("no matches", () => mainSearch(recipes, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));


suite.on("start", function() {
  console.log("Benchmarking started");
});

suite.on("cycle", event => {
  console.log(String(event.target));
});

suite.on("complete", function() {
  console.log("Test completed");
});

suite.run();
