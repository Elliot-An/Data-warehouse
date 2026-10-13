const salesAPI = "http://localhost:3000/factMatHangBan";

const toNumber = (v) => (v === undefined || v === null ? null : Number(v));

const parseRangeEndpoint = (str) => {
  // str: "YYYY" or "MM-YYYY" or "DD-MM-YYYY"
  const parts = String(str).split('-').map(Number);
  if (parts.length === 1) {
    const y = parts[0];
    return { start: new Date(y, 0, 1), end: new Date(y, 11, 31, 23, 59, 59) };
  } else if (parts.length === 2) {
    const [m, y] = parts;
    // month-year -> first day of month to last day of month
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 0, 23, 59, 59);
    return { start, end };
  } else if (parts.length === 3) {
    const [d, m, y] = parts;
    const start = new Date(y, m - 1, d);
    const end = new Date(y, m - 1, d, 23, 59, 59);
    return { start, end };
  }
  return null;
};

const recordDateFrom = (rec) => {
  const y = toNumber(rec["[Dim Thoi Gian].[Nam].[Nam].[MEMBER_CAPTION]"]);
  const m = toNumber(rec["[Dim Thoi Gian].[Thang].[Thang].[MEMBER_CAPTION]"]);
  const d = toNumber(rec["[Dim Thoi Gian].[Ngay].[Ngay].[MEMBER_CAPTION]"]);
  if (y && m && d) return new Date(y, m - 1, d);
  if (y && m) return new Date(y, m - 1, 1);
  if (y) return new Date(y, 0, 1);
  return null;
};

const matchesProductDice = (rec, productDice) => {
  if (!productDice) return true;
  // If productDice is an object with arr property
  const arr = Array.isArray(productDice) ? productDice : productDice?.arr;
  if (!arr || !arr.length) return true;
  const productVal = rec["[Dim Mat Hang].[Ma Mat Hang].[Ma Mat Hang].[MEMBER_CAPTION]"];
  // match either exact or numeric id if provided
  return arr.some(p => {
    if (typeof p === 'number') return String(p) === String(productVal) || String(p) === String(productVal).replace(/^MH0*/i, '');
    return String(p) === String(productVal);
  });
};

const matchesCustomerDice = (rec, customerDice) => {
  if (!customerDice) return true;
  // support both array or { type, arr }
  if (Array.isArray(customerDice)) {
    const arr = customerDice;
    const custVal = rec["[Dim Khach Hang].[Ma Khach Hang].[Ma Khach Hang].[MEMBER_CAPTION]"];
    return arr.some(a => String(a) === String(custVal));
  }

  const type = customerDice.type; // e.g. 'Ma Khach Hang' or 'Ma Thanh Pho' or 'Ten Bang'
  const arr = customerDice.arr || [];
  if (!type || !arr || !arr.length) return true;
  const key = `[Dim Khach Hang].[${type}].[${type}].[MEMBER_CAPTION]`;
  const val = rec[key];
  return arr.some(a => String(a) === String(val));
};

