//Array of files to be cached for offline use 
const cacheFiles = [
    "index.html", "restaurant.html",
    "/css/styles.css",
    "/data/restaurants.json",
    "/js/main.js", "/js/restaurant_info.js", "/js/dbhelper.js",
    "/img/1.jpg", "/img/2.jpg", "/img/3.jpg", "/img/4.jpg", "/img/5.jpg",
    "/img/6.jpg", "/img/7.jpg", "/img/8.jpg", "/img/9.jpg", "/img/10.jpg",
    "https://unpkg.com/leaflet@1.3.1/dist/leaflet.css",
    "https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
];

//Adds files to cache
self.addEventListener("install", ((event => {
    event.waitUntil(
        caches.open('Restautant-reviews-version-1').then((cache => {
            return cache.addAll(cacheFiles);
        })));
})));

//Fetching requested files from cache
self.addEventListener("fetch", ((event => {
    console.log(event.request);
    event.respondWith(
        caches.match(event.request).then((response => {
            if (response) {
                //console.log(event.request,  "cached");
                return response;
            } else {
                // console.log(event.response, "not in the cache. Fetching.");
                return fetch(event.request)

                //Receives fetched response and sends to cache
                .then((response => {

                    const responseClone = response.clone(); //clones object

                    try {
                        caches.open('Restaurant-reviews-version-1').then((cache => {
                            cache.put(event.request, responseClone);
                            console.log(cache);
                        }));
                        return response; // returns response.clone

                        //logs errors
                    } catch (error) {
                        console.log(error);
                    }
                }))
            }
        })))
})));