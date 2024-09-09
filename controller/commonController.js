const axios = require("axios");
const { parse } = require("node-html-parser");

function timeAgo(timestamp) {
  const now = new Date();
  const timeDifference = Math.floor(now.getTime() / 1000 - timestamp); // in seconds

  const minutes = Math.floor(timeDifference / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `Just now`;
  }
}
exports.crudeOil = async (req, res, next) => {
  try {
    const data = await fetchOilData(45);
    res.send(data);
  } catch (error) {
    console.error("Error fetching oil data:", error);
    res.status(500).send({ error: "Failed to fetch oil data" });
  }
};

async function fetchOilData(id) {
  const axios = require("axios");
  let data = `blend_id=${id}&period=4`;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://oilprice.com/freewidgets/json_get_oilprices",
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      cookie:
        "_wingify_pc_uuid=406724212ccc4fb6b5b239095d6439fc; ga_store_user_id=17239627667281673971841; wingify_donot_track_actions=0; _gid=GA1.2.356636906.1723962768; wingify_push_do_not_show_notification_popup=true; productionop_csrf_cookie=8d47467c9860fd4b166e327a4b591cde; oilprice_ci=s53n7b5toruq1b4248f5s3cibca3phbg; page_view_count=6; _gat_UA-2249023-24=1; _ga_HE81JNZL3S=GS1.1.1724063028.4.1.1724063043.0.0.0; _ga=GA1.1.1677770949.1723962768; AWSALB=0HIruW6QKgX5Qx5TMsZFmB6T7w7WPuPbB4jQeZhEm6jsDgwl1nXlu0MREPfYVEpuFj9aFfO46GMYXlL08SR/uk9VTupLbcr1otihu/S3z2V4OVVTJ0/4azq6QV6M; AWSALBCORS=0HIruW6QKgX5Qx5TMsZFmB6T7w7WPuPbB4jQeZhEm6jsDgwl1nXlu0MREPfYVEpuFj9aFfO46GMYXlL08SR/uk9VTupLbcr1otihu/S3z2V4OVVTJ0/4azq6QV6M; AWSALB=UNYfb/y+2uEC5grT4fK1CnkS2EJ00vJa17ScU1pzutRaxJKNnVOpw+tB8YnPubdcJspfdilmJUt9kh3UPciJF6hbyw3izhnfp7Q9RloK8GPYiCRuyAtxfN/O9UIw; AWSALBCORS=UNYfb/y+2uEC5grT4fK1CnkS2EJ00vJa17ScU1pzutRaxJKNnVOpw+tB8YnPubdcJspfdilmJUt9kh3UPciJF6hbyw3izhnfp7Q9RloK8GPYiCRuyAtxfN/O9UIw; oilprice_ci=s53n7b5toruq1b4248f5s3cibca3phbg",
      dnt: "1",
      origin: "https://oilprice.com",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Opera GX";v="112"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 OPR/112.0.0.0",
      "x-requested-with": "XMLHttpRequest",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    const data = response.data;
    let returnobj = {
      logo: `https://d1o9e4un86hhpc.cloudfront.net/a/img/oilprices/${data.blend.flag}`,
      change: data.change.toFixed(2),
      last_price: data.last_price,
      last_time: timeAgo(data.blend.last_price_timestamp),
      change_percent: data.change_percent,
      symbol: data.blend.blend_name,
    };
    return returnobj;
  } catch (error) {
    console.error("Error in fetchOilData:", error);
    throw error;
  }
}

