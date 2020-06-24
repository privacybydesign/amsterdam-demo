// REST
// ====
// Sets up HTTP REST web service that communicates with IRMA server and discloses attributes.

// Use modd to boot the server:
// ----------------
// $ modd

// Client requests:
// ----------------
// $ curl http://localhost:3333/
// root.
//
// $ curl http://localhost:3333//disclose/postcode

package main

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/render"
)

func main() {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.URLFormat)
	r.Use(render.SetContentType(render.ContentTypeJSON))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("root."))
	})

	r.Get("/disclose/postcode", IrmaDisclosePostcode)

	http.ListenAndServe(":3333", r)
}

// IrmaDisclosePostcode : contacts the IRMA server to disclose the postcode
func IrmaDisclosePostcode(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("IRMA disclose postcode"))
}

// Error response payloads & renderers

// Render function for error response
func (e *ErrResponse) Render(w http.ResponseWriter, r *http.Request) error {
	render.Status(r, e.HTTPStatusCode)
	return nil
}

// ErrResponse renderer type for handling all sorts of errors.
type ErrResponse struct {
	Err            error  `json:"-"`
	HTTPStatusCode int    `json:"-"`
	StatusText     string `json:"status"`
	AppCode        int64  `json:"code,omitempty"`
	ErrorText      string `json:"error,omitempty"`
}

// ErrInvalidRequest renders invalid request response
func ErrInvalidRequest(err error) render.Renderer {
	return &ErrResponse{
		Err:            err,
		HTTPStatusCode: 400,
		StatusText:     "Invalid request.",
		ErrorText:      err.Error(),
	}
}

// ErrRender renders the error response
func ErrRender(err error) render.Renderer {
	return &ErrResponse{
		Err:            err,
		HTTPStatusCode: 422,
		StatusText:     "Error rendering response.",
		ErrorText:      err.Error(),
	}
}

// ErrNotFound creates the resource not found error response
var ErrNotFound = &ErrResponse{HTTPStatusCode: 404, StatusText: "Resource not found."}
