
const appEl = document.getElementById('app');

var RAW_DATA;

async function hashHandler() {
    var params = location.hash.split('#').filter(Boolean)
    var moduleName = params.shift() || 'index';

    try {
        var m = await import(`/${moduleName}.js`)
        appEl.innerHTML = await m.default(RAW_DATA, ...params.map(x => decodeURIComponent(x)));
    }
    catch (e) {
        console.error(e)
    }
}

window.addEventListener('hashchange', hashHandler, false);


fetch('https://simon129.github.io/test-data/v1/winlose.json')
    .then(x => x.json())
    .then(x => {
        RAW_DATA = x;
        hashHandler();
    })