exports.rates = async (req, res, next) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    timeout: 10000,
    family: 4,
    url: "https://bluedollar.net/",
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      cookie:
        "_ga=GA1.1.929259686.1723962739; __gads=ID=4ab0e030a2bd95b4:T=1723962735:RT=1724088319:S=ALNI_MYh5XYeQlkaGTgVA5xX7L6j6L9Zcw; __eoi=ID=5e24072ff952478e:T=1723962735:RT=1724088319:S=AA-Afjb4H7MuSd5PDDPdYXblmu56; _ga_ELHRHW0F2V=GS1.1.1724088325.6.0.1724088327.58.0.0; FCNEC=%5B%5B%22AKsRol_4MxMMDAAcVJWivCKaTK8C6T6jCe5P6hLPw9AXlzOafLrmzlUnKQiwD-S_4t6S2QjyDvE--CT_n7QuOL4V8PHeybGX5TztdxKeJlpQJGW_9UuPGmNPimhYRZYVbc8I7Ecus1bHw0JYAUYedXBdtePTRvYOHA%3D%3D%22%5D%5D",
      dnt: "1",
      priority: "u=0, i",
      referer: "https://replit.com/",
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Opera GX";v="112"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "cross-site",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 OPR/112.0.0.0",
    },
  };

  axios
    .request(config)
    .then((response) => {
      const root = parse(response.data);
      // Find the "Informal Rate" section
      const informalRateSection = root.querySelector(".informal");
      // console.log(informalRateSection.innerText)

      // Extract the Buy and Sell values
      const informalbuyValue = informalRateSection
        .querySelector(".buy")
        .textContent.trim()
        .replace("\nBuy", "");
      const informalsellValue = informalRateSection
        .querySelector(".sell")
        .textContent.trim()
        .replace("\nSell", "");

      const informalBuyPercentage =
        informalRateSection.querySelector(".percent");

      let textContent = informalBuyPercentage.textContent.trim();

      const [informalBuyChangePercentage, informalSellChangeValue] =
        textContent.split(/\s+/);

      const officialRateSection = root.querySelector(".official");
      // console.log(informalRateSection.innerText)

      // Extract the Buy and Sell values
      const officialbuyValue = officialRateSection
        .querySelector(".buy")
        .textContent.trim()
        .replace("\nBuy", "");
      const officialsellValue = officialRateSection
        .querySelector(".sell")
        .textContent.trim()
        .replace("\nSell", "");

      const officalBuyPercentage =
        officialRateSection.querySelector(".percent");

      textContent = officalBuyPercentage.textContent.trim();

      const [officalBuyChangePercentage, officalSellChangeValue] =
        textContent.split(/\s+/);

      const result = {
        informalbuyValue,
        informalsellValue,
        officialbuyValue,
        officialsellValue,
        informalBuyChangePercentage,
        informalSellChangeValue,
        officalBuyChangePercentage,
        officalSellChangeValue,
      };

      res.send(result);
    })

    //   console.log(JSON.stringify(response.data));
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

exports.crudeOil = async (req, res, next) => {
  try {
    const data = [];
    data.push(await fetchOilData(45));
    data.push(await fetchOilData(46));
    data.push(await fetchOilData(29));

    res.send(data);
  } catch (error) {
    console.error("Error fetching oil data:", error);
    res.status(500).send({ error: "Failed to fetch oil data" });
  }
};

