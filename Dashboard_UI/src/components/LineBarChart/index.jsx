import { memo, useState, useEffect } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";
import Pagination from "../pagination";
import { config } from "@/helpers/data";

const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const CustomTooltipContent = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-medium">{label}</p>
        <p className="text-[var(--color-quantity)]">Quantity: {payload[0].value}</p>
        <p className="text-[var(--color-revenue)]">Revenue: {formatNumber(payload[1].value)}</p>
      </div>
    );
  }
  return null;
};

function LineBarChart({ data }) {
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
      <ChartContainer
        config={config}
        style={{ width: `100%`, height: `320px` }}
      >
        <ComposedChart data={currentData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            yAxisId="left"
            label={{
              value: 'Quantity',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={formatNumber}
            label={{
              value: 'Revenue',
              angle: 90,
              position: 'insideRight',
              style: { textAnchor: 'middle' }
            }}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar
            yAxisId="left"
            dataKey="quantity"
            fill="var(--color-quantity)"
            barSize={20}
            radius={[4, 4, 0, 0]}
          />
          <Line
            yAxisId="right"
            dataKey="revenue"
            type="monotone"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ChartContainer>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default memo(LineBarChart);