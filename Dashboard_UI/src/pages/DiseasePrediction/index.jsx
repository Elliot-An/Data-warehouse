import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { textToCamelCase } from "@/helpers/format";
import { predictDisease, predictDiseaseBatch } from "@/util/request";
import ResultTable from "@/components/ResultTable";
import { useEffect, useRef, useState } from "react";
import ResultFileTable from "@/components/ResultFileTable";

const featureItems = ["Glucose", "Cholesterol", "Hemoglobin", "Platelets", "White Blood Cells", "Red Blood Cells", "Hematocrit", "Mean Corpuscular Volume", "Mean Corpuscular Hemoglobin", "Mean Corpuscular Hemoglobin Concentration", "Insulin", "BMI", "Systolic Blood Pressure", "Diastolic Blood Pressure", "Triglycerides", "HbA1c", "LDL Cholesterol", "HDL Cholesterol", "ALT", "AST", "Heart Rate", "Creatinine", "Troponin", "C Reactive Protein"];

function DiseasePrediction() {
  useEffect(() => {
    document.title = "Disease Prediction";
  }, []);

  const features = useRef({})
  const [results, setResults] = useState(null)

  const [file, setFile] = useState(null)
  const [fileResult, setFileResult] = useState(null)

  const handleSubmit = async () => {
    const data = {
      features: featureItems.map(key => features.current[key])
    }
    const result = await predictDisease(data);
    console.log(result);
    setResults({
      customResult: result.custom.all_probabilities,
      pretrainedResult: result.lightgbm.all_probabilities
    })
  }

  const handleFileSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const result = await predictDiseaseBatch(formData);
    console.log(result);
    setFileResult(result);
  }

  return (
    <>
      <h1 className="mb-2">Disease Prediction</h1>
      <p className="italic mb-5">
        Please enter the following features to predict the disease.
      </p>
      <form action={handleSubmit}>
        <div className="grid grid-cols-4 gap-3 mb-5">
          {
            featureItems.map((feature) => (
              <label key={feature}>
                <span className="text-sm font-medium whitespace-nowrap">{feature}</span>
                <Input
                  type="text"
                  name={textToCamelCase(feature)}
                  placeholder={`Enter ${feature}`}
                  required
                  onChange={(e) => features.current[feature] = e.target.value}
                />
              </label>
            ))
          }
        </div>
        <SubmitButton />
      </form>
      <div className="w-[70%] mx-auto">
        {results && (
          <ResultTable data={results} />
        )}
      </div>

      <hr className="my-5" />
      <p className="mb-4 italic">
        Or upload a CSV file to predict the disease.
      </p>
      <form action={handleFileSubmit}>
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div>
            <label>
              <span className="text-sm font-medium whitespace-nowrap">Upload file</span>
              <Input
                className="mb-4"
                type="file"
                name="file"
                required
                accept=".csv"
                onChange={(e) => setFile(e.target.files[0])} />
            </label>
            <SubmitButton />
          </div>
        </div>
      </form>
      <div className="mb-5 w-full overflow-x-auto">
        {fileResult && (
          <ResultFileTable data={fileResult} />
        )}
      </div>
    </>
  )
}

export default DiseasePrediction;