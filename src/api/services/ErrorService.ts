export class HttpError extends Error {
    statusCode?: number;
    constructor(message: string, statusCode?: number) {
        super(message);

        // Set the prototype explicitly. // TODO review this
        Object.setPrototypeOf(this, HttpError.prototype);

        this.statusCode = statusCode;
    }
}

export class ErrorService {

    handleHttpError(code?: number) {
        switch(code) {
            case 400:
                return this.badRequest();
            case 404:
                return this.notFound();
            case 500:
                return this.internalServerError();
            default:
                return this.unknown();
        }
    }

    private badRequest() {
        throw new HttpError('Bad request', 400);
    }

    private notFound() {
        throw new HttpError('Not found', 404);
    }

    private internalServerError() {
        throw new HttpError('Internal server error', 500);
    }

    private unknown() {
        throw new HttpError('Unknown HTTP error');
    }

}

export default new ErrorService();