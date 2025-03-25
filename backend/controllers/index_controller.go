package controllers

import (
	"net/http"
	"strings"
)

type IndexController struct{}

func NewIndexController(mux *http.ServeMux) {
	ctrl := &IndexController{}
	mux.HandleFunc("/", ctrl.Index)
}

func (c *IndexController) Index(w http.ResponseWriter, r *http.Request) {
	if strings.HasPrefix(r.URL.Path, "/static/") {
		http.Error(w, "Forbidden", http.StatusForbidden)
		return
	}
	http.ServeFile(w, r, "public/index.html")

}
