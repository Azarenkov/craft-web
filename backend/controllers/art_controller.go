package controllers

import (
	"ascii-art-web/models"
	"encoding/json"

	// "fmt"
	"log"
	"net/http"
)

type ResponseError struct {
	Message string `json:"message"`
}

type ArtServiceInterface interface {
	CreateArt(art *models.Art) (*models.Art, error)
}

type ArtController struct {
	artService ArtServiceInterface
}

func NewArticleController(mux *http.ServeMux, svc ArtServiceInterface) {
	controller := &ArtController{
		artService: svc,
	}
	mux.HandleFunc("/create_art", controller.CreateArt)
}

func (a *ArtController) CreateArt(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(ResponseError{Message: "Method not allowed"})
		return
	}

	var art models.Art
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()

	err := decoder.Decode(&art)
	if err != nil {
		log.Printf("Failed to decode request body: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnprocessableEntity)
		json.NewEncoder(w).Encode(ResponseError{Message: "Invalid request body: " + err.Error()})
		return
	}
	defer r.Body.Close()

	if ok, err := isRequestValid(&art); !ok {
		w.WriteHeader(getStatusCode(err))
		json.NewEncoder(w).Encode(ResponseError{Message: err.Error()})
		return
	}

	response, err := a.artService.CreateArt(&art)
	if err != nil {
		w.WriteHeader(getStatusCode(err))
		json.NewEncoder(w).Encode(ResponseError{Message: err.Error()})
		return
	}

	w.WriteHeader(http.StatusOK)

	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Printf("Failed to encode response: %v", err)
		w.WriteHeader(getStatusCode(err))
		json.NewEncoder(w).Encode(ResponseError{Message: "Failed to encode response"})
		return
	}
}

func isRequestValid(m *models.Art) (bool, error) {
	if m.TypeBanner == nil {
		return false, models.ErrBadParamInput
	}
	if m.Input == nil {
		return false, models.ErrBadParamInput
	}

	return true, nil
}

func getStatusCode(err error) int {
	if err == nil {
		return http.StatusOK
	}

	switch err {
	case models.ErrInternalServerError:
		return http.StatusInternalServerError
	case models.ErrBadParamInput:
		return http.StatusBadRequest
	case models.ErrReadBanner:
		return http.StatusInternalServerError
	case models.ErrBadBanner:
		return http.StatusBadRequest
	default:
		return http.StatusInternalServerError
	}
}
