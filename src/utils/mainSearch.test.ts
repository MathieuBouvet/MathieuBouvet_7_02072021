import mainSearch from "./mainSearch";
import { recipes } from "../data/recipes";

test("Title match", () => {
  const results = mainSearch(recipes, "Limonade");

  expect(results.length).toBe(2);
  expect(results[0].id).toBe(1);
  expect(results[1].id).toBe(40);
});

test("Ingredient match", () => {
  const results = mainSearch(recipes, "miel");

  expect(results.length).toBe(1);
  expect(results[0].id).toBe(49);
});

test("Description match", () => {
  const results = mainSearch(recipes, "Étaler");

  expect(results.length).toBe(3);
  expect(results[0].id).toBe(5);
  expect(results[1].id).toBe(33);
  expect(results[2].id).toBe(48);
});

test("Multiple field match", () => {
  const results = mainSearch(recipes, "Banane");

  expect(results.length).toBe(3);
  expect(results[0].id).toBe(15);
  expect(results[1].id).toBe(19);
  expect(results[2].id).toBe(49);
});

test("No match", () => {
  const results = mainSearch(recipes, "aaaaaaa");
  expect(results.length).toBe(0);
});
