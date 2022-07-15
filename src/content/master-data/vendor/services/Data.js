// Data
import { getAll, remove } from './Api'

/**
 * ==================================================================
 * function dataTable
 * ==================================================================
 * @returns response
 */
export const dataTable = async () => {

    const response = await getAll()
        .then(result => {
            if (result.data.status === '200') {
                const dataRows = result.data.result.map((d, i) => {
                    return {
                        number: i + 1,
                        id: d.id,
                        code: d.code,
                        name: d.name,
                        address: d.address,
                        contact: d.contact,
                    }
                })

                return dataRows
            }
        })

    return response
}


/**
 * ==================================================================
 * function deleteData
 * ==================================================================
 * @returns response
 */
export const deleteData = async (id) => {
    const response = await remove(id)
        .then(result => {
            if (result.data) {
                return result.data
            }
        })

    return response
}