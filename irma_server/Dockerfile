FROM golang:alpine as builder
RUN apk add --no-cache git dep
RUN go get -d -u github.com/privacybydesign/irmago
RUN cd $GOPATH/src/github.com/privacybydesign/irmago && dep ensure
RUN cd $GOPATH/src/github.com/privacybydesign/irmago/irma && go install

FROM alpine:latest
RUN apk update && apk add --no-cache ca-certificates
COPY --from=builder /go/bin/irma /usr/bin

COPY ./config ./config
CMD ["irma", "server", "-vv", "--config", "./config/irmaserver.json"]

EXPOSE 8088