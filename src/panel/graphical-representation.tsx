import Graphviz from "graphviz-react"
import { DFA, getGraphvizSource } from "../automaton/dfa"
import { Panel } from "../panel"

const translations = {
    "en-US": {
        "graphicalRepresentation": "Graphical Representation",
        "viewSource": "View Source",
    },
    "en-UK": {
        "graphicalRepresentation": "Graphical Representation",
        "viewSource": "View Source",
    },
    "ja": {
        "graphicalRepresentation": "図示",
        "viewSource": "ソースを表示",
    }
};

const GraphicalRepresentationPanelDfa: React.FC<{ dfa: DFA, lang: "en-US" | "en-UK" | "ja" }> = ({ dfa, lang }) => {
    const t = translations[lang];
    const graphvizSource = getGraphvizSource(dfa);

    return <Panel title={t.graphicalRepresentation}>
        <Graphviz dot={graphvizSource} options={
            { height: 300 }
        } />
        <details>
            <summary>{t.viewSource}</summary>
            <textarea readOnly={true} rows={10} cols={50} defaultValue={graphvizSource} />
        </details>
    </Panel>

}

export default GraphicalRepresentationPanelDfa;