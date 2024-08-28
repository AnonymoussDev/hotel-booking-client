export function useSales() {
    const saleTableColumns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 70,
            fixed: 'left',
        },
        {
            title: 'Day start',
            dataIndex: 'dayStart',
            width: 200,
            fixed: 'left',
        },
        {
            title: 'Day end',
            dataIndex: 'dayEnd',
            width: 100,
        },
        {
            title: 'Percent',
            render: (text, record) => `${record.salePercent || 0}%`,
            width: 100,
        },
    ];

    return { saleTableColumns };
}
