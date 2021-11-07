up:
	docker build -t football-results .
test:
	docker build -t onepipe_agent_webhook .
serve:
	docker run -p 4000:4000 -v ${PWD}:/app -v /app/node_modules football-results nodemon src/server.js
