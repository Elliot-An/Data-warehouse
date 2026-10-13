export const saleTimeGroupBy = (data) => {
  let result = {}

  data.forEach(item => {
    const year = item["[Dim Thoi Gian].[Nam].[Nam].[MEMBER_CAPTION]"];
    const month = item["[Dim Thoi Gian].[Thang].[Thang].[MEMBER_CAPTION]"];
    const day = item["[Dim Thoi Gian].[Ngay].[Ngay].[MEMBER_CAPTION]"];
    const revenue = item["[Measures].[Doanh Thu]"];
    const quantity = item["[Measures].[So Luong]"];

    let label = "";

    if (day && month && year) {
      // dd/mm/yyyy
      const dd = String(day).padStart(2, '0');
      const mm = String(month).padStart(2, '0');
      label = `${dd}/${mm}/${year}`;
    } else if (month && year) {
      // mm/yyyy
      const mm = String(month).padStart(2, '0');
      label = `${mm}/${year}`;
    } else if (year) {
      // yyyy
      label = `${year}`;
    }

    if (!result[label]) {
      result[label] = {
        label: label,
        day: day,
        month: month,
        year: year,
        revenue: 0,
        quantity: 0
      };
    }

    result[label].revenue += revenue;
    result[label].quantity += quantity;
  })

  return Object.values(result).sort((a, b) => {
    if (a.year !== b.year) return Number(a.year) - Number(b.year);
    else if (a.month !== b.month) return Number(a.month) - Number(b.month);
    else return Number(a.day) - Number(b.day);
  });
}

export const saleProductGroupBy = (data) => {
  let result = {}

  data.forEach(item => {
    const product = item["[Dim Mat Hang].[Ma Mat Hang].[Ma Mat Hang].[MEMBER_CAPTION]"];
    const revenue = item["[Measures].[Doanh Thu]"];
    const quantity = item["[Measures].[So Luong]"];

    if (!result[product]) {
      result[product] = {
        label: product,
        revenue: 0,
        quantity: 0
      }
    }

    result[product].revenue += revenue;
    result[product].quantity += quantity;
  })

  return Object.values(result).sort((a, b) => {
    return a.revenue - b.revenue;
  });
}

export const saleCustomerGroupBy = (data) => {
  let result = {}

  data.forEach((item) => {
    const customer = item["[Dim Khach Hang].[Ma Khach Hang].[Ma Khach Hang].[MEMBER_CAPTION]"];
    const city = item["[Dim Khach Hang].[Ma Thanh Pho].[Ma Thanh Pho].[MEMBER_CAPTION]"];
    const state = item["[Dim Khach Hang].[Ten Bang].[Ten Bang].[MEMBER_CAPTION]"];
    const revenue = item["[Measures].[Doanh Thu]"];
    const quantity = item["[Measures].[So Luong]"];

    let label = customer
    if (city) label = city
    if (state) label = state

    if (!result[label]) {
      result[label] = {
        label: label,
        revenue: 0,
        quantity: 0
      }
    }

    result[label].revenue += revenue;
    result[label].quantity += quantity;
  })

  return Object.values(result)
}

export const saleCustomerTypeGroupBy = (data) => {
  let result = [
    {
      traveler: 0,
      postal: 0
    }
  ]

  data.forEach(item => {
    const customerType = item["[Dim Khach Hang].[Loai Khach Hang].[Loai Khach Hang].[MEMBER_CAPTION]"];
    const revenue = item["[Measures].[Doanh Thu]"];

    if (customerType === "BuuDien") result[0].postal += revenue
    else result[0].traveler += revenue
  })

  return result
}

export const inventoryProductGroupBy = (data) => {
  let result = {}

  data.forEach(item => {
    const product = item["[Dim Mat Hang].[Ma Mat Hang].[Ma Mat Hang].[MEMBER_CAPTION]"];
    const ratio = item["[Measures].[Muc Do Ton Kho]"];
    const quantity = item["[Measures].[Fact Kho Count]"];

    if (!result[product]) {
      result[product] = {
        label: product,
        ratio: 0,
        quantity: 0
      }
    }

    result[product].ratio += ratio;
    result[product].quantity += quantity;
  })

  result = Object.values(result).map(item => ({
    ...item,
    ratio: (item.ratio / item.quantity).toFixed(2)
  }))

  return result
}

export const inventoryStoreGroupBy = (data) => {
  let result = {}

  data.forEach(item => {
    const store = item["[Dim Cua Hang].[Ma Cua Hang].[Ma Cua Hang].[MEMBER_CAPTION]"];
    const city = item["[Dim Cua Hang].[Ma Thanh Pho].[Ma Thanh Pho].[MEMBER_CAPTION]"];
    const state = item["[Dim Cua Hang].[Ten Bang].[Ten Bang].[MEMBER_CAPTION]"];
    const ratio = item["[Measures].[Muc Do Ton Kho]"];
    const quantity = item["[Measures].[Fact Kho Count]"];

    let label = store
    if (city) label = city
    if (state) label = state

    if (!result[label]) {
      result[label] = {
        label: label,
        ratio: 0,
        quantity: 0
      }
    }

    result[label].ratio += ratio;
    result[label].quantity += quantity;
  })

  result = Object.values(result).map(item => ({
    ...item,
    ratio: (item.ratio / item.quantity).toFixed(2)
  }))

  return result
}

export const inventoryTimeGroupBy = (data) => {
  let result = {}

  data.forEach(item => {
    const day = item["[Dim Thoi Gian].[Ngay].[Ngay].[MEMBER_CAPTION]"];
    const month = item["[Dim Thoi Gian].[Thang].[Thang].[MEMBER_CAPTION]"];
    const year = item["[Dim Thoi Gian].[Nam].[Nam].[MEMBER_CAPTION]"];
    const ratio = item["[Measures].[Muc Do Ton Kho]"];
    const quantity = item["[Measures].[Fact Kho Count]"];

    let label = "";

    if (day && month && year) {
      // dd/mm/yyyy
      const dd = String(day).padStart(2, '0');
      const mm = String(month).padStart(2, '0');
      label = `${dd}/${mm}/${year}`;
    } else if (month && year) {
      // mm/yyyy
      const mm = String(month).padStart(2, '0');
      label = `${mm}/${year}`;
    } else if (year) {
      // yyyy
      label = `${year}`;
    }

    if (!result[label]) {
      result[label] = {
        day: day,
        month: month,
        year: year,
        label: label,
        ratio: 0,
        quantity: 0
      }
    }

    result[label].ratio += ratio;
    result[label].quantity += quantity;
  })

  result = Object.values(result).map(item => ({
    ...item,
    ratio: (item.ratio / item.quantity).toFixed(2)
  }))

  return result.sort((a, b) => {
    if (a.year !== b.year) return Number(a.year) - Number(b.year);
    else if (a.month !== b.month) return Number(a.month) - Number(b.month);
    else return Number(a.day) - Number(b.day);
  })
}