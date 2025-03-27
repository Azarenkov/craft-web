package main

import (
	"ascii-art-web/controllers"
	"ascii-art-web/infrasructure"
	"ascii-art-web/services"
	"net/http"
	"os"
)

func main() {

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	parser := infrasructure.NewParser()
	artService := services.NewAsciiArtService(parser)

	mux := http.NewServeMux()

	mux.HandleFunc("/static/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/static/" {
			http.Redirect(w, r, "/", http.StatusFound)
			return
		}
		http.StripPrefix("/static/", http.FileServer(http.Dir("public/static"))).ServeHTTP(w, r)
	})

	controllers.NewArticleController(mux, artService)

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.Redirect(w, r, "/", http.StatusFound)
			return
		}
		http.ServeFile(w, r, "public/index.html")
	})

	println("Server starting on port", port)

	err := http.ListenAndServe(":"+port, mux)
	if err != nil {
		panic(err)
	}
}
