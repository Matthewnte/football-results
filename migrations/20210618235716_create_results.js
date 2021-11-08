exports.up = function (knex) {
  return knex.schema.createTable('results', (table) => {
    table.decimal('id').primary();
    table.text('Div');
    table.string('Season');
    table.date('Date');
    table.string('HomeTeam');
    table.string('AwayTeam');
    table.string('FTHG');
    table.string('FTAG');
    table.string('FTR');
    table.string('HTHG');
    table.string('HTAG');
    table.string('HTR');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('results');
};
