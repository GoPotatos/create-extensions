const url="";
function doGet() {
  const ss=SpreadsheetApp.openByUrl(url).getActiveSheet()

  data=ss.getDataRange().getValues().slice(1)
  return ContentService.createTextOutput(JSON.stringify(data))
          .setMimeType(ContentService.MimeType.JSON)
}