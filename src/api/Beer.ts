export class Beer {

    id!: number;
    name!: string;
    tagline!: string;
    imageUrl!: string;
    firstBrewed?: string;
    description?: string;
    abv?: number;
    ibu?: number;
    volume?: BeerVolume;
    foodPairing?: string[];
    brewersTips?: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.tagline = data.tagline;
        this.imageUrl = data.image_url;
        this.firstBrewed = data.first_brewed;
        this.description = data.description;
        this.abv = data.abv;
        this.ibu = data.ibu;
        this.volume = data.volume;
        this.foodPairing = data.food_pairing;
        this.brewersTips = data.brewers_tips;
    }

}

export interface BeerVolume {
    value: number,
    unit: string
}
