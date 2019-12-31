function soaParse(soaString) {
    var soaRecord = {
        nameserver: "",

        raw_email: "",
        parsed_email: "",

        date: "",

        ttl: 0,
    };

    var soaParts = soaString.split(" ");

    soaRecord.nameserver = removeLastChar(soaParts[0]);

    soaRecord.raw_email = removeLastChar(soaParts[1]);
    soaRecord.parsed_email = emailFromSOA(soaRecord.raw_email);

    soaRecord.date = soaParts[2];

    soaRecord.ttl = parseInt(soaParts[3]);

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
