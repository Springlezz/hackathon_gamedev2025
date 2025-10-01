const images = {};

async function imageResource(name) {
    if (images[name]) return images[name];
    else {
        const image = new Image();
        const promise = new Promise((resolve, reject) => {
            image.addEventListener('load', () => {
                images[name] = image;
                resolve(image);
            });
            image.addEventListener('error', reject);
        });
        image.src = name;
        return promise;
    }
}