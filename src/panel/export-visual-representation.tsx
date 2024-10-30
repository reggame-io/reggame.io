import { DFA, getGraphvizSource } from "../automaton/dfa";
import { SupportedNaturalLanguage } from "../dashboard";
import { Panel } from "../panel";

const translations = {
    "en-US": {
        "exportVisual": "Export Visual Representation"
    },
    "en-UK": {
        "exportVisual": "Export Visual Representation"
    },
    "ja": {
        "exportVisual": "図示をエクスポート"
    }
};

const ExportVisualRepresentationPanelDfa: React.FC<{ dfa: DFA, lang: SupportedNaturalLanguage }> = ({ dfa, lang }) => {
    const t = translations[lang];
    const graphvizSource = getGraphvizSource(dfa);
    return <Panel title={t.exportVisual}>
        <div className="export-tabs">
            <button>Graphviz</button>
            <button disabled className="tooltip tooltip-unimplemented">
                TikZ
            </button>
        </div>
        <div className="export-tab-content">
            <pre>
                {graphvizSource}
            </pre>
        </div>
    </Panel>
}

export default ExportVisualRepresentationPanelDfa;
