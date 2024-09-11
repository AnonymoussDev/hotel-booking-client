export function useBookings() {
    const bookingTableColumns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 70,
        },
        {
            title: 'Phone number',
            width: 140,
            fixed: 'left',
            render: (text, record) => record.booker?.phoneNumber,
        },
        {
            title: 'Email',
            width: 220,
            render: (text, record) => record.booker?.email,
        },
        {
            title: 'Last name',
            width: 150,
            fixed: 'left',
            render: (text, record) => record.booker?.lastName,
        },
        {
            title: 'First name',
            dataIndex: 'firstName',
            width: 100,
            fixed: 'left',
            render: (text, record) => record.booker?.firstName,
        },
        {
            title: 'Expected check-in',
            dataIndex: 'expectedCheckIn',
            width: 180,
        },
        {
            title: 'Expected check-out',
            dataIndex: 'expectedCheckOut',
            width: 180,
        },
        {
            title: 'Check-in',
            dataIndex: 'checkIn',
            width: 180,
        },
        {
            title: 'Check-out',
            dataIndex: 'checkOut',
            width: 180,
        },
        {
            title: 'Total room price',
            width: 150,
            render: (text, record) => {
                return record?.totalRoomPrice?.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                });
            },
        },
        {
            title: 'Total service price',
            width: 150,
            render: (text, record) => {
                return record?.totalServicePrice?.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                });
            },
        },
        {
            title: 'Total Surcharge',
            width: 120,
            render: (text, record) => {
                return record?.totalSurcharge?.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                });
            },
        },
        {
            title: 'Note',
            dataIndex: 'note',
            width: 150,
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

    const bookingUserTableColumns = [
        {
            title: 'Booking ID',
            dataIndex: 'id',
            fixed: 'left',
            width: 105,
        },
        {
            title: 'Phone number',
            width: 140,
            render: (text, record) => record.booker?.phoneNumber,
        },
        {
            title: 'Email',
            width: 220,
            render: (text, record) => record.booker?.email,
        },
        {
            title: 'Last name',
            width: 150,
            render: (text, record) => record.booker?.lastName,
        },
        {
            title: 'First name',
            dataIndex: 'firstName',
            width: 100,
            render: (text, record) => record.booker?.firstName,
        },
        {
            title: 'Expected check-in',
            dataIndex: 'expectedCheckIn',
            width: 180,
        },
        {
            title: 'Expected check-out',
            dataIndex: 'expectedCheckOut',
            width: 180,
        },
        {
            title: 'Check-in',
            dataIndex: 'checkIn',
            width: 180,
        },
        {
            title: 'Check-out',
            dataIndex: 'checkOut',
            width: 180,
        },
        {
            title: 'Total room price',
            width: 150,
            render: (text, record) => {
                return record?.totalRoomPrice?.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                });
            },
        },
        {
            title: 'Total service price',
            width: 150,
            render: (text, record) => {
                return record?.totalServicePrice?.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                });
            },
        },
        {
            title: 'Total Surcharge',
            width: 120,
            render: (text, record) => {
                return record?.totalSurcharge?.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                });
            },
        },
        {
            title: 'Note',
            dataIndex: 'note',
            width: 150,
        },
    ];

    const bookingUpdateFields = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 70,
            isDisable: true,
        },
        {
            title: 'Phone number',
            dataIndex: 'booker.phoneNumber',
            width: 140,
            isDisable: true,
        },
        {
            title: 'Last name',
            dataIndex: 'booker.lastName',
            width: 150,
            isDisable: true,
        },
        {
            title: 'First name',
            dataIndex: 'booker?.firstName',
            width: 100,
            isDisable: true,
        },
        {
            title: 'Expected check-in',
            dataIndex: 'expectedCheckIn',
            width: 180,
            isDisable: true,
        },
        {
            title: 'Expected check-out',
            dataIndex: 'expectedCheckOut',
            width: 180,
            isDisable: true,
        },
        {
            title: 'Check-in',
            dataIndex: 'checkIn',
            width: 180,
            isDisable: true,
        },
        {
            title: 'Check-out',
            dataIndex: 'checkOut',
            width: 180,
            isDisable: true,
        },
        {
            title: 'Total room price',
            dataIndex: 'totalRoomPrice',
            width: 120,
            isDisable: true,
        },
        {
            title: 'Total service price',
            dataIndex: 'totalServicePrice',
            width: 120,
            isDisable: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: 150,
            isDisable: true,
        },
    ];

    return { bookingTableColumns, bookingUserTableColumns, bookingUpdateFields };
}
