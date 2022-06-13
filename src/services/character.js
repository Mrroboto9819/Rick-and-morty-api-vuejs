import characterService from "./randmApi"

const getCharacters = {}
    
getCharacters.search = async (name, status, page) => {
    // console.log(name)
    let res = await characterService.get('', {
        params: { name, status, page }
    })
    return res.data
}


export default getCharacters