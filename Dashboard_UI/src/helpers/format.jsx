import { cityName } from "./data";

export default function normalizeDates(dataArray) {
  return dataArray.map(item => {
    let day = item['[Dim Thoi Gian].[Ngay].[Ngay].[MEMBER_CAPTION]']
    let month = item['[Dim Thoi Gian].[Thang].[Thang].[MEMBER_CAPTION]']
    let year = item['[Dim Thoi Gian].[Nam].[Nam].[MEMBER_CAPTION]']

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

    return {
      revenue: item['[Measures].[Doanh Thu]'],
      quantity: item['[Measures].[So Luong]'],
      label: label
    };
  });
}

export const formatLargeNumber = (number) => {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(2) + " B";
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(2) + " M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + " K";
  }
  return number;
}

export const transformCityName = (cityId) => {
  return cityName[cityId] || cityId;
}

export const transformTime = (time) => {
  if (time === "day") {
    return "ngay"
  } else if (time === "month") {
    return "thang"
  } else if (time === "year") {
    return "nam"
  }
  return time
}

export const transformCustomer = (customer) => {
  if (customer === "customer") {
    return "ma khach hang"
  } else if (customer === "city") {
    return "ma thanh pho"
  } else if (customer === "state") {
    return "ten bang"
  }
  return customer
}

export const transformStore = (store) => {
  if (store === "store") {
    return "ma cua hang"
  } else if (store === "city") {
    return "ma thanh pho"
  } else if (store === "state") {
    return "ten bang"
  }
  return store
}

// Convert text to camel case. E.g: White Blood Cells -> whiteBloodCells
export const textToCamelCase = (text) => {
  return text
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

export const snakeCaseToTitleCase = (str) => {
  return str
    .split('_')
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word.toLowerCase();
    })
    .join(' ');
}
