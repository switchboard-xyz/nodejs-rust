#! /bin/bash
docker build -t gcr.io/switchboard-playground/gcf-rust-example:latest . && \
docker push gcr.io/switchboard-playground/gcf-rust-example:latest && \
gcloud run deploy --image=gcr.io/switchboard-playground/gcf-rust-example:latest --platform managed