// Argentinien, RepublikDL-Bonds 2020(24-30)
exports.argentinaBond = async (req, res, next) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://markets.businessinsider.com/bonds/argentinien-_republikdl-bonds_202024-30-bond-2030-ararge3209s6?miRedirects=1",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      Connection: "keep-alive",
      Cookie:
        "_gcl_au=1.1.492669746.1724252943; _ga_E21CV80ZCZ=GS1.1.1724252952.1.0.1724252952.60.0.0; _ga=GA1.1.1058214780.1724252953; MiWebpushNotification=1; universal_id=f5954ae9-5efd-45cf-b89f-1ce6f75df5b8; anonymous_id=8137fad5-ac03-4028-908d-9f1db196f5a6; fenrir_anonymous_id=8137fad5-ac03-4028-908d-9f1db196f5a6; _pcid=%7B%22browserId%22%3A%22m03zox7yqxyzsbvv%22%7D; _ga_QMNT7JQZ6N=GS1.1.1724252958.1.0.1724252958.0.0.0; __adblocker=true; __tbc=%7Bkpcd%7DChBtMDN6b3g3eXF4eXpzYnZ2EgpCNnNJWEtMaWluGjxxTEF0bXlHdTRhME81MlVBSnBoWFNNbXFhQTU4OWdWOGlOUUJEd01PdXJUM2dSRVY2cktIUktZbEJ3Q3ggAA; __pat=-14400000; __pvi=eyJpZCI6InYtMjAyNC0wOC0yMS0yMC0zOS0xOC0wMTEtMjVBWlp6cXhJRXFOaG5UdS1iYWM3MmU5MGFkMGJmNzRlMjY4OTQ3MmM3NWJjNjY2NyIsImRvbWFpbiI6Ii5idXNpbmVzc2luc2lkZXIuY29tIiwidGltZSI6MTcyNDI1Mjk1OTM1NX0%3D; _pctx=%7Bu%7DN4IgrgzgpgThIC4B2YA2qA05owMoBcBDfSREQpAeyRCwgEt8oBJAE0RXQF8g; xbc=%7Bkpcd%7DChBtMDN6b3g3eXF4eXpzYnZ2EgpCNnNJWEtMaWluGjxxTEF0bXlHdTRhME81MlVBSnBoWFNNbXFhQTU4OWdWOGlOUUJEd01PdXJUM2dSRVY2cktIUktZbEJ3Q3ggAA",
      DNT: "1",
      "If-Modified-Since": "Wed, 21 Aug 2024 06:27:38 GMT",
      "If-None-Match": 'W/"22fd8-ChEResbjUJ+0OgGcIfNAGTjVELA"',
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Opera GX";v="112"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
    },
  };

  axios
    .request(config)
    .then((response) => {
      const root = parse(response.data);

      const price = root.querySelector(
        ".price-section__current-value"
      ).innerText;
      const priceChange = root.querySelector(
        ".price-section__absolute-value"
      ).innerText;
      const percentageChange = root.querySelector(
        ".price-section__relative-value"
      ).innerText;
      const title = root.querySelector(".price-section__label").innerText;

      let resData = {
        title: title,
        value: price,
        priceChange: priceChange,
        percentageChange: percentageChange,
      };
      res.send(resData);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
};
exports.dlBonds = async (req, res, next) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://markets.businessinsider.com/bonds/dl-bonds_202020-28-41-bond-2041-ararge3209v0?miRedirects=1",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      Connection: "keep-alive",
      Cookie:
        "_gcl_au=1.1.492669746.1724252943; _ga=GA1.1.1058214780.1724252953; MiWebpushNotification=1; universal_id=f5954ae9-5efd-45cf-b89f-1ce6f75df5b8; anonymous_id=8137fad5-ac03-4028-908d-9f1db196f5a6; fenrir_anonymous_id=8137fad5-ac03-4028-908d-9f1db196f5a6; _pcid=%7B%22browserId%22%3A%22m03zox7yqxyzsbvv%22%7D; __pat=-14400000; _pctx=%7Bu%7DN4IgrgzgpgThIC4B2YA2qA05owMoBcBDfSREQpAeyRCwgEt8oBJAE0RXQF8g; xbc=%7Bkpcd%7DChBtMDN6b3g3eXF4eXpzYnZ2EgpCNnNJWEtMaWluGjxxTEF0bXlHdTRhME81MlVBSnBoWFNNbXFhQTU4OWdWOGlOUUJEd01PdXJUM2dSRVY2cktIUktZbEJ3Q3ggAA; __pvi=eyJpZCI6InYtMjAyNC0wOC0yMS0yMC0zOS0xOC0wMTEtMjVBWlp6cXhJRXFOaG5UdS1iYWM3MmU5MGFkMGJmNzRlMjY4OTQ3MmM3NWJjNjY2NyIsImRvbWFpbiI6Ii5idXNpbmVzc2luc2lkZXIuY29tIiwidGltZSI6MTcyNDI1MzA1NjA0NX0%3D; _ga_QMNT7JQZ6N=GS1.1.1724252958.1.1.1724253056.0.0.0; __tbc=%7Bkpcd%7DChBtMDN6b3g3eXF4eXpzYnZ2EgpCNnNJWEtMaWluGjxxTEF0bXlHdTRhME81MlVBSnBoWFNNbXFhQTU4OWdWOGlOUUJEd01PdXJUM2dSRVY2cktIUktZbEJ3Q3ggAA; _ga_E21CV80ZCZ=GS1.1.1724255091.2.0.1724255104.47.0.0",
      DNT: "1",
      "If-Modified-Since": "Wed, 21 Aug 2024 15:04:04 GMT",
      "If-None-Match": 'W/"22e6e-jIfItTLl+a89+ZURNulgSRV0s1Q"',
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Opera GX";v="112"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
    },
  };
  axios
    .request(config)
    .then((response) => {
      const root = parse(response.data);

      const price = root.querySelector(
        ".price-section__current-value"
      ).innerText;
      const priceChange = root.querySelector(
        ".price-section__absolute-value"
      ).innerText;
      const percentageChange = root.querySelector(
        ".price-section__relative-value"
      ).innerText;
      const title = root.querySelector(".price-section__label").innerText;

      let resData = {
        title: title,
        value: price,
        priceChange: priceChange,
        percentageChange: percentageChange,
      };
      res.send(resData);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
};

exports.vix = async (req, res, next) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?symbols=.VIX&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1",
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      dnt: "1",
      origin: "https://www.cnbc.com",
      priority: "u=1, i",
      referer: "https://www.cnbc.com/quotes/.VIX",
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Opera GX";v="112"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 OPR/112.0.0.0",
    },
  };

  let data = axios
    .request(config)
    .then((response) => {
      console.log(
        JSON.stringify(
          response.data.FormattedQuoteResult.FormattedQuote[0].symbol
        )
      );

      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  data.then((e) => {
    res.send({
      symbol: e.FormattedQuoteResult.FormattedQuote[0].symbol.split('.')[1],
      currentValue: (e.FormattedQuoteResult.FormattedQuote[0].change.split('%')[0]).split('$')[1],
      percentageChange: e.FormattedQuoteResult.FormattedQuote[0].change_pct.split('%')[0],
      price: e.FormattedQuoteResult.FormattedQuote[0].last,
      isPositive: parseFloat(e.FormattedQuoteResult.FormattedQuote[0].change_pct) > 0 ? true : false,
      sourceLink :"https://www.cnbc.com/quotes/.VIX"
    });
  });
};
