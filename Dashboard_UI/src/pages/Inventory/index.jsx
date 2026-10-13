import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import TimeOptions from "@/components/TimeOptions";
import Loading from "@/components/Loading";
import LineChartCustom from "@/components/LineChartCustom";
import { getInventoryData } from "@/util/request";
import { inventoryProductGroupBy, inventoryStoreGroupBy, inventoryTimeGroupBy } from "@/helpers/group";
import LineBarChart from "@/components/LineBarChart";
import BarChartCustom from "@/components/BarChart";
import { transformStore, transformTime } from "@/helpers/format";
import GlobalOptions from "@/components/GlobalOptions";

function Inventory() {
  document.title = "Inventory report";
  const [timeData, setTimeData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [storeData, setStoreData] = useState(null);
  const [currentTime, setCurrentTime] = useState("month");
  const [currentStore, setCurrentStore] = useState("store");
  const [currentProduct, setCurrentProduct] = useState("product");
  const [productOptions, setProductOptions] = useState(null);
  const [storeOptions, setStoreOptions] = useState(null);
  const [timeDice, setTimeDice] = useState(null);
  const [storeDice, setStoreDice] = useState(null);
  const [productDice, setProductDice] = useState(null);

  useEffect(() => {
    const getTimeData = async () => {
      if (timeData) setTimeData(null)
      let reqBody = {
        timeRollUp: timeDice ? null : transformTime(currentTime),
        timeDice: timeDice,
        storeDice: storeDice,
        productDice: productDice
      }
      let data = await getInventoryData(reqBody)
      data = inventoryTimeGroupBy(data)
      setTimeData(data);
    }
    getTimeData();
  }, [currentTime, timeDice, storeDice, productDice])

  //product chart
  useEffect(() => {
    const getProductData = async () => {
      if (productData) setProductData(null)
      let reqBody = {
        productRollUp: productDice ? null : true,
        timeDice: timeDice,
        storeDice: storeDice,
        productDice: productDice
      }
      let data = await getInventoryData(reqBody)
      data = inventoryProductGroupBy(data)
      setProductData(data)
      setProductOptions({
        values: data.map(item => item.label),
        hierarchy: ["product"]
      });
    }
    getProductData()
  }, [productDice, timeDice, storeDice, currentProduct])

  //store chart
  useEffect(() => {
    const getStoreData = async () => {
      if (storeData) setStoreData(null)
      let reqBody = {
        storeRollUp: storeDice ? null : transformStore(currentStore),
        timeDice: timeDice,
        storeDice: storeDice,
        productDice: productDice
      }
      let data = await getInventoryData(reqBody)
      data = inventoryStoreGroupBy(data)
      setStoreData(data)
      setStoreOptions({
        values: data.map(item => item.label),
        hierarchy: ["store", "city", "state"]
      });
    }
    getStoreData()
  }, [storeDice, timeDice, productDice, currentStore])
  
  return (
    <>
      <h1>Inventory report</h1>
      <div className="grid grid-cols-9 gap-4">
        <div className="flex flex-col gap-4 col-span-5">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="h2">Inventory ratio Chart | By {currentTime}</CardTitle>
              <TimeOptions 
                activeKey={currentTime} 
                setActiveKey={setCurrentTime}
                setTimeDice={setTimeDice}
              />
            </CardHeader>
            <CardContent >
              {timeData ? (
                <LineChartCustom data={timeData} />
              ) : (
                <Loading />
              )}
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="h2">Inventory ratio Chart | By {currentStore}</CardTitle>
              <GlobalOptions
                data={storeOptions}
                activeKey={currentStore}
                setActiveKey={setCurrentStore}
                setKeyDice={setStoreDice}
              />
            </CardHeader>
            <CardContent >
              {storeData ? (
                <LineChartCustom data={storeData} />
              ) : (
                <Loading />
              )}
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-4 col-span-4">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="h2">Inventory ratio Chart | By product</CardTitle>
              <GlobalOptions
                data={productOptions}
                activeKey={currentProduct}
                setActiveKey={setCurrentProduct}
                setKeyDice={setProductDice}
              />
            </CardHeader>
            <CardContent className="pr-0">
              {productData ? (
                <BarChartCustom data={productData} dataKey="ratio" />
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

export default Inventory;
