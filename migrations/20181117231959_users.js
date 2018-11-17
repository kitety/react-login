// https://knexjs.org/#Schema-createTable 创建
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    // 添加自动递增列 id
    table.increments();
    // 字符串的用户名密码 不为空 唯一
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password_digest').notNullable().unique();// 加密过的密码
    // 创建的时间
    table.timestamps();
  })
};

//https://knexjs.org/#Schema-dropTable 删除 撤回
exports.down = function (knex, Promise) {
  return knex.schema.createTable('users');
};
