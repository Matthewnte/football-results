serve: up
	docker run --name football_result -p 4000:4000 -e NODE_ENV=development -v ${PWD}:/app -v /app/node_modules football_result
up: postgres_db
	docker build -t football_result .
test:
	npm run test
postgres_db:
	docker run -d --name postgres_db -v pgdata:/var/lib/postgresql/data \
	-e POSTGRES_USER=postgres \
	-e POSTGRES_PASSWORD=postgres \
	-e POSTGRES_DB=football-results \
	-p 5432:5432 postgres
	docker exec -it postgres_db psql -U postgres -c "DROP DATABASE IF EXISTS football_results" &&\
	docker exec -it postgres_db psql -U postgres -c "CREATE DATABASE football_results"
stop:
	docker stop football_result postgres_db
	docker rm football_result postgres_db
