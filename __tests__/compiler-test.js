import compiler from "./fixtures/compiler.js";

test("generates i18njs from po files", async () => {
  const stats = await compiler("test.po");
  const output = stats.toJson({ source: true }).modules[0].source;

  expect(output).toBe(`module.exports = {"Hello world!":"Hello world!"}`);
});
