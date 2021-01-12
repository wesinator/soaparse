(require '[clojure.string :as str])

(defn strip-period [str]
    (str/replace str #"\.$" "")
)

(defn replace-second-from-last [string char replacement]
    (def end_index
        (str/last-index-of string char)
    )

    (def second_last_index
        (str/last-index-of (subs string 0 end_index) char)
    )

    (str
        (subs string 0 second_last_index) replacement (subs string (+ 1 second_last_index))
    )
)

; "ns.example.com. email.example.com. 20200101 60 3 2 1"
(defn soaparse [soa_string]
    (def soa_parts (str/split soa_string #" "))

    ; trim period from mname, rname
    (def mname (strip-period (first soa_parts)))
    (def rname (strip-period (nth soa_parts 1)))

    (def parsed_email_beginning (str/replace-first rname "." "@"))
    (def parsed_email_end (replace-second-from-last rname "." "@"))

    (def serial (nth soa_parts 2)) ; serial
    (def refresh (nth soa_parts 3)) ; refresh
    (def retry (nth soa_parts 4)) ; retry
    (def expire (nth soa_parts 5)) ; expire
    (def minimum (nth soa_parts 6)) ; minimum

    ; return hash map of values
    (hash-map
        "mname" mname
        "rname" rname
        "parsed_email_beginning" parsed_email_beginning
        "parsed_email_end" parsed_email_end
        "serial" serial
        "refresh" refresh
        "retry" retry
        "expire" expire
        "minimum" minimum
    )
)

(soaparse "ns.example.com. email.example.com. 20200101 60 3 2 1")
