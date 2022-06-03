const validation = require('./modules/validation');

test("Check for illegal characters in string", () => {
  expect(validation.validateInput("hello")).toBe(true);
  expect(validation.validateInput("<>")).toBe(false);
  expect(validation.validateInput(".")).toBe(true);
  expect(validation.validateInput("test{|")).toBe(false);
});

test("Check format of email matches the school", () => {
  expect(validation.validateEmail("test")).toBe(false);
  expect(validation.validateEmail("hello@")).toBe(false);
  expect(validation.validateEmail("hello@school")).toBe(false);
  expect(validation.validateEmail("hello@me")).toBe(false);
  expect(validation.validateEmail("hello@school.")).toBe(false);
  expect(validation.validateEmail("hello@me.")).toBe(false);
  expect(validation.validateEmail("hello@me.com")).toBe(false);
  expect(validation.validateEmail("hello@school.com")).toBe(true);
  expect(validation.validateEmail("hello@school'com")).toBe(false);
  expect(validation.validateEmail("hello@school,com")).toBe(false);
  expect(validation.validateEmail("hello@school;com")).toBe(false);
  expect(validation.validateEmail("hello@school-com")).toBe(false);
  expect(validation.validateEmail("hello@school\.com")).toBe(true);
  expect(validation.validateEmail("hello@school\com")).toBe(false);
  expect(validation.validateEmail("@school.com")).toBe(false);
  expect(validation.validateEmail("testschool.com")).toBe(false);
  expect(validation.validateEmail("@.com")).toBe(false);
});

test("Validate UK Postcode", () => {
  expect(validation.validatePostcode("CV327AY")).toBe(true);
  expect(validation.validatePostcode("CV32 7AY")).toBe(true);
  expect(validation.validatePostcode("cv327ay")).toBe(true);
  expect(validation.validatePostcode("cv32 7ay")).toBe(true);
  expect(validation.validatePostcode("c32 7ay")).toBe(false);
  expect(validation.validatePostcode("cv32 75y")).toBe(false);
  expect(validation.validatePostcode("c32 7ay")).toBe(false);
  expect(validation.validatePostcode("c32a 7ay")).toBe(false);
  expect(validation.validatePostcode("c324 7ay")).toBe(false);
  expect(validation.validatePostcode("cV32 7ay")).toBe(true);
});