package example

import (
	"testing"

	"github.com/tj/assert"
)

func TestAdd(t *testing.T) {
	received := add(1, 2)
	expected := 3

	assert.Exactly(t, expected, received)
}
