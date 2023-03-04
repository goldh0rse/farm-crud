#!/bin/bash

# echo Setting up Conda environment, this might take a while...
# conda env create -f env.yml
# source ~/opt/anaconda3/etc/profile.d/conda.sh
# conda activate farm-srv

PORT=1337

echo Starting server on http://localhost:$PORT

uvicorn src.main:app \
    --port ${PORT} \
    --reload
