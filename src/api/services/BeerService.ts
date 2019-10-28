import {Beer} from '../models/Beer';
import {apiBaseUrl} from '../../App';
import ErrorService from './ErrorService';
import {BaseApiService} from './BaseApiService';

export class BeerService implements BaseApiService<Beer> {

    async find(page: number = 1, pageSize: number = 20, ids?: number[], query?: string): Promise<Beer[]> {

        let url = `${apiBaseUrl}/beers/?page=${page}&per_page=${pageSize}`;

        if (ids && ids.length) {
            url += `&ids=${ids.join('|')}`;
        }

        if (query && query.length) {
            query = query.split(' ').join('_');
            url += `&beer_name=${query}`;
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
    }

    async findById(id: number): Promise<Beer | undefined> {

        const response: Response = await fetch(`${apiBaseUrl}/beers/${id}`);

        if (!(response && response.ok)) {
            ErrorService.handleHttpError(response.status);
        }

        const json = await response.json();

        if (!Array.isArray(json) && json.length === 1) {
            throw new Error(`Unexpected return type: ${typeof json}`);
        }

        return new Beer(json[0]);
    }
}

export default new BeerService();