##@ Docker

dev: ## setup local dev environment
	docker compose up postgres minio --wait

