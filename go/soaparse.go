package soaparse

import (
	"strings"
)

type SOArecord struct {
	mname string

	rname string
	parsed_email string

	serial string

	refresh string
	retry string
	expire string
	minimum string
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
	soa.mname = strings.TrimSuffix(parts[0], ".")

	soa.rname = strings.TrimSuffix(parts[1], ".")
	soa.parsed_email = EmailFromSOA(soa.rname)

	soa.serial = parts[2]

	soa.refresh = parts[3]
	soa.retry = parts[4]
	soa.expire = parts[5]
	soa.minimum = parts[6]

	return soa
}
