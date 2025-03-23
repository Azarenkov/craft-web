package models

import "errors"

var (
	ErrInternalServerError = errors.New("internal Server Error")
	ErrBadParamInput       = errors.New("given Param is not valid")
	ErrReadBanner          = errors.New("error read banner")
	ErrBadBanner           = errors.New("Invalid banner")
)
