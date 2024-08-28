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
            width: 100,
            render: (text, record) => record.service?.title,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: 500,
        },
    ];

    return { productTableColumns };
}
