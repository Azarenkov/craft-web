package services

import (
	"ascii-art-web/models"
	"strings"
)

type ParserInterface interface {
	ReadBanner(fileName string) ([]string, error)
	ParseBanner(bannerData []string) map[rune][]string
}

type ArtService struct {
	parser ParserInterface
}

func NewAsciiArtService(parser ParserInterface) *ArtService {
	return &ArtService{parser}
}

func (a *ArtService) CreateArt(art *models.Art) (*models.Art, error) {

	banner, err := a.parser.ReadBanner(*art.TypeBanner)
	if err != nil {
		return nil, err
	}

	isOnlyNL, count := isNewlinesOnly(*art.Input)

	if isOnlyNL {

		for i := 0; i < count; i++ {
			art.Output += "\n"
		}
		return art, nil
	}

	bannerMap := a.parser.ParseBanner(banner)

	linesString := strings.ReplaceAll(*art.Input, "\\n", "\n")
	lines := strings.Split(linesString, "\n")

	for _, line := range lines {
		if line == "" {
			art.Output += "\n"
			continue
		}

		for row := 0; row < 8; row++ {
			for _, char := range line {
				if asciiLines, ok := bannerMap[char]; ok {
					art.Output += asciiLines[row]
				} else {
					return nil, models.ErrBadParamInput
				}
			}
			art.Output += "\n"
		}
	}

	return art, nil

}

func isNewlinesOnly(s string) (bool, int) {
	if s == "" {
		return true, 0
	}

	count := 0

	arr := strings.Split(s, "\n")
	for _, i := range arr {
		if i != "" {
			return false, 0
		}
		count++
	}

	return true, count - 1
}
