export function useServices() {
    const servicesTableColumns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 70,
            fixed: 'left',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: 200,
            fixed: 'left',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: 100,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: 500,
        },
    ];

    return { servicesTableColumns };
}
