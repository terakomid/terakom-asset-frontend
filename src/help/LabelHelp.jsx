export const ConvertLabel = (data, capitalizedSplit = '-') => {
    const assetCodeTemp = []
    assetCodeTemp[0] = data.capitalized.split(capitalizedSplit)[0]
    assetCodeTemp[1] = 'FA'
    assetCodeTemp[2] = data.location.code
    assetCodeTemp[3] = data.category.code
    assetCodeTemp[4] = data.sap_code
    return assetCodeTemp
}