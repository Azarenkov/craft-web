package models

type Art struct {
	TypeBanner *string `json:"type_banner"`
	Input      *string `json:"input"`
	Output     string  `json:"output"`
}

func NewArt(typeBanner string, input string, output string) *Art {
	return &Art{&typeBanner, &input, output}
}
