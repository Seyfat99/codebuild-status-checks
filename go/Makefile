test: go-test go-lint

go-test:
	go test -cover -v ./cmd/... ./internal... --timeout=3m ./...

go-lint:
	./bin/golangci-lint run --timeout=3m ./cmd/... ./internal/...
