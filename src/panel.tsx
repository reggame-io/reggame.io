import { ReactNode } from "react";

interface PanelProps {
    title: string;
    children: ReactNode;
}

const Panel = ({ title, children }: PanelProps) => (
    <div className="panel">
        <h2>{title}</h2>
        {children}
    </div>
);

const UnimplementedPanel = ({ title, children }: PanelProps) => (
    <div className="panel unimplemented">
        <h2>{title}</h2>
        {children}
    </div>
);

export { UnimplementedPanel, Panel };
