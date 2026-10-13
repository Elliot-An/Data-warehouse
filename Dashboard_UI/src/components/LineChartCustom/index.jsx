import { configInventoryChart } from "@/helpers/data";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import Pagination from "../pagination";

function LineChartCustom({ data }) {
  const itemsPerPage = 20; // Số lượng điểm dữ liệu trên mỗi trang
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  // Tính toán dữ liệu cho trang hiện tại
  // Tính toán chỉ số bắt đầu và kết thúc cho trang hiện tại
  let endIndex = data.length - (totalPages - currentPage) * itemsPerPage;
  if (endIndex > data.length) {
    endIndex = data.length;
  }
  let startIndex = endIndex - itemsPerPage;
  if (startIndex < 0) {
    startIndex = 0;
  }
  const currentData = data.slice(startIndex, endIndex);

  return (
    <>
      <ChartContainer config={configInventoryChart} style={{ width: `100%`, height: `320px` }}>
        <LineChart
          data={currentData}
          accessibilityLayer
          margin={{
            left: 24,
            right: 24,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line dataKey="ratio" type="natural" stroke="var(--color-ratio)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  )
}

export default LineChartCustom;