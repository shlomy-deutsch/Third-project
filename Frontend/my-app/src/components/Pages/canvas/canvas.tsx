import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import store from "../../Redux/Store";

export default function Canvas() {
  const names = store.getState().products;

  const followes = store.getState().products;

  var vocationsArray = new Array();
  var followesAray = new Array();
  var indexAray = new Array();
  let index = 1;
  for (let f of followes) {
    if(f.Folows>0){
    vocationsArray.push(f.Name);
    followesAray.push({ quarter: index, earnings: f.Folows });
    indexAray.push(index);
    index++;}
  }

  return (
    <div className="canvasWarp">
      <VictoryChart
        theme={VictoryTheme.material}
        height={300} width={400}
        domainPadding={{ x: 50, y: [0, 20] }}
        scale={{ x: "time" }}
      >
        <VictoryAxis tickValues={indexAray} tickFormat={vocationsArray} />
        <VictoryAxis dependentAxis tickFormat={(x) => `F${x * 1}`} />
        <VictoryBar
            style={{ data: { fill: "#f50057", stroke: "#ffc107", strokeWidth: 1 } }}
            data={followesAray}
             x="quarter"
            y="earnings"
        />
      </VictoryChart>
    </div>
  );
}
