export interface BaseApiService<T> {
    find: () => Promise<T[]>,
    findById: (id: number) => Promise<T | undefined>
}