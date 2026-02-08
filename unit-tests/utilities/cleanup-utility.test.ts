import { test, expect } from '@playwright/test';
import { CleanupRegistry, CleanupFn } from '../../utilities/cleanup-utility';

test.describe('CleanupRegistry', () => {
  test.describe('register()', () => {
    test('should add cleanup function to registry', async () => {
      const registry = new CleanupRegistry();
      const mockFn: CleanupFn = async () => {};

      registry.register(mockFn);

      expect(registry.count).toBe(1);
    });

    test('should allow registering multiple cleanup functions', async () => {
      const registry = new CleanupRegistry();

      registry.register(async () => {});
      registry.register(async () => {});
      registry.register(async () => {});

      expect(registry.count).toBe(3);
    });
  });

  test.describe('registerEntity()', () => {
    test('should return the same entity that was passed in', async () => {
      const registry = new CleanupRegistry();
      const entity = { id: 'test-123', name: 'Test Entity' };

      const result = registry.registerEntity(entity, async () => {});

      expect(result).toBe(entity);
      expect(result.id).toBe('test-123');
    });

    test('should register a cleanup function for the entity', async () => {
      const registry = new CleanupRegistry();
      const entity = { id: 'test-456' };

      registry.registerEntity(entity, async () => {});

      expect(registry.count).toBe(1);
    });

    test('should call deleteFn with correct entity during executeAll', async () => {
      const registry = new CleanupRegistry();
      const entity = { id: 'entity-789' };
      let capturedEntity: typeof entity | null = null;

      registry.registerEntity(entity, async (e) => {
        capturedEntity = e;
      });

      await registry.executeAll();

      expect(capturedEntity).toBe(entity);
    });

    test('should work with different entity types (generics)', async () => {
      const registry = new CleanupRegistry();
      const stringEntity = 'test-string';
      const numberEntity = 42;
      const objectEntity = { complex: { nested: true } };

      const resultString = registry.registerEntity(stringEntity, async () => {});
      const resultNumber = registry.registerEntity(numberEntity, async () => {});
      const resultObject = registry.registerEntity(objectEntity, async () => {});

      expect(resultString).toBe('test-string');
      expect(resultNumber).toBe(42);
      expect(resultObject.complex.nested).toBe(true);
      expect(registry.count).toBe(3);
    });
  });

  test.describe('executeAll()', () => {
    test('should execute cleanups in LIFO (reverse) order', async () => {
      const registry = new CleanupRegistry();
      const executionOrder: number[] = [];

      registry.register(async () => { executionOrder.push(1); });
      registry.register(async () => { executionOrder.push(2); });
      registry.register(async () => { executionOrder.push(3); });

      await registry.executeAll();

      expect(executionOrder).toEqual([3, 2, 1]);
    });

    test('should clear registry after execution', async () => {
      const registry = new CleanupRegistry();
      registry.register(async () => {});
      registry.register(async () => {});
      expect(registry.count).toBe(2);

      await registry.executeAll();

      expect(registry.count).toBe(0);
    });

    test('should handle empty registry without errors', async () => {
      const registry = new CleanupRegistry();

      await expect(registry.executeAll()).resolves.toBeUndefined();
      expect(registry.count).toBe(0);
    });

    test('should continue execution when a cleanup throws an error', async () => {
      const registry = new CleanupRegistry();
      const executionOrder: number[] = [];

      registry.register(async () => { executionOrder.push(1); });
      registry.register(async () => { throw new Error('Cleanup 2 failed'); });
      registry.register(async () => { executionOrder.push(3); });

      const originalWarn = console.warn;
      const originalError = console.error;
      console.warn = () => {};
      console.error = () => {};

      await registry.executeAll();

      console.warn = originalWarn;
      console.error = originalError;

      expect(executionOrder).toEqual([3, 1]);
    });

    test('should log warning when cleanup fails', async () => {
      const registry = new CleanupRegistry();
      const testError = new Error('Test cleanup failure');
      registry.register(async () => { throw testError; });

      const warnings: unknown[] = [];
      const errors: unknown[] = [];
      const originalWarn = console.warn;
      const originalError = console.error;
      console.warn = (...args: unknown[]) => { warnings.push(args); };
      console.error = (...args: unknown[]) => { errors.push(args); };

      await registry.executeAll();

      console.warn = originalWarn;
      console.error = originalError;

      expect(warnings.length).toBe(1);
      expect(warnings[0]).toContain('Cleanup failed:');
      expect(errors.length).toBe(1);
      expect(errors[0]).toContain('1 cleanup(s) failed');
    });

    test('should report correct count when multiple cleanups fail', async () => {
      const registry = new CleanupRegistry();
      registry.register(async () => { throw new Error('Error 1'); });
      registry.register(async () => { throw new Error('Error 2'); });
      registry.register(async () => { throw new Error('Error 3'); });

      const warnings: unknown[] = [];
      const errors: unknown[] = [];
      const originalWarn = console.warn;
      const originalError = console.error;
      console.warn = (...args: unknown[]) => { warnings.push(args); };
      console.error = (...args: unknown[]) => { errors.push(args); };

      await registry.executeAll();

      console.warn = originalWarn;
      console.error = originalError;

      expect(warnings.length).toBe(3);
      expect(errors[0]).toContain('3 cleanup(s) failed');
    });

    test('should not log error when all cleanups succeed', async () => {
      const registry = new CleanupRegistry();
      registry.register(async () => {});
      registry.register(async () => {});

      const errors: unknown[] = [];
      const originalError = console.error;
      console.error = (...args: unknown[]) => { errors.push(args); };

      await registry.executeAll();

      console.error = originalError;

      expect(errors.length).toBe(0);
    });

    test('should allow re-registering after executeAll clears', async () => {
      const registry = new CleanupRegistry();
      const executionOrder: string[] = [];

      registry.register(async () => { executionOrder.push('first-batch'); });
      await registry.executeAll();

      registry.register(async () => { executionOrder.push('second-batch'); });
      await registry.executeAll();

      expect(executionOrder).toEqual(['first-batch', 'second-batch']);
    });
  });

  test.describe('count getter', () => {
    test('should return 0 for new registry', () => {
      const registry = new CleanupRegistry();

      expect(registry.count).toBe(0);
    });

    test('should accurately reflect number of registered cleanups', () => {
      const registry = new CleanupRegistry();

      registry.register(async () => {});
      expect(registry.count).toBe(1);

      registry.registerEntity({}, async () => {});
      expect(registry.count).toBe(2);

      registry.register(async () => {});
      expect(registry.count).toBe(3);
    });
  });
});
