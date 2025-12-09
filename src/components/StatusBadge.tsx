import { ProcessingStatus } from "../types";

interface StatusBadgeProps {
    status: ProcessingStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const getStatusColor = (status: ProcessingStatus) => {
        switch (status) {
            case "idle":
                return "#a0a0a0";
            case "analyzing":
                return "#bb86fc";
            case "done":
                return "#03dac6";
            case "error":
                return "#cf6679";
        }
    };

    const styles = {
        padding: "4px 8px",
        borderRadius: "12px",
        backgroundColor: `${getStatusColor(status)}30`,
        color: getStatusColor(status),
        border: `1px solid ${getStatusColor(status)}`,
        fontSize: "0.8rem",
        fontWeight: "bold",
        textTransform: "uppercase" as const,
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
    };

    return (
        <span style={styles}>
            {status === "analyzing" && <span className="loader"></span>}
            {status}
        </span>
    );
}
