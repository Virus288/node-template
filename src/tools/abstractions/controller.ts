export default abstract class AbstractController<T, U> {
  async execute(_data: T): Promise<U> {
    return new Promise((resolve) => {
      resolve(undefined as U);
    });
  }
}
