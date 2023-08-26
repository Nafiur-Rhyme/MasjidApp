import {
    Coordinates,
    CalculationMethod,
    PrayerTimes
} from "adhan";
import moment from "moment-timezone";

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getPrayerTimes(lat, long, date) {

    let nextdate = new Date(date);
    nextdate.setDate(date.getDate() + 1);

    const coordinates = new Coordinates(lat, long);
    const params = CalculationMethod.MoonsightingCommittee();
    const prayerTimesToday = new PrayerTimes(coordinates, date, params);
    const prayerTimesTomorrow = new PrayerTimes(coordinates, nextdate, params);


    let prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

    let prayersOfTwoDays = [];

    let p = 0;
    for (let i = 3; i < 10; i++) {
        if (Object.prototype.hasOwnProperty.call(prayerTimesToday, prayers[p])) {
            prayersOfTwoDays.push({ 'name': capitalizeFirstLetter(prayers[p]), 'time': prayerTimesToday[prayers[p]] });
            p++;
        }
    }

    p = 0;
    for (let i = 3; i < 10; i++) {
        if (Object.prototype.hasOwnProperty.call(prayerTimesTomorrow, prayers[p])) {
            prayersOfTwoDays.push({ 'name': capitalizeFirstLetter(prayers[p]), 'time': prayerTimesTomorrow[prayers[p]] });
            p++;
        }
    }


    const currentTime = prayerTimesToday.timeForPrayer(prayerTimesToday.currentPrayer());

    function getNextPrayers(currentTime, prayersOfTwoDays, numPrayers) {

        const currentIndex = prayersOfTwoDays.findIndex(prayer => prayer.time > currentTime);

        if (currentIndex === -1) {
            return [];
        }

        const nextPrayers = prayersOfTwoDays.slice(currentIndex, currentIndex + numPrayers);
        return nextPrayers;
    }

    const nextFivePrayers = getNextPrayers(currentTime, prayersOfTwoDays, 5);
    const current = capitalizeFirstLetter(prayerTimesToday.currentPrayer());
    const currentTimeString = moment(currentTime).format("h:mm A - DD-MMM-YYYY");


    return {
        prayerTimesToday: prayerTimesToday,
        nextFivePrayers: nextFivePrayers,
        current: current,
        currentTime: currentTimeString
    };
}