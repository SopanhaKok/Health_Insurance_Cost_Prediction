import numpy as np
import pandas as pd
from flask import Flask,request,jsonify
from flask_cors import CORS
from joblib import load

application = Flask(__name__)
CORS(application)

@application.route('/prediction',methods=['POST'])
# Define function
def predict():
    data = request.json
    query = pd.get_dummies(pd.DataFrame(data['data']))
    print(query)
    query = query.reindex(columns=['age', 'bmi', 'children', 'sex_male', 'smoker_yes', 'region_northwest',
       'region_southeast', 'region_southwest'],fill_value=0)
    print(query)
    model = load('rfr_insurance.pkl')
    predict = list(model.predict(query))
    return jsonify({'prediction': "{:.2f}".format(predict[0])})


if __name__ == '__main__':
    application.run(debug=True)
