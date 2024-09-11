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
        },
        {
            title: 'Day end',
            dataIndex: 'dayEnd',
            width: 200,
        },
        {
            title: 'Percent',
            render: (text, record) => `${record.salePercent || 0}%`,
            width: 100,
        },
        {
            title: 'Creator',
            width: 200,
            render: (text, record) => `${record.creator.lastName} ${record.creator.firstName}`,
        },
        {
            title: 'Modifier',
            width: 200,
            render: (text, record) => `${record.modifier.lastName} ${record.modifier.firstName}`,
        },
        {
            title: 'Created date',
            dataIndex: 'createdDate',
            width: 200,
        },
        {
            title: 'Last modified date',
            dataIndex: 'lastModifiedDate',
            width: 200,
        },
    ];

    return { saleTableColumns };
}
