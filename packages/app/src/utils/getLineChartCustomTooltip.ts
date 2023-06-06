export const getTooltip = (color: string, data: number) => `
    <div
    style="
        color: white;
        padding: 0.5rem 0.5rem 0.45rem 0.5rem;
        display: flex;
        justify-content:center;
        align-items:center;
        background-color: #111111 ;
        border-radius:10rem;
        font-size: 12px;
        "
    >
        <span
            style="
            width: 6px;
            height: 6px;
            margin-right:4px;
            border-radius:10rem;
            background-color: ${color};
            "
        ></span>
        ${data}
    </div>`;
