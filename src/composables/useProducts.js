export function useProducts() {
    const productTableColumns = [
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
            title: 'Service',
            width: 200,
            render: (text, record) => record.service?.title,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: 500,
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

    return { productTableColumns };
}
