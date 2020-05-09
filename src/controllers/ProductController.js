const database = require('../database/connection');

module.exports = {
    async index(request, response){
        const product = await database('product').select('*');
        return response.json(product);
    },
    async create(request, response){
        const { gtin, description, barcode_image, gpc:{ description:descrip } } = request.body;
        const gtinString= gtin.toString();
        await database('product').insert({
            gtin:gtinString,
            description,
            barcode_image,
            gpc_description: descrip,
            flagCountAny: 0,
            flagCountMonth: 0,
        });
        return response.json({ gtin });
    }
}