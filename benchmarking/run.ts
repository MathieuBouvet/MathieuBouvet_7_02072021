import { Benchmark } from "benchmark";

import mainSearch from "../src/utils/mainSearch";
import { recipes } from "../src/data/recipes";

const suite = new Benchmark.Suite();

const search = "ajouter"

suite.add("main search", () => mainSearch(recipes, search));

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
