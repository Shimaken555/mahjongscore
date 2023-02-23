import React, {useContext, useState, useEffect, useRef} from 'react';
import {openRealm, BSON} from '../realm';
// import type { ReactNode } from 'react';

// type Props = {
//   children?: ReactNode;
// };

const PointContext = React.createContext(null);

const PointProvider = ({children}) => {
  const [points, setPoint] = useState([]);
  const [tableScores, setTableScores] = useState([]);
  const [playerScores, setPlayerScores] = useState([]);
  const [gameTotalScore, setGameTotalScore] = useState([]);

  const realmRef = useRef(null);

  useEffect(() => {
    realmRef.current = openRealm();

    const points = realmRef.current.objects('Rule').sorted('createdAt', true);
    setPoint(points);

    const tableScores = realmRef.current
      .objects('Room')
      .sorted('createdAt', false);
    setTableScores(tableScores);

    const playerScores = realmRef.current
      .objects('playerScore')
      .sorted('_id', true);
    setPlayerScores(playerScores);

    const gameTotalScore = realmRef.current
      .objects('TotalScore')
      .sorted('createdAt', true);
    setGameTotalScore(gameTotalScore);

    // Rule のデータが更新されたら setPoint する
    points.addListener(() => {
      const points = realmRef.current.objects('Rule').sorted('createdAt', true);
      setPoint(points);
    });

    tableScores.addListener(() => {
      const tableScores = realmRef.current
        .objects('Room')
        .sorted('createdAt', false);
      setTableScores(tableScores);
    });

    tableScores.addListener(() => {
      const playerScores = realmRef.current
        .objects('playerScore')
        .sorted('_id', true);
      setPlayerScores(playerScores);
    });

    gameTotalScore.addListener(() => {
      const gameTotalScore = realmRef.current
        .objects('TotalScore')
        .sorted('createdAt', true);
      setGameTotalScore(gameTotalScore);
    });

    // tableScores.addListener(() => {
    //   const tableScores = realmRef.current.objects(
    //     'Room'.sorted('createdAt', true),
    //   );
    //   setTableScores(tableScores);
    // });

    return () => {
      // クリーンアップ
      if (realmRef.current) {
        realmRef.current.close();
      }
    };
  }, []);

  // ルールの新規作成
  const createRule = (
    newBasePoint,
    returnPoint,
    horseA,
    horseB,
    underBox,
    RoomNumber,
  ) => {
    const projectRealm = realmRef.current;
    // const points = realmRef.current.objects('Rule').sorted('createdAt', true);
    // const newId = points[0]._id + 1;
    projectRealm.write(() => {
      task1 = projectRealm.create('Rule', {
        // _id: newId,
        _id: new BSON.ObjectId(),
        RoomNumber: RoomNumber,
        name: '新しいルール',
        basePoint: newBasePoint,
        returnPoint: returnPoint,
        horse1: horseA,
        horse2: horseB,
        underBox: underBox,
        createdAt: new Date(),
      });
    });
  };

  // タスクを削除する
  // const deleteRule = Rule => {
  //   const projectRealm = realmRef.current;
  //   projectRealm.write(() => {
  //     projectRealm.delete(Rule);
  //   });
  // };

  // ルールの削除
  const deleteScore = gameNumber => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      totalScores = projectRealm.objects('TotalScore');
      rooms = projectRealm.objects('Room');

      const selectRule = totalScores.filter(user => {
        return user.gameNumber == gameNumber;
      })[0];

      const selectRoom = rooms.filter(user => {
        return user.gameNumber == gameNumber;
      })[0];

      projectRealm.delete(selectRule);
      projectRealm.delete(selectRoom);
    });
  };

  const deleteRule = gameNumber => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      rooms = projectRealm.objects('Room');

      const selectRoom = rooms.filter(user => {
        return user.gameNumber == gameNumber;
      })[0];

      projectRealm.delete(selectRoom);
    });
  };

  const deleteGameCount = gameCount => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      rooms = projectRealm.objects('Room');

      const deleteGameCount = rooms.filter(user => {
        return user.gameCount == gameCount;
      })[0];

      projectRealm.delete(deleteGameCount);
    });
  };

  // 合計スコアの新規作成
  const createTotalScore = (
    gameNumber,
    date,
    sumA,
    sumB,
    sumC,
    sumD,
    nameA,
    nameB,
    nameC,
    nameD,
    gameCount,
  ) => {
    const projectRealm = realmRef.current;
    // const points = realmRef.current.objects('Rule').sorted('createdAt', true);
    // const newId = points[0]._id + 1;
    projectRealm.write(() => {
      task1 = projectRealm.create('TotalScore', {
        // _id: newId,
        _id: new BSON.ObjectId(),
        name: '部屋用合計スコア',
        gameCount: gameCount,
        gameNumber: gameNumber,
        date: date,
        sumA: sumA,
        sumB: sumB,
        sumC: sumC,
        sumD: sumD,
        nameA: nameA,
        nameB: nameB,
        nameC: nameC,
        nameD: nameD,
        createdAt: new Date(),
      });
    });
  };

  // 合計スコアの更新
  const UpdateTotalScore = (
    gameNumbers,
    sumAs,
    sumBs,
    sumCs,
    sumDs,
    tableScoreCount,
    nameA,
    nameB,
    nameC,
    nameD,
  ) => {
    const projectRealm = realmRef.current;
    // const points = realmRef.current.objects('Rule').sorted('createdAt', true);
    // const newId = points[0]._id + 1;
    projectRealm.write(() => {
      Score = projectRealm.objects('TotalScore');

      const updateScore = Score.filter(user => {
        return user.gameNumber == gameNumbers;
      })[0];

      updateScore.gameCount = tableScoreCount;
      updateScore.sumA = sumAs;
      updateScore.sumB = sumBs;
      updateScore.sumC = sumCs;
      updateScore.sumD = sumDs;
      updateScore.nameA = nameA;
      updateScore.nameB = nameB;
      updateScore.nameC = nameC;
      updateScore.nameD = nameD;
    });
  };

  const UpdateName = (gameNumbers, nameA) => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      Score = projectRealm.objects('TotalScore');

      const updateScore = Score.filter(user => {
        return user.gameNumber == gameNumbers;
      })[0];

      updateScore.nameA = nameA;
    });
  };

  const createScore = (
    gameNumber,
    PlayerA,
    TopA,
    pointStickA,
    RealScoreA,
    RankPointA,
    birdA,
    underBoxA,
    PlayerB,
    TopB,
    pointStickB,
    RealScoreB,
    RankPointB,
    birdB,
    underBoxB,
    PlayerC,
    TopC,
    pointStickC,
    RealScoreC,
    RankPointC,
    birdC,
    underBoxC,
    PlayerD,
    TopD,
    pointStickD,
    RealScoreD,
    RankPointD,
    birdD,
    underBoxD,
    gameCount,
  ) => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      // playerScore1 = projectRealm.create(
      //   {
      //     _id: new BSON.ObjectId(),
      //     name: 'Aさんスコア',
      //     Player: PlayerA,
      //     Top: TopA,
      //     pointStick: pointStickA,
      //     RealScore: RealScoreA,
      //     RankPoint: RankPointA,
      //     bird: birdA,
      //     underBox: underBoxA,
      //     createdAt: new Date(),
      //   },
      //   {
      //     _id: new BSON.ObjectId(),
      //     name: 'Bさんスコア',
      //     Player: PlayerB,
      //     Top: TopB,
      //     pointStick: pointStickB,
      //     RealScore: RealScoreB,
      //     RankPoint: RankPointB,
      //     bird: birdB,
      //     underBox: underBoxB,
      //     createdAt: new Date(),
      //   },
      //   {
      //     _id: new BSON.ObjectId(),
      //     name: 'Cさんスコア',
      //     Player: PlayerC,
      //     Top: TopC,
      //     pointStick: pointStickC,
      //     RealScore: RealScoreC,
      //     RankPoint: RankPointC,
      //     bird: birdC,
      //     underBox: underBoxC,
      //     createdAt: new Date(),
      //   },
      //   {
      //     _id: new BSON.ObjectId(),
      //     name: 'Dさんスコア',
      //     Player: PlayerD,
      //     Top: TopD,
      //     pointStick: pointStickD,
      //     RealScore: RealScoreD,
      //     RankPoint: RankPointD,
      //     bird: birdD,
      //     underBox: underBoxD,
      //     createdAt: new Date(),
      //   },
      // );

      room1 = projectRealm.create('Room', {
        _id: new BSON.ObjectId(),
        name: '結果4',
        // gameNumber: 20,
        gameNumber: gameNumber,
        createdAt: new Date(),
        gameCount: gameCount,
        playerScores: [
          {
            _id: new BSON.ObjectId(),
            name: 'Aさんスコア',
            Player: PlayerA,
            Top: TopA,
            pointStick: pointStickA,
            RealScore: RealScoreA,
            RankPoint: RankPointA,
            bird: birdA,
            underBox: underBoxA,
            createdAt: new Date(),
          },
          {
            _id: new BSON.ObjectId(),
            name: 'Bさんスコア',
            Player: PlayerB,
            Top: TopB,
            pointStick: pointStickB,
            RealScore: RealScoreB,
            RankPoint: RankPointB,
            bird: birdB,
            underBox: underBoxB,
            createdAt: new Date(),
          },
          {
            _id: new BSON.ObjectId(),
            name: 'Cさんスコア',
            Player: PlayerC,
            Top: TopC,
            pointStick: pointStickC,
            RealScore: RealScoreC,
            RankPoint: RankPointC,
            bird: birdC,
            underBox: underBoxC,
            createdAt: new Date(),
          },
          {
            _id: new BSON.ObjectId(),
            name: 'Dさんスコア',
            Player: PlayerD,
            Top: TopD,
            pointStick: pointStickD,
            RealScore: RealScoreD,
            RankPoint: RankPointD,
            bird: birdD,
            underBox: underBoxD,
            createdAt: new Date(),
          },
        ],
      });
    });
  };

  const setIsRuleDone = (Rule, basePoint) => {
    // const projectRealm = realmRef.current;
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      Rule.basePoint = basePoint;
    });
  };

  // usePoint フックで Rule を操作できるようにする
  return (
    <PointContext.Provider
      value={{
        createRule,
        createTotalScore,
        createScore,
        deleteRule,
        deleteScore,
        deleteGameCount,
        setIsRuleDone,
        UpdateTotalScore,
        UpdateName,
        points,
        tableScores,
        playerScores,
        gameTotalScore,
      }}>
      {children}
    </PointContext.Provider>
  );
};

// Rule を操作するための React Hook
const usePoint = () => {
  const Rule = useContext(PointContext);
  if (Rule == null) {
    throw new Error('usePoint() called outside of a PointProvider?');
  }
  return Rule;
};

export {PointProvider, usePoint};
