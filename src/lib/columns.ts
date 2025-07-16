import { faker } from "@faker-js/faker";
export type Data = {
  id: string;
  fileName: string;
  uploadDateRaw: Date;
  uploadDate: string;
  conversionStatus: number;
  e2bR3File: boolean;
};

function capitalise(arg0: string): string {
  return arg0.replace(/\b\w/g, (char) => char.toUpperCase());
}
export const data: Data[] = Array.from({ length: 100 }, () => {
  const randomDate = faker.date.between({
    from: "2023-01-01",
    to: "2025-07-14",
  });
  return {
    id: faker.string.uuid(),
    fileName: `${capitalise(
      faker.lorem.words({
        min: 1,
        max: 3,
      })
    )}_${faker.number.int({
      min: 1000,
      max: 9999,
    })}.${faker.helpers.arrayElement(["xml"])}`,
    uploadDateRaw: randomDate,
    uploadDate: randomDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    conversionStatus: faker.number.int({ min: 0, max: 100 }),
    e2bR3File: faker.datatype.boolean(),
  };
});
