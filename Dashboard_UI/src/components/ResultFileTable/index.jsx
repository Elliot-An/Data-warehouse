import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { memo } from "react";

const featureItems = ["Glucose", "Cholesterol", "Hemoglobin", "Platelets", "White Blood Cells", "Red Blood Cells", "Hematocrit", "Mean Corpuscular Volume", "Mean Corpuscular Hemoglobin", "Mean Corpuscular Hemoglobin Concentration", "Insulin", "BMI", "Systolic Blood Pressure", "Diastolic Blood Pressure", "Triglycerides", "HbA1c", "LDL Cholesterol", "HDL Cholesterol", "ALT", "AST", "Heart Rate", "Creatinine", "Troponin", "C-reactive Protein"];
const labelItems = ["Anemia", "Diabetes", "Healthy", "Heart Di", "Thalasse", "Thromboc"]

function ResultFileTable(props) {
  const { results } = props.data

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {featureItems.map((item, index) => (
              <TableHead
                key={index}
                className="text-gray-500 whitespace-nowrap"
              >{item}</TableHead>
            ))}
            {labelItems.map((item, index) => (
              <TableHead
                key={index + 50}
                className="text-primary whitespace-nowrap"
              >{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((item, index) => (
            <TableRow key={index}>
              {featureItems.map((feature, i) => (
                <TableCell key={i} className="whitespace-nowrap">{item.custom[`${feature}`]}</TableCell>
              ))}
              {labelItems.map((label, i) => (
                <TableCell key={i + 50} className="whitespace-nowrap">
                  <div>Custom: {(item.custom.all_probabilities[`${label}`] * 100).toFixed(5)}%</div>
                  <div>Standard: {(item.lightgbm.all_probabilities[`${label}`] * 100).toFixed(5)}%</div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default memo(ResultFileTable);