'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function(db) {
    db.createTable("d20pfsrd", {
        id: { type: "int", primaryKey: true, autoIncrement: true }
    })
};

exports.down = function(db) {
    db.dropTable("d20pfsrd")
};

exports._meta = {
    "version": 1
};