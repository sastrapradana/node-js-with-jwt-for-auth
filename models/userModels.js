const supabase = require('../db/confiq')

const getAllUser = async () => {
    try {
        const req = await supabase.from('user').select('*')

        if(req.error) {
            return req.error
        }

        return req
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllUser
}