const requirement = global.__REQUIREMENTS__;
const testCoverage = require("../config/utils/testCoverage");
const frontEndCoverage = async () => testCoverage("front-end");
const backEndCoverage = async () => testCoverage("back-end");

let frontEnd;
let backEnd;

beforeAll(async ()=>{
  const results = await Promise.all([frontEndCoverage(), backEndCoverage()]);
  frontEnd = results[0];
  backEnd = results[1];

  expect(frontEnd).toMatchObject({
    path: expect.any(String),
    skipped: expect.any(Number),
    pct: expect.any(Number),
    covered: expect.any(Number),
  });
  expect(backEnd).toMatchObject({
    path: expect.any(String),
    skipped: expect.any(Number),
    pct: expect.any(Number),
    covered: expect.any(Number),
  });
});

describe(requirement(42), () => {
  test("No front-end e no back-end", () => {
    expect(frontEnd.skipped).toStrictEqual(0);
    expect(frontEnd.pct).toBeGreaterThanOrEqual(30);
    expect(frontEnd.covered).toBeGreaterThanOrEqual(75);

    expect(backEnd.skipped).toStrictEqual(0);
    expect(backEnd.pct).toBeGreaterThanOrEqual(30);
    expect(backEnd.covered).toBeGreaterThanOrEqual(75);
  });
});

describe(requirement(43), () => {
  test("No front-end e no back-end", () => {
    expect(frontEnd.skipped).toStrictEqual(0);
    expect(frontEnd.pct).toBeGreaterThanOrEqual(60);
    expect(frontEnd.covered).toBeGreaterThanOrEqual(150);

    expect(backEnd.skipped).toStrictEqual(0);
    expect(backEnd.pct).toBeGreaterThanOrEqual(60);
    expect(backEnd.covered).toBeGreaterThanOrEqual(150);
  });
});

describe(requirement(44), () => {
  test("No front-end e no back-end", () => {
    expect(frontEnd.skipped).toStrictEqual(0);
    expect(frontEnd.pct).toBeGreaterThanOrEqual(90);
    expect(frontEnd.covered).toBeGreaterThanOrEqual(225);

    expect(backEnd.skipped).toStrictEqual(0);
    expect(backEnd.pct).toBeGreaterThanOrEqual(90);
    expect(backEnd.covered).toBeGreaterThanOrEqual(225);
  });
});
