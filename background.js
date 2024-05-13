chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("ebay.com/itm")) {
    const queryParameters = tab.url.split("?")[0];
    const urlParameters = new URLSearchParams(queryParameters);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters //.replace(/\D/g,''), using regex \D which is a shorthand character class that matches all non-digits, rmve all non-digits to get PID
    });
  }
});


// attempt to make it cross-site usable.  
// https://www.ebay.com/itm/275300691493?_trkparms=amclksrc%3DITM%26aid%3D777008%26algo%3DPERSONAL.TOPIC%26ao%3D1%26asc%3D20230823115209%26meid%3Def87a6a267be47e58424ef3a2ee278cb%26pid%3D101800%26rk%3D1%26rkt%3D1%26itm%3D275300691493%26pmt%3D1%26noa%3D1%26pg%3D4375194%26algv%3DRecentlyViewedItemsV2SignedOut%26brand%3DDyson&_trksid=p4375194.c101800.m5481&_trkparms=parentrq%3A60fdd80118f0acda40ec1221fffc55d6%7Cpageci%3Acf52f5fe-0e8e-11ef-be18-42416412f94a%7Ciid%3A1%7Cvlpname%3Avlp_homepage