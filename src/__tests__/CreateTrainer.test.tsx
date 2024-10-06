import { createTrainer, FormStateType } from "../actions/createTrainer";

describe("createTrainer", () => {
  it("should return no errors and set isModalOpen to true for valid input", async () => {
    const formData = new FormData();
    formData.append("age", "20");
    formData.append("name", "Ash");
    formData.append("pokemon", "Pikachu");

    const result: FormStateType = await createTrainer({}, formData);

    expect(result.errors).toHaveLength(0);
    expect(result.isModalOpen).toBe(true);
  });

  it("should return an error for age less than 16", async () => {
    const formData = new FormData();
    formData.append("age", "15");
    formData.append("name", "Ash");
    formData.append("pokemon", "Pikachu");

    const result: FormStateType = await createTrainer({}, formData);

    expect(result.errors).toHaveLength(1);
    expect(result.isModalOpen).toBe(false);
    expect(result.errors[0].message).toBe("Required range from 16-99");
  });

  it("should return an error for age greater than 99", async () => {
    const formData = new FormData();
    formData.append("age", "100");
    formData.append("name", "Ash");
    formData.append("pokemon", "Pikachu");

    const result: FormStateType = await createTrainer({}, formData);

    expect(result.errors).toHaveLength(1);
    expect(result.isModalOpen).toBe(false);
    expect(result.errors[0].message).toBe("Required range from 16-99");
  });

  it("should return an error for name less than 2 characters", async () => {
    const formData = new FormData();
    formData.append("age", "20");
    formData.append("name", "A");
    formData.append("pokemon", "Pikachu");

    const result: FormStateType = await createTrainer({}, formData);

    expect(result.errors).toHaveLength(1);
    expect(result.isModalOpen).toBe(false);
    expect(result.errors[0].message).toBe("Required from 2 to 20 symbols");
  });

  it("should return an error for name greater than 20 characters", async () => {
    const formData = new FormData();
    formData.append("age", "20");
    formData.append("name", "A very long name that exceeds the limit");
    formData.append("pokemon", "Pikachu");

    const result: FormStateType = await createTrainer({}, formData);

    expect(result.errors).toHaveLength(1);
    expect(result.isModalOpen).toBe(false);
    expect(result.errors[0].message).toBe("Required from 2 to 20 symbols");
  });

  it("should return an error when no Pokemon is selected", async () => {
    const formData = new FormData();
    formData.append("age", "20");
    formData.append("name", "Ash");
    formData.append("pokemon", "");

    const result: FormStateType = await createTrainer({}, formData);

    expect(result.errors).toHaveLength(1);
    expect(result.isModalOpen).toBe(false);
    expect(result.errors[0].message).toBe("Choose something");
  });
});
