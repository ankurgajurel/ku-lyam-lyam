import { createWorker } from 'tesseract.js';
import { parse } from 'date-fns';

let parameters = ["Citizenship Certificate No", "Sex", "Full Name", "Date of Birth", "Year", "Month", "Day", "Birth Place", "Permanent Address", "Ward No"];
let customWork = ["Birth Place", "Permanent Address"];
let DOB = {
    "Year": " ",
    "Month": " ",
    "Day": " "
}
let processedData = {};

async function getdata(textData){
    textData = textData.replaceAll("\n", " ");
    textData = textData.replace(/[.,:|+~+]/g, ' ');
    for(let i = 0; i < parameters.length-1; i++){
        processdata(i, textData);
    }
    for (let item in processedData){
        if (customWork.includes(item)){
            let district, nagarpalika, ward;
            if(processedData[item] == " "){
                district = " ";
                nagarpalika = " ";
                ward = " ";
            }
            else {
                ward = processedData[item].split("Ward No")[1];
                if(ward){ward = ward.trim()}
                let residence = processedData[item].split(" ").map(item => item.trim()).filter(item => item != '');
                district = residence[1];
                let municipality = residence[3];
                nagarpalika = municipality +" "+ residence[2];
            }
            processedData[item] = {
                "district": district,
                "municipality": nagarpalika,
                "ward": ward
            };
        };
    };
    if (DOB["Year"] == " " || DOB["Month"] == " " || DOB["Day"] == " "){
        processedData["Date of Birth"] = " "
    }
    else{
        let dateString = `${DOB["Year"]}-${DOB["Month"]}-${DOB["Day"]}`
        let parsedDate = parse(dateString, 'yyyy-MMM-dd', new Date());
        let month = parsedDate.getMonth() + 1;
        processedData["Date of Birth"] = `${DOB["Year"]}-${month}-${DOB["Day"]}`;
    }
    let wardData = textData.split("Ward No")[2];
    if(wardData === undefined){ wardData = " ";}
    else{
        wardData = wardData.trim().slice(0,2).trim()
    }
    processedData["Permanent Address"]["ward"] = wardData
    return processedData;
};

async function processdata(i, data){
    let intialIndex = data.indexOf(parameters[i]);
    let pos = intialIndex + parameters[i].length;
    let finalIndex = data.indexOf(parameters[i+1], pos);
    let individualData = data.substring(pos, finalIndex).trim();
    if (intialIndex == -1 || finalIndex == -1){ //invalid data
        individualData = " ";
    };
    if (parameters[i] in DOB){
        DOB[parameters[i]] = individualData;
    }
    else if (!parameters[i].includes("Date")){
        processedData[parameters[i]] = individualData;
    };
};


async function english(file) {
    const worker = await createWorker('eng');
    const data = await worker.recognize(file);
    const textData = data.data.text;
    processedData = await getdata(textData);
    await worker.terminate();
};

export async function OCR(file){
    await english(file);
    return GetCamelCase(processedData);
};

function GetCamelCase(data){
    let camelCaseData = {};
    for (let item in data){
        let ans = item.toLowerCase();
        ans = ans.split(" ").reduce((s, c) => s
        + (c.charAt(0).toUpperCase() + c.slice(1)));
        camelCaseData[ans] = data[item];
    };
    return camelCaseData;
}
