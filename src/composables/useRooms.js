import { Tag } from 'antd';

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

    const roomAvailableTableColumns = [
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
        {
            title: 'Status',
            dataIndex: 'isAvailable',
            width: 100,
            fixed: 'right',
            render: (text, record) => (
                <Tag color={record.isAvailable ? '#87d068' : '#f50'}>
                    {record.isAvailable ? 'Còn trống' : 'Hết phòng'}
                </Tag>
            ),
        },
    ];

    const roomUpdateFields = [
        {
            title: 'Id',
            dataIndex: 'id',
            isDisable: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
        },
        {
            title: 'size',
            dataIndex: 'size',
        },
        {
            title: 'bed',
            dataIndex: 'bed',
        },
        {
            title: 'description',
            dataIndex: 'description',
        },
        {
            title: 'Services',
            dataIndex: 'services',
        },
    ];

    return { roomTableColumns, roomAvailableTableColumns, roomUpdateFields };
}
