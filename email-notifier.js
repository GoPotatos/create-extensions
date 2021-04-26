const email=""
function doPost(e){
  const contents=JSON.parse(e.postData.contents)
  createTable(contents)
  return ContentService.createTextOutput(JSON.stringify({'status': 'success'})).
  setMimeType(ContentService.MimeType.JSON);
}

function createTable(values){
  values.splice(0,0,["keyword","date","time","url1","url2","url3","url4","url5","url6"])
  let table="<table style='border-collapse:collapse;'>"
  for([i,row] of values.entries()){
    table+="<tr>"
    for(cell of row){
      const cellType=i===0?"th":"td"
      table+=`<${cellType} style='border:1px solid black'>${cell}</${cellType}>`
    }
    table+="</tr>"
  }
  table+="</table>"
  GmailApp.sendEmail(email,"Test","No body",{htmlBody:table})
}