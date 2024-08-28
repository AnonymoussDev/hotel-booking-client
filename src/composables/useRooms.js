export function useRooms() {
    const roomTableColumns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 70,
            fixed: 'left',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: 200,
            fixed: 'left',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: 100,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            width: 100,
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
            width: 90,
        },
        {
            title: 'size',
            dataIndex: 'size',
            width: 70,
        },
        {
            title: 'bed',
            dataIndex: 'bed',
            width: 150,
        },
        {
            title: 'description',
            dataIndex: 'description',
            width: 500,
        },
        {
            title: 'Services',
            render: (text, record) => record.services,
            width: 150,
        },
        {
            title: 'Sale',
            render: (text, record) => `${record.sale?.salePercent || 0}%`,
            width: 150,
        },
    ];

    return { roomTableColumns };
}
