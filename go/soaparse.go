package soaparse

import (
	"fmt"
	"strings"
)

type SOArecord struct {
	nameserver string

	raw_email string
	parsed_email string

	date string

	ttl string
}

// return index of second to last occurrence of char in string
func SecondToLast(str string, char string) int {
	return strings.LastIndex(str[:strings.LastIndex(str, char)], char)
}

// replace char given by index with replacement string
func ReplaceCharAt(str, replacement string, index int) string {
	return str[:index] + replacement + str[index + len(replacement):]
}

func EmailFromSOA(soaEmailField string) string {
	var i int = SecondToLast(soaEmailField, ".")
	var email string = ReplaceCharAt(soaEmailField, "@", i)
	return email
}

func SOAparse (soaString string) SOArecord {
	var parts []string = strings.Split(soaString, " ")

	var soa SOArecord
	soa.nameserver = strings.TrimSuffix(parts[0], ".")

	soa.raw_email = strings.TrimSuffix(parts[1], ".")
	soa.parsed_email = EmailFromSOA(soa.raw_email)

	soa.date = parts[2]

	soa.ttl = parts[3]

	return soa
}
