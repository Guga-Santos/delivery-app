const showPeopleList = (people, requirement, message) => {
  console.log(
    (message ? `"${message}"\n` : '')+
    `Amostragem de pessoas fictícias utilizada no teste:\n`+
    `\`${requirement}\`\n`);
  console.table(people.map((el) => delete el.id && el));
}

module.exports = showPeopleList;
