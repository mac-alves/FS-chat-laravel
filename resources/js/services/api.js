import ajax from '@fdaciuk/ajax';

export const api = ajax({
    baseUrl: 'http://localhost:8000',
    headers: {
        'content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content
    }
});

export const csfr = document.head.querySelector('meta[name="csrf-token"]').content;
