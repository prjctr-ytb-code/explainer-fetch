export class FetchImages {
    #apiUrl;
    #isFetching;
    #abortController;

    constructor() {
        this.#apiUrl = 'https://picsum.photos/v2/list?page=1&limit=100';
        this.#isFetching = false;
        this.#abortController = null;
    }

    logResult = (data) => {
        console.log(data);
    }

    getImagesUsingXMLHttpRequest = (callback) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.#apiUrl);
        xhr.send();

        xhr.onload = function () {
            if (xhr.status !== 200) {
                throw new Error(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                return callback(JSON.parse(xhr.response))
            }
        };

        xhr.onprogress = function (event) {
            if (event.lengthComputable) {
                console.log(`${event.loaded} from ${event.total} bytes`);
            } else {
                console.log(`${event.loaded} byte`);
            }
        };

        xhr.onerror = function () {
            throw new Error("Error");
        };
    }

    getImagesUsingFetch = async () => {
        this.#isFetching = true;

        if (this.#abortController) {
            try {
                console.log(this.#abortController)
                this.#abortController.abort();
            } catch (error) {
                throw new Error(error);
            }
        }

        const abortController = new AbortController();
        const signal = abortController.signal;
        this.#abortController = abortController;

        try {
            const response = await fetch(this.#apiUrl, {signal});
            return await response.json();
        } catch (error) {
            throw new Error(error);
        } finally {
            this.#isFetching = false;
        }
    };
}
