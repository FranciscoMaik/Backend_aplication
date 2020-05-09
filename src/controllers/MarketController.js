const database = require('../database/connection');

module.exports = {
    async index(request, response){
        const market = await database('market').select('*');
        return response.json(market);
    },
    async create(request, response){
        const { name, street, district, phone } = request.body;
        const [id] = await database('market').insert({
            name,
            street,
            district,
            phone,
            flagCountAny: 0,
            flagCountMonth: 0,
        });

        return response.json({ id });
    }
}