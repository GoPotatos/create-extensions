const url=""
const emails=[""]
function doPost(e){
  const ss=SpreadsheetApp.openByUrl(url)
  
  let sheet=ss.getSheetByName("list")
  if(!sheet){
    sheet=ss.insertSheet(ss.getNumSheets())
    sheet.setName("list");
  }
  const data=[]
  console.log(e.postData.contents)
  content=JSON.parse(e.postData.contents)
  const result=content.result;
  console.log("Content",content)
  if(content.type==="crash-report"){
    for(const email of emails){
      GmailApp.sendEmail(email,"Crash Report "+result,"Your Script has crashed")
    }
  }else if(content.type==="links"){

  
    for(row of result){
      rowData=[]
      for(let i=0;i<6;i++){
        cell=row[i]||""
        rowData.push(cell);
      }
      sheet.appendRow(rowData)
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({'status': 'success'})).
  setMimeType(ContentService.MimeType.JSON);
}

function doGet(e){
  sheet=SpreadsheetApp.openByUrl(url).getSheets()[0].getDataRange().getValues().map(row=>row[0])
  Logger.log(sheet)
  return ContentService.createTextOutput(JSON.stringify(sheet)).
  setMimeType(ContentService.MimeType.JSON);
}


function test(){
  
}