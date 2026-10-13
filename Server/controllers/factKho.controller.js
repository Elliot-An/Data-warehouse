import axios from "axios";

const formatFilter = (dimTable, her)=>{
  return `FILTER(
    [${dimTable}].[${her}].[${her}].Members,
    [${dimTable}].[${her}].CurrentMember.Name <> "Unknown"
  )`
}

const formatFilterSlice = (dimTable, her, value)=>{
  return `[${dimTable}].[${her}].[${her}].&[${value}]`
}

const listMonthYearPairs = (start, end) => {
  const [startMonth, startYear] = start.split('-').map(Number);
  const [endMonth, endYear] = end.split('-').map(Number);

  const result = [];
  let month = startMonth;
  let year = startYear;

  while (year < endYear || (year === endYear && month <= endMonth)) {
    result.push({ month, year });
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }

  return result;
}

const listDateTriplets = (start, end) => {
  const [startDay, startMonth, startYear] = start.split('-').map(Number);
  const [endDay, endMonth, endYear] = end.split('-').map(Number);

  const startDate = new Date(startYear, startMonth - 1, startDay);
  const endDate = new Date(endYear, endMonth - 1, endDay);

  const result = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    result.push({
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear()
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return result;
}

export const getDataFactKho = async (req, res) => {
  try {
    const body = req.body;
    const dimensionsArray = [];
    // Dim Thoi Gian
    if(body.timeRollUp){
      const timeRollUp = body.timeRollUp;
      if(timeRollUp === "nam"){
        dimensionsArray.push(formatFilter("Dim Thoi Gian", "Nam"))
      }
      else if(timeRollUp === "thang"){
        dimensionsArray.push(formatFilter("Dim Thoi Gian", "Nam"))
        dimensionsArray.push(formatFilter("Dim Thoi Gian", "Thang"))
      }
      else if(timeRollUp === "ngay"){
        dimensionsArray.push(formatFilter("Dim Thoi Gian", "Nam"))
        dimensionsArray.push(formatFilter("Dim Thoi Gian", "Thang"))
        dimensionsArray.push(formatFilter("Dim Thoi Gian", "Ngay"))
      }
    }
    else if(body.timeDice){
      const timeStartDiceSplit = body.timeDice.start.split("-");
      const timeStart = body.timeDice.start;
      const timeEnd = body.timeDice.end;
      const timeSlice = []
      if(timeStartDiceSplit.length == 1){
        for(let i = +timeStart; i <= +timeEnd; i++) {
          timeSlice.push(`(${formatFilterSlice("Dim Thoi Gian", "Nam", i)})`)
        }
      }
      else if(timeStartDiceSplit.length == 2){
        const monthYearPairs = listMonthYearPairs(timeStart, timeEnd);
        monthYearPairs.forEach(({ month, year }) => {
          timeSlice.push(`(${formatFilterSlice("Dim Thoi Gian", "Nam", year)}, ${formatFilterSlice("Dim Thoi Gian", "Thang", month)})`)
        });
      }
      else if(timeStartDiceSplit.length == 3){
        const dateTriplets = listDateTriplets(timeStart, timeEnd);
        dateTriplets.forEach(({ day, month, year }) => {
          timeSlice.push(`(${formatFilterSlice("Dim Thoi Gian", "Nam", year)}, ${formatFilterSlice("Dim Thoi Gian", "Thang", month)}, ${formatFilterSlice("Dim Thoi Gian", "Ngay", day)})`)
        });
      }
      dimensionsArray.unshift(`{${timeSlice.join(",")}}`)
    }

    // Dim San pham
    if(body.productRollUp){
      dimensionsArray.push(formatFilter("Dim Mat Hang", "Ma Mat Hang"))
    }
    else if(body.productDice){
      const productIds = body.productDice;
      const productSlice = productIds.map(id => `(${formatFilterSlice("Dim Mat Hang", "Ma Mat Hang", id)})`);
      dimensionsArray.unshift(`{${productSlice.join(",")}}`)
    }

    // Dim cua hang
    if(body.storeRollUp){
      dimensionsArray.push(formatFilter("Dim Cua Hang", body.storeRollUp))
    }
    else if(body.storeDice){
      const storeSlice = body.storeDice.arr.map(id => `(${formatFilterSlice("Dim Cua Hang", body.storeDice.type, id)})`);
      dimensionsArray.unshift(`{${storeSlice.join(",")}}`)
    }

    const mdxQuery = `
      SELECT 
      {
        [Measures].[Muc Do Ton Kho],
        [Measures].[Fact Kho Count]
      } ON COLUMNS,
      NONEMPTY(
        ${dimensionsArray.length > 1 ? 'CROSSJOIN(':''}
          ${dimensionsArray.join(",\n")}
        ${dimensionsArray.length > 1 ? ')':''}
      ) ON ROWS
      FROM [CubeKho];
    `;

    console.log("MDX Query:", mdxQuery);
        
    const {data} = await axios.post('http://localhost:5025/api/Cube/query', { Mdx: mdxQuery }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(new Date().toLocaleString(), "Data fetched successfully");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({error });
    console.error("Error fetching data:", error);
  }
}