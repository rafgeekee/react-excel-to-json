import React, { useState, useEffect } from 'react';

import { SupportedFileTypes } from './utils/SupportedFileTypes';
import { isEmptyObject } from './utils/IsEmptyObject';
import { ExcelParser } from './utils/ExcelParser';

export default function ExcelUpload() {
  const [file, setFile] = useState({});
  const [data, setData] = useState({});
  const [buttonText, setButtonText] = useState('Parse Excel File');
  const [titleText, setTitleText] = useState('Upload an Excel file');

  function handleChange(e) {  
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setTitleText('Are you ready for this? Click the button');
    }
  }

  async function handleFile() {
    setButtonText('Processing...');
    try {
      const fileData = await ExcelParser(file);
      setData(fileData);
    } catch (err) {
      setTitleText('Im sad there was an error :('); 
      console.log(err)
    }
    setButtonText('Look in your console!!!');
    setTitleText('YIPPEEEE!!!!');
  }

  useEffect(() => {
    if (!isEmptyObject(file)) {
      console.log('File', file);
    }
  }, [file])

  useEffect(() => {
    if(!isEmptyObject(data)) {
      console.log('Data', data.data);
      console.log('Columns', data.columns);
    }
  }, [data]);

  return (
    <div>
      <label htmlFor="file">{titleText}</label>
      <br />
      <input type="file" className="form-control" id="file" accept={SupportedFileTypes} onChange={handleChange} />
      <br />
      <input type='submit' 
        value={buttonText}
        onClick={handleFile} 
        disabled={isEmptyObject(file)}
      />
    </div>
  )
}