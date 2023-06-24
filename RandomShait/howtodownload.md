Here are the main ways to implement a download button:

1. HTML Anchor Tag - The simplest way is to use an <a> tag with a href pointing to the file:

```html
<a href="file.pdf" download>Download</a>
```

The `download` attribute will prompt the user to download the file instead of opening it in the browser.

2. JavaScript - You can bind a click event to the button and programmatically download the file with JavaScript:

```html
<button id="download">Download</button>
```

```js
document.getElementById("download").addEventListener("click", function() {
  var a = document.createElement("a");
  a.href = "file.pdf";  
  a.download = "download.pdf";
  a.click();
});
```

This creates a dummy `<a>` tag, sets the href and download attributes, and then clicks it to trigger the download.

3. AJAX - You can make an AJAX request to the file URL and receive the file data, then use the `URL.createObjectURL()` API to programmatically download it:

```js
fetch("file.pdf")
  .then(res => res.blob())
  .then(blob => {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;  
    a.download = "download.pdf";
    a.click();
  });
