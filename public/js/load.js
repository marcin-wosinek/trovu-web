export default class Load {

  static async loadScripts(scripts) {
    
    function get (src) {
      return new Promise(function (resolve, reject) {
        var el = document.createElement("script");
        el.async = true;
        el.addEventListener("load", function () {
          resolve(src);
        }, false);
        el.addEventListener("error", function () {
          reject(src);
        }, false);
        el.src = src;
        //el.type = 'module';
        (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(el);
      });
    }

    const myPromises = scripts.map(async function (script, index) {
      return await get(script);
    });

    return await Promise.all(myPromises);
  }
}