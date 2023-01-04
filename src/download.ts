export function download(filename: string, xml: string) {
  const file = new Blob([xml], { type: "application/xml" });
  const url = URL.createObjectURL(file);

  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
