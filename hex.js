console.log('hello world');

const hex = document.querySelector('#hex');
const status = document.querySelector('#status');
const fileUploadInput = document.querySelector('#romUploader');
const info = document.querySelector('#info');

fileUploadInput.addEventListener('change', function(e) {
  const reader = new FileReader();

  if (fileUploadInput.files[0].size > 4096) {
    status.textContent = 'file too big, this tool is only for roms <= 4096 bytes, the file you are attempting to upload is ' + fileUploadInput.files[0].size + ' bytes';
    return;
  } else {
    status.textContent = fileUploadInput.files[0].name + ' loaded, size = ' + fileUploadInput.files[0].size + ' bytes';
  }

  reader.readAsArrayBuffer(fileUploadInput.files[0]);

  reader.onload = () => {
    loadRom(reader.result);
  }
});

function loadRom(arrayBuffer) {
  let gameRom;
  let decArr = [];

  if (arrayBuffer) {
    gameRom = new Uint8Array(arrayBuffer);
  } else {
    throw new Error('file loading error');
  }

  let hexText = '';

  gameRom.forEach( byte => {
    let textByte = byte.toString();

    // we do this so the numbers are more uniform
    if (textByte.length === 1) {
      textByte = '00' + textByte; 
    } else if (textByte.length === 2) {
      textByte = '0' + textByte;
    }
    decArr.push(parseInt(textByte, 10));
  });

  decArr.forEach( (num, index) => {
    let hex = num.toString(16);
    if (hex.length === 1) {
      hex = '0' + hex;
    }
    hexText += `<span class="spanHex" title="address: ${index.toString(16)}">${hex} </span>`;
  });
  // remove the last comma and space
  hexText = hexText.slice(0, -1);
  // show the hex div
  hex.classList.add('show');
  info.style.display = 'block';

  hex.innerHTML = hexText.toUpperCase();  
}

// function that calcs the number of bytes per line so we can put the address offset into a div on the left of the hex data div
function calcAddressOffsetDiv(numOfBytes) {
  // width of hex div - 40px (for the padding)
  // then divide that by width of spanHex
  // that should equal the number of bytes per line
  // get the number of bytes (numOfBytes), divide that by bytes per line
  // that should equal the number of address offets we'll list
}