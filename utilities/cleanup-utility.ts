export type CleanupFn = () => Promise<void>;

export class CleanupRegistry {
  private cleanups: CleanupFn[] = [];
  private executed = false;

  register(cleanup: CleanupFn): void {
    this.cleanups.push(cleanup);
  }

  registerEntity<T>(entity: T, deleteFn: (entity: T) => Promise<void>): T {
    this.cleanups.push(() => deleteFn(entity));
    return entity;
  }

  async runAll(): Promise<void> {
    this.executed = true;

    const errors: Error[] = [];
    const cleanupsCopy = [...this.cleanups].reverse();
    this.cleanups = [];

    for (const cleanup of cleanupsCopy) {
      try {
        await cleanup();
      } catch (error) {
        errors.push(error as Error);
        console.warn('Cleanup failed:', error);
      }
    }

    if (errors.length > 0) {
      console.error(`${errors.length} cleanup(s) failed`);
    }
  }

  async executeAll(): Promise<void> {
    return this.runAll();
  }

  get count(): number {
    return this.cleanups.length;
  }

  get wasExecuted(): boolean {
    return this.executed;
  }
}
