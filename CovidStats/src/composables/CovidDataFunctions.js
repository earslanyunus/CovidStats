import axios from "axios";
import {format, subDays} from "date-fns";
import {tr} from "date-fns/locale"
import Papa from "papaparse"

function csvJSON(csv) {

    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }

    return result; //JavaScript object
    // return JSON.stringify(result); //JSON
}


const TurkeyDate = new Date(2022,4,31)
const Currentdate = new Date()


let SelectedDays = []
let TurConvertedDays = []
let ConvertedDays = []

const getPastDays = (currentdate,datecount) => {
    SelectedDays = []
    TurConvertedDays = []
    ConvertedDays = []
    for (let i = 1; i < datecount+1; i++) {
        let pastDay = subDays(currentdate, i)
        const ConvertPastDay = format(pastDay,'Pp')
        SelectedDays.push(ConvertPastDay)
        const ConvertTur = format(pastDay, 'PPPppp', {locale: tr})
        TurConvertedDays.push(ConvertTur)
    }


    SelectedDays.map(elm =>{
        elm = elm.slice(0,10)
        elm = elm.replaceAll('/','-')
        const monthDay = elm.slice(0,5)
        const year = elm.slice(6)
        elm = year+'-'+monthDay
        ConvertedDays.push(elm)

    })

}


const getFullData = async () => {
    const data = await axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv')
    const veri = await csvJSON(data.data)
    return veri



}
// const filterDateandCountry = (array,country)=>{
//     array.forEach(elm=>)
// }


export {getFullData,getPastDays,Currentdate,SelectedDays,TurConvertedDays,ConvertedDays,TurkeyDate}