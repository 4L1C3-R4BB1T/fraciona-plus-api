type ProviderKey = string;

class ProviderRegistry {
    #providers = new Map<ProviderKey, unknown>();

    register<T>(provideKey: ProviderKey, useValue: T): void {
        if (this.#providers.has(provideKey)) {
            throw new Error(`Provider with key "${provideKey}" is already registered.`);
        }
        this.#providers.set(provideKey, useValue);
    }

    get<T>(provideKey: ProviderKey): T {
        if (!this.#providers.has(provideKey)) {
            throw new Error(`Provider with key "${provideKey}" is not registered.`);
        }
        return this.#providers.get(provideKey) as T;
    }

    has(provideKey: ProviderKey): boolean {
        return this.#providers.has(provideKey);
    }

    unregister(provideKey: ProviderKey): void {
        if (!this.#providers.delete(provideKey)) {
            throw new Error(`Provider with key "${provideKey}" could not be found for removal.`);
        }
    }
}

const registry = new ProviderRegistry();

export default registry;