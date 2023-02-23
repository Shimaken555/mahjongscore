// Ruleの定義
const ruleSchema = {
  name: 'Rule',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    RoomNumber: {type: 'int', optional: true},
    name: 'string',
    basePoint: {type: 'int', optional: true}, // ?をつけると optional
    returnPoint: {type: 'int', optional: true}, // ?をつけると optional
    bird: {type: 'int', optional: true},
    horse1: {type: 'int', optional: true},
    horse2: {type: 'int', optional: true},
    underBox: {type: 'int', optional: true},
    Roundup: {type: 'int', optional: true},
    createdAt: 'date',
  },
};

// PlayerScoreの定義
const playerScoreSchema = {
  name: 'playerScore',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    name: 'string',
    Player: {type: 'int', optional: true},
    Top: {type: 'int', optional: true},
    pointStick: {type: 'int', optional: true},
    RealScore: {type: 'int', optional: true},
    RankPoint: {type: 'int', optional: true},
    bird: {type: 'int', optional: true},
    underBox: {type: 'int', optional: true},
  },
};

const RoomSchema = {
  name: 'Room',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    name: 'string',
    gameNumber: {type: 'int', optional: true},
    createdAt: 'date',
    gameCount:{type: 'int', optional: true},
    playerScores: 'playerScore[]', // クラス名 + '[]' で1対多のリレーションを設定できる
  },
};

const GameTotalScore = {
  name: 'TotalScore',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    name: 'string',
    date: 'string',
    gameCount:{type: 'int', optional: true},
    gameNumber: {type: 'int', optional: true},
    sumA: {type: 'int', optional: true},
    sumB: {type: 'int', optional: true},
    sumC: {type: 'int', optional: true},
    sumD: {type: 'int', optional: true},
    nameA: 'string',
    nameB: 'string',
    nameC: 'string',
    nameD: 'string',
    createdAt: 'date',
  },
};

// Realmの初期化
export const openRealm = () => {
  const config = {
    schema: [ruleSchema, RoomSchema, playerScoreSchema, GameTotalScore],
    schemaVersion: 1, // スキーマを変更したらインクリメントする
  };

  return new Realm(config);
};

export {BSON} from 'realm';
