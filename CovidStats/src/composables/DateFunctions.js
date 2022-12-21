import {format, subDays} from "date-fns";
import {tr} from "date-fns/locale"




const TurkeyDate = new Date(2022,4,31)
const Currentdate = new Date()


let OriginalJsDates = [] // 2021-05-31 12:00:00
let ConvertedDays = [] // 2021-05-31
let ConvertedDaysForTr = [] // 31 Mayis 2021, 00:00

const getPastDays = (currentdate,datecount) => { //The funtion for get past days//currentdate is the date you want to start from and datecount is the number of days you want to get
    OriginalJsDates = []
    ConvertedDaysForTr = []
    ConvertedDays = []
    for (let i = 1; i < datecount+1; i++) {
        let pastDay = subDays(currentdate, i)
        const ConvertPastDay = format(pastDay,'Pp')
        OriginalJsDates.push(ConvertPastDay)
        const ConvertTur = format(pastDay, 'PPPppp', {locale: tr})
        ConvertedDaysForTr.push(ConvertTur)
    }


    OriginalJsDates.map(elm =>{
        elm = elm.slice(0,10)
        elm = elm.replaceAll('/','-')
        const monthDay = elm.slice(0,5)
        const year = elm.slice(6)
        elm = year+'-'+monthDay
        ConvertedDays.push(elm)

    })

}





export {getPastDays,Currentdate,OriginalJsDates,ConvertedDaysForTr,ConvertedDays,TurkeyDate}