


export const isoDateToFormatted = (dateString) => {
    const date = new Date(dateString);

    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    const formattedDate = `${month}/${day}/${year}`

    return formattedDate
}

export const formatSearchParams = (params) => {

    //filters={"type":"loop","city":"huntsville","state":"al","minDistance":2,"features":["waterfall","cave"]}
    const filters = {}

    if (params.distance) {
        filters.minDistance = params.distance[0]
        filters.maxDistance = params.distance[1]
    }

    if (params.elevationGain) {
        filters.minElevationGain = params.elevationGain[0]
        filters.maxElevationGain = params.elevationGain[1]
    }

    if (params.elevationLoss) {
        filters.minElevationLoss = params.elevationLoss[0]
        filters.maxElevationLoss = params.elevationLoss[1]
    }

    if (params.maxElevation) {
        filters.minElevation = params.maxElevation[0]
        filters.maxElevation = params.maxElevation[1]
    }

    if (params.difficulty.length > 0) {
        const originalDifficulty = ["Easy", "Easy/Intermediate", "Intermediate", "Intermediate/Difficult", "Difficult", "Very Difficult"]
        const difficultyOptions = ["Easy", "Intermediate", "Moderate", "Difficult", "Hard", "Very Hard"]

        const difficulty = params.difficulty.map((level) => {
            let idx = difficultyOptions.indexOf(level)
            return originalDifficulty[idx];
        })
        filters.difficulty = difficulty;
    }

    if (params.type.length > 0) {
        filters.type = params.type
    }

    if (params.features.length > 0) {
        filters.features = params.features
    }

    return JSON.stringify(filters)
}

export const compareObjects = (obj1, obj2) => {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }

    for (let key of obj1Keys) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

export const getBaseUrl = () => import.meta.env.VITE_BACKEND_URL
export const getTestKey = () => import.meta.env.VITE_TEST_KEY
export const getAuthUrl = () => import.meta.env.VITE_BACKEND_AUTHURL



