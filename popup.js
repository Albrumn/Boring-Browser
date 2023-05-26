const __key__ = "boringBrowserData";
const defaultBoringBrowserData = [
	{ key: "enabled", value: true },
    { key: "brightness", value: 100 },
    { key: "contrast", value: 75 },
    { key: "grayscale", value: 100 }
];

function isValidLocalStorage(boringBrowserData) {
	return boringBrowserData && boringBrowserData.length === defaultBoringBrowserData.length;
}

function applyChanges() {
	browser.runtime.sendMessage({ 
		enabled: document.getElementById("enabled").value,
		brightness: document.getElementById("brightness").value,
		contrast: document.getElementById("contrast").value,
		grayscale: document.getElementById("grayscale").value
	 });
}

function getState() {
	return ([
		{ key: "enabled",	 value: document.getElementById("enabled").checked },
		{ key: "brightness", value: document.getElementById("brightness").value },
		{ key: "contrast",	 value: document.getElementById("contrast").value },
		{ key: "grayscale",	 value: document.getElementById("grayscale").value }
	]);
}

function updateUI(boringBrowserData) {
	boringBrowserData.forEach(datum => {
		if (datum.key === "enabled") document.getElementById(datum.key).checked = datum.value;
		else document.getElementById(datum.key).value = datum.value;

		document.getElementById(datum.key).oninput = (evt) => {
			browser.storage.local.set({[__key__]: getState()});//, () => { applyChanges(); });
		};
	});
}

browser.storage.local.get([__key__], result => {
	if (isValidLocalStorage(result[__key__])) {
		updateUI(result[__key__]);
	}
	else browser.storage.local.set({[__key__]: defaultBoringBrowserData}, () => {
		updateUI(defaultBoringBrowserData);
	});
});