const supabase = require('../db/confiq')

async function registerAkun(data) {
    try {
        const insertQuery = await supabase.from('user').insert(data)

        if(insertQuery.error) {
            return insertQuery.error
        }

        return insertQuery

    } catch (error) {
        throw error;
    }
}

async function loginAkun(data) {
    const {email, password} = data
    try {
        const {data, error} = await supabase.from('user')
            .select('*')
            .eq('email', email)
            .eq('password', password)

            if(error) {
                return error
            }
            if(data && data.length > 0) {
                return data[0]
            } else {
                return null
            }

            
    } catch (error) {
        console.log(error);
    }
}

module.exports = {registerAkun, loginAkun}