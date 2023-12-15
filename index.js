import {FetchImages} from './FetchImages.js';

(async () => {
    const fetchImages = new FetchImages();

    fetchImages.logResult(await fetchImages.getImagesUsingFetch());
    fetchImages.logResult(await fetchImages.getImagesUsingFetch());

    fetchImages.getImagesUsingXMLHttpRequest(fetchImages.logResult);
})();
