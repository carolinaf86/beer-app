
class InMemoryStore {

    private favourites: number[] = [];

    addFavourite(id: number) {
        if (this.getIsFavourite(id)) return;

        // Update state with copy of existing state with item added
        this.favourites = [...this.favourites, id];
    }

    removeFavourite(id: number) {
        if (!this.getIsFavourite(id)) return;

        // Copy favourites array to avoid manipulating state
        const favourites = [...this.favourites];

        // Remove item from array
        const idx = favourites.indexOf(id);
        favourites.splice(idx, 1);

        // Update state
        this.favourites = [...favourites];
    }

    getFavourites(): number[] {
        return [...this.favourites];
    }

    getIsFavourite(id: number) {
        return this.favourites.indexOf(id) > -1;
    }

}

export default new InMemoryStore();
