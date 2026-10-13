import LineBarChart from "@/components/LineBarChart";
import { getSalesData } from "@/util/request";
import { useEffect, useState } from "react";
import { transformCityName, transformCustomer, transformTime } from "@/helpers/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimeOptions from "@/components/TimeOptions";
import BarChartCustom from "@/components/BarChart";
import RadialCharCustom from "@/components/RadialCharCustom";
import GlobalOptions from "@/components/GlobalOptions";
import Loading from "@/components/Loading";
import { saleCustomerGroupBy, saleCustomerTypeGroupBy, saleProductGroupBy, saleTimeGroupBy } from "@/helpers/group";

function Sale() {
  document.title = "Sale report";
  const [timeData, setTimeData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [customerTypeData, setCustomerTypeData] = useState(null);
  const [productOptions, setProductOptions] = useState(null);
  const [customerOptions, setCustomerOptions] = useState(null);
  const [currentTime, setCurrentTime] = useState("month");
  const [currentProduct, setCurrentProduct] = useState("product");
  const [currentCustomer, setCurrentCustomer] = useState("customer");
  const [timeDice, setTimeDice] = useState(null);
  const [productDice, setProductDice] = useState(null);
  const [customerDice, setCustomerDice] = useState(null);
  
  // Time Chart
  useEffect(() => {
    const getTimeData = async () => {
      if (timeData) setTimeData(null)
      let reqBody = {
        timeRollUp: timeDice?.start ? null : transformTime(currentTime),
        productDice: productDice,
        customerDice: customerDice,
        timeDice: timeDice
      }
      console.log(reqBody)
      const data = await getSalesData(reqBody);
      setTimeData(saleTimeGroupBy(data));
    }
    getTimeData();
  }, [currentTime, productDice, customerDice, timeDice])

  // Product Chart
  useEffect(() => {
    const getProductData = async () => {
      if (productData) setProductData(null)
      let reqBody = {
        productRollUp: productDice ? null : true,
        productDice: productDice,
        customerDice: customerDice,
        timeDice: timeDice
      }
      let data = await getSalesData(reqBody);
      data = saleProductGroupBy(data);
      setProductData(data);
      setProductOptions({
        values: data.map(item => item.label),
        hierarchy: ["product"]
      });
    }
    getProductData();
  }, [currentProduct, customerDice, timeDice, productDice])

  // Customer Chart
  useEffect(() => {
    const getCustomerData = async () => {
      if (customerData) setCustomerData(null)
      let reqBody = {
        customerRollUp: customerDice ? null : transformCustomer(currentCustomer),
        customerDice: customerDice,
        productDice: productDice,
        timeDice: timeDice
      }
      let data = await getSalesData(reqBody);
      data = saleCustomerGroupBy(data.slice(0, 200));
      data = data.sort((a, b) => b.revenue - a.revenue);
      setCustomerData(data);
      setCustomerOptions({
        values: data.map(item => item.label),
        hierarchy: ["customer", "city", "state"]
      });
    }
    getCustomerData();
  }, [currentCustomer, productDice, timeDice, customerDice])

  // customer type chart
  useEffect(() => {
    const getCustomerTypeData = async () => {
      if (customerTypeData) setCustomerTypeData(null)
      let reqBody = {
        customerRollUp: "loai khach hang",
        timeDice: timeDice,
        productDice: productDice
      }
      let data = await getSalesData(reqBody);
      data = saleCustomerTypeGroupBy(data);
      console.log(data)
      setCustomerTypeData(data);
    }
    getCustomerTypeData();
  }, [productDice, timeDice])


  return (
    <>
      <h1>Sales report</h1>
      <div className="grid grid-cols-9 gap-4">
        <div className="flex flex-col gap-4 col-span-5">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="h2">Quantity & Revenue Chart | By {currentTime}</CardTitle>
              <TimeOptions 
                activeKey={currentTime} 
                setActiveKey={setCurrentTime}
                setTimeDice={setTimeDice}
              />
            </CardHeader>
            <CardContent className="p-0">
              {timeData ? (
                <LineBarChart data={timeData}/>
              ) : (
                <Loading />
              )}
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="h2">Revenue & Quantity Chart | By product</CardTitle>
              <GlobalOptions
                data={productOptions}
                activeKey={currentProduct}
                setActiveKey={setCurrentProduct}
                setKeyDice={setProductDice}
              />
            </CardHeader>
            <CardContent className="p-0">
              {productData ? (
                <LineBarChart data={productData} />
              ) : (
                <Loading />
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col-reverse justify-end gap-5 col-span-4">
          <Card className="px-3 h-fit">
            <CardHeader>
              <CardTitle className="h2">Revenue Chart | By {currentCustomer}</CardTitle>
              <GlobalOptions
                data={customerOptions}
                activeKey={currentCustomer}
                setActiveKey={setCurrentCustomer}
                setKeyDice={setCustomerDice}
              />
            </CardHeader>
            <CardContent className="p-0">
              {customerData ? (
                <BarChartCustom data={customerData.map(item => ({
                  ...item,
                  label: transformCityName(item.label)
                }))} dataKey="revenue" />
              ) : (
                <Loading />
              )}
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="h2">Total Revenue | By customer type</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {customerTypeData ? (
                <RadialCharCustom data={customerTypeData} />
              ) : (
                <Loading />
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </>
  )
}

export default Sale;