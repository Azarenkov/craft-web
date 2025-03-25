package main

import (
	"ascii-art-web/controllers"
	"ascii-art-web/infrasructure"
	"ascii-art-web/services"
	"net/http"
)

func main() {
	parser := infrasructure.NewParser()
	artService := services.NewAsciiArtService(parser)

	mux := http.NewServeMux()
	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("public"))))

	controllers.NewIndexController(mux)
	controllers.NewArticleController(mux, artService)

	port := ":8080"
	println("Server starting on port", port)
	err := http.ListenAndServe(port, mux)
	if err != nil {
		panic(err)
	}
}
