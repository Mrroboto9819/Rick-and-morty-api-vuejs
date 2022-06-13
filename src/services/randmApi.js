import trae from 'trae'
import configService from './config'

const characterService = trae.create({
    baseUrl: configService.apiUrl,
})

export default characterService