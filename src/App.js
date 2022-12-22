import { h, render, Component } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks"
import Board from "@sabaki/go-board";
import { Goban } from "@sabaki/shudan";

const signMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const loose = [
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
[0, 0, 0, 0, 1, -1, -1, -1, -1, -1, -1, 1, 0, 0, 0],
[0, 0, 0, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 0, 0],
[0, 0, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1],
[0, 0, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1],
[0, 0, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1],
[0, 0, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1],
[0, 0, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1],
[0, 0, 0, 1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1],
[0, 0, 0, 0, 0, 0, 0, 1, -1, -1, -1, 1, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 1, -1, 1, 1, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, -1, -1, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, -1, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
];

const heatMap = (() => {
  let _ = null;
  let O = (strength, text) => ({ strength, text });
  let O1 = O(1, "20%\n111");
  let O5 = O(5, "67%\n2315");
  let O9 = O(8, "80%\n13.5k");

  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ];
})();

const markerMap = (() => {
  let _ = null;
  let O = { type: "circle" };
  let X = { type: "cross" };
  let T = { type: "triangle" };
  let Q = { type: "square" };
  let $ = { type: "point" };
  let S = { type: "loader" };
  let L = (label) => ({ type: "label", label });
  let A = L("a");
  let B = L("b");
  let C = L("c");
  let longLabel = L("Long\nlabel with linebreak");

  return [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  ];
})();

function App() {
    const [board, setBoard] = useState(new Board(signMap))
    const [isEnd, setIsEnd] = useState(false)
    const vertexSize = 34
    const showCoordinates = true
    const showHeatMap = true
    const showMarkerMap = true
    const [player, setPlayer] = useState(1)
    const [sessionID, setSessionID] = useState(randomRange(1000000, 2000000))
    const [isBusy, setIsBusy] = useState(true)
    useEffect(()=>{
      setBoard(()=>{
        const newBoard = board.clear()
        return new Board(newBoard.signMap)
      })
    }, [sessionID])
    const clickStart = useCallback(()=>{
      if (isEnd) {
        return 
      }
      setIsBusy(false)
      // (sessionID) => ()
      fetch("/api/start", {
        method: 'post',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          'session_id': sessionID
        })
      })
        .then((response)=>response.json())
        .then((response)=>{
          console.log(response)
        })
    }, [sessionID, isEnd])
    const clickRestart = useCallback(()=>{
      setIsBusy(false)
      setIsEnd(false)
      const oldSessionID = sessionID
      const newSessionID = randomRange(1000000, 2000000)
      setSessionID(newSessionID)
      // (oldSessionID, newSessionID)=>()
      fetch("/api/restart", {
        method: 'post',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          'old_session_id': oldSessionID,
          'new_session_id': newSessionID,
        })
      })
        .then((response)=>response.json())
        .then((response)=>{
          console.log(response)
        })
    }, [sessionID])
    return h(
      "section",
      {
        style: {
          display: "inline",
        },
      },
      h(
        "form",
        {
          style: {
            display: "flex",
            flexDirection: "column",
          },
        },

        h(
          "p",
          { style: { margin: "0 0 .5em 0" } },
          h(
            "button",
            {
              type: "button",
              style: {
                width: 100,
                height: 50,
                fontSize: 30,
              },
              onClick: (evt) => {
                clickStart()
              },
            },
            "start"
          ),
          " ",
          h(
            "button",
            {
              type: "button",
              style: {
                width: 100,
                height: 50,
                fontSize: 30,
              },
              onClick: (evt) => {
                clickRestart()
              },
            },
            "restart"
          )
        ),
      ),
      h(
        "div",
        {
          style: {
            display: "inline",
          }
        },
        h(Goban, {
          // innerProps: {
          //   onContextMenu: (evt) => evt.preventDefault(),
          // },
          vertexSize,
          animate: true,
          busy: isBusy,

          signMap: board.signMap,
          showCoordinates,
          heatMap: showHeatMap && heatMap,
          markerMap: showMarkerMap && markerMap,

          onVertexMouseUp: (evt, [x, y]) => {
            if (board.get([x,y]) !== 0) {
              return 
            }
            // 留给ajax,（x, y, sessionID) => (win, player, [x, y])
            const newBoard = board.set([x, y], player)
            setBoard(new Board(newBoard.signMap));
            console.log(board)
            fetch("/api/move", {
              method: 'post',
              headers: {
                'Content-Type':'application/json'
              },
              body: JSON.stringify({
                "coor_x": x, 
                "coor_y": y,
                "session_id": sessionID
              })
            })
              .then((response)=>response.json())
              .then((response)=>{
                const ai_x = response.x
                const ai_y = response.y
                const end = response.end
                const winner = response.winner
                console.log(end, winner)
                console.log("x, y:", ai_x, ai_y)
                const newBoard1 = board.set([ai_x, ai_y], -player)
                setBoard(new Board(newBoard1.signMap));
                if (end && winner === 2) {
                  setBoard(new Board(loose))
                  setIsBusy(true)
                  setIsEnd(true)
                }
                if (end && winner === 1) {
                  setIsBusy(true)
                  setIsEnd(true)
                  alert("you win :)")
                }
              })
          },
        }),
      )
    );
}

function randomRange(min, max) { // min最小值，max最大值
  return Math.floor(Math.random() * (max - min)) + min;
}


export default App;
