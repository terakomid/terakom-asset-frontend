// Data
import { getAll, getAllParentLocation, remove } from './Api'


export const ParentLocation = async () => {
    const response = await getAllParentLocation()
        .then(result => {
            if (result.data.status === '200') {
                return result.data.result
            }
        })

    return response
}


export const dataTable = async () => {

    const response = await getAll()
        .then(result => {
            if (result.data.status === '200') {
                const dataRows = result.data.result.map((d, i) => {
                    return {
                        number: i + 1,
                        id: d.id,
                        code: d.code,
                        location: d.location,
                        parent_location: d.parent_location,
                        parent_location_code: d.parent_location_code
                    }
                })

                return dataRows
            }
        })

    return response
}

export const deleteLocation = async (id) => {
    const response = await remove(id)
        .then(result => {
            if (result.data) {
                return result.data
            }
        })

    return response
}