const oneRepMaxCalc = (weight, reps) => {
    let oneRepMax;
    try {
        if (weight && reps) {
            oneRepMax = Math.round(parseFloat(weight) * (1 + parseFloat(reps) / 30));
        } else {
            oneRepMax = ""
        }
    } catch (error) {
        oneRepMax = "Error"
        console.log("cannot calculate one rep max")
    }
    if (isNaN(oneRepMax)) {
        console.log("NaN")
    }
    return oneRepMax
}

export default oneRepMaxCalc;