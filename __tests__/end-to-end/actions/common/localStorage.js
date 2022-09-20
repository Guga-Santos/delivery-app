const localStorage = async (page, key) => {
  try {
    // eslint-disable-next-line no-unused-vars
    return page.evaluate((key)=> localStorage[key] ? 
      JSON.parse(localStorage[key]) : undefined, key);
  } catch (error) {
    throw new Error(`Não foi possível consultar a chave '${key}' do localStorage`);
  }
}

module.exports = localStorage;
