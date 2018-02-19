export const statusColor = (status) => {
    switch (status) {
        case "Pass":
            return {
                "color": "green",
                "status": "Release Ready"
            };
        case "Partial":
            return {
                "color": "yellow",
                "status": "Partial Failure - unknown"
            };
        case "Fail":
        return {
            "color": "red",
            "status": "Integration tests failing"
        };
        default:
            return "green";
    }
}