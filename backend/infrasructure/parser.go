package infrasructure

import (
	"ascii-art-web/models"
	"bufio"
	"os"
)

type Parser struct{}

func NewParser() *Parser {
	return &Parser{}
}

func (p *Parser) ReadBanner(fileName string) ([]string, error) {
	file, err := os.Open("banners/" + fileName + ".txt")
	if err != nil {
		return nil, models.ErrBadBanner
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	var result []string
	for scanner.Scan() {
		if scanner.Text() == "" {
			continue
		}
		result = append(result, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		return nil, models.ErrReadBanner
	}
	return result, nil
}

func (p *Parser) ParseBanner(bannerData []string) map[rune][]string {
	banner := make(map[rune][]string)

	for i, line := range bannerData {
		currentRune := rune(32 + i/8)

		banner[rune(currentRune)] = append(banner[currentRune], line)
		if i%8 == 0 {
			currentRune++
		}
	}

	return banner
}
