import findKey from 'lodash/findKey'

const mimeTypes = {
    "text/csv": {
        "source": "iana",
        "compressible": true,
        "extensions": ["csv"]
    },
    "application/vnd.ms-excel": {
        "source": "iana",
        "compressible": false,
        "extensions": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
    },
    "text/plain": {
        "source": "iana",
        "compressible": true,
        "extensions": ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
    },
};


export default function guessMimeType(path) {
    if (!path || typeof path !== 'string') {
        return false
    }

    let extension = path.split(".").pop();

    if (!extension) {
        return false
    }

    return findKey(mimeTypes, obj => obj.extensions.includes(extension)) || false;
}
