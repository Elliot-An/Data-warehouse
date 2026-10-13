import { Input } from "@/components/ui/input"
import { useState } from "react"
import SubmitButton from "@/components/SubmitButton"
import { trainModel, uploadData } from "@/util/request"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { snakeCaseToTitleCase } from "@/helpers/format"

const evaluation = ["accuracy", "f1", "log_loss", "precision", "recall"]
function TrainModel() {
  const [file, setFile] = useState(null)
  const [fileUploadResult, setFileUploadResult] = useState(null)
  const [trainResult, setTrainResult] = useState(null)
  const [pending, setPending] = useState(false)

  const handleSubmit = async () => {
    setPending(true)
    const formData = new FormData()
    formData.append("file", file)
    const result = await uploadData(formData)
    setFileUploadResult(result)
    const trainResult = await trainModel()
    console.log(trainResult)
    setTrainResult(trainResult)
    setPending(false)
  }

  return (
    <>
      <h1 className="mb-2">Train Model</h1>
      <p className="italic mb-5">Upload the training data to train the model.</p>

      <form action={handleSubmit}>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <label>
              <span className="text-sm font-medium">Training data</span>
              <Input
                type="file"
                className="mb-4"
                accept=".csv"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <SubmitButton />
          </div>
        </div>
      </form>

      <h2>Training Result</h2>
      <div className="grid grid-cols-2">
        {pending ? (
          <>
            {fileUploadResult ? (
              <div>
                <p className="mb-3 text-green-600">Successfully added to the database!</p>
                <p className="text-gray-700">Training...</p>
              </div>
            ) : (
              <div>
                <p className="text-gray-700">Uploading data...</p>
              </div>
            )}
          </>
        ) : (
          <>
            {trainResult && (
              <>
                {trainResult.custom_lgbm.status === "success" ? (
                  <div>
                    <p className="mb-3 text-green-600">Successfully trained the model!</p>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Evaluation</TableHead>
                          <TableHead>Custom Model</TableHead>
                          <TableHead>Standard Model</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {evaluation.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{snakeCaseToTitleCase(item)}</TableCell>
                            <TableCell>{(trainResult.custom_lgbm.evaluation_results[item] * 100).toFixed(5)}%</TableCell>
                            <TableCell>{(trainResult.lightgbm.evaluation_results[item] * 100).toFixed(5)}%</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell>Training Time</TableCell>
                          <TableCell>{trainResult.custom_lgbm.training_time.toFixed(2)}s</TableCell>
                          <TableCell>{(trainResult.lightgbm.training_time - trainResult.custom_lgbm.training_time).toFixed(2)}s</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-red-500">Failed to train the model!</p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default TrainModel