export const getSalesData = async (reqBody) => {
  // Try to fetch the full dataset from json-server and apply client-side filters
  try {
    const res = await fetch(salesAPI);
    if (!res.ok) throw new Error('json-server fetch failed');
    const raw = await res.json();
    // raw may be the array itself or the root object containing arrays
    const records = Array.isArray(raw) ? raw : (Array.isArray(raw.factMatHangBan) ? raw.factMatHangBan : []);

    // Build time range if provided
    let timeRange = null;
    if (reqBody?.timeDice && reqBody.timeDice.start && reqBody.timeDice.end) {
      const startRange = parseRangeEndpoint(reqBody.timeDice.start);
      const endRange = parseRangeEndpoint(reqBody.timeDice.end);
      if (startRange && endRange) {
        timeRange = { start: startRange.start, end: endRange.end };
      }
    }

    const filtered = records.filter(rec => {
      // time filter
      if (timeRange) {
        const rDate = recordDateFrom(rec);
        if (!rDate) return false;
        if (rDate < timeRange.start || rDate > timeRange.end) return false;
      }

      // product filter
      if (!matchesProductDice(rec, reqBody?.productDice)) return false;

      // customer filter
      if (!matchesCustomerDice(rec, reqBody?.customerDice)) return false;

      return true;
    });

    console.log('getSalesData: returning', filtered.length, 'records (filtered)');
    return filtered;
  } catch (e) {
    console.warn('Local json-server fetch/filter failed, falling back to POST to remote API:', e && e.message);
    // fallback: original behaviour - POST to salesAPI with reqBody
    try {
      const response = await fetch(salesAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error('Fallback POST failed:', err);
      return [];
    }
  }
}

const inventoryAPI = "http://localhost:3000/factKho";

const matchesStoreDice = (rec, storeDice) => {
  if (!storeDice) return true;
  // support both array or { type, arr }
  if (Array.isArray(storeDice)) {
    const arr = storeDice;
    const storeVal = rec["[Dim Cua Hang].[Ma Cua Hang].[Ma Cua Hang].[MEMBER_CAPTION]"];
    return arr.some(a => String(a) === String(storeVal));
  }

  const type = storeDice.type; // e.g. 'Ma Cua Hang' or 'Ma Thanh Pho' or 'Ten Bang'
  const arr = storeDice.arr || [];
  if (!type || !arr || !arr.length) return true;
  const key = `[Dim Cua Hang].[${type}].[${type}].[MEMBER_CAPTION]`;
  const val = rec[key];
  return arr.some(a => String(a) === String(val));
};

export const getInventoryData = async (reqBody) => {
  try {
    const res = await fetch(inventoryAPI);
    if (!res.ok) throw new Error('json-server fetch failed');
    const raw = await res.json();
    const records = Array.isArray(raw) ? raw : (Array.isArray(raw.factKho) ? raw.factKho : []);

    // Build time range if provided
    let timeRange = null;
    if (reqBody?.timeDice && reqBody.timeDice.start && reqBody.timeDice.end) {
      const startRange = parseRangeEndpoint(reqBody.timeDice.start);
      const endRange = parseRangeEndpoint(reqBody.timeDice.end);
      if (startRange && endRange) {
        timeRange = { start: startRange.start, end: endRange.end };
      }
    }

    const filtered = records.filter(rec => {
      // time filter
      if (timeRange) {
        const rDate = recordDateFrom(rec);
        if (!rDate) return false;
        if (rDate < timeRange.start || rDate > timeRange.end) return false;
      }

      // product filter
      if (!matchesProductDice(rec, reqBody?.productDice)) return false;

      // store filter
      if (!matchesStoreDice(rec, reqBody?.storeDice)) return false;

      return true;
    });

    console.log('getInventoryData: returning', filtered.length, 'records (filtered)');
    return filtered;
  } catch (e) {
    console.warn('Local json-server fetch/filter failed for inventory, falling back to POST:', e && e.message);
    try {
      const response = await fetch(inventoryAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error('Fallback POST for inventory failed:', err);
      return [];
    }
  }
}


const predictionAPI = "http://127.0.0.1:5000/predict"
export const predictDisease = async (data) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  }

  try {
    const response = await fetch(predictionAPI, config)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (e) {
    console.error("Error prediction: ", e)
    throw e
  }
}

const predictBatchAPI = "http://127.0.0.1:5000/predict_batch"
export const predictDiseaseBatch = async (formData) => {
  const config = {
    method: "POST",
    body: formData
  }

  try {
    const response = await fetch(predictBatchAPI, config)
    const data = await response.json()
    return data
  } catch (e) {
    console.error("Error prediction: ", e)
    throw e
  }
}

const uploadDataAPI = "http://127.0.0.1:5000/upload_csv_data"
const trainModelAPI = "http://127.0.0.1:5000/train_model"

export const uploadData = async (formData) => {
  const config = {
    method: "POST",
    body: formData
  }

  try {
    const response = await fetch(uploadDataAPI, config)
    const data = await response.json()
    return data
  } catch (e) {
    console.error("Error upload data: ", e)
    return {
      status: "error",
      message: "Failed to upload data"
    }
  }
}

export const trainModel = async () => {
  try {
    const response = await fetch(trainModelAPI, {
      method: "POST"
    })
    const data = await response.json()
    return data
  } catch (e) {
    console.error("Error train model: ", e)
    return {
      custom_lgbm: {
        status: "error",
        message: "Failed to train model"
      }
    }
  }
}


