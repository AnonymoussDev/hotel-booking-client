export function useUsers() {
    const userTableColumns = [
        {
            title: 'Email',
            dataIndex: 'email',
            width: 220,
            fixed: 'left',
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            width: 140,
        },
        {
            title: 'Last name',
            dataIndex: 'lastName',
            width: 150,
        },
        {
            title: 'First name',
            dataIndex: 'firstName',
            width: 100,
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            width: 80,
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            width: 150,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: 300,
        },
    ];

    return { userTableColumns };
}
