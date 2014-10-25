// Shamelessly copied from here: https://github.com/darkskyapp/string-hash/blob/master/index.js

var radar = radar || {};

radar.utils = {

    hash_string_to_int: function(string){
        var hash = 5381,
            i    = string.length;

        while(i)
            hash = (hash * 33) ^ string.charCodeAt(--i);

        /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
         * integers. Since we want the results to be always positive, convert the
         * signed int to an unsigned by doing an unsigned bitshift. */

        return (hash >>> 0)/4294967295;
    }

};
