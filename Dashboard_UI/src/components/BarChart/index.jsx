import { memo, useEffect, useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts";
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

function BarChartCustom({ data, dataKey }) {
  const itemsPerPage = 20; // Số lượng điểm dữ liệu trên mỗi trang
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const height = Math.min(data.length * 27.5, 550);

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
      <ChartContainer config={config} style={{ width: `100%`, height: `${height}px` }}>
        <BarChart
          data={currentData}
          accessibilityLayer
          layout="vertical"
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="label"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            hide
          />
          <XAxis dataKey={dataKey} type="number" hide />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar
            dataKey={dataKey}
            fill="var(--color-main-blue)"
            radius={4}
            layout="vertical"
            barSize={20}
          >
            <LabelList
              dataKey="label"
              position="insideLeft"
              offset={8}
              className="fill-[var(--color-white)]"
              fontSize={12}
            />
            <LabelList
              dataKey={dataKey}
              position="right"
              fill="var(--color-main-blue)"
              formatter={formatNumber}
            />
          </Bar>
        </BarChart>
      </ChartContainer>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default memo(BarChartCustom);