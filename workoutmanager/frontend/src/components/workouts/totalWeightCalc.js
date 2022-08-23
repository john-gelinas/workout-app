const totalWeightCalc = (weight, reps) => {
    if (weight && reps) {
        return parseFloat(weight) * parseFloat(reps)
    } else {
        return ""
    }
}

export default totalWeightCalc;