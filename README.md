# soaparse

[![PyPi package](https://img.shields.io/pypi/v/soaparse.svg)](https://pypi.python.org/pypi/soaparse)

Sane, modular DNS [SOA record](https://en.wikipedia.org/wiki/SOA_record) parsing implementations

 - Fields are based on https://www.ripe.net/publications/docs/ripe-203

 - The best-guess email address is parsed from the `rname` field
   - Unlike most implementations that just lazily replace the first occurrence of a `.`, this parsing assumes the second from last `.` character is location of the email `@`

 - Trailing periods are stripped
