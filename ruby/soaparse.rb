def soaparse(soa_string)
    soa_parts = soa_string.split(' ')

    # remove trailing periods from mname, rname
    mname = soa_parts[0][...-1]
    rname = soa_parts[1][...-1]

    parsed_email_beginning = rname.dup # .dup creates copy of rname to avoid mutability on original
    parsed_email_beginning["."] = "@" # replace first instance of period

    # replace second from last instance of period
    second_from_last_index = second_from_last(rname, ".")
    parsed_email_end = rname[...second_from_last_index] + "@" + rname[second_from_last_index + 1..]

    serial = soa_parts[2]
    refresh = soa_parts[3]
    retry_time = soa_parts[4] # retry is keyword in ruby
    expire = soa_parts[5]
    minimum = soa_parts[6]

    return {
        mname: mname,
        rname: rname,
        parsed_email_beginning: parsed_email_beginning,
        parsed_email_end: parsed_email_end,
        serial: serial,
        refresh: refresh,
        retry: retry_time,
        expire: expire,
        minimum: minimum
    }
end

# return index of the second to last instance of a char in a string
def second_from_last(string, char)
    return string.rindex(char, string.rindex(char) - 1)
end
