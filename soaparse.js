function soaParse(soaString) {
    // https://www.ripe.net/publications/docs/ripe-203
    var soaRecord = {
        mname: "",

        rname: "",
        parsed_email: "",

        serial: "",

        refresh: null,
        retry: null,
        expire: null,
        minimum: null,
    };

    var soaParts = soaString.split(" ");

    soaRecord.mname = removeLastChar(soaParts[0]);

    soaRecord.rname = removeLastChar(soaParts[1]);
    soaRecord.parsed_email = emailFromSOA(soaRecord.rname);

    soaRecord.serial = soaParts[2];

    soaRecord.refresh = parseInt(soaParts[3]);
    soaRecord.retry = parseInt(soaParts[4]);
    soaRecord.expire = parseInt(soaParts[5]);
    soaRecord.minimum = parseInt(soaParts[6]);

    return soaRecord;
}

function emailFromSOA(soaEmailString) {
    /* Index of the second to last ".", likely the char where @ email address is
    assumes the email hostname does not have a subdomain */
    var i = secondToLastInstance(soaEmailString, ".");
    var parsedEmail = replaceAt(soaEmailString, "@", i);
    return parsedEmail;
}

function removeLastChar(str) {
    return str.substr(0, str.length - 1);
}

// Index of the second to last instance of char
function secondToLastInstance(string, char) {
    return string.lastIndexOf(char, string.lastIndexOf(char) - 1);
}

// https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript?rq=1
function replaceAt(str, replacement, i) {
    return str.substr(0, i) + replacement
    + str.substr(i + replacement.length);
}
