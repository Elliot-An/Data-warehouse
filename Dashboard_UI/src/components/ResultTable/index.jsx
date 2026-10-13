import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { memo } from "react";

const labelItems = ["Anemia", "Diabetes", "Healthy", "Heart Di", "Thalasse", "Thromboc"]

function ResultTable(props) {
  const { customResult, pretrainedResult } = props.data

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>All Probabilities</TableHead>
            <TableHead>Custom Model Prediction</TableHead>
            <TableHead>Standard Model Prediction</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {labelItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item}</TableCell>
              <TableCell>{(customResult[`${item}`] * 100).toFixed(5)}%</TableCell>
              <TableCell>{(pretrainedResult[`${item}`] * 100).toFixed(5)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default memo(ResultTable);