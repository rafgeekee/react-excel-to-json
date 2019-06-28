import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';

export const ExcelParser = (file) => {
  return new Promise((resolve, reject) => {
    let readCols;
    let readData;

    // These are only used to time the function run
    let timeStart = performance.now();
    let timeEnd;
    
    // Setup File Reader
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    
    reader.onload = (e) => {
      // Parse data
      const bstr = e.target.result; // buffer strings
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true }); // the read WorkBooks
      // Get first worksheet (we dont expect multiple in Bulk upload)
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname]; // first WorkSheet
      // Convert array of arrays 
      readData = XLSX.utils.sheet_to_json(ws);
      readCols = make_cols(ws['!ref']);

      // Show me some performance flexing
      timeEnd = performance.now();
      console.log('Time (seconds) taken to parse: ', ((timeEnd - timeStart) / 1000).toFixed(2));
      // Happy days - Resolve the promise
      resolve({ 
        data: readData,
        columns: readCols, 
      });
    };

    // Holy crap - I have an error - REJECT REJECT!!!!
    reader.onerror = reject;
    
    // This triggers the type of read we're doing and hits the onload above.
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    };
  });
}