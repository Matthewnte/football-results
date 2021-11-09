exports.up = function (knex) {
  return knex.schema.createTable('results', (table) => {
    table.decimal('id').notNullable();
    table.text('Div').notNullable();
    table.string('Season').notNullable();
    table.date('Date').notNullable();
    table.string('HomeTeam').notNullable();
    table.string('AwayTeam').notNullable();
    table.string('FTHG').notNullable();
    table.string('FTAG').notNullable();
    table.string('FTR').notNullable();
    table.string('HTHG').notNullable();
    table.string('HTAG').notNullable();
    table.string('HTR').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('results');
};
