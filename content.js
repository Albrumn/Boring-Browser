function setStyles() {
    browser.storage.local.get("boringBrowserData")
    .then(result => {
        const data = result.boringBrowserData;
        document.getElementsByTagName("html")[0].style.filter = (
            data.filter(r => r.key === "enabled")[0].value
            ? `brightness(${data.filter(r => r.key === "brightness")[0].value}%) contrast(${data.filter(r => r.key === "contrast")[0].value}%) grayscale(${data.filter(r => r.key === "grayscale")[0].value}%)`
            : "none"
        );
    })
    .catch(error => {
        document.getElementsByTagName("html")[0].style.filter = "brightness(100%) contrast(100%) grayscale(100%)";
    });
}

setStyles();

browser.storage.onChanged.addListener(() => { setStyles(); });