# soaparse

[![PyPi package](https://img.shields.io/pypi/v/soaparse.svg)](https://pypi.python.org/pypi/soaparse)

Sane, modular DNS [SOA record](https://en.wikipedia.org/wiki/SOA_record) parsing implementations

 - Fields are based on https://www.ripe.net/publications/docs/ripe-203

 The best-guess email addresses are parsed from the `rname` field:
 - Replacing with `@`:
    - the second from last `.` (`email_parsed_last`)
    - the first `.` (`email_parsed_first`)

Both likeliest email addresses are returned. It is then up to human inspection to decide which email is correct.

Trailing periods are stripped
