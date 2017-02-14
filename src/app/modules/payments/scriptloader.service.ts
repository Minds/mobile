const _scriptCache = new Map();

/**
 * Load an external script.
 *
 * @param {string} url Absolute URL of script to load
 * @param {string=} name Name of global variable that the script is expected to define
 * @return {Promise}
 */
export function loadScript(url, name) {
    let promise;

    if(_scriptCache.has(url)) {
        // TODO: normalize URL
        promise = _scriptCache.get(url);
    } else {
        promise = new Promise((resolve,reject) => {
            let script = document.createElement('script');
            script.onerror = event => reject(new Error(`Failed to load '${url}'`));
            script.onload = resolve;
            script.async = true;
            script.src = url;

            if(document.currentScript) {
                document.currentScript.parentNode.insertBefore(script, document.currentScript);
            } else {
                (document.head || document.getElementsByTagName('head')[0]).appendChild(script);
            }
        });

        _scriptCache.set(url, promise);
    }

    return promise.then(() => {
        if(global[name]) {
            return global[name];
        } else {
            throw new Error(`"${name}" was not created by "${url}"`);
        }
    });
}
