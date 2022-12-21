import { h, render, Component } from "preact";
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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: new Board(signMap),
      vertexSize: 34,
      showCoordinates: true,
      showHeatMap: true,
      showMarkerMap: true,
      player: 0,
      sessionID: randomRange(100000, 200000),
      isBusy: false,
    };
  }

  render() {
    let {
      vertexSize,
      showCoordinates,
      showHeatMap,
      showMarkerMap,
    } = this.state;

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
                console.log(this.state.sessionID)
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
                this.state.sessionID = randomRange(100000, 200000)
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
          innerProps: {
            onContextMenu: (evt) => evt.preventDefault(),
          },
          vertexSize,
          animate: true,
          busy: this.state.isBusy,

          signMap: this.state.board.signMap,
          showCoordinates,
          heatMap: showHeatMap && heatMap,
          markerMap: showMarkerMap && markerMap,

          onVertexMouseUp: (evt, [x, y]) => {
            let sign = evt.button === 0 ? 1 : -1;
            let newBoard = this.state.board.makeMove(sign, [x, y]);
            this.setState({ board: newBoard });
          },
        }),
      )
    );
  }
}

function randomRange(min, max) { // min最小值，max最大值
  return Math.floor(Math.random() * (max - min)) + min;
}

export default App;
