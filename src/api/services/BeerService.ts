import {Beer} from '../models/Beer';
import {apiBaseUrl} from '../../App';
import ErrorService from './ErrorService';

interface APIService<T> {
    find: () => Promise<T[]>,
    findById: (id: number) => Promise<T | undefined>
}

export class BeerService implements APIService<Beer> {

    async find(page: number = 1, pageSize: number = 20, ids?: number[]): Promise<Beer[]> {

        try {

            let url = `${apiBaseUrl}/beers/?page=${page}&per_page=${pageSize}`;

            if (ids && ids.length) {
                url += `&ids=${ids.join('|')}`;
            }

            const response: Response = await fetch(url);

            if (!(response && response.ok)) {
                ErrorService.handleHttpError(response.status);
            }

            const json = await response.json();

            if (!Array.isArray(json)) {
                throw new Error(`Unexpected return type: ${typeof json}`);
            }

            return json.map((item: any) => new Beer(item));

        } catch (err) {
            throw err;
        }
    }

    async findById(id: number): Promise<Beer | undefined> {

        try {

            const response: Response = await fetch(`${apiBaseUrl}/beers/${id}`);

            if (!(response && response.ok)) {
                ErrorService.handleHttpError(response.status);
            }

            const json = await response.json();

            if (!Array.isArray(json) && json.length === 1) {
                throw new Error(`Unexpected return type: ${typeof json}`);
            }

            return new Beer(json[0]);

        } catch (err) {
            throw err;
        }
    }
}

export default new BeerService();