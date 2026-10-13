import { config } from "@/helpers/data";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { formatLargeNumber } from "@/helpers/format";

function RadialCharCustom({ data }) {
  const totalRevenue = formatLargeNumber(data[0].traveler + data[0].postal);
  return (
    <>
      <ChartContainer
        config={config}
        className="w-full aspect-square mx-auto h-[200px]"
      >
        <RadialBarChart data={data} endAngle={180} innerRadius={80} outerRadius={130}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel className="capitalize"/>} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 16} className="fill-foreground text-2xl font-bold">
                        {totalRevenue.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 4} className="fill-muted-foreground">
                        Total
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
              dataKey="traveler"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-chart-5)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="postal"
              fill="var(--color-chart-2)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
        </RadialBarChart>
      </ChartContainer>
    </>
  )
}

export default RadialCharCustom;