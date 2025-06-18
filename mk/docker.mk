##@ Docker

dev: ## setup local dev environment
	docker compose up postgres minio --wait

down: ## tear down all containers
	docker compose down

all: ## setup local dev + application
	docker compose up
