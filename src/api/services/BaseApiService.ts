export const apiBaseUrl = 'https://api.punkapi.com/v2';

export interface BaseApiService<T> {
    find: () => Promise<T[]>,
    findById: (id: number) => Promise<T | undefined>
}