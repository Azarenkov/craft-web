package models

import "errors"

var (
	ErrInternalServerError = errors.New("Internal server error")
	ErrBadParamInput       = errors.New("Given param is not valid")
	ErrReadBanner          = errors.New("Error read banner")
	ErrBadBanner           = errors.New("Invalid banner")
)
