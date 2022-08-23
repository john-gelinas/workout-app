import moment from 'moment';

const paceCalc = (distance, duration) => {
    if (distance && duration) {
        const durationSeconds = moment.duration(duration).asSeconds()
        const paceTotalSeconds = Math.round(durationSeconds / distance);
        const paceDuration = moment.duration(paceTotalSeconds, 'seconds');
        const paceHours = ("0" + paceDuration.hours()).slice(-2);
        const paceMinutes = ("0" + paceDuration.minutes()).slice(-2);
        const paceSeconds = ("0" + paceDuration.seconds()).slice(-2);
        const paceString = `${paceHours}:${paceMinutes}:${paceSeconds}`
        return paceString

    } else {
        return ""
    }

}

export default paceCalc