import assert from "node:assert";
import { describe, it } from "node:test";

import compiler from "./fixtures/compiler.js";

describe("compilation", () => {
  it("generates i18njs from po files", async () => {
    const stats = await compiler("test.po");
    const output = stats.toJson({ source: true }).modules[0].source;

    assert.equal(output, `module.exports = {"Hello world!":"Hello world!"}`);
  });
});
