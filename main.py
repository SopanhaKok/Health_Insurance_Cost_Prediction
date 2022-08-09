from pydantic import BaseModel
import pickle
import numpy as np
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import uvicorn

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class request_body(BaseModel):
    age: int
    bmi: float
    children: int
    sex: int
    smoker: int
    region: int


@app.get("/")
async def root():
    return {"message": "Health Insurance Prediction API"}


@app.post('/predict')
def predict(data: request_body):
    insurance_data = [[
        data.age,
        data.sex,
        data.bmi,
        data.children,
        data.smoker,
        data.region
    ]]

    model = pickle.load(open('RFR_Model.pkl', 'rb'))
    makePrediction = model.predict(insurance_data)
    charge = round(makePrediction[0], 2)

    return {"charge": charge}


if __name__ == '__main__':
    uvicorn.run(app)
