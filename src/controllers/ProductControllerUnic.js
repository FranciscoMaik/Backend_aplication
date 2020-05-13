const database = require("../database/connection");
const api = require("../services/api");

setInterval(time, 86400000);

function time() {
  let date = new Date();
  //Quando for o dia 1 de todo mês a flag de contagem de quantas vezes
  // aquele produto foi adicionado a lista de alguém no mês será zerada
  if (date.getDate() === 1) {
    seeAll();
  }

  //Quando for o dia 1 do mês de janeiro a flag de contagem de quantas vezes
  // aquele produto foi adicionado a lista de alguém no ano será zerada
  if (date.getDate() == 1 && date.getMonth() == 0) {
    seeAllDados();
  }
}

//Função responsavel por zerar a flag do mês de todos os produtos
async function alterDadosMonth(product, prod) {
  await database("product").where("gtin", "=", product[prod].gtin).update({
    flagCountMonth: 1,
  });
}

//Função responsavel por zerar a flag do ano de todos os produtos
async function alterDadosAny(product, prod) {
  await database("product").where("gtin", "=", product[prod].gtin).update({
    flagCountAny: 1,
  });
}

//Função responsavel por percorrer todos os produtos para alterar a flag do mês
async function seeAll() {
  const product = await database("product").select("*");
  for (let prod in product) {
    alterDadosMonth(product, prod);
  }
}

//Função responsavel por percorrer todos os produtos para alterar a flag do ano
async function seeAllDados() {
  const product = await database("product").select("*");
  for (let prod in product) {
    alterDadosAny(product, prod);
  }
}

//Função complementar de adição de valores as tags de mês e ano
async function alterAllFlags(product, barcode) {
  await database("product")
    .where("gtin", "=", barcode)
    .update({
      flagCountMonth: product[0].flagCountMonth + 1,
      flagCountAny: product[0].flagCountAny + 1,
    });
}

//Adicionando valor as flags de mês e ano
async function addFlagAll(barcode) {
  const product = await database("product")
    .where("gtin", "=", barcode)
    .select("*");
  alterAllFlags(product, barcode);
}

//Função responsavél por criar um produto no banco caso não exista aquele produto cadastrado
async function saveDados(response) {
  const { gtin, description, barcode_image } = response.data;
  const gtinString = gtin.toString();
  const dados = {
    gtin: gtinString,
    description,
    barcode_image,
    flagCountAny: 1,
    flagCountMonth: 1,
  };

  await database("product").insert(dados);

  delete dados.flagCountAny;
  delete dados.flagCountMonth;

  return dados;
}

module.exports = {
  async index(request, response) {
    const { barcode } = request.params;
    const product = await database("product")
      .where("gtin", barcode)
      .select("*")
      .first();

    if (!product) {
      try {
        const apiRequest = await api.get(`${barcode}`);
        const dados = await saveDados(apiRequest);
        return response.json(dados);
      } catch (error) {
        return response.json({
          err: "Não foi possivel cadastrar o código de barras!",
        });
      }
    } else {
      await addFlagAll(barcode);
      return response.json(product);
    }
  },

  async delete(request, response) {
    const { barcode } = request.params;
    await database("product").where("gtin", barcode).del();
    return response.status(200).send();
  },
};
