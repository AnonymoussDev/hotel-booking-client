import Swal from 'sweetalert2';

export default function handleResponse(result) {
    if (result.status.code !== '00') {
        const message = result?.status?.message;
        if (message && typeof message === 'object' && !Array.isArray(message)) {
            const messages = Object.entries(message)
                .map(([key, value]) => `${key}: ${value}`)
                .join(',\n');
            console.log(messages);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: messages,
            });
            return true;
        } else {
            console.log(message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: message || 'Đã có lỗi xảy ra. Xin vui lòng thử lại sau!',
            });
            return true;
        }
    }
